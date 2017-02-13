/* global module, console */
/* jshint esnext:true, unused:true */
module.exports = function(grunt) {
  'use strict';

  let config, file,
    defaults = {
      'theme'    : 'twilight',
      'themeCM'  : 'twilight',
      'themeJP'  : 'twilight',
      'color'    : '#4183C4',
      'font'     : 'Menlo',
      'image'    : 'url(https://raw.githubusercontent.com/StylishThemes/GitHub-Dark/master/images/backgrounds/bg-tile1.png)',
      'tiled'    : true,
      'codeWrap' : false,
      'attach'   : 'scroll',
      'tab'      : 4,
      'webkit'   : false
    };

  try {
    config = Object.assign({}, defaults, grunt.file.readJSON('build.json'));
  } catch (err) {
    console.info('build.json not found - using defaults');
    config = defaults;
  }

  function getTheme(name) {
    // fallback to twilight theme if name is undefined
    return (name || 'twilight').toLowerCase().replace(/\s+/g, '-');
  }

  function loadTheme(name, folder) {
    let data,
      theme = getTheme(name);
    if (grunt.file.exists(`themes/${folder}${theme}.min.css`)) {
      data = `<%= grunt.file.read("themes/${folder}${theme}.min.css") %>`;
    } else {
      // fallback to twilight if file doesn't exist
      data = `<%= grunt.file.read("themes/${folder}twilight.min.css") %>`;
    }
    return data;
  }

  function getVersion(level) {
    const semver = require('semver'),
      version = require('./package.json').version;
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
    ].join(', ') : '';
  }

  // ** set up build options **
  config.sourceFile = 'github-dark.css';

  // get themes
  config.themeMain = loadTheme(config.theme, "github/");
  config.themeCM = loadTheme(config.themeCM, "codemirror/");
  config.themeJP = loadTheme(config.themeJP, "jupyter/");

  // build file name
  config.buildFile = `github-dark-${getTheme(config.theme)}-` +
    `${config.color.replace(/[^\d\w]/g, '')}.build.min.css`;

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

  config.bgAttachment = config.attach.toLowerCase() === 'scroll' ?
    'scroll' :
    'fixed';

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
    ` : '';

  // get @-moz prefix
  file = grunt.file.read('github-dark.css')
    .match(/(@-moz-document regexp\((.*)+\) \{(\n|\r)+)/);
  config.prefix = file && file.length ? file[1].replace(/^\s+|\s+$/g, '') : '';

  // custom build
  config.replacements = [{
    pattern: /@-moz-document regexp\((.*)\) \{(\n|\r)+/,
    replacement: ''
  }, {
    pattern: /\/\*\[\[bg-choice\]\]\*\/ url\(.*\)/,
    replacement: config.image
  }, {
    pattern: '/*[[bg-options]]*/',
    replacement: config.bgOptions
  }, {
    pattern: '/*[[bg-attachment]]*/ fixed',
    replacement: config.bgAttachment
  }, {
    pattern: /\/\*\[\[base-color\]\]\*\/ #\w{3,6}/g,
    replacement: config.color
  }, {
    pattern: /\/\*\[\[base-color-rgb\]\]\*\//g,
    replacement: hexToRgb(config.color)
  }, {
    pattern: '/*[[font-choice]]*/',
    replacement: config.font
  }, {
    pattern: '/*[[code-wrap]]*/',
    replacement: config.codeWrapCss
  }, {
    pattern: /\/\*\[\[tab-size\]\]\*\/ \d+/g,
    replacement: config.tab
  }, {
    // remove default syntax themes AND closing bracket
    pattern: /\s+\/\* grunt build - remove to end of file(.*(\n|\r))+\}$/m,
    replacement: ''
  }, {
    // add selected theme
    pattern: '/*[[syntax-theme]]*/',
    replacement: config.themeMain
  }, {
    // add Codemirror theme
    pattern: '/*[[syntax-codemirror]]*/',
    replacement: config.themeCM
  }, {
    // add selected theme
    pattern: '/*[[syntax-jupyter]]*/',
    replacement: config.themeJP
  }];

  // userstyles.org - remove defaults & leave placeholders
  config.replacements_user = [{
    pattern: /@-moz-document regexp\((.*)\) \{(\n|\r)+/,
    replacement: ''
  }, {
    pattern: /\/\*\[\[bg-choice\]\]\*\/ url\(.*\)/,
    replacement: '/*[[bg-choice]]*/'
  }, {
    pattern: '/*[[bg-attachment]]*/ fixed',
    replacement: '/*[[bg-attachment]]*/'
  }, {
    pattern: /\/\*\[\[base-color\]\]\*\/ #\w{3,6}/g,
    replacement: '/*[[base-color]]*/'
  }, {
    pattern: /\/\*\[\[tab-size\]\]\*\/ \d+/g,
    replacement: '/*[[tab-size]]*/'
  }, {
    // remove default syntax theme AND closing bracket
    pattern: /\s+\/\* grunt build - remove to end of file(.*(\n|\r))+\}$/m,
    replacement: ''
  }];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: config,

    'string-replace': {
      inline: {
        files: {'<%= config.buildFile %>' : '<%= config.sourceFile %>'},
        options: {replacements: '<%= config.replacements %>'}
      },
      // prevent cssmin from removing the AGENT_SHEET comment for Firefox
      mark: {
        files: {'<%= config.buildFile %>' : '<%= config.buildFile %>'},
        options: {
          replacements: [
            {pattern: /\/\*\[\[/gm, replacement: '/*![['},
            {pattern: '/* AGENT_SHEET */', replacement: '/*! AGENT_SHEET */'}
          ]
        }
      },
      unmark: {
        files: {'<%= config.buildFile %>' : '<%= config.buildFile %>'},
        options: {
          replacements: [
            {pattern: /\/\*\!\[\[/gm, replacement: '/*[['},
            {pattern: '/*! AGENT_SHEET */', replacement: '/* AGENT_SHEET */'}
          ]
        }
      },
      // prevent cssmin from removing userstyles.org placeholders
      fix: {
        files: {'<%= config.buildFile %>' : '<%= config.buildFile %>'},
        options: {
          replacements: [{
            pattern: /\;\:\/\*\[\[/gm,
            replacement: ';/*[['
          }]
        }
      },
      // fix cleancss issue:
      // https://github.com/jakubpawlowicz/clean-css/issues/628
      // *** TODO: remove? ***
      afterCleanCss: {
        files: {'<%= config.buildFile %>' : '<%= config.buildFile %>'},
        options: {
          replacements: [{
            pattern: /__ESCAPED_SOURCE_END_CLEAN_CSS__/g,
            replacement: ''
          }]
        }
      },
      // Tweak Perfectionist results
      afterPerfectionist: {
        files: {'<%= config.sourceFile %>' : '<%= config.sourceFile %>'},
        options: {
          replacements: [
            {pattern: /\{\/\*\!/g, replacement: '{\n /*!'},
            {pattern: /\/\* /g, replacement: '\n  /* '},
            {pattern: /(\s+)?\n(\s+)?\n/gm, replacement: '\n'},
            {pattern: / {2}}\/\*/gm, replacement: '  }\n  /*'},
            {pattern: /,\s+\n/gm, replacement: ',\n'},
            // fix unicode-range block
            {pattern: /\n\s{23}/gm, replacement: ''},
            {
              pattern: /(-025A9,|-02662,)/gim,
              replacement: '$&\n                   '
            }
          ]
        }
      },
      patch: {
        files: {'github-dark.css': 'github-dark.css'},
        options: { replacements: [{
            pattern: /v[0-9\.]+ \(.+\)/,
            replacement: 'v' + getVersion('patch') + ' (' + getDate() + ')'
        }]}
      },
      minor: {
        files: {'github-dark.css': 'github-dark.css'},
        options: { replacements: [{
            pattern: /v[0-9\.]+ \(.+\)/,
            replacement: 'v' + getVersion('minor') + ' (' + getDate() + ')'
        }]}
      },
      major: {
        files: {'github-dark.css': 'github-dark.css'},
        options: { replacements: [{
            pattern: /v[0-9\.]+ \(.+\)/,
            replacement: 'v' + getVersion('major') + ' (' + getDate() + ')'
        }]}
      }
    },
    clean: {
      cssmins: {
        src: [
          // don't clean combined theme files (older method) until
          // we can be assured that everyone has updated GitHub-Dark-Script
          // 'themes/*.min.css',
          'themes/**/*.min.css'
        ]
      }
    },
    exec: {
      stylelint: 'npm run stylelint --silent -- github-dark.css themes/**/*.css --color',
      authors: 'bash tools/authors.sh',
      imagemin: 'bash tools/imagemin.sh',
      perfectionist: 'npm run perfectionist --silent -- github-dark.css github-dark.css --indentSize 2 --maxAtRuleLength 250',
      add: 'git add github-dark.css',
      patch: 'npm version -f patch',
      minor: 'npm version -f minor',
      major: 'npm version -f major'
    },
    cssmin: {
      minify: {
        files: {'<%= config.buildFile %>' : '<%= config.buildFile %>'},
        options: {
          keepSpecialComments: '*',
          advanced: false
        }
      },
      codemirror: {
        files: [{
          expand : true,
          cwd : 'themes/src/codemirror/',
          src : '*.css',
          dest : 'themes/codemirror',
          ext : '.min.css'
        }],
        options: {
          keepSpecialComments: '*',
          advanced: false
        }
      },
      github: {
        files: [{
          expand : true,
          cwd : 'themes/src/github/',
          src : '*.css',
          dest : 'themes/github',
          ext : '.min.css'
        }],
        options: {
          keepSpecialComments: '*',
          advanced: false
        }
      },
      jupyter: {
        files: [{
          expand : true,
          cwd : 'themes/src/jupyter/',
          src : '*.css',
          dest : 'themes/jupyter',
          ext : '.min.css'
        }],
        options: {
          keepSpecialComments: '*',
          advanced: false
        }
      }
    },
    wrap: {
      mozrule: {
        files: {'<%= config.buildFile %>' : '<%= config.buildFile %>'},
        options: {
          wrapper: ['<%= config.prefix %>', '}']
        }
      }
    },
    watch: {
      css: {files: ['github-dark.css']}
    }
  });

  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-wrap');
  grunt.loadNpmTasks('grunt-exec');

  // build custom GitHub-Dark style using build.json settings
  grunt.registerTask('default', 'Building custom style', () => {
    config.buildFile = config.buildFile.replace('.min.css', '.css');
    grunt.task.run(['string-replace:inline']);
    if (!(config.chrome || config.webkit)) {
      grunt.task.run(['wrap']);
    }
  });

  // build custom minified GitHub-Dark style
  grunt.registerTask('minify', 'Building custom minified style', () => {
    grunt.task.run(['string-replace:inline', 'cssmin:minify']);
    if (!(config.chrome || config.webkit)) {
      grunt.task.run(['wrap']);
    }
  });

  // build userstyle for pasting into
  // https://userstyles.org/styles/37035/github-dark
  grunt.registerTask('user', 'building userstyles.org file', () => {
    config.buildFile = 'github-dark-userstyle.build.css';
    config.replacements = config.replacements_user;
    grunt.task.run([
      'string-replace:inline',
      'wrap'
    ]);
  });
  grunt.registerTask('usermin', 'building userstyles.org file', () => {
    config.buildFile = 'github-dark-userstyle.build.css';
    config.replacements = config.replacements_user;
    grunt.task.run([
      'string-replace:inline',
      'string-replace:mark',
      'cssmin:minify',
      'string-replace:afterCleanCss',
      'string-replace:unmark',
      'string-replace:fix',
      'wrap'
    ]);
  });

  // build custom minified GitHub-Dark style
  grunt.registerTask('themes', 'Rebuild minified theme files', () => {
    grunt.task.run([
      'clean:cssmins',
      'cssmin:codemirror',
      'cssmin:github',
      'cssmin:jupyter'
    ]);
  });

  grunt.registerTask('clean', 'Perfectionist cleanup', () => {
    grunt.task.run([
      'exec:stylelint', // check linting first
      'exec:perfectionist',
      'string-replace:afterPerfectionist'
    ]);
  });

  // lint github-dark.css and themes for errors
  grunt.registerTask('lint', 'Lint CSS for style errors', () => {
    grunt.task.run(['exec:stylelint']);
  });

  // regenerate AUTHORS based on commits
  grunt.registerTask('authors', 'Regenerate AUTHORS', () => {
    grunt.task.run(['exec:authors']);
  });

  // minify all PNG and SVG images
  grunt.registerTask('imagemin', 'Minify all PNG and SVG images', () => {
    grunt.task.run(['exec:imagemin']);
  });

  // version bump tasks
  grunt.registerTask('patch', 'Bump patch version', () => {
    grunt.task.run(['string-replace:patch', 'exec:add', 'exec:patch', 'user']);
  });
  grunt.registerTask('minor', 'Bump minor version', () => {
    grunt.task.run(['string-replace:minor', 'exec:add', 'exec:minor', 'user']);
  });
  grunt.registerTask('major', 'Bump major version', () => {
    grunt.task.run(['string-replace:major', 'exec:add', 'exec:major', 'user']);
  });

  // watch thingy
  grunt.registerTask('dev', ['watch']);
};
