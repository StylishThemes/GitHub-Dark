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

#### Version 1.11.2 (11/15/2014)

* Themes
  * Add full Twilight theme syntax highlighting support
  * Add full Solarized Dark theme syntax highlighting support
  * Removed unused pygments selectors (pygments selectors still remain in Gists, but GitHub will remove them soon)
  * Renamed `ace-themes` directory to `src` as source files will contain a combination of syntax highlighting types.
  * Add an empty template containing the new syntax highlighter selectors, with comments.
  * Please note that due to the differences in how the syntax highlighter formats the HTML, there will be differences in the new syntax highlighting styles when compared to pygments - there is no way around it!
* Demo
  * Moved pygments demo file into archived folder - it still works with pygments only themes and can be accessed [from here](http://stylishthemes.github.io/GitHub-Dark/archived/).
  * Modified demo to load in the new format themes
  * The select contains all themes with syntax highlighting for Ace editor themes
  * Not all syntax highlighting themes are supported for code views! So far only Twilight & Solarized Dark themes are fully supported.
* Gist: Fix code view hover highlight

#### Version 1.11.1 (11/13/2014)

* Userstyles has increased its size limit to 200k!
  * Language colors: removed and restored to get it under 100k
  * Shadow: text & box shadow selectors modified then restored.
* Diffs: #181818 background.
