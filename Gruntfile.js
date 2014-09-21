module.exports = function (grunt) {
    'use strict';

    var config, getTheme;

    try {
        config = grunt.file.readJSON('build.json');
    } catch (err) {
        console.info('build.json not found - using defaults');
        config = {
            'theme'  : 'GitHub-Dark',
            'color'  : '#008080',
            'image'  : 'url(https://raw.githubusercontent.com/StylishThemes/GitHub-Dark/master/images/backgrounds/bg-tile1.png)',
            'tiled'  : true,
            'attach' : 'scroll',
            'tab'    : 4,
            'chrome' : false
        };
    }

    getTheme = function () {
        return config.theme.toLowerCase().replace(/\s+/g, '-');
    };

    // ** set up build options **
    // do we need a check to see if the theme file exists?
    config.themeFile = 'themes/pygments-' + getTheme() + '.min.css';
    // build file name
    config.buildFile = 'github-dark-' + getTheme() + '-' + config.color.replace(/[^\d\w]/g, '') + '.build.min.css';
    // background options
    config.bgOptions = config.tiled ?
        'background-repeat: repeat !important; background-size: auto !important; background-position: left top !important;' :
        'background-repeat: no-repeat !important; background-size: cover !important; background-position: center top !important;';
    config.bgOptions2 = config.attach.toLowerCase() === 'scroll' ?
        'background-attachment: scroll !important;' :
        'background-attachment: fixed !important;';

    // Don't include closing bracket for a chrome build
    config.newTheme = '<%= grunt.file.read("' + config.themeFile + '") %>' + (config.chrome ? '' : '\n}');

    // custom build
    config.replacements = [{
        pattern: '/*[[bg-choice]]*/ url(https://stylishthemes.github.io/GitHub-Dark/images/backgrounds/bg-tile1.png)',
        replacement: config.image
    },{
        pattern: '/*[[bg-options]]*/',
        replacement: config.bgOptions
    },{
        pattern: '/*[[bg-options2]]*/',
        replacement: config.bgOptions2
    },{
        pattern: /\/\*\[\[base-color\]\]\*\/ #4183C4/g,
        replacement: config.color
    },{
        pattern: /\/\*\[\[tab-size\]\]\*\/ 4/g,
        replacement: config.tab
    },{
        // remove default syntax theme AND closing bracket
        pattern: /\s+\/\* GitHub-Dark syntax highlighting(.*(\n|\r))+}$/m,
        replacement: ''
    },{
        pattern: '/*[[pygments-theme]]*/',
        // add selected theme + closing bracket (if not chrome)
        replacement: config.newTheme
    }];

    // userstyles.org - remove defaults & leave placeholders
    config.replacements_user = [{
        pattern: '/*[[bg-choice]]*/ url(https://stylishthemes.github.io/GitHub-Dark/images/backgrounds/bg-tile1.png)',
        replacement: '/*[[bg-choice]]*/'
    },{
        pattern: /\/\*\[\[base-color\]\]\*\/ #4183C4/g,
        replacement: '/*[[base-color]]*/'
    },{
        pattern: /\/\*\[\[tab-size\]\]\*\/ 4/g,
        replacement: '/*[[tab-size]]*/'
    },{
        // remove default syntax theme
        pattern: /\s+\/\* GitHub-Dark syntax highlighting(.*(\n|\r))+}$/m,
        replacement: '\n}'
    }];

    // for a chrome build, remove the @-moz-document wrapper for easier copy & pasting into the editor
    if (config.chrome) {
        config.replacements.push({
            pattern: /@-moz-document regexp\((.*)\) \{(\n|\r)+/,
            replacement: ''
        });
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: config,

        'string-replace': {
            inline: {
                files:   { '<%= config.buildFile %>' : 'github-dark.css' },
                options: { replacements: '<%= config.replacements %>' }
            },
            mark: {
                files:   { '<%= config.buildFile %>' : '<%= config.buildFile %>' },
                options: { replacements: [{ pattern: /\/\*\[\[/gm, replacement: '/*![[' }]}
            },
            unmark: {
                files:   { '<%= config.buildFile %>' : '<%= config.buildFile %>' },
                options: { replacements: [{ pattern: /\/\*\!\[\[/gm, replacement: '/*[[' }]}
            },
            fix: {
                files:   { '<%= config.buildFile %>' : '<%= config.buildFile %>' },
                options: { replacements: [{ pattern: /\;\:\/\*\[\[/gm, replacement: ';/*[[' }]}
            }
        },
        cssmin: {
            minify: {
                files:   { '<%= config.buildFile %>' : '<%= config.buildFile %>' },
                options: { keepSpecialComments: '*' }
            }
        },
        watch: {
            css: { files: [ 'github-dark.css' ] }
        }
    });

    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // build custom GitHub-Dark style using build.json settings
    grunt.registerTask('default', 'Building custom style', function(){
      config.buildFile = config.buildFile.replace('.min.css', '.css');
      grunt.task.run(['string-replace:inline']);
    });
    // build custom minified GitHub-Dark style
    grunt.registerTask('minify', ['string-replace:inline', 'cssmin:minify']);

    // build userstyle for pasting into https://userstyles.org/styles/37035/github-dark
    grunt.registerTask('user', 'building userstyles.org file', function () {
        config.buildFile = 'github-dark-userstyle.build.css';
        config.replacements = config.replacements_user;
        config.chrome = false; // needed in case build.json sets this to true
        grunt.task.run(['string-replace:inline']);
    });
    grunt.registerTask('usermin', 'building userstyles.org file', function () {
        config.buildFile = 'github-dark-userstyle.build.css';
        config.replacements = config.replacements_user;
        config.chrome = false; // needed in case build.json sets this to true
        grunt.task.run([
            'string-replace:inline',
            'string-replace:mark',
            'cssmin:minify',
            'string-replace:unmark',
            'string-replace:fix'
        ]);
    });

    // watch thingy
    grunt.registerTask('dev', ['watch']);

};
