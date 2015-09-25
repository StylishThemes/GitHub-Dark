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

#### Version 1.14.15 (9/25/2015)

* Discussions:
  * Fix comment box error message.
  * Style upload callout.
* Code: Add experimental wrapping in discussions.
* Demo:
  * Update to match changed syntax highlight classes. See [issue #256](https://github.com/StylishThemes/GitHub-Dark/issues/256).
  * Darken code expand row.
* User page: Fix contribution calendar highlight.
* Traffic graph: Fix GitHub favicon.

#### Version 1.14.14 (9/8/2015)

* Code:
  * Enable experimental wrapping.
  * Ensure all long lines are wrapped.
  * Make sure diff lines don't overflow. See [issue #253](https://github.com/StylishThemes/GitHub-Dark/issues/253).
  * Black box borders on expanded lines. See [issue #253](https://github.com/StylishThemes/GitHub-Dark/issues/253).
* Themes:
  * Fix typo "repitition". See [pull #254](https://github.com/StylishThemes/GitHub-Dark/pull/254); thanks [TheTypoMaster](https://github.com/TheTypoMaster).
  * Override tag styles inside comments. See [issue #255](https://github.com/StylishThemes/GitHub-Dark/issues/255).
* Global: Fix bold colored text.
* Diff:
  * Enable syntax color in changed parts.
  * Color tweaks.
  * Reverted these changes due to readability issues.
* Organizations: Some fixes for migration pages.
* Demo: use protocol relative urls.

#### Version 1.14.13 (9/2/2015)

* Diff: Image slider..
* Files: Style new hover highlight.
