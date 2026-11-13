"use strict";
(() => {
  const $ = (id) => document.getElementById(id);
  const t = (source, values) => window.CastWorldI18n.text(source, values);
  const state = {
    boards: [],
    cohorts: [],
    datasets: [],
    domain: "all",
    weights: null,
    active: null,
    mode: "scores",
    query: "",
    sort: "rank",
    ascending: true,
    family: "all",
    hiddenColumns: new Set(),
  };
  const numeric = (value) =>
    typeof value === "number" && Number.isFinite(value);
  const icons = () => {
    if (window.lucide)
      window.lucide.createIcons({ attrs: { "stroke-width": 1.7 } });
  };
  const node = (tag, text, className) => {
    const element = document.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
  };
  const icon = (name) => {
    const element = node("i");
    element.dataset.lucide = name;
    element.setAttribute("aria-hidden", "true");
    return element;
  };
  const isSystem = () => state.active.level === "system";
  const cohortLabel = (id) => t(id === "b" ? "B / Hidden" : "A / Public");
  const levelLabel = (level) =>
    t(level === "system" ? "System level" : "Model level");
  const boardTitle = () =>
    t("{cohort} - {level}", {
      cohort: cohortLabel(state.active.cohort),
      level: levelLabel(state.active.level),
    });
  const lowIsBetter = (key) =>
    [
      "rank",
      "MASE",
      "RMSSE",
      "sMAPE",
      "time_s",
      "tokens",
      "average_rank",
    ].includes(key);
  const scoreColumns = [
    ["rank", "Rank"],
    ["model", "Model"],
    ["total_score", "Total"],
    ["forecast", "Forecast"],
    ["process", "Process"],
    ["trust", "Trust"],
    ["efficiency", "Efficiency"],
  ];
  const resourceColumns = [
    ["rank", "Rank"],
    ["model", "Model"],
    ["MASE", "MASE"],
    ["RMSSE", "RMSSE"],
    ["sMAPE", "sMAPE (%)"],
    ["time_s", "Time (s)"],
    ["tokens", "Tokens"],
  ];
  const systemColumns = [
    ["model", "Method"],
    ["MASE", "MASE"],
    ["RMSSE", "RMSSE"],
    ["average_rank", "Avg. rank"],
  ];
  function format(key, value) {
    if (value === null || value === undefined) return "-";
    if (key === "model") return value;
    if (key === "rank" || key === "position") return String(value);
    if (key === "tokens") return Math.round(value).toLocaleString("en-US");
    if (key === "time_s")
      return value.toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      });
    if (key === "sMAPE") return (value * 100).toFixed(2);
    return value.toFixed(["MASE", "RMSSE"].includes(key) ? 4 : 2);
  }
  function availableColumns() {
    return isSystem()
      ? systemColumns
      : state.mode === "resources"
        ? resourceColumns
        : scoreColumns;
  }
  const columns = () =>
    availableColumns().filter(([key]) => !state.hiddenColumns.has(key));
  function familyOf(model) {
    for (const family of [
      "DeepSeek",
      "Qwen",
      "GPT",
      "Claude",
      "Gemini",
      "Kimi",
      "GLM",
      "Grok",
    ])
      if (model.startsWith(family)) return family;
    return "Other";
  }
  function renderColumnPicker() {
    const fieldset = $("column-options");
    fieldset.replaceChildren(node("legend", t("Metric columns")));
    for (const [key, title] of availableColumns()) {
      if (["rank", "model"].includes(key)) continue;
      const label = node("label");
      const input = node("input");
      input.type = "checkbox";
      input.checked = !state.hiddenColumns.has(key);
      input.addEventListener("change", () => {
        if (input.checked) state.hiddenColumns.delete(key);
        else state.hiddenColumns.add(key);
        if (state.hiddenColumns.has(state.sort)) {
          state.sort = isSystem() ? "model" : "rank";
          state.ascending = true;
        }
        renderTable();
      });
      label.append(input, node("span", t(title)));
      fieldset.append(label);
    }
  }
  function renderFamilyFilter() {
    const select = $("family-filter");
    const families = [
      ...new Set(state.active.rows.map((row) => familyOf(row.model))),
    ].sort();
    if (!families.includes(state.family)) state.family = "all";
    select.replaceChildren(new Option(t("All families"), "all"));
    for (const family of families) select.append(new Option(t(family), family));
    select.value = state.family;
    select.parentElement.hidden = isSystem();
  }
  function renderTable() {
    $("results-table").classList.toggle("system-table", isSystem());
    const metricCount = columns().filter(
      ([key]) => !["rank", "model"].includes(key),
    ).length;
    $("results-table").style.minWidth =
      (isSystem() ? 260 : 310) + metricCount * 110 + "px";
    const all = state.active.rows;
    const rows = all.filter(
      (row) =>
        row.model.toLowerCase().includes(state.query.toLowerCase()) &&
        (isSystem() ||
          state.family === "all" ||
          familyOf(row.model) === state.family),
    );
    const originalOrder = new Map(all.map((row, index) => [row.model, index]));
    rows.sort((a, b) => {
      const av = a[state.sort],
        bv = b[state.sort];
      if (av === null || av === undefined)
        return bv === null || bv === undefined
          ? originalOrder.get(a.model) - originalOrder.get(b.model)
          : 1;
      if (bv === null || bv === undefined) return -1;
      const result = typeof av === "string" ? av.localeCompare(bv) : av - bv;
      return result === 0
        ? originalOrder.get(a.model) - originalOrder.get(b.model)
        : result * (state.ascending ? 1 : -1);
    });
    const header = node("tr");
    for (const [key, title] of columns()) {
      const th = node("th");
      th.scope = "col";
      if (key === "model") th.classList.add("model-cell");
      if (["forecast", "process", "trust", "efficiency"].includes(key))
        th.className = "metric-heading-" + key;
      if (key === "position") {
        th.append(node("span", "", "sr-only"));
        header.append(th);
        continue;
      }
      th.setAttribute(
        "aria-sort",
        state.sort === key
          ? state.ascending
            ? "ascending"
            : "descending"
          : "none",
      );
      const button = node(
        "button",
        t(title),
        "sort-button" + (state.sort === key ? " active" : ""),
      );
      button.type = "button";
      const direction = lowIsBetter(key)
        ? "lower is better"
        : key === "model"
          ? "alphabetical"
          : "higher is better";
      button.title = t("Sort by {metric} ({direction})", {
        metric: t(title),
        direction: t(direction),
      });
      button.append(
        icon(
          state.sort === key
            ? state.ascending
              ? "arrow-up"
              : "arrow-down"
            : "arrow-up-down",
        ),
      );
      button.addEventListener("click", () => {
        state.ascending =
          state.sort === key
            ? !state.ascending
            : lowIsBetter(key) || key === "model";
        state.sort = key;
        renderTable();
      });
      th.append(button);
      header.append(th);
    }
    $("results-head").replaceChildren(header);
    const bests = {};
    for (const [key] of columns()) {
      if (["rank", "model", "position", "time_s", "tokens"].includes(key))
        continue;
      const values = [
        ...new Set(
          all
            .map((row) => row[key])
            .filter(numeric)
            .map((v) =>
              Number(v.toFixed(["MASE", "RMSSE"].includes(key) ? 4 : 2)),
            ),
        ),
      ];
      values.sort((a, b) => (lowIsBetter(key) ? a - b : b - a));
      bests[key] = values.slice(0, 2);
    }
    const fragment = document.createDocumentFragment();
    for (const row of rows) {
      const tr = node("tr");
      if (row.model === "DeepSeek-V4-Flash" || row.model === "CastWorld")
        tr.className = "reference-row";
      for (const [key] of columns()) {
        const value = key === "position" ? null : row[key];
        const td = node("td", format(key, value));
        if (key === "model") td.classList.add("model-cell");
        if (key === "rank" && numeric(value) && value <= 3)
          td.classList.add("podium", "podium-" + value);
        if (key === "rank" || key === "position") td.classList.add("rank");
        if (key === "total_score") td.classList.add("total-column");
        if (key === "total_score" && numeric(value) && state.weights) {
          const track = node("span", undefined, "score-track");
          track.setAttribute("aria-hidden", "true");
          for (const [dimension, weight] of Object.entries(state.weights)) {
            const segment = node("span", undefined, dimension);
            segment.style.width =
              Math.max(0, Math.min(100, row[dimension] * weight)) + "%";
            track.append(segment);
          }
          td.append(track);
        }
        if (value === null || value === undefined) {
          td.classList.add("null-value");
          td.setAttribute(
            "aria-label",
            key === "position" ? "" : t("Not yet evaluated"),
          );
        }
        if (numeric(value) && bests[key]) {
          const rounded = Number(
            value.toFixed(["MASE", "RMSSE"].includes(key) ? 4 : 2),
          );
          if (rounded === bests[key][0]) td.classList.add("best");
          else if (rounded === bests[key][1]) td.classList.add("second");
        }
        tr.append(td);
      }
      fragment.append(tr);
    }
    $("results-body").replaceChildren(fragment);
    $("empty-search").hidden = rows.length !== 0;
    $("board-count").textContent = t(
      isSystem()
        ? "{shown} of {total} methods / {episodes} episodes / {datasets} datasets"
        : "{shown} of {total} models / {episodes} episodes / {datasets} datasets",
      {
        shown: rows.length,
        total: all.length,
        episodes: state.active.episodes,
        datasets: state.active.datasets,
      },
    );
    icons();
  }
  function selectBoard(id, updateHash = true, resetSort = true) {
    if (id === "a" || id === "b") id += "-model";
    state.active =
      state.boards.find((board) => board.id === id) || state.boards[0];
    if (resetSort) {
      state.sort = isSystem() ? "average_rank" : "rank";
      state.ascending = true;
    }
    renderTabs();
    for (const button of $("cohort-tabs").children)
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.cohort === state.active.cohort),
      );
    for (const button of $("board-tabs").children) {
      const selected = button.dataset.board === state.active.id;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    }
    $("board-panel").setAttribute("aria-labelledby", "tab-" + state.active.id);
    $("board-title").textContent = boardTitle();
    $("board-description").textContent = t(
      isSystem()
        ? "{count} methods on {episodes} episodes across {datasets} datasets. Predictive accuracy is evaluated independently for this cohort."
        : "{count} models on {episodes} episodes across {datasets} datasets, using the common CastWorld harness and four-dimensional evaluation.",
      {
        count: state.active.rows.length,
        episodes: state.active.episodes,
        datasets: state.active.datasets,
      },
    );
    $("table-caption").textContent = boardTitle();
    $("board-status").textContent = t(
      state.active.status === "completed"
        ? "Evaluated"
        : state.active.status === "in_progress"
          ? "Evaluation in progress"
          : "Awaiting evaluation",
    );
    $("board-status").classList.toggle(
      "pending",
      state.active.status !== "completed",
    );
    $("metric-mode").hidden = isSystem();
    renderFamilyFilter();
    renderColumnPicker();
    const csvColumns = isSystem()
      ? systemColumns
      : [...scoreColumns, ...resourceColumns.slice(2)];
    const quote = (value) =>
      value == null ? "" : '"' + String(value).replaceAll('"', '""') + '"';
    const csv = [
      csvColumns.map(([key]) => quote(key)).join(","),
      ...state.active.rows.map((row) =>
        csvColumns.map(([key]) => quote(row[key])).join(","),
      ),
    ].join("\n");
    if (state.csvUrl) URL.revokeObjectURL(state.csvUrl);
    state.csvUrl = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    $("download-board").href = state.csvUrl;
    $("download-board").download = "castworld-" + state.active.id + ".csv";
    $("board-source").href = state.active.source;
    $("board-source").firstChild.textContent = t("Board protocol");
    $("board-note").textContent = t(
      isSystem()
        ? "Systems-level evaluation compares forecasting methods by MASE, RMSSE, and average rank. Lower values are better."
        : "Model-level evaluation compares LLMs in the common CastWorld harness across forecast quality, process execution, behavioral trustworthiness, and resource efficiency.",
    );
    if (updateHash)
      history.replaceState(null, "", "#leaderboards/" + state.active.id);
    renderTable();
  }
  function renderTabs() {
    const focusedId = document.activeElement.id;
    const buildTabs = (container, items, group) => {
      container.style.setProperty("--board-count", items.length);
      container.replaceChildren();
      for (const item of items) {
        const button = node("button", undefined, "board-tab");
        button.type = "button";
        button.id = group + "-" + item.id;
        if (group === "cohort") {
          button.dataset.cohort = item.id;
          button.setAttribute(
            "aria-pressed",
            String(item.id === state.active.cohort),
          );
          button.append(
            icon(item.id === "a" ? "globe" : "key-round"),
            node("span", cohortLabel(item.id)),
            node("span", String(item.episodes), "tab-count"),
          );
          button.addEventListener("click", () =>
            selectBoard(item.id + "-" + state.active.level),
          );
        } else {
          button.dataset.board = item.id;
          button.setAttribute("role", "tab");
          button.setAttribute("aria-controls", "board-panel");
          button.append(
            icon(item.level === "system" ? "layers" : "bot"),
            node("span", levelLabel(item.level)),
          );
          button.addEventListener("click", () => selectBoard(item.id));
        }
        button.addEventListener("keydown", (event) => {
          if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key))
            return;
          event.preventDefault();
          const buttons = [...container.children],
            current = buttons.indexOf(button);
          const next =
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? buttons.length - 1
                : (current +
                    (event.key === "ArrowRight" ? 1 : -1) +
                    buttons.length) %
                  buttons.length;
          const target = buttons[next],
            targetId = target.id;
          selectBoard(
            group === "cohort"
              ? target.dataset.cohort + "-" + state.active.level
              : target.dataset.board,
          );
          $(targetId).focus();
        });
        container.append(button);
      }
    };
    buildTabs($("cohort-tabs"), state.cohorts, "cohort");
    buildTabs(
      $("board-tabs"),
      state.boards.filter((board) => board.cohort === state.active.cohort),
      "tab",
    );
    if ($(focusedId)) $(focusedId).focus();
  }
  function renderDatasets() {
    const datasets = state.datasets;
    const domains = ["all", ...new Set(datasets.map((d) => d.domain))];
    const frequencies = {
      "5min": "5 minutes",
      "15min": "15 minutes",
      "6h": "6 hours",
      h: "Hourly",
      D: "Daily",
      W: "Weekly",
      MS: "Monthly",
      d: "Daily",
      "W-SAT": "Weekly",
      "W-MON": "Weekly",
      ME: "Monthly",
    };
    const filters = $("domain-filters");
    filters.replaceChildren();
    for (const domain of domains) {
      const button = node(
        "button",
        t(domain === "all" ? "All domains" : domain),
        "domain-filter",
      );
      button.dataset.domain = domain;
      button.type = "button";
      button.setAttribute("aria-pressed", String(state.domain === domain));
      button.addEventListener("click", () => {
        state.domain = domain;
        renderDatasets();
        [...filters.children]
          .find((element) => element.dataset.domain === domain)
          .focus();
      });
      filters.append(button);
    }
    const fragment = document.createDocumentFragment();
    for (const item of datasets.filter(
      (d) => state.domain === "all" || d.domain === state.domain,
    )) {
      const tr = node("tr");
      for (const value of [
        item.id,
        t(item.domain),
        t(frequencies[item.frequency] || item.frequency),
        item.history,
        item.horizon,
      ])
        tr.append(node("td", String(value)));
      fragment.append(tr);
    }
    $("dataset-body").replaceChildren(fragment);
  }
  function showBoardError() {
    $("board-title").textContent = t("Results are temporarily unavailable");
    $("board-description").textContent = t(
      "View the four pending A/B boards in the repository.",
    );
    $("board-status").textContent = t("Unavailable");
    $("board-source").href =
      "https://github.com/CastWorld-Bench/CastWorld#leaderboards";
    $("board-source").firstChild.textContent = t("Board protocol");
    $("board-note").textContent = t(
      "Open Board protocol to view the evaluation scope.",
    );
  }
  function showDatasetError() {
    const tr = node("tr"),
      td = node("td", t("Dataset metadata is temporarily unavailable."));
    td.colSpan = 5;
    tr.append(td);
    $("dataset-body").replaceChildren(tr);
  }
  async function init() {
    $("language-toggle").addEventListener("click", () => {
      window.CastWorldI18n.toggle();
      if (state.active) selectBoard(state.active.id, false, false);
      else showBoardError();
      if (state.datasetError) showDatasetError();
      else renderDatasets();
      if (state.copyNotice) $("copy-status").textContent = t(state.copyNotice);
    });
    const sectionIcons = {
      "overview-title": "orbit",
      "leaderboards-title": "trophy",
      "evaluation-title": "chart-no-axes-combined",
      "framework-title": "workflow",
      "datasets-title": "globe",
      "getting-started-title": "rocket",
    };
    for (const [id, name] of Object.entries(sectionIcons)) {
      const mark = icon(name);
      mark.classList.add("section-title-icon");
      $(id).append(mark);
    }
    document.querySelectorAll(".section-index").forEach((label, index) => {
      label.prepend(
        icon(["database", "workflow", "chart-no-axes-combined"][index]),
      );
    });
    icons();
    try {
      const data = JSON.parse($("public-board-summary").textContent);
      state.boards = data.boards;
      state.cohorts = data.cohorts;
      state.weights = data.weights;
      const parts = location.hash.split("/");
      const requested =
        parts[1] && parts[2] ? parts[1] + "-" + parts[2] : parts[1];
      selectBoard(requested, false);
      $("model-search").addEventListener("input", (event) => {
        state.query = event.target.value;
        renderTable();
      });
      $("family-filter").addEventListener("change", (event) => {
        state.family = event.target.value;
        renderTable();
      });
      $("reset-table").addEventListener("click", () => {
        state.query = "";
        state.family = "all";
        state.hiddenColumns.clear();
        state.sort = isSystem() ? "average_rank" : "rank";
        state.ascending = true;
        $("model-search").value = "";
        renderFamilyFilter();
        renderColumnPicker();
        renderTable();
      });
      document.addEventListener("click", (event) => {
        if (!$("column-picker").contains(event.target))
          $("column-picker").open = false;
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && $("column-picker").open) {
          $("column-picker").open = false;
          $("column-picker").querySelector("summary").focus();
        }
      });
      for (const input of document.querySelectorAll('input[name="metrics"]'))
        input.addEventListener("change", () => {
          state.mode = input.value;
          if (!availableColumns().some(([key]) => key === state.sort)) {
            state.sort = "rank";
            state.ascending = true;
          }
          renderColumnPicker();
          renderTable();
        });
      window.addEventListener("hashchange", () => {
        const parts = location.hash.split("/");
        const id = parts[1] && parts[2] ? parts[1] + "-" + parts[2] : parts[1];
        if (id) selectBoard(id, false);
      });
      $("copy-command").addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText($("quickstart-code").textContent);
          state.copyNotice = "Commands copied";
          $("copy-status").textContent = t(state.copyNotice);
          $("copy-command").replaceChildren(icon("check"));
          icons();
          setTimeout(() => {
            $("copy-command").replaceChildren(icon("copy"));
            icons();
          }, 1600);
        } catch {
          state.copyNotice = "Clipboard is unavailable";
          $("copy-status").textContent = t(state.copyNotice);
        }
      });
      if (location.hash.startsWith("#leaderboards/"))
        $("leaderboards").scrollIntoView();
    } catch (error) {
      state.active = null;
      showBoardError();
      console.error(error);
    }
    try {
      const response = await fetch("data/datasets.json");
      if (!response.ok) throw new Error("Dataset metadata is unavailable");
      state.datasets = await response.json();
      renderDatasets();
    } catch (error) {
      state.datasetError = true;
      showDatasetError();
      console.error(error);
    }
  }
  init();
})();
