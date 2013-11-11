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

### **Changelog**

See the [full change log here](https://github.com/Mottie/Github-Dark/wiki)

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

#### Version 1.4.0 (11/1/2013)

* Fix overly wide SVG graph (this seems to be a GitHub bug)
* Restore header logo hover effect
* Fix Gist logout button
* Fix commit SHA font size and background
* Improve SHA in commits and consolidate a few styles
* Renamed "pygments themes" directory to just "themes".
* Moved namespace variables inside of the wrapper as Chrome was applying the namespace to every page.
* Added more pygment (syntax highlighting) themes:
  * Native-mod renamed to Github-dark
  * slate
  * solarized-dark (unminified &amp; minified versions are slightly different)
  * vim
  * wombat
  * zenburn
* Added a [themes demo](http://mottie.github.io/Github-Dark/):
  * Linked to the userstyles.org site to allow the user to visualize the syntax highlighting theme before choosing one.
  * The demo and the userstyles.org themes only include the minified versions of the themes.

#### Version 1.3.18 (10/30/2013)

* User page: improve coloring to more closely match GitHubs original style
* Contributors page: SVG Graph styling
