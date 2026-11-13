"use strict";
(() => {
  const translations = {
    "CastWorld | Agentic Time Series Forecasting": "CastWorld | 智能体时间序列预测",
    "CastWorld Leaderboard | A / B": "CastWorld 排行榜 | A / B",
    "CastWorld: an agentic benchmark for context-aware time series forecasting. Explore system, model, public and hidden-ground-truth leaderboards.": "CastWorld：面向情境感知时间序列预测的智能体基准。查看公开与隐藏真值任务集的系统级和模型级排行榜。",
    "CastWorld | Context-Aware Agentic Forecasting": "CastWorld | 情境感知智能体预测",
    "25 datasets. 8 domains. A state-adaptive forecasting environment and four-dimensional evaluation.": "25 个数据集，8 个领域。状态自适应预测环境与四维评估。",
    "Skip to content": "跳转到正文",
    "CastWorld home": "CastWorld 首页",
    "Main navigation": "主导航",
    "Overview": "概览",
    "Leaderboards": "排行榜",
    "Framework": "框架",
    "Datasets": "数据集",
    "Evaluation": "评估",
    "Code": "代码",
    "Context-rich tasks. State-adaptive interaction.": "情境丰富的预测任务，状态自适应交互。",
    "CastWorld three-color globe and forecasting signal": "CastWorld 三色地球与预测信号标志",
    "Benchmarking Context-Aware Agentic": "情境感知智能体时间序列预测评测：",
    "Time Series Forecasting Beyond Predictive Accuracy": "超越预测精度",
    "Evaluate how forecasting agents acquire evidence, construct and revise numerical forecasts, select final predictions, and use resources under shared task conditions.": "在共同任务条件下，评估预测智能体如何获取证据、构造和修订数值预测、选择最终结果，以及使用资源。",
    "Code & data": "代码与数据",
    "Evaluation guide": "评估指南",
    "Domains": "领域",
    "Core tools": "核心工具",
    "Evaluation dimensions": "评估维度",
    "Context-aware agentic forecasting": "情境感知智能体预测",
    "CastWorld Leaderboard": "CastWorld 排行榜",
    "A / Public: 300 episodes. B / Hidden: 100 episodes. Forecast quality, process execution, behavioral trustworthiness, and resource efficiency.": "A / 公开：300 个任务。B / 隐藏：100 个任务。评估预测质量、过程执行、行为可信度与资源效率。",
    "Project": "项目主页",
    "Submission protocol": "提交规范",
    "Data access": "数据获取",
    "The benchmark": "基准简介",
    "Forecasting is a sequence of decisions.": "预测是一连串的决策。",
    "A forecasting agent must decide what information it needs, which tools to use, whether to revise a prediction, and when to submit. CastWorld makes these decisions observable in a shared, context-aware environment.": "预测智能体需要决定获取哪些信息、使用哪些工具、是否修订预测以及何时提交。CastWorld 在共享的情境感知环境中，让这些决策可被观测。",
    "CastWorld combines context-rich datasets, a state-adaptive forecasting harness and dual-level evaluation.": "CastWorld 将情境丰富的数据集、状态自适应预测框架和双层级评估结合起来。",
    "The CastWorld environment: context-rich tasks, a forecasting-native harness, and decision-centric evaluation.": "CastWorld 环境：情境丰富的任务、面向预测的原生框架，以及以决策为中心的评估。",
    "01 / DATA": "01 / 数据",
    "A world of forecasting contexts": "多样的预测情境",
    "25 real-world datasets connect target histories with external variables, events, domain knowledge, and historical cases.": "25 个真实世界数据集将目标历史序列与外部变量、事件、领域知识和历史案例连接起来。",
    "02 / HARNESS": "02 / 框架",
    "Evidence and forecasts co-evolve": "证据与预测协同演化",
    "New evidence can guide a revision. An intermediate forecast can reveal what to investigate next. The agent chooses how to proceed.": "新证据可以指导修订，中间预测也能揭示下一步需要调查的信息。由智能体自主决定如何继续。",
    "03 / EVALUATION": "03 / 评估",
    "Follow decisions through to delivery": "追踪决策直至最终提交",
    "Model-level evaluation is the primary focus, assessing decisions under a common harness. Systems-level evaluation compares predictive accuracy across methods.": "模型级评估是重点，在共同框架下评估自主决策。系统级评估比较不同方法的预测精度。",
    "Benchmark results": "基准结果",
    "Evaluation protocol": "评估规范",
    "Evaluation cohort": "评估任务集",
    "Evaluation level": "评估层级",
    "Loading results": "正在加载结果",
    "CastWorld evaluation results": "CastWorld 评估结果",
    "Loading": "加载中",
    "Filter models or methods": "筛选模型或方法",
    "Model family": "模型系列",
    "All families": "全部系列",
    "Other": "其他",
    "Displayed metrics": "显示指标",
    "Scores": "评分",
    "Errors & resources": "误差与资源",
    "Choose metric columns": "选择指标列",
    "Reset table filters and columns": "重置表格筛选和列",
    "Download this board as CSV": "下载当前榜单 CSV",
    "Metric columns": "指标列",
    "Scrollable leaderboard table": "可滚动的排行榜表格",
    "CastWorld leaderboard": "CastWorld 排行榜",
    "No matching models or methods.": "没有匹配的模型或方法。",
    "Source results": "结果来源",
    "Board protocol": "榜单规范",
    "A / Public (300 episodes) and B / Hidden (100 episodes) each have System and Model boards. All results are awaiting evaluation.": "A / 公开（300 个任务）和 B / 隐藏（100 个任务）均设系统榜与模型榜，所有结果均待评估。",
    "View the A/B boards in the repository": "查看仓库中的 A/B 榜单",
    "Beyond the final curve": "不止于最终曲线",
    "Four complementary views": "四个互补的评估视角",
    "Total = 0.60 F + 0.20 P + 0.15 T + 0.05 E": "总分 = 0.60 F + 0.20 P + 0.15 T + 0.05 E",
    "Forecast quality": "预测质量",
    "Training-scaled predictive errors, with declared domain metrics where applicable.": "使用训练数据尺度归一化的预测误差，并在适用时纳入预先声明的领域指标。",
    "Process execution": "过程执行",
    "Recorded acquisition, revision, checking, and selection among created forecasts.": "记录信息获取、预测修订、检查，以及对已生成预测的选择过程。",
    "Behavioral trustworthiness": "行为可信度",
    "Permission compliance, reference integrity, and agreement between declared and executed changes.": "权限合规、引用完整性，以及声明修改与实际执行修改的一致性。",
    "Resource efficiency": "资源效率",
    "Time, tokens, and redundant behavior, conditioned on predictive adequacy.": "以预测质量达标为条件，评估耗时、词元消耗与冗余行为。",
    "The forecasting environment": "预测环境",
    "A state-adaptive loop": "状态自适应循环",
    "Framework specification": "框架规范",
    "Evidence can change a forecast. A forecast can reveal what to investigate next. CastWorld records acquisition, forecast, and execution state while the agent chooses its next action.": "证据可以改变预测，预测也能揭示接下来需要调查的信息。CastWorld 记录取证状态、预测状态和执行状态，由智能体选择下一步动作。",
    "Acquisition state": "取证状态",
    "What is known?": "已经掌握了什么？",
    "Information needs, acquired observations, and evidence with sources and time scopes.": "信息需求、已获取的观测，以及带有来源和时间范围的证据。",
    "Forecast state": "预测状态",
    "What has been predicted?": "已经生成了哪些预测？",
    "Immutable forecast versions, the active prediction, and public check results.": "不可变的预测版本、当前激活的预测，以及公开检查结果。",
    "Execution state": "执行状态",
    "What can happen next?": "下一步可以做什么？",
    "Actions, errors and feedback, remaining budget, and the record of earlier decisions.": "动作、错误与反馈、剩余预算，以及先前决策的记录。",
    "Choose the next action": "选择下一步动作",
    "Continue acquiring information, create or revise a forecast, inspect a version, return to an earlier prediction, or submit. The shared state informs the choice; the environment does not prescribe a single sequence.": "继续获取信息、创建或修订预测、检查版本、返回先前预测，或提交结果。共享状态为选择提供依据，环境并不规定唯一的执行顺序。",
    "Keep the numerical history": "保留数值预测历史",
    "Each accepted construction becomes an immutable forecast version. Numerical changes, supporting observations, checks, and final selection remain connected in the execution record.": "每次被接受的预测构建都会生成不可变的版本。数值修改、支持观测、检查和最终选择在执行记录中保持关联。",
    "Evaluate after delivery": "提交后评估",
    "An independent scorer uses held-out targets and the recorded trajectory. Public checks guide execution without revealing the current task's future prediction error.": "独立评分器使用留出的目标值和记录的轨迹进行评估。公开检查引导执行，但不泄露当前任务的未来预测误差。",
    "Forecasting-native capabilities": "预测原生能力",
    "A shared toolkit, with domain-specific extensions": "共享工具集与领域专用扩展",
    "Time series diagnostics.": "时间序列诊断。",
    "Understand the current situation": "理解当前情境",
    "Statistical and temporal feature extraction.": "统计特征与时序特征提取。",
    "Quantify patterns and changes": "量化模式与变化",
    "Chronos, TimesFM, Sundial, and Moirai forecasts.": "使用 Chronos、TimesFM、Sundial 和 Moirai 生成预测。",
    "Form numerical candidates": "构建数值候选预测",
    "Domain knowledge and historical analogue cases.": "领域知识与历史相似案例。",
    "Ground a forecasting judgment": "为预测判断提供依据",
    "The registry provides 49 core tool entries, plus domain-specific diagnostics. Shared forecast operations support construction, fusion, revision, checks, and final submission.": "注册表提供 49 个核心工具条目及领域专用诊断。共享预测操作支持构建、融合、修订、检查和最终提交。",
    "Real-world forecasting": "真实世界预测",
    "25 datasets across 8 domains": "8 个领域，25 个数据集",
    "Dataset & field guide": "数据集与字段指南",
    "The paper studies 1,310 episodes, including a shared 250-episode comparison of 15 LLMs. The public release provides separate A/B cohorts from the same 25 datasets: 300 episodes with public labels on A and 100 with organizer-held labels on B. Each cohort has independent Model and System boards awaiting evaluation.": "论文研究了 1,310 个预测任务，其中 15 个大语言模型在共同的 250 个任务上进行比较。公开版本另设 A/B 任务集，来自相同的 25 个数据集：A 榜含 300 个真值公开的任务，B 榜含 100 个真值由组织方持有的任务。各任务集均设独立的模型榜与系统榜，目前待评估。",
    "Published CastWorld temporal and contextual dataset profiles across eight application domains.": "论文中的 CastWorld 数据集画像，展示八个应用领域的时间与情境特征。",
    "Temporal and contextual diversity across the dataset suite.": "数据集集合在时间特征与情境方面的多样性。",
    "A common context specification": "统一的情境信息规范",
    "Modality, temporality, semantics, and availability describe complementary attributes of context. Task packages organize numerical covariates, event timelines, text knowledge, and historical cases, with explicit field and time permissions.": "模态、时间性、语义和可用性描述情境信息的互补属性。任务包组织数值协变量、事件时间线、文本知识和历史案例，并明确字段与时间权限。",
    "Filter datasets by domain": "按领域筛选数据集",
    "Dataset domains, sampling frequencies and forecast windows": "数据集领域、采样频率与预测窗口",
    "Dataset": "数据集",
    "Domain": "领域",
    "Sampling": "采样频率",
    "History": "历史长度",
    "Forecast horizon": "预测长度",
    "History and forecast lengths are counts of observations at the listed sampling frequency.": "历史长度和预测长度均指在所列采样频率下的观测点数。",
    "Raw CSV and JSON tables": "原始 CSV 和 JSON 表格",
    "Run CastWorld": "运行 CastWorld",
    "From tasks to trajectories": "从任务到执行轨迹",
    "Use the released A/B task packages, common harness, and evaluation code.": "使用已发布的 A/B 任务包、共享框架与评估代码。",
    "Complete usage guide": "完整使用指南",
    "Offline smoke test": "离线冒烟测试",
    "Copy smoke-test commands": "复制冒烟测试命令",
    "Commands copied": "命令已复制",
    "Clipboard is unavailable": "剪贴板不可用",
    "Context-aware tasks. State-adaptive interaction. Decision-centric evaluation.": "情境感知任务，状态自适应交互，以决策为中心的评估。",
    "A / Public": "A / 公开",
    "B / Hidden": "B / 隐藏",
    "System": "系统",
    "Model": "模型",
    "System level": "系统级",
    "Model level": "模型级",
    "Rank": "排名",
    "Method": "方法",
    "Total": "总分",
    "Forecast": "预测质量",
    "Process": "过程执行",
    "Trust": "行为可信",
    "Efficiency": "资源效率",
    "Time (s)": "耗时（秒）",
    "Tokens": "词元数",
    "Avg. rank": "平均排名",
    "Awaiting evaluation": "待评估",
    "Evaluated": "已评估",
    "Evaluation in progress": "评估进行中",
    "Not yet evaluated": "尚未评估",
    "lower is better": "越低越好",
    "higher is better": "越高越好",
    "alphabetical": "按字母顺序",
    "Sort by {metric} ({direction})": "按{metric}排序（{direction}）",
    "{cohort} - {level}": "{cohort} - {level}",
    "{count} methods on {episodes} episodes across {datasets} datasets. Predictive accuracy is evaluated independently for this cohort.": "{count} 种方法，{episodes} 个任务，涵盖 {datasets} 个数据集。在此任务集上独立评估预测精度。",
    "{count} models on {episodes} episodes across {datasets} datasets, using the common CastWorld harness and four-dimensional evaluation.": "{count} 个模型，{episodes} 个任务，涵盖 {datasets} 个数据集，使用共享 CastWorld 框架进行四维评估。",
    "{shown} of {total} methods / {episodes} episodes / {datasets} datasets": "{shown} / {total} 种方法 / {episodes} 个任务 / {datasets} 个数据集",
    "{shown} of {total} models / {episodes} episodes / {datasets} datasets": "{shown} / {total} 个模型 / {episodes} 个任务 / {datasets} 个数据集",
    "Systems-level evaluation compares forecasting methods by MASE, RMSSE, and average rank. Lower values are better.": "系统级评估使用 MASE、RMSSE 和平均排名比较预测方法，数值越低越好。",
    "Model-level evaluation compares LLMs in the common CastWorld harness across forecast quality, process execution, behavioral trustworthiness, and resource efficiency.": "模型级评估在共享 CastWorld 框架下，从预测质量、过程执行、行为可信和资源效率四个维度比较大语言模型。",
    "Results are temporarily unavailable": "结果暂时不可用",
    "View the four pending A/B boards in the repository.": "请查看仓库中的四个 A/B 待评估榜单。",
    "Unavailable": "不可用",
    "Open Board protocol to view the evaluation scope.": "打开榜单规范以查看评估范围。",
    "Dataset metadata is temporarily unavailable.": "数据集元数据暂时不可用。",
    "All domains": "全部领域",
    "Energy": "能源",
    "Natural science": "自然科学",
    "Economics and finance": "经济与金融",
    "Public services": "公共服务",
    "Retail": "零售",
    "Industrial operations": "工业运营",
    "Web services": "网络服务",
    "Environment": "环境",
    "5 minutes": "5 分钟",
    "15 minutes": "15 分钟",
    "6 hours": "6 小时",
    "Hourly": "每小时",
    "Daily": "每天",
    "Weekly": "每周",
    "Monthly": "每月"
  };
  const normalize = (text) => text.replace(/\s+/g, " ").trim();
  let language = "en";
  try {
    if (localStorage.getItem("castworld-language") === "zh-CN") language = "zh-CN";
  } catch { /* Storage may be disabled; switching still works for this page. */ }
  const text = (source, values = {}) => {
    const template = language === "zh-CN" ? translations[source] || source : source;
    return template.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);
  };
  // Retain original text nodes so translating never destroys links, icons or line breaks.
  const originals = [];
  const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const target = walker.currentNode;
    if (target.parentElement.closest("script, style, pre, code, noscript, #language-toggle")) continue;
    if (translations[normalize(target.textContent)]) originals.push([target, target.textContent]);
  }
  const attributes = [];
  document.querySelectorAll("[aria-label], [title], [alt], [placeholder], meta[content]").forEach((element) => {
    for (const name of ["aria-label", "title", "alt", "placeholder", "content"]) {
      const source = element.getAttribute(name);
      if (translations[source]) attributes.push([element, name, source]);
    }
  });
  function apply() {
    document.documentElement.lang = language;
    for (const [target, source] of originals) {
      const prefix = source.match(/^\s*/)[0], suffix = source.match(/\s*$/)[0];
      target.textContent = language === "en" ? source : prefix + text(normalize(source)) + suffix;
    }
    for (const [target, name, source] of attributes) target.setAttribute(name, text(source));
    const button = document.getElementById("language-toggle");
    button.textContent = language === "en" ? "中文" : "English";
    button.lang = language === "en" ? "zh-CN" : "en";
    const label = language === "en" ? "Switch to Chinese" : "切换到英文";
    button.title = label;
    button.setAttribute("aria-label", label);
  }
  window.CastWorldI18n = {
    text, apply,
    get language() { return language; },
    toggle() {
      language = language === "en" ? "zh-CN" : "en";
      try { localStorage.setItem("castworld-language", language); } catch { /* Optional persistence. */ }
      apply();
    }
  };
  apply();
})();
