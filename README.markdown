# GitHub Dark [![star this repo](http://github-svg-buttons.herokuapp.com/star.svg?user=StylishThemes&repo=GitHub-Dark&style=flat)](http://github.com/StylishThemes/GitHub-Dark) [![fork this repo](http://github-svg-buttons.herokuapp.com/fork.svg?user=StylishThemes&repo=GitHub-Dark&style=flat)](http://github.com/StylishThemes/GitHub-Dark/fork)

- Install from [userstyles.org](http://userstyles.org/styles/37035) (with customization options) or [manually](https://raw.githubusercontent.com/StylishThemes/GitHub-Dark/master/github-dark.css).
- Stylish is available for [Firefox](https://addons.mozilla.org/en-US/firefox/addon/2108/), [Chrome](https://chrome.google.com/extensions/detail/fjnbnpbmkenffdnngjfgmeleoegfcffe) and [Opera](https://addons.opera.com/en/extensions/details/stylish-for-opera/) and [Firefox Mobile](https://addons.mozilla.org/en-US/firefox/addon/2108/).
- **NOTE**: Not all themes are available, once we figure out how to convert the old pygments themes to the new layout you will see the updates in [this demo](http://StylishThemes.github.io/GitHub-Dark/) to visualize the available code color schemes.
- Use a [grunt build process](https://github.com/StylishThemes/GitHub-Dark/wiki/Build) to customize your GitHub Dark theme.

## Preview
![GitHub Dark preview](http://i.imgur.com/MsrHuFh.png)

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

## Changelog

See the [full changelog](https://github.com/StylishThemes/GitHub-Dark/wiki).

#### Version 1.11.6 (12/5/2014)

* Themes
  * Readme updated to show fully supported themes.
  * All partially supported themes are now fully supported.
  * Again, the colors are not a perfect match, and surely specific language styles will still need some tweaks to look better.
* Developer
  * Style blue info boxes
  * Add json syntax styling to make the colors less harsh (temporary fix until GitHub updates the syntax highlighter in that subdomain)
* Pull requests:
  * Tweak Travis status, merge some styles for #222
  * Style "Add more commits..." block ([ref](https://github.com/StylishThemes/GitHub-Dark/pull/200))
* Issues
  * Fix assignee dropdown background
  * Fix inline comment color
* Gist: Fix diff line counters
* Releases: Fix upload file box

#### Version 1.11.5 (11/28/2014)

* Readme: fix plaintext readme background.
* Settings: fix delete buttons.
* Organizations:
  * Lots of tweaks/fixes.
  * Fix members tables.
* Global: fix header logo hover.
* Themes:
  * Twilight - fix java variables & ruby regex highlighting.
  * Tomorrow Night, Tomorrow Night Blue, Tomorrow Night Bright & Tomorrow Night Eighties themes now fully supported.
  * Monokai theme now fully supported.
  * Idle Fingers theme now fully supported.
  * Pastel on Dark theme now fully supported.

#### Version 1.11.4 (11/24/2014)

* Themes:
  * Update custom theme template
  * Add default twilight syntax code highlighting to all partially supported themes
  * Updated demo/readme to indicate which themes are partially supported
* Diff: fix line number color & highlights
* Gist: fix "View gist" button
* Developer: Few tweaks/fixes
