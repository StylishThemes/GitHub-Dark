## Github Dark theme for the Stylish Addon ([Firefox](https://addons.mozilla.org/en-US/firefox/addon/2108/) and [Chrome](https://chrome.google.com/extensions/detail/fjnbnpbmkenffdnngjfgmeleoegfcffe)).

Hosted at [userstyles.org](http://userstyles.org/styles/37035)

Use [this demo](http://mottie.github.io/Github-Dark/) to visualize the different syntax highlighting themes
* Github-Dark (modified native theme)
* Fruity
* Monokai
* Native
* Slate
* Solarized Dark
* Vim
* Wombat
* Zenburn

### Before & After

 [ ![before screenshot](http://mottie.github.com/Github-Dark/images/before_th.jpg) ](http://mottie.github.com/Github-Dark/images/before.jpg)
 [ ![after screenshot](http://mottie.github.com/Github-Dark/images/after_th.jpg) ](http://mottie.github.com/Github-Dark/images/after.jpg)

### Contributions

Thanks to all that have [contributed](https://github.com/Mottie/Github-Dark/graphs/contributors)!

* silverwind
* mihawk90
* aalvarado
* ddavison
* and others!

### **Changelog**

See the [full change log here](https://github.com/Mottie/Github-Dark/wiki)

#### Version 1.4.5 (11/14/2013)

* Thanks silverwind for all these updates!
* Github Dark theme: Fix error background color
* Fix padding in markdown inline code tags
* Page header: Improve summary stats
* Contributions calendar
  * Improve coloring alot!
  * Style the legend too
  * Fix other minor issues
  * Fix a few borders & brighten up the calendar a bit
* Minibutton
  * Fix minibutton text color
  * Shade slightly darker
* Following page: Fix overflow and borders
* Strong text is now white
* Timeline dots: fix border
* Tages page: various fixes
* Merged in styling for private repos. Thanks [ddavison]()
* Removed `pygments-github-dark.min.css` file from themes folder as it is already contained within `github-dark.css`. No need for duplicates.

#### Version 1.4.4 (11/11/2013)

* Commit log: Various improvements
* Commit page: Fix browse button
* Popup: Choose fork repo destination (when part of an organization)
* Popup: Delete repo alerts
* Notice: flash notice (success message after deleting repo)

#### Version 1.4.3 (11/5/2013)

* Modified all themes to include `pre` tags within the highlight class to target gists and code in issues.

#### Version 1.4.2 (11/5/2013)

* Fixed gist tab color.
* Fixed gist title color.
* Various improvements to graphs (graphs page)
  * Note: GitHub uses rendered grey-on-white images for the graph previews here,
    and the best way to handle them would probably be filter: invert, which isn't supported
    on Firefox yet, so we just reduce the opacity (and contrast) for now.
  * See [issue #53](https://github.com/Mottie/Github-Dark/issues/53) for the discussion.
* Update default syntax highlight, improve box headers.
* Tweak borders, fix section link colors.
* Commit page:
  * Restore borders.
  * Fix vertical scrolling.
* Header: Restore the slight border.
* Added more code examples to the [syntax highlighting demo page](http://mottie.github.io/Github-Dark/).
* Removed unnecessary text truncation
  * See [this list of long file names](https://github.com/jquery/api.jquerymobile.com/tree/master/entries) and commit descriptions.
  * The commit descriptions are already truncated, so even after removing the max width of the content, the text is still cut off.
  * Restored truncation in the News Feed.

#### Version 1.4.1 (11/1/2013)

* userstyles.org does not allow having namespace variables inside of the wrapper
* Added permanent demo link to readme.
