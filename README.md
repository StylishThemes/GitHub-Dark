<p align="center">
  <img alt="githubdark-logo" src="https://rawgit.com/StylishThemes/logos/master/github.dark/githubdark-mini.svg" width="580">
  <br>
  <a href="https://github.com/StylishThemes/GitHub-Dark/tags">
    <img src="https://img.shields.io/github/tag/StylishThemes/GitHub-Dark.svg?label=%20tag%20" alt="Tag">
  </a>
  <a href="https://github.com/un1versal/GitHub-Dark/stargazers">
    <img src="http://github-svg-buttons.herokuapp.com/star.svg?user=StylishThemes&repo=GitHub-Dark&style=flat&background=007ec6" alt="Star">
  </a>
  <a href="http://github.com/StylishThemes/GitHub-Dark/fork">
    <img src="http://github-svg-buttons.herokuapp.com/fork.svg?user=StylishThemes&repo=GitHub-Dark&style=flat&background=007ec6" alt="Fork">
  </a>
  <a href="https://david-dm.org/StylishThemes/GitHub-Dark?type=dev">
    <img src="https://img.shields.io/david/dev/StylishThemes/GitHub-Dark.svg?label=%20devDependencies%20" alt="devDependencies">
  </a>
  <a href="https://gitter.im/StylishThemes/GitHub-Dark">
    <img src="https://img.shields.io/gitter/room/StylishThemes/Github-Dark.js.svg?maxAge=2592000" alt="Gitter">
  </a>
</p>
<h2 align="center">Your eyes will :heart: you.</h2>

## Preview
![](./images/screenshots/after_blue.png)

## Installing

* If using Stylish:
  * Get the Stylish addon for [Firefox](https://addons.mozilla.org/en-US/firefox/addon/2108/), [Chrome](https://chrome.google.com/extensions/detail/fjnbnpbmkenffdnngjfgmeleoegfcffe), [Opera](https://addons.opera.com/en/extensions/details/stylish/), [Safari](http://sobolev.us/stylish/) and [Firefox Mobile](https://addons.mozilla.org/en-US/firefox/addon/2108/).
  * Then install this style using:
    * [userstyles.org](http://userstyles.org/styles/37035) (with customization options)
    * or, add it [manually](https://raw.githubusercontent.com/StylishThemes/GitHub-Dark/master/github-dark.css) into the editor.
      * Use the [grunt build process](https://github.com/StylishThemes/GitHub-Dark/wiki/Build) to customize your GitHub Dark theme.
      * Please refer to the [installation documentation](https://github.com/StylishThemes/GitHub-Dark/wiki/Install) for more details.
* Or, use our [GitHub-Dark Script](https://github.com/StylishThemes/GitHub-Dark-Script) which requires a [user script addon](https://github.com/StylishThemes/GitHub-Dark-Script/wiki/Install), but allows dynamic style changes & updates:bangbang:

## Additional GitHub Customization

* [GitHub-code-wrap](https://github.com/StylishThemes/GitHub-code-wrap) to wrap long lines in code boxes
* [GitHub-FixedHeader](https://github.com/StylishThemes/GitHub-FixedHeader) to have a fixed header
* [GitHub-Commit-Limit](https://github.com/StylishThemes/GitHub-Commit-Limit) to show line length limits when editing a commit message
* [GitHub-Selected-Tab-Color](https://github.com/StylishThemes/GitHub-Selected-Tab-Color)

## Supported GitHub Addons

* [ZenHub](https://www.zenhub.io/)
* [Octotree](https://github.com/buunguyen/octotree/#octotree)
* [GitHub Awesome Autocomplete](https://github.com/algolia/github-awesome-autocomplete)
* [GitHub canned responses](https://github.com/notwaldorf/github-canned-responses#how-to-get-it)
* [Lovely forks](https://github.com/musically-ut/lovely-forks#lovely-forks)

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
2. Make changes (please read the [contribution guidelines](./.github/CONTRIBUTING.md) and abide by them)
3. Create a pull request!

Thanks to all that have [contributed](./AUTHORS) so far!

## Recent Changes

See the [full change log](https://github.com/StylishThemes/GitHub-Dark/wiki).

### Version 1.15.0 (9/14/2016)

* Global:
  * Restore color to commit refs.
  * Style color commit-ref user.
  * Fix sticky header.
* Integrations: Bright item header text. See [issue #388](https://github.com/StylishThemes/GitHub-Dark/issues/388).
* Code: Darken selection color slightly.
* Repo: Darken repo icon.
* User:
  * Fix contribution graph.
  * Fix year selector background.
  * Fix timeline borders & another timeline tweak.
  * Fix & darken contribution progress bars.
  * Add background to popular repo cards.
  * Add background to contribution graph.
  * Dim & pad timeline first images.
  * Remove text shadow on contribution dropdown.
  * Dim & pad join GitHub image.
* Project: Initial styling - probably missed a bunch!
* Developer: Style cards & headers.
* PR:
  * Style review thread. See [issue #404](https://github.com/StylishThemes/GitHub-Dark/issues/404).
  * Add solid background to review thread.
* Meta: Update dependencies and fix lint issues.

### Version 1.14.110 (9/6/2016)

* Global:
  * Remove darker h6 styling. See [issue #377](https://github.com/StylishThemes/GitHub-Dark/issues/377).
  * Override default h6 style. See [issue #377](https://github.com/StylishThemes/GitHub-Dark/issues/377) again.
  * Match HR background to H1 border. See [issue #377](https://github.com/StylishThemes/GitHub-Dark/issues/377).
  * Make markdown blockquote match other blockquotes.
  * Darken inline & unhighlighted code slightly.
  * Break up box- and text-shadow groups.
* Help:
  * Fix code styling. See [issue #377](https://github.com/StylishThemes/GitHub-Dark/issues/377).
  * Bright h4 headers. See [issue #377](https://github.com/StylishThemes/GitHub-Dark/issues/377).
* Frontpage: Tweaks 'show more repos' button once more.
* Meta: Use correct border shorthand ordering.
* Options: Fix access token color
* OAuth: Fix organization names.
* Fix background in payments for failed/refunded txn. See [pull #400](https://github.com/StylishThemes/GitHub-Dark/pull/400); thanks [yaauie](https://github.com/yaauie)!

### Version 1.14.109 (9/3/2016)

* Frontpage:
  * User high resolution spinner for "Show more repos" button.
  * Tweak and fix "Show more repos" buttons.
* Global:
  * Optimize SVG spinner further.
  * Fix various text colors.
  * Signup button: Consistent styling normal + hover is green. See [pull #397](https://github.com/StylishThemes/GitHub-Dark/pull/397).
  * Tweak green button style.
* Milestones: Fix open/close counters.
* Meta: Fix typo calendar. See [pull #396](https://github.com/StylishThemes/GitHub-Dark/pull/396).
* Readme: Fix dev dependencies link.
