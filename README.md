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

#### Version 1.14.11 (8/19/2015)

* Build:
  * Add perfectionist to build to allow reformatting of selectors (use `grunt clean` to reformat).
  * Reformat css to fit 80 columns. Fixes [issue #239](https://github.com/StylishThemes/GitHub-Dark/issues/239).
* Update the timeline line hack.
* Pull requests: fix a white border in teh checks box.
* Discussions: Fix a multicolored header.

#### Version 1.14.10 (8/5/2015)

* Readme: Better theme table.
* Discussions: Fix triangle beside avatars.
* Markdown:
  * Make bold text slightly brighter. Fixes [issue #250](https://github.com/StylishThemes/GitHub-Dark/issues/250).
  * Fix bold links.
  * Make sure to not change header colors.
  * Fix overflow on single line code blocks. Fixes [issue #239](https://github.com/StylishThemes/GitHub-Dark/issues/239).
* Guides: Fix links in header.
* Gist: Fix file icon background.
* Branches: Flat footer background.
* Build: include updated build option.

#### Version 1.14.9 (7/30/2015)

* Organization:
  * Darken selected tab top border. See [issue #247](https://github.com/StylishThemes/GitHub-Dark/issues/247).
  * Numerous tweaks to the new headers. Fixes [issue #247](https://github.com/StylishThemes/GitHub-Dark/issues/247).
* Diff: Fix GeoJSON diffs. See [issue #242](https://github.com/StylishThemes/GitHub-Dark/issues/242)
* Pull requests: Update branch action class. Fixes [issue #249](https://github.com/StylishThemes/GitHub-Dark/issues/249).
