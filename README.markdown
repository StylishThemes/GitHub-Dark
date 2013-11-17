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

Thanks to all that have contributed!

* [silverwind](http://github.com/silverwind)
* [mihawk90](http://github.com/mihawk90)
* [aalvarado](http://github.com/aalvarado)
* [ddavison](http://github.com/ddavison)
* and [others](https://github.com/Mottie/Github-Dark/graphs/contributors)!

### **Changelog**

See the [full change log here](https://github.com/Mottie/Github-Dark/wiki)

#### Version 1.5.1 (11/17/2013)

* Added base color to all octicon &amp; links - still need to revert some special styles
  * Buttons, in general, have white octicons & base color background while hovering
  * New repo octicon returned to white (green buttons)
  * Select menu (e.g. switching time span on https://github.com/explore) check mark octicons styled appropriately.
  * Select menu close icon now white (needs hover color)
  * Feature tag on the above explore page now has greyed octicon
  * Header links/icons now white, base color on hover
* Notification indication now matches base-color

#### Version 1.5 (11/15/2013)

* Add style to proposed tags
* Add links to contributor names
* Added a new base-color variable
  * This allows setting a base-link color to change the overall look of this style
  * The color also applies to some selector backgrounds.
  * Sadly, userstyles does not yet allow use of LESS or SCSS, so instead of adding a bunch of offset colors, I just left it as one color setting.
* Removed gradient styling from red, green, yellow and blue panels/tags.
* Light blue panels/buttons are now incorporated into the base-color variable.
* A bunch of other tweaks to the style that I didn't keep track of, sorry.

#### Version 1.4.7 (11/14/2013)

* Contributions calendar: reverse color scheme.
* Removed diff specific syntax highlighting from the solarized dark min theme.

#### Version 1.4.6 (11/14/2013)

* Add missing important flag to zenburn theme.
* Contributions calendar:
  * Add missing selectors specific to Chrome (webkit?) browsers.
  * Reverse contributions color scheme.
* Add tables to highlight themes; See commit pages.

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
