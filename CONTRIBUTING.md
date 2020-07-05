# Contributing to GitHub-Dark

1. [Getting Involved](#getting-involved)
2. [How To Report style issues](#how-to-report-style-issues)
3. [Core Style Guide](#github-dark-style-guide)
4. [Getting Started](#getting-started)

## Getting Involved

There are a number of ways to get involved with the development of this GitHub Dark theme for Stylish. Even if you've never contributed to an Open Source project before, we're always looking for help identifying missing styles or other issues.

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

* Try to wrap lines at around 80 characters. If at all possible, use "grunt clean" to do the wrapping for you.
* This style does not have a size limit, but:
  * Don't add any image URI's to the CSS; instead add the image into the `/images` directory; then point to using the following URL: `http://stylishthemes.github.io/Github-Dark/images/`{my-image.png}.
  * If possible, reduce any added selectors. Remember that Stylish requires an `!important` flag to override default styling, so a selector starting from the body isn't always necessary.
  * Don't add any inline comments. If you want to make a comment, add it as a note in the commit message.
  * If your CSS definition already exists within the style, do not add it again! Add your selector to the existing definition.
* Insert any new CSS selectors in any available slot before the style definition, or on a new line as needed.
* If you want to add a new userstyle variable, please open an issue and discuss it with us first.
* Don't include version bumps with your contribution, all releases are handled internally.
* If your PR fixes an open issue or replaces another PR, include fixes/closes #issue-nr in your commit message title. [Read more on this](https://help.github.com/en/articles/closing-issues-using-keywords).


## Getting Started

* [Download](https://github.com/StylishThemes/GitHub-Dark/archive/master.zip), [fork](https://github.com/StylishThemes/GitHub-Dark/fork) or clone this repository.
* Use [node.js](http://nodejs.org/) to run `npm install`.
* Make any changes to the `github-dark.css` file and save.

### Build & test

* Create or edit your `build.json` file to include any customizations to the style, see the [build wiki page](https://github.com/StylishThemes/GitHub-Dark/wiki/Build) for more details.
* Run `grunt` to create your custom theme.
* Copy & paste the CSS from the newly created `github-dark-{theme}-{color}.build.css` file into the Stylus editor to test your changes.
* Once you are satisfied with the changes, run `grunt clean` to reindent &amp; clean up the CSS.
* Now you can push the changes of the `github-dark.css` file to your fork and submit a pull request.
* If you haven't already contributed, then also run `npx grunt authors` to add your name to our list of contributors :smile:
* And thanks again for contributing!
