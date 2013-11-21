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

 [ ![before screenshot](https://raw.github.com/Mottie/Github-Dark/master/images/before_th.png) ](https://raw.github.com/Mottie/Github-Dark/master/images/before.png)
 [ ![red theme](https://raw.github.com/Mottie/Github-Dark/master/images/after_red_th.png) ](https://raw.github.com/Mottie/Github-Dark/master/images/after_red.png)
 [ ![blue theme](https://raw.github.com/Mottie/Github-Dark/master/images/after_blue_th.png) ](https://raw.github.com/Mottie/Github-Dark/master/images/after_blue.png)
 
### Contributions

Thanks to all that have contributed!

* [silverwind](http://github.com/silverwind)
* [mihawk90](http://github.com/mihawk90)
* [aalvarado](http://github.com/aalvarado)
* [ddavison](http://github.com/ddavison)
* and [others](https://github.com/Mottie/Github-Dark/graphs/contributors)!

### **Changelog**

See the [full change log here](https://github.com/Mottie/Github-Dark/wiki)

#### Version 1.6.1 (11/20/2013)

* Fix Github Dark theme file location
* Forgot to mention in the last update, all un-minified css files moved to the src folder within the themes folder.

#### Version 1.6.0 (11/20/2013)
* Tag page: Fix hover to include the icon
* Settings menu
  * Various improvements
  * Fix delete button for emails
* Slightly brighten markdown &amp; file backgrounds &amp; fix borders
* Code
  * Slightly darken the inline code borders
  * Improve line number borders
* Issues
  * Various improvements to issue discussions
  * Creation box - fix white border
  * Header - Tighten the bottom border to 1px
  * Fix merge pull request button. Fixes [issue #69](https://github.com/Mottie/Github-Dark/issues/69) dude!
* Fix milestone background
* User page:
  * Darken a few borders on the user-page &amp; remove empty lines
  * Set all borders darker &amp; made boxes slightly darker
* Commits
  * Main page - add border to header; fix browser button
  * Header - allow border radius
  * Log - fix browse button
  * Log - fix border-radii &amp; borders
* Gist
  * Style the secret gist label
  * Fix gist diff padding &amp; revision heading
  * Fix gist boxes background, makde bold text slightly darker
* Add more themes &amp; updated demo
  * Desert
  * Freya
  * Inkpot
  * Mustang
  * No Quarter
  * Peaksea
  * Railscasts
  * Rdark

#### Version 1.5.6 (11/20/2013)

* Search issues: Add missing `:before` selector for octicons.
* Fix Private repo label

#### Version 1.5.5 (11/20/2013)

* Fix readme width, match repo summary color to other headers
* Wiki: fix clone URL button (hover doesn't work since it's flash)
* Add better solarized dark code screenshot.
* Search issues: Restore open/close octicon color

#### Version 1.5.4 (11/18/2013)

* Added solarized dark screen shot.
* Fix selection menu highlighted text.

#### Version 1.5.3 (11/17/2013)

* Removed default truncate styling
* Added new screenshots!
* More panels now match the color scheme

#### Version 1.5.2 (11/17/2013)

* Lots of updates, summarizing it as:
  * Fix button hover states
  * Octicon color corrections
  * Gist page updates
  * Darken text &amp; some gradients, including alerts &amp; activity
  * Notification indicator changes
  * Remove 100% max-width from truncated text. Fixes #63.

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
