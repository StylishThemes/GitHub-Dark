# GitHub Dark [![tags](https://img.shields.io/github/tag/StylishThemes/GitHub-Dark.svg?style=flat)](https://github.com/StylishThemes/GitHub-Dark/tags) [![star this repo](http://github-svg-buttons.herokuapp.com/star.svg?user=StylishThemes&repo=GitHub-Dark&style=flat&background=1081C1)](http://github.com/StylishThemes/GitHub-Dark) [![fork this repo](http://github-svg-buttons.herokuapp.com/fork.svg?user=StylishThemes&repo=GitHub-Dark&style=flat&background=1081C1)](http://github.com/StylishThemes/GitHub-Dark/fork)

- Install from [userstyles.org](http://userstyles.org/styles/37035) (with customization options) or [manually](https://raw.githubusercontent.com/StylishThemes/GitHub-Dark/master/github-dark.css).
- Stylish is available for [Firefox](https://addons.mozilla.org/en-US/firefox/addon/2108/), [Chrome](https://chrome.google.com/extensions/detail/fjnbnpbmkenffdnngjfgmeleoegfcffe), [Opera](https://addons.opera.com/en/extensions/details/stylish/), [Safari](http://sobolev.us/stylish/) and [Firefox Mobile](https://addons.mozilla.org/en-US/firefox/addon/2108/).
- Use the [grunt build process](https://github.com/StylishThemes/GitHub-Dark/wiki/Build) to customize your GitHub Dark theme.
- Please refer to the [installation documentation](https://github.com/StylishThemes/GitHub-Dark/wiki/Install) for more details.

## Preview
![GitHub Dark preview](http://i.imgur.com/9ChgiR6.png)

## [Available Syntax Highlighting Themes](http://stylishthemes.github.io/GitHub-Dark/)

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

## Recent Changes

See the [full change log](https://github.com/StylishThemes/GitHub-Dark/wiki).

#### Version 1.12.0 (3/26/2015)

* Global
  * Fix disabled buttons.
  * Update header dropdown arrow hover.
  * Remove a lot of gradients! See [issue #221]().
  * More gradient work & related things.
  * Graph fixes.
  * Border color fixes.
  * Style tweaks out-the-whazoo!
* Issues:
  * Table header and hover highlight more closely match GH's colors.
  * Fix pagination.
  * Fix new comment header.
* Milestones: Date selector tweaks.
* Front page: Tweak 'More' link.

#### Version 1.11.24 (3/21/2015)

* Commits:
  * Remove box shadow from avatar childs.
  * Fix 'Browse Files' button.
* Issues:
  * Fix comment header mail icon & color.
  * Fix assign self sidebar link.
  * Fix comment icons in issue list.
  * Remove box shadow from inline labels.
* Global:
  * Fix outline buttons.
  * Remove remaining cases of `.button`.
* Gist: Fix buttons by re-adding `.button` [#220](https://github.com/StylishThemes/GitHub-Dark/issues/220).
* Pull request: Add padding to bottom info box.

#### Version 1.11.23 (3/20/2015)

* Global:
  * Buttons tweaks galore!
  * Fix octicon buttons.
* Issues:
  * Fix comment box header, fixes [issue #219](https://github.com/StylishThemes/GitHub-Dark/issues/219).
  * Simplify header button styling.
* ZenHub: styling tweaks.
* Octotree:
  * Button tweaks.
  * The save option button was not styled on purpose. Simply adding a "btn" class name would style it ([pull request submitted](https://github.com/buunguyen/octotree/pull/162)).
