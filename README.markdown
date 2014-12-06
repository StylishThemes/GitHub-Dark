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

#### Version 1.11.3 (11/21/2014)

* Global:
  * Fix ellipsis button.
  * Match all inline code blocks with the theme, using a split selector group.
* Themes:
  * Lots of adjustments made to Twilight & Solarized Dark themes as the syntax highlighting systems changed slightly. See [issue #197](https://github.com/StylishThemes/GitHub-Dark/issues/197).
  * Removed most pygments references from this repo as GitHub no longer uses it, except maybe some in Enterprise.
  * We will start work on other syntax themes once things have stablized.
* Repo view: Slightly darker summaries.
* Code:
  * Remove overriding background color styling.
  * Diff: fix text coloring of new/deleted content.
  * In issue code now has a very slight border.
  * Fix hover highlight in code blocks.
* Ace editor:
  * Fix find highlight.
  * Move some styles out of the theme file.
* Explore: Fix showcase borders.
* File tree: Fix up navigation hover.
* Readme:
  * Flat buttons.
  * Change demo link to updated version.
* OAuth page: lots of tweaks/fixes.
* Gists:
  * Fix diff background.
  * Diff expanded code background will match (slightly darker) selected theme.
* Markdown:
  * Fix code in unhighlighted inline code.
  * Tweak inline code blocks.
* Enterprise:
  * Fix background colors on files & diffs.
  * Fix background colors on code blocks in markdown.
  * Thanks [chimericdream](https://github.com/chimericdream) for contributing!
