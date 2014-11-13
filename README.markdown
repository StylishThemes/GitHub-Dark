# GitHub Dark [![star this repo](http://github-svg-buttons.herokuapp.com/star.svg?user=StylishThemes&repo=GitHub-Dark)](http://github.com/StylishThemes/GitHub-Dark) [![fork this repo](http://github-svg-buttons.herokuapp.com/fork.svg?user=StylishThemes&repo=GitHub-Dark)](http://github.com/StylishThemes/GitHub-Dark/fork)

- Install from [userstyles.org](http://userstyles.org/styles/37035) (with customization options) or [manually](https://raw.githubusercontent.com/StylishThemes/GitHub-Dark/master/github-dark.css).
- Stylish is available for [Firefox](https://addons.mozilla.org/en-US/firefox/addon/2108/), [Chrome](https://chrome.google.com/extensions/detail/fjnbnpbmkenffdnngjfgmeleoegfcffe) and [Opera](https://addons.opera.com/en/extensions/details/stylish-for-opera/) and [Firefox Mobile](https://addons.mozilla.org/en-US/firefox/addon/2108/).
- <del>Use [this demo](http://StylishThemes.github.io/GitHub-Dark/) to visualize the different code color schemes</del>. Once we figure out how to convert these old themes to the new layout, this will get updated.
- Use [this demo](http://ace.c9.io/tool/mode_creator.html) to visualize the different Ace editor syntax highlighting themes.
- Use a [grunt build process](https://github.com/StylishThemes/GitHub-Dark/wiki/Build) to customize your GitHub Dark theme.


## Preview
![GitHub Dark preview](http://i.imgur.com/MsrHuFh.png)

## [Available Ace editor color schemes](http://ace.c9.io/tool/mode_creator.html)

|   |   |   |   |   |
| --- | --- | --- | --- | --- |
| Ambiance | Chaos | Clouds Midnight | Cobalt | Idle Fingers |
| Kr Theme | Merbivore | Merbivore Soft | Mono Industrial | Monokai |
| Pastel on Dark | Solarized Dark | Terminal | Tomorrow Night | Tomorrow Night Blue |
| Tomorrow Night Bright | Tomorrow Night Eigthies | Twilight | Vibrant Ink | |

## Notes

* If you're using a custom domain for GitHub Enterprise, be sure to include it though a `@-moz-document` rule (Firefox) or add it to the `Applies to` section in (Chrome).

## Contributions

If you would like to contribute to this repository, please...

1. Fork
2. Make changes (please read the [contribution guidelines](https://github.com/StylishThemes/GitHub-Dark/blob/master/CONTRIBUTING.md) and abide by them)
3. Create a pull request!

Thanks to all that have [contributed](https://github.com/StylishThemes/GitHub-Dark/graphs/contributors) so far!

## Changelog

See the [full changelog](https://github.com/StylishThemes/GitHub-Dark/wiki).

#### Version 1.11.1 (11/13/2014)

* Userstyles has increased its size limit to 200k!
  * Language colors: removed and restored to get it under 100k
  * Shadow: text & box shadow selectors modified then restored.
* Diffs: #181818 background.

#### Version 1.11.0 (11/12/2014)

* Themes
  * Archived pygments themes as GitHub is no longer using Pygments.
  * Add 19 dark Ace editor themes. Thanks [ThePenultimateOne](https://github.com/ThePenultimateOne)!
  * Set Twilight as default.
* Build:
  * Preserve version number & agent sheet comments when minifying.
  * Update grunt to only build ace themes.
* Branches: Fix branch diff meter.
* Ace Editor: Add, but later reverted update to background & keyword style in lieu of adding Ace theme support. See [issue #196](https://github.com/StylishThemes/GitHub-Dark/issues/196).
* Filter lists: Fix count color on selected item.

#### Version 1.10.6 (11/8/2014)

* Themes
  * Added missing style to all theme files. Fixes [issue #195](https://github.com/StylishThemes/GitHub-Dark/issues/195).
  * Added grunt theme build to minify css & made comments permanent.
  * Added 15 (dark only) themes from https://github.com/idleberg/base16-pygments.
* Repo: Modify .editorconfig to set a root & only apply to css.
