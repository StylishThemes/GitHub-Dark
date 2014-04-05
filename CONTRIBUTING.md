# Contributing to GitHub-Dark

1. [Getting Involved](#-getting-involved)
2. [How To Report style issues](#-how-to-report-style-issues)
3. [Core Style Guide](#-github-dark-style-guide)

## Getting Involved

There are a number of ways to get involved with the development of this GitHub Dark theme for Stylish. Even if you've never contributed to an Open Source project before, we're always looking for help identifying missing styles or other issues.

## How to Report Style issues

### I don't know CSS
If you don't know CSS very well and have found a missing style, please include as much as possible of following information when opening an issue:

* Screenshot of the problem; include the element(s) in the console if at all possible
  * To select an element, target it with your mouse then right-click and choose "Inspect Element"
  * Please include both the HTML view and the element with the problem in the screenshot (see [issue #119](https://github.com/StylishThemes/GitHub-Dark/issues/119) for an example)
* A URL to the page (if public).

### I rock at CSS & GitHub!
* Follow the style guide below
* Make any needed changes, then send us a pull request
* Please include a url to the page (if public)

## GitHub Dark Style Guide

* Limit to the [K&R Style](http://en.wikipedia.org/wiki/1_true_brace_style#K.26R_style), and **2 SPACE INDENTATION** (no tabs, and not more, and not less than 2 spaces).

  * K&R Example:
    ```css
    element[attr='value'] {
    ··property: value;
    }
    ```

  * **Not Allman**
    ```css
    element[property='value']
    {
    ····property: value;
    ?property: value;
    }
    ```

  * Strict space between the `selector` and the `{`:
    ```css
    /* good */
    element[attr='value'] { }

    /* bad */
    element[attr='value']{ }
    ```

* This is not strictly enforced, but try to wrap lines at around 120 characters.
* This style has a size limit:
  * I'm not sure if it is [64kb](https://github.com/JasonBarnabe/stylish/wiki/Embedding-images-in-styles) (which I think we've already passed), or [100,000 bytes](http://userstyles.org/help/coding).
  * So don't add any image URI's to the css; instead add the image into the `/images` directory; then point to using the following url: `http://stylishthemes.github.io/Github-Dark/images/`{my-image.png}.
  * If possible, reduce any added selectors. Remember that Stylish requires an `!important` flag to override default styling, so a selector starting from the body isn't always necessary.
  * Don't add any inline comments. If you want to make a comment, add it as a note in the commit.
  * If your css definition already exists within the style, do not add it again! Add your selector to the existing definition.
* Insert any new css selectors in any available slot before the style definition, or on a new line as needed.
* If you want to add a new userstyle variable, please open an issue and discuss it with us first.