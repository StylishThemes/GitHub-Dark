# GitHub Dark [![tags](https://img.shields.io/github/tag/StylishThemes/GitHub-Dark.svg?style=flat)](https://github.com/StylishThemes/GitHub-Dark/tags) [![star this repo](http://github-svg-buttons.herokuapp.com/star.svg?user=StylishThemes&repo=GitHub-Dark&style=flat&background=1081C1)](http://github.com/StylishThemes/GitHub-Dark) [![fork this repo](http://github-svg-buttons.herokuapp.com/fork.svg?user=StylishThemes&repo=GitHub-Dark&style=flat&background=1081C1)](http://github.com/StylishThemes/GitHub-Dark/fork)

- Install from [userstyles.org](http://userstyles.org/styles/37035) (with customization options) or [manually](https://raw.githubusercontent.com/StylishThemes/GitHub-Dark/master/github-dark.css).
- Stylish is available for [Firefox](https://addons.mozilla.org/en-US/firefox/addon/2108/), [Chrome](https://chrome.google.com/extensions/detail/fjnbnpbmkenffdnngjfgmeleoegfcffe), [Opera](https://addons.opera.com/en/extensions/details/stylish/), [Safari](http://sobolev.us/stylish/) and [Firefox Mobile](https://addons.mozilla.org/en-US/firefox/addon/2108/).
- Includes styling for [Octotree](https://github.com/buunguyen/octotree/#octotree) &amp; [ZenHub](https://www.zenhub.io/).
- Use the [grunt build process](https://github.com/StylishThemes/GitHub-Dark/wiki/Build) to customize your GitHub Dark theme.
- Please refer to the [installation documentation](https://github.com/StylishThemes/GitHub-Dark/wiki/Install) for more details.

## Preview
![GitHub Dark preview](https://cloud.githubusercontent.com/assets/136959/9365834/60f9d916-4679-11e5-9859-b8efa106feef.png)

## [Available Syntax Highlighting Themes](https://stylishthemes.github.io/GitHub-Dark/)

|                      |                        |                          |                 |                       |
|----------------------|------------------------|--------------------------|-----------------|-----------------------|
| Ambiance             | Chaos                  | Clouds Midnight          | Cobalt          | Idle Fingers*         |
| Kr Theme             | Merbivore              | Merbivore Soft           | Mono Industrial | Mono Industrial Clear |
| Monokai*             | Pastel on Dark*        | Solarized Dark*          | Terminal        | Tomorrow Night*       |
| Tomorrow Night Blue* | Tomorrow Night Bright* | Tomorrow Night Eigthies* | Twilight*       |                       |

\* Supports [Jupyter notebook syntax highlighting](https://github.com/sujitpal/statlearning-notebooks/blob/master/src/chapter2.ipynb)

## Notes

* If you're using a custom domain for GitHub Enterprise, be sure to include it though a `@-moz-document` rule (Firefox) or add it to the `Applies to` section in (Chrome).

## Contributions

If you would like to contribute to this repository, please...

1. Fork
2. Make changes (please read the [contribution guidelines](https://github.com/StylishThemes/GitHub-Dark/blob/master/CONTRIBUTING.md) and abide by them)
3. Create a pull request!

Thanks to all that have [contributed](https://github.com/StylishThemes/GitHub-Dark/graphs/contributors) so far!

## Recent Changes

See the [full change log](https://github.com/StylishThemes/GitHub-Dark/wiki).

#### Version 1.14.13 (9/2/2015)

* Diff: Image slider..
* Files: Style new hover highlight.

#### Version 1.14.12 (8/22/2015)

* Update support files:
  * Add updated screenshot to readme.
  * Update contributing content.
  * Update `.editorconfig` file.
* Timelines: flat branch backgrounds.
* Global:
  * Flash message (organizational page).
  * Brown warning panels get light brown text.
* Teams:
  * Use base color on mega octicons.
  * Team count styling.
* Migration page: add styling.
* Issues: Fix filter dropdown menu.
* Releases:
  * Darken "Latest Release" label.
  * Fix "Show # other tags" hover style.
* New repo: Fix clone buttons.
* Grunt build: move perfectionist to devDeps, update deps

#### Version 1.14.11 (8/19/2015)

* Build:
  * Add perfectionist to build to allow reformatting of selectors (use `grunt clean` to reformat).
  * Reformat css to fit 80 columns. Fixes [issue #239](https://github.com/StylishThemes/GitHub-Dark/issues/239).
* Update the timeline line hack.
* Pull requests: fix a white border in teh checks box.
* Discussions: Fix a multicolored header.
