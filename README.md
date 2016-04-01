# GitHub Dark [![tag](https://img.shields.io/github/tag/StylishThemes/GitHub-Dark.svg)](https://github.com/StylishThemes/GitHub-Dark/tags) [![stars](http://github-svg-buttons.herokuapp.com/star.svg?user=StylishThemes&repo=GitHub-Dark&style=flat&background=007ec6)](http://github.com/StylishThemes/GitHub-Dark) [![forks](http://github-svg-buttons.herokuapp.com/fork.svg?user=StylishThemes&repo=GitHub-Dark&style=flat&background=007ec6)](http://github.com/StylishThemes/GitHub-Dark/fork) [![devdeps](https://img.shields.io/david/dev/StylishThemes/GitHub-Dark.svg)](https://david-dm.org/StylishThemes/GitHub-Dark#info=devDependencies)

Your eyes will :heart: you.

Our dark style includes support for the following GitHub addons:

* [ZenHub](https://www.zenhub.io/)
* [Octotree](https://github.com/buunguyen/octotree/#octotree)
* [GitHub Awesome Autocomplete](https://github.com/algolia/github-awesome-autocomplete)
* [GitHub canned responses](https://github.com/notwaldorf/github-canned-responses#how-to-get-it)
* [Lovely forks](https://github.com/musically-ut/lovely-forks#lovely-forks)

## Install

* If using Stylish:
  * Get the Stylish addon for [Firefox](https://addons.mozilla.org/en-US/firefox/addon/2108/), [Chrome](https://chrome.google.com/extensions/detail/fjnbnpbmkenffdnngjfgmeleoegfcffe), [Opera](https://addons.opera.com/en/extensions/details/stylish/), [Safari](http://sobolev.us/stylish/) and [Firefox Mobile](https://addons.mozilla.org/en-US/firefox/addon/2108/).
  * Then install this style using:
    * [userstyles.org](http://userstyles.org/styles/37035) (with customization options)
    * or, add it [manually](https://raw.githubusercontent.com/StylishThemes/GitHub-Dark/master/github-dark.css) into the editor.
      * Use the [grunt build process](https://github.com/StylishThemes/GitHub-Dark/wiki/Build) to customize your GitHub Dark theme.
      * Please refer to the [installation documentation](https://github.com/StylishThemes/GitHub-Dark/wiki/Install) for more details.
* Or, use our [GitHub-Dark Script](https://github.com/StylishThemes/GitHub-Dark-Script) which requires a [user script addon](https://github.com/StylishThemes/GitHub-Dark-Script/wiki/Install), but allows dynamic style changes & updates:bangbang:

## Preview
![GitHub Dark preview](https://raw.githubusercontent.com/StylishThemes/GitHub-Dark/master/images/screenshots/after_blue.png)

## Available Syntax Highlighting Themes ([Demo](https://stylishthemes.github.io/GitHub-Dark/))

|                 |                      |                        |                          |                       |
|-----------------|----------------------|------------------------|--------------------------|-----------------------|
| Ambiance        | Chaos                | Clouds Midnight        | Cobalt                   | Idle Fingers*         |
| Kr Theme        | Merbivore            | Merbivore Soft         | Mono Industrial          | Mono Industrial Clear |
| Monokai*        | Obsidian*            | Pastel on Dark*        | Solarized Dark*          | Terminal              |
| Tomorrow Night* | Tomorrow Night Blue* | Tomorrow Night Bright* | Tomorrow Night Eigthies* | Twilight*             |
| Vibrant Ink     |                      |                        |                          |                       |

\* Supports [Jupyter notebook syntax highlighting](https://github.com/sujitpal/statlearning-notebooks/blob/master/src/chapter2.ipynb)

## Notes

* If you're using a custom domain for GitHub Enterprise, be sure to include it though a `@-moz-document` rule (Firefox) or add it to the `Applies to` section in (Chrome).
* If you want GitHub commit messages to use a monospaced font, and have a background color indicating the width limits, check out [GitHub Commit Limit](https://github.com/StylishThemes/GitHub-Commit-Limit).

## Contributions

If you would like to contribute to this repository, please...

1. Fork
2. Make changes (please read the [contribution guidelines](https://github.com/StylishThemes/GitHub-Dark/blob/master/.github/CONTRIBUTING.md) and abide by them)
3. Create a pull request!

Thanks to all that have [contributed](https://github.com/StylishThemes/GitHub-Dark/blob/master/AUTHORS) so far!

## Recent Changes

See the [full change log](https://github.com/StylishThemes/GitHub-Dark/wiki).

#### Version 1.14.65 (4/1/2016)

* Global:
  * Add selected dropdown item hover style.
  * Tweak heading colors.
  * Style arrow for dropdown.
* Issue:
  * Fix filter by author background.
  * Comments: FIx arrow on saved reply dropdown.
* Feed: Fix "More" button focus highlight.
* Settings: Style saved reply form.
* ZenHub: Remove upload selector.
* Readme: Misc updates.

#### Version 1.14.64 (3/24/2016)

* Global:
  * Tweak Jupyter graphs and GeoJSON maps. See [issue #297](https://github.com/StylishThemes/GitHub-Dark/issues/297).
  * Fix outline buttons with custom colors.
  * Fix header search styling, then reverted & manually merged [pull #299](https://github.com/StylishThemes/GitHub-Dark/pull/299); thanks [rayrutjes](https://github.com/rayrutjes)!
  * Add color to focused search box badge.
  * Add GitHub Awesome Autocomplete support!
* Maps: Tweak maps overlay.
* Issues:
  * Fix sort by reactions style.
  * Update label dropdown.
  * More tweaks to label dropdown.
* Pull request diff: Style "This page is out of date. Refresh" label.
* Showcase:
  * Remove header styling. Fixes [issue #301](https://github.com/StylishThemes/GitHub-Dark/issues/301).
  * Tweak side panels.
  * Fix header color.
* Integrations: Fix header color.
* ZenHub: Switch repo button tweaks x2. Fixes [issue #303](https://github.com/StylishThemes/GitHub-Dark/issues/303).
* Grunt: Update stylelint rules for version 5. See [pull #300](https://github.com/StylishThemes/GitHub-Dark/pull/300); thanks [rayrutjes](https://github.com/rayrutjes)!

#### Version 1.14.63 (3/21/2016)

* Gist: Style banner seen when logged out.
* Global: Color the top loading bar.
* Jupyter: Adjust image color to more closely match original. Fixes [issue #297](https://github.com/StylishThemes/GitHub-Dark/issues/297).
