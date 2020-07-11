# Contributing to GitHub-Dark

1. [Getting Involved](#getting-involved)
2. [How To Report style issues](#how-to-report-style-issues)
3. [Core Style Guide](#github-dark-style-guide)
4. [Getting Started](#getting-started)

## Getting Involved

There are a number of ways to get involved with the development of this GitHub Dark theme for Stylus. Even if you've never contributed to an Open Source project before, we're always looking for help identifying missing styles or other issues.

Feel free to help us out in any capacity, StylishThemes is always looking for help with our busy schedule. Open an issue to discuss any related contribution minutia or just to clear up any doubts you may have.

## How to Report Style issues

### I don't know CSS
If you don't know CSS very well and have found a missing style, please include as much as possible of the following information when opening an issue:

* Screenshot of the problem; include the element(s) in the console if at all possible
  * To select an element, target it with your mouse then right-click and choose "Inspect Element"
  * Please include both the HTML view and the element with the problem in the screenshot (see [issue #119](https://github.com/StylishThemes/GitHub-Dark/issues/119) for an example)
* A URL to the page (if public).

### I rock at CSS & GitHub!
* Follow the style guide below
* Make any needed changes, then send us a pull request
* Please include a URL to the page (if public)

## GitHub Dark Style Guide

* Use the provided `.editorconfig` file with your code editor. Don't know what that is? Then check out http://editorconfig.org/.
* Limit to the [K&R (KNF variation style)](https://en.wikipedia.org/wiki/Indentation_style#Variant:_BSD_KNF), and **2 SPACE INDENTATION** (no tabs, and not more, and not less than 2 spaces).

  * K&R - KNF Variation Example:
    ```css
    element[attr='value'] {
    ··property: value;
    }
    ```

  * **Not Allman**
    ```css
    element[property='value']
    {
    ··property: value;
    }
    ```

  * Strict space between the `selector` and the `{`:
    ```css
    /* good */
    element[attr='value'] { }

    /* bad */
    element[attr='value']{ }
    ```

  * 2 Space indentation
    ```css
    /* good */
    ··property: value;

    /* bad */
    ····property: value;
    ----property: value;
    ·property: value;
    ```
⚠️ Any new additions should be mapped using the built-in generator before adding any manual rules or selectors, please study the [rules.js](./src/rules.js), if you have any doubts or questions please feel free to open an issue to to start a releated discussion.

Do not manually edit generated areas, as those additions are lost on running `make build` developemnt script.

Don't include version bumps with your contribution, all releases are handled internally.

## Tips

* Try to wrap lines at around 250 characters. If at all possible, use "make clean" to do the wrapping for you.
* Don't add any image URI's to the CSS; instead add the image into the `/images` directory; then point to using the following URL: `http://stylishthemes.github.io/Github-Dark/images/`{my-image.png}.
  * If possible, reduce any added selectors. Remember that Stylus may need an `!important` flag to override default styling, so a selector starting with body isn't always necessary, Use !important only if necessary.
  * Do add inline comments for manual additions.
    Also add comment as a note in the commit message body.
  * If your CSS definition already exists within the style, do not add it again! Add your selector to the existing rule block.
* Insert any new manual CSS selectors in any available slot before the style definition, or on a new line as needed.
* If you want to add a new userstyle variable, please open an issue and discuss it with us first.
* If your PR fixes an open issue or replaces another PR, include fixes/closes #issue-nr in your commit message title. [Read more on this](https://help.github.com/en/articles/closing-issues-using-keywords).


## Getting Started

* [Download](https://github.com/StylishThemes/GitHub-Dark/archive/master.zip), [fork](https://github.com/StylishThemes/GitHub-Dark/fork) or clone this repository.

First, make sure you have these installed:

- [`node`](https://nodejs.org): version 12 or greater
- [`yarn`](https://classic.yarnpkg.com/en/docs/install/): version 1
- `make`: comes with UNIX-like OS, on Windows you can use [this](https://stackoverflow.com/a/54086635/808699)

### Edit, Build & test

* **Generator entries**, edit [rules.js](./src/rules.js)
* **Manual entries,** edit files in [src](./src) file to include any customizations to the style.
* Run `make` to build and install the new style.
* Now you can push the changes to your fork and submit a pull request.
* If you haven't already contributed, then also run `make authors` to add your name to our list of contributors :smile:
* And thanks again for contributing!
