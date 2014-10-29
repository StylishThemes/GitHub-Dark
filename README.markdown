# GitHub Dark [![star this repo](http://github-svg-buttons.herokuapp.com/star.svg?user=StylishThemes&repo=GitHub-Dark)](http://github.com/StylishThemes/GitHub-Dark) [![fork this repo](http://github-svg-buttons.herokuapp.com/fork.svg?user=StylishThemes&repo=GitHub-Dark)](http://github.com/StylishThemes/GitHub-Dark/fork)

- Install from [userstyles.org](http://userstyles.org/styles/37035) (with customization options) or [manually](https://raw.githubusercontent.com/StylishThemes/GitHub-Dark/master/github-dark.css).
- Stylish is available for [Firefox](https://addons.mozilla.org/en-US/firefox/addon/2108/), [Chrome](https://chrome.google.com/extensions/detail/fjnbnpbmkenffdnngjfgmeleoegfcffe) and [Opera](https://addons.opera.com/en/extensions/details/stylish-for-opera/) and [Firefox Mobile](https://addons.mozilla.org/en-US/firefox/addon/2108/).
- Use [this demo](http://StylishThemes.github.io/GitHub-Dark/) to visualize the different code color schemes.
- Use a [grunt build process](https://github.com/StylishThemes/GitHub-Dark/wiki/Build) to customize your GitHub Dark theme.

## Preview
![GitHub Dark preview](http://i.imgur.com/MsrHuFh.png)

## Available color schemes

|   |   |   |   |   |
| --- | --- | --- | --- | --- |
| 256 Jungle | 3024 Night | Anotherdark | Asmanian-blood | Birds of Paradise |
| Blacksea | Brookstream | BusyBee | Candycode | Darcula |
| Dark | Dark2 | DarkBlue2 | DarkBone | DarkBurn |
| DarkDevel | DarkOcean | DarkRobot | DarkSpectrum | DarkZ |
| DarkerDesert | Desert | Deveiate | Digerati | Dim |
| Dim2 | Dracula | Freya | Fruity | GitHub-Dark |
| Herald | Idle Fingers | Inkpot | JellyBeans | Monokai |
| Mustang | Native | Neverland | No Quarter | Pastels on Dark |
| Peaksea | Railscasts | Rdark | Refactor | Sahara |
| Slate | Solarized Dark | Synic | Tomorrow Night | Tomorrow Night Blue |
| Tomorrow Night Bright | Tomorrow Night Eighties | Twilight | Up | Vim |
| Vitamins | Wombat | Zenburn | Zenesque |  |

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

#### Version 1.10.3 (10/29/2014)

* Global:
  * Fix clipboard button color
  * Revert removing `<a>` style
  * Try a flat header
  * Add slight box-shadow to selected input elements
* Notifications: Fix filter colors
* New issue: make form background colors consistent. Fixes [issue #190](https://github.com/StylishThemes/GitHub-Dark/issues/190).
* Commits: fix bottom border on commit-groups
* Gist: fix background on gist file.
* Side navigation, update styling. Fixes [issue #191](https://github.com/StylishThemes/GitHub-Dark/issues/191).

#### Version 1.10.2 (10/25/2014)

* Repo view: remove breadcrumb background
* Global: Change button hovers to grey, fix mute icons
* Issues: Fix pagination buttons
* Pull requests: Fix repo color in title
* Commit: Improve browse button
* Commit log: Improve outlined buttons a lot

#### Version 1.10.1 (10/16/2014)

* Loading icon:
  * Optimized svg, removed white spaces updated encoding.
  * Improved path symmetry.
  * See [issue #166](https://github.com/StylishThemes/GitHub-Dark/issues/166).
* Fixed progress barf
* Commits: Remove inline comment border
* Base color: change `background` to `background-color` to correctly minify the css ([ref](https://github.com/jakubpawlowicz/clean-css/issues/369))
* User page: Restore stat count color
* Issue search: Various fixes.
