/* global module, console */
/* jshint esnext:true, unused:true */
module.exports = function(grunt) {
  "use strict";

  let config;
  const defaults = require("./defaults.json");
  const pkg = require("./package.json");
  defaults.webkit = false;
  grunt.file.defaultEncoding = "utf8";

  try {
    config = Object.assign({}, defaults, grunt.file.readJSON("build.json"));
  } catch (err) {
    console.info("build.json not found - using defaults");
    config = defaults;
  }

  function getTheme(name) {
    // fallback to twilight theme if name is undefined
    return (name || "twilight").toLowerCase().replace(/\s+/g, "-");
  }

  function loadTheme(name, folder) {
    let data;
    const theme = getTheme(name);
    if (grunt.file.exists(`themes/${folder}${theme}.min.css`)) {
      data = `<%= grunt.file.read("themes/${folder}${theme}.min.css") %>`;
    } else {
      // fallback to twilight if file doesn't exist
      data = `<%= grunt.file.read("themes/${folder}twilight.min.css") %>`;
    }
    return data;
  }

  function processJupyterFiles() {
    const files = grunt.file.expand({
      filter: "isFile",
      cwd: "themes/jupyter"
    }, ["*"]);
    files.forEach(file => {
      const theme = grunt.file.read(`themes/jupyter/${file}`);
      grunt.file.write(`themes/jupyter/${file}`, replaceCSSMatches(theme));
    });
  }

  // :any() has been deprecated, and :matches() is not fully supported
  // this is a simple replace method.. it'll handle `:matches .selector`, but
  // not `selector :matches()`
  function replaceCSSMatches(theme) {
    return theme.replace(/:matches\(([^)]+)\)\s([^,{]+)(,|{)/gm, (_, matches, selector, separator) => {
      let result = "";
      const m = matches.split(/\s*,\s*/);
      const last = m.length - 1;
      m.forEach((match, index) => {
        result += `${match} ${selector.trim()}${index >= last && separator === "{" ? " {" : ", "}`;
      });
      return result;
    });
  }

  function getVersion(level) {
    const semver = require("semver");
    const version = pkg.version;
    return semver.inc(version, level);
  }

  function getDate() {
    return (new Date()).toISOString().substring(0, 10);
  }

  // modified from http://stackoverflow.com/a/5624139/145346
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ].join(", ") : "";
  }

  // ** set up build options **
  config.sourceFile = "github-dark.css";

  // get themes
  config.themeMain = loadTheme(config.theme, "github/");
  config.themeCM = loadTheme(config.themeCM, "codemirror/");
  config.themeJP = loadTheme(config.themeJP, "jupyter/");

  // build file name
  config.buildFile = `github-dark-${getTheme(config.theme)}-` +
    `${config.color.replace(/[^\d\w]/g, "")}.build.min.css`;

  // background options
  config.image = /^url/.test(config.image) ?
    config.image :
    `url("${config.image}")`;

  config.bgOptions = config.tiled ? `
    background-repeat: repeat !important;
    background-size: auto !important;
    background-position: left top !important;
    ` :
    // fit background
    `
    background-repeat: no-repeat !important;
    background-size: cover !important;
    background-position: center top !important;
    `;

  config.bgAttachment = config.attach.toLowerCase() === "scroll" ?
    "scroll" :
    "fixed";

  config.codeWrapCss = config.codeWrap ? `
      /* GitHub: Enable wrapping of long code lines */
      body:not(.nowrap) .blob-code-inner,
      body:not(.nowrap) .markdown-body pre > code,
      body:not(.nowrap) .markdown-body .highlight > pre {
        white-space: pre-wrap !important;
        word-break: break-all !important;
        overflow-wrap: break-word !important;
        display: block !important;
      }
      body:not(.nowrap) td.blob-code-inner {
        display: table-cell !important;
      }
    ` : "";

  // get @-moz prefix
  const file = grunt.file.read("github-dark.css")
    .match(/(@-moz-document regexp\((.*)+\) \{(\n|\r)+)/);
  config.prefix = file && file.length ? file[1].replace(/^\s+|\s+$/g, "") : "";

  // custom build
  config.replacements = [{
    pattern: /@-moz-document regexp\((.*)\) \{(\n|\r)+/,
    replacement: ""
  }, {
    pattern: /\/\*\[\[bg-choice\]\]\*\/ url\(.*\)/,
    replacement: config.image
  }, {
    pattern: "/*[[bg-options]]*/",
    replacement: config.bgOptions
  }, {
    pattern: "/*[[bg-attachment]]*/ fixed",
    replacement: config.bgAttachment
  }, {
    pattern: /\/\*\[\[base-color\]\]\*\/ #\w{3,6}/g,
    replacement: config.color
  }, {
    pattern: /\/\*\[\[base-color-rgb\]\]\*\//g,
    replacement: hexToRgb(config.color)
  }, {
    pattern: "/*[[font-choice]]*/",
    replacement: config.font
  }, {
    pattern: "/*[[code-wrap]]*/",
    replacement: config.codeWrapCss
  }, {
    pattern: /\/\*\[\[tab-size\]\]\*\/ \d+/g,
    replacement: config.tab
  }, {
    // remove default syntax themes AND closing bracket
    pattern: /\s+\/\* grunt build - remove to end of file(.*(\n|\r))+\}$/m,
    replacement: ""
  }, {
    // add selected theme
    pattern: "/*[[syntax-theme]]*/",
    replacement: config.themeMain
  }, {
    // add Codemirror theme
    pattern: "/*[[syntax-codemirror]]*/",
    replacement: config.themeCM
  }, {
    // add selected theme
    pattern: "/*[[syntax-jupyter]]*/",
    replacement: config.themeJP
  }];

  // userstyles.org - remove defaults & leave placeholders
  config.replacements_user = [{
    pattern: /@-moz-document regexp\((.*)\) \{(\n|\r)+/,
    replacement: ""
  }, {
    pattern: /\/\*\[\[bg-choice\]\]\*\/ url\(.*\)/,
    replacement: "/*[[bg-choice]]*/"
  }, {
    pattern: "/*[[bg-attachment]]*/ fixed",
    replacement: "/*[[bg-attachment]]*/"
  }, {
    pattern: /\/\*\[\[base-color\]\]\*\/ #\w{3,6}/g,
    replacement: "/*[[base-color]]*/"
  }, {
    pattern: /\/\*\[\[tab-size\]\]\*\/ \d+/g,
    replacement: "/*[[tab-size]]*/"
  }, {
    // remove default syntax theme AND closing bracket
    pattern: /\s+\/\* grunt build - remove to end of file(.*(\n|\r))+\}$/m,
    replacement: ""
  }];

  grunt.initConfig({
    pkg, config,
    "string-replace": {
      inline: {
        files: {"<%= config.buildFile %>" : "<%= config.sourceFile %>"},
        options: {replacements: "<%= config.replacements %>"}
      },
      // Tweak Perfectionist results
      afterPerfectionist: {
        files: {"<%= config.sourceFile %>" : "<%= config.sourceFile %>"},
        options: {
          replacements: [
            {pattern: /\{\/\*!/g, replacement: "{\n /*!"},
            {pattern: /\/\* /g, replacement: "\n  /* "},
            {pattern: /(\s+)?\n(\s+)?\n/gm, replacement: "\n"},
            {pattern: / {2}}\/\*/gm, replacement: "  }\n  /*"},
            {pattern: /,\s+\n/gm, replacement: ",\n"},
            // fix unicode-range block
            {pattern: /\n\s{23}/gm, replacement: ""},
            {
              pattern: /(-025A9,|-02662,)/gim,
              replacement: "$&\n                   "
            },
            {pattern: /\/\*\[\[code-wrap/, replacement: "/*[[code-wrap"}
          ]
        }
      },
      newVersion: {
        files: {
          "github-dark.css": "github-dark.css",
          "github-dark-userstyle.build.css": "github-dark-userstyle.build.css"
        },
        options: {
          replacements: [{
            pattern: /v[0-9.]+ \(.+\)/,
            replacement: "v<%= config.version %> (" + getDate() + ")"
          }],
        }
      }
    },
    clean: {
      cssmins: {
        src: [
          // don't clean combined theme files (older method) until
          // we can be assured that everyone has updated GitHub-Dark-Script
          // "themes/*.min.css",
          "themes/**/*.min.css"
        ]
      }
    },
    exec: {
      add: "git add github-dark.css github-dark.user.css",
      authors: "bash tools/authors.sh",
      eslint: "npx eslint --quiet --color *.js tools/*.js",
      generate: "node tools/generate",
      imagemin: "bash tools/imagemin.sh",
      patch: "npx ver patch",
      minor: "npx ver minor",
      major: "npx ver major",
      perfectionist: "npx perfectionist github-dark.css github-dark.css --indentSize 2 --maxAtRuleLength 250",
      stylelint: "npx stylelint github-dark.css themes/**/*.css",
      update: "npx updates -cu && npm install",
      usercss: "node tools/build-usercss",
    },
    cssmin: {
      minify: {
        files: {"<%= config.buildFile %>" : "<%= config.buildFile %>"},
        options: {
          rebase: false,
          level: {
            1: {
              specialComments : "all",
              removeEmpty: false,
            },
            2: {
              all: false,
              mergeMedia: true,
              removeDuplicateMediaBlocks: true,
              removeDuplicateRules: true
            },
          },
        }
      },
      codemirror: {
        files: [{
          expand : true,
          cwd : "themes/src/codemirror/",
          src : "*.css",
          dest : "themes/codemirror",
          ext : ".min.css"
        }],
        options: {
          level: {
            2: {
              all: true,
              specialComments: "all"
            }
          }
        }
      },
      github: {
        files: [{
          expand : true,
          cwd : "themes/src/github/",
          src : "*.css",
          dest : "themes/github",
          ext : ".min.css"
        }],
        options: {
          // Don't use level 2; background *must* be the first entry; see #599
          keepSpecialComments: "*",
          advanced: false
        }
      },
      jupyter: {
        files: [{
          expand : true,
          cwd : "themes/src/jupyter/",
          src : "*.css",
          dest : "themes/jupyter",
          ext : ".min.css"
        }],
        options: {
          level: {
            2: {
              all: true,
              specialComments: "all"
            }
          }
        }
      }
    },
    wrap: {
      mozrule: {
        files: {"<%= config.buildFile %>" : "<%= config.buildFile %>"},
        options: {
          wrapper: ["<%= config.prefix %>", "}\n"]
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-string-replace");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-wrap");
  grunt.loadNpmTasks("grunt-exec");

  // build custom GitHub-Dark style using build.json settings
  grunt.registerTask("default", "Building custom style", () => {
    config.buildFile = config.buildFile.replace(".min.css", ".css");
    grunt.task.run(["string-replace:inline"]);
    if (!(config.chrome || config.webkit)) {
      grunt.task.run(["wrap"]);
    }
  });

  // build custom minified GitHub-Dark style
  grunt.registerTask("min", "Building custom minified style", () => {
    grunt.task.run(["string-replace:inline", "cssmin:minify"]);
    if (!(config.chrome || config.webkit)) {
      grunt.task.run(["wrap"]);
    }
  });

  // build usercss
  grunt.registerTask("usercss", "building usercss file", () => {
    config.buildFile = "github-dark-userstyle.build.css";
    config.replacements = config.replacements_user;
    grunt.task.run([
      "string-replace:inline",
      "wrap",
      "exec:usercss"
    ]);
  });

  // build custom minified GitHub-Dark style
  grunt.registerTask("themes", "Rebuild minified theme files", () => {
    grunt.task.run([
      "clean:cssmins",
      "cssmin:codemirror",
      "cssmin:github",
      "cssmin:jupyter",
      "jupyter"
    ]);
  });

  grunt.registerTask("jupyter", "Replacing :matches() in Jupyter files", () => {
    processJupyterFiles();
  });

  grunt.registerTask("clean", "Perfectionist cleanup", () => {
    grunt.task.run([
      "exec:perfectionist",
      "string-replace:afterPerfectionist"
    ]);
  });

  // lint github-dark.css and themes for errors
  grunt.registerTask("lint", "Lint CSS and JS scripts for errors", () => {
    grunt.task.run([
      "exec:eslint",
      "exec:stylelint"
    ]);
  });

  // regenerate AUTHORS based on commits
  grunt.registerTask("authors", "Regenerate AUTHORS", () => {
    grunt.task.run(["exec:authors"]);
  });

  // minify all PNG and SVG images
  grunt.registerTask("imagemin", "Minify all PNG and SVG images", () => {
    grunt.task.run(["exec:imagemin"]);
  });

  // Auto-generate styles based on GitHub's CSS
  grunt.registerTask("generate", "Auto-generate styles based on GitHub's CSS", () => {
    grunt.task.run(["exec:generate", "clean"]);
  });

  // Auto-generate styles based on GitHub's CSS
  grunt.registerTask("update", "Update dependencies", () => {
    grunt.task.run(["exec:update"]);
  });

  // version bump tasks
  grunt.registerTask("patch", "Bump patch version", () => {
    config.version = getVersion("patch");
    grunt.task.run([
      "lint",
      "string-replace:newVersion",
      "usercss",
      "exec:add",
      "exec:patch"
    ]);
  });
  grunt.registerTask("minor", "Bump minor version", () => {
    config.version = getVersion("minor");
    grunt.task.run([
      "lint",
      "string-replace:newVersion",
      "usercss",
      "exec:add",
      "exec:minor"
    ]);
  });
  grunt.registerTask("major", "Bump major version", () => {
    config.version = getVersion("major");
    grunt.task.run([
      "lint",
      "string-replace:newVersion",
      "usercss",
      "exec:add",
      "exec:major"
    ]);
  });
};
