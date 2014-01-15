## Github Dark theme for Stylish
- Install from [userstyles.org](http://userstyles.org/styles/37035) or [manually](https://github.com/StylishThemes/Github-Dark/blob/master/github-dark.css)
- Stylish is available for [Firefox](https://addons.mozilla.org/en-US/firefox/addon/2108/) and [Chrome](https://chrome.google.com/extensions/detail/fjnbnpbmkenffdnngjfgmeleoegfcffe).
- Use [this demo](http://StylishThemes.github.io/Github-Dark/) to visualize the different syntax highlighting themes

### Preview
![Github Dark](http://i.imgur.com/Tdk2UCM.png)

### Available color schemes
<table>
  <tr><td>3024 Dark</td>      <td>Desert</td>                <td>Freya</td>                 <td>Fruity</td>                  <td>Github-Dark</td></tr>
  <tr><td>Inkpot</td>         <td>Monokai</td>               <td>Mustang</td>               <td>Native</td>                  <td>No Quarter</td></tr>
  <tr><td>Peaksea</td>        <td>Railscasts</td>            <td>Rdark</td>                 <td>Slate</td>                   <td>Solarized Dark</td></tr>
  <tr><td>Tomorrow Night</td> <td>Tomorrow Night Bright</td> <td>Tomorrow Night Bright</td> <td>Tomorrow Night Eighties</td> <td>Twilight</td></tr>
  <tr><td>Vim</td>            <td>Wombat</td>                <td>Zenburn</td>               <td></td>                        <td></td></tr>
</table>

### Contributions

Thanks to all that have contributed!

* [mottie](http://github.com/mottie)
* [silverwind](http://github.com/silverwind)
* [mihawk90](http://github.com/mihawk90)
* [aalvarado](http://github.com/aalvarado)
* [ddavison](http://github.com/ddavison)
* and [others](https://github.com/StylishThemes/Github-Dark/graphs/contributors)!

### **Changelog**

See the [full change log here](https://github.com/StylishThemes/Github-Dark/wiki)

#### Version 1.7.9 (1/15/2014)

* Checkboxes &amp; radios
  * Style checkboxes and radios, and add the applied svg's to the project
  * Add radio button checked background
  * Include indeterminate checkbox and radio states in styling
* Readme tweaks - now using a single preview image
* Fix gist footer
* Removed
  * Remove unneeded whitespace
  * Remove graph hover hack as Github fixed it on their side
  * Remove header text-shadow
  * Remove box shadow on vertical separators in the file headers
  * Remove a few unneeded form styles
  * Remove bottom border from modal menus
* Slightly darken the command-bar border
* Improve contributor boxes on the contributor graph page
* Narrow down the selector for contributor boxes
* Aligned code blockes. Fixes [issue #90](https://github.com/StylishThemes/Github-Dark/issues/90)

#### Version 1.7.8 (1/13/2014)

* Remove avatar background; to see background image
* Pull request (issues) - fix clean merge arrow color.
* Add padding instead of margin to code view. Fixes [issue #89](https://github.com/StylishThemes/Github-Dark/issues/89)
* Fix minibutton text color

#### Version 1.7.7 (1/10/2014)

* Remove side menu backgroud to allow image to show through
* Another fix to graph colors
* Pull request: fix dirty merge arrow color
* Clean up background image options; reduced to two options:
  * Image type: Fit window size versus Tiled
  * Image attachment: scroll versus fixed

#### Version 1.7.6 (1/9/2014)

* Added background image properties
  * Fixes [issue #88](https://github.com/StylishThemes/Github-Dark/issues/88) to now allow using a tiled background image versus a full background image
  * Background-repeat: repeat or no-repeat
  * Background-size: cover, container, auto or 50% 50%
  * Background-attachment: fixed or scroll

#### Version 1.7.5 (1/9/2014)

* "New" dropdown styling
  * fix dropdown arrows
  * remove underline from `+` in header
* Status page
  * Hide loading icon image, add dark background image
  * Fix tab loading style. See [issue #87](https://github.com/StylishThemes/Github-Dark/issues/87)
  * Graph tweaks. Fixes [issue #87](https://github.com/StylishThemes/Github-Dark/issues/87)
  * Style svg tooltips
  * Fix graph preview hover offsets
  * Restore status history colors & repo list border
  * Remove diff text-shadow
  * Tweaks to traffic stats
* Tweaks to inline comments
* Repo sidebar tweaks
* Center octocat on frontpage message boxes
* Fix repo-editing text color
* Fix commit activity graph line color
* Fix markdown base text color
* Fix ellipsis color on truncated text
* Remove text shadow on flash boxes
* Improve merge messages in issues
* Add more background properties.
  * Please note that this doesn't work properly for tiled background images
  * Thanks [Pmmlabs](https://github.com/Pmmlabs)!
* Fix text colors in file boxes & user page
* SSH keys text colors
* Removed background color from
  * Issue milestone meta data
  * status page footer background
  * These changes allow background image to show through
