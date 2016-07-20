# GitHub Dark [![](https://img.shields.io/github/tag/StylishThemes/GitHub-Dark.svg?label=%20tag%20)](https://github.com/StylishThemes/GitHub-Dark/tags) [![](http://github-svg-buttons.herokuapp.com/star.svg?user=StylishThemes&repo=GitHub-Dark&style=flat&background=007ec6)](http://github.com/StylishThemes/GitHub-Dark) [![](http://github-svg-buttons.herokuapp.com/fork.svg?user=StylishThemes&repo=GitHub-Dark&style=flat&background=007ec6)](http://github.com/StylishThemes/GitHub-Dark/fork) [![](https://img.shields.io/david/dev/StylishThemes/GitHub-Dark.svg?label=%20%20%20devDependencies%20)](https://david-dm.org/StylishThemes/GitHub-Dark#info=devDependencies)

Your eyes will :heart: you.

## Preview
![](https://raw.githubusercontent.com/StylishThemes/GitHub-Dark/master/images/screenshots/after_blue.png)

## Install

* If using Stylish:
  * Get the Stylish addon for [Firefox](https://addons.mozilla.org/en-US/firefox/addon/2108/), [Chrome](https://chrome.google.com/extensions/detail/fjnbnpbmkenffdnngjfgmeleoegfcffe), [Opera](https://addons.opera.com/en/extensions/details/stylish/), [Safari](http://sobolev.us/stylish/) and [Firefox Mobile](https://addons.mozilla.org/en-US/firefox/addon/2108/).
  * Then install this style using:
    * [userstyles.org](http://userstyles.org/styles/37035) (with customization options)
    * or, add it [manually](https://raw.githubusercontent.com/StylishThemes/GitHub-Dark/master/github-dark.css) into the editor.
      * Use the [grunt build process](https://github.com/StylishThemes/GitHub-Dark/wiki/Build) to customize your GitHub Dark theme.
      * Please refer to the [installation documentation](https://github.com/StylishThemes/GitHub-Dark/wiki/Install) for more details.
* Or, use our [GitHub-Dark Script](https://github.com/StylishThemes/GitHub-Dark-Script) which requires a [user script addon](https://github.com/StylishThemes/GitHub-Dark-Script/wiki/Install), but allows dynamic style changes & updates:bangbang:

## Additional GitHub customization

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
2. Make changes (please read the [contribution guidelines](https://github.com/StylishThemes/GitHub-Dark/blob/master/.github/CONTRIBUTING.md) and abide by them)
3. Create a pull request!

Thanks to all that have [contributed](https://github.com/StylishThemes/GitHub-Dark/blob/master/AUTHORS) so far!

## Recent Changes

See the [full change log](https://github.com/StylishThemes/GitHub-Dark/wiki).

#### Version 1.14.92 (7/19/2016)

* Global: Fix signed out comment style. See [pull #350](https://github.com/StylishThemes/GitHub-Dark/pull/350).
* Readme: Add link to selected tab color style.
* Network:
  * Tweak invert.
  * Tweaks, remove #000 backgrounds.
* Member:
  * Tweaks, remove #000 backgrounds.
  * Add tree images.
* Frontpage/Feed:
  * Make feed icon orange. See [pull #348](https://github.com/StylishThemes/GitHub-Dark/pull/348).
  * Use more specific icon selector (x3).
* Contact: Fix side menu border.

#### Version 1.14.91 (7/18/2016)

* Global: Split out selected tab color into a separate repo/style.

#### Version 1.14.90 (7/17/2016)

* Global:
  * Set brown panels background-color to preserve background image on feed page. Fixes [issue #346](https://github.com/StylishThemes/GitHub-Dark/issues/346).
* Tabs - add border matching base color to:
  * Site navigation tabs.
  * Comment tabs.
  * User profile tabs.
  * Settings side navigation.
* Network: Darken network graph. This does invert some avatars, which may not be ideal!
* Feed
  * Remove user RSS icon background & set color. Fixes [issue #345](https://github.com/StylishThemes/GitHub-Dark/issues/345).
  * Darken `.atom` page feed button (in Firefox). Fixes [issue #346](https://github.com/StylishThemes/GitHub-Dark/issues/346).

#### Version 1.14.89 (7/16/2016)

* Global
  * Make it more apparent that `<details>` is clickable.
  * Tweak counters.
  * Remove "classy" button class.
  * Change yellow panels to semi-transparent brown. See [issue #340](https://github.com/StylishThemes/GitHub-Dark/issues/340).
  * Replace yellow buttons/text. See [issue #340](https://github.com/StylishThemes/GitHub-Dark/issues/340).
  * Combine text color definitions.
* Milestones: Style progress bar & calendar.
* Issues:
  * Fix rare white background on issue hover.
  * Remove "contributing" class from blue styles.
  * Make labels & milestones hover brighter.
  * Brighten labels & milestones text color on hover. See [issue #340](https://github.com/StylishThemes/GitHub-Dark/issues/340).
  * Fix `.RecentBranches` and text pending colors. See [pull #343](https://github.com/StylishThemes/GitHub-Dark/pull/343).
* Pull:
  * Comparing change; no merge.
  * Fix unstyled border. Fixes [issue #342](https://github.com/StylishThemes/GitHub-Dark/issues/342).
* Code:
  * Fix highlight color. See [issue #339](https://github.com/StylishThemes/GitHub-Dark/issues/339).
  * Brighten hover over selected lines. See [issue #339](https://github.com/StylishThemes/GitHub-Dark/issues/339).
  * Move highlighted code out of "yellow" section.
* Gists: Add a border to the "Secret" label.
* Explore: Many tweaks & fixes to cards.
* Profile: Darken "New" bio label.
* ZenHub: Style epic filter.
* Readme: Add minor space to shield/io labels. See [pull #341](https://github.com/StylishThemes/GitHub-Dark/pull/341).
