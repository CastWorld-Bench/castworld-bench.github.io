# CastWorld project website

Public homepage: https://castworld-bench.github.io/

Code, datasets, and evaluation tools: https://github.com/CastWorld-Bench/CastWorld

This repository hosts the public static website only. The maintained site sources
and validation checks are in the code repository's `site/`,
`tools/build_project_site.py`, and `tests/test_project_site.py`.

Before publishing an update, run the site builder checks and tests in the code
repository, then copy the contents of `site/` to this repository's root. Preserve
this README, `.gitattributes`, and `.github/workflows/pages.yml`.
Push to `main` to deploy with GitHub Pages. In repository settings, the Pages
source is **GitHub Actions**.

Only approved public summaries and website assets belong here. Do not add raw
experiment records, credentials, or organizer-held B ground truth.
