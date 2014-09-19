module.exports = function(grunt) {
	'use strict';

	var config = grunt.file.readJSON('build.json'),
		getTheme = function(){
			return config.theme.toLowerCase().replace(/\s+/g, '-');
		};

	// ** set up build options **
	// do we need a check to see if the theme file exists?
	config.themeFile = 'themes/pygments-' + getTheme() + '.min.css';
	// build file name
	config.buildFile = 'github-dark-' + getTheme() + '-' + config.color.replace(/[^\d\w]/g,'') + '.build.css';
	// background options
	config.bgOptions = config.tiled ?
		'background-repeat: repeat !important; background-size: auto !important; background-position: left top !important;' :
		'background-repeat: no-repeat !important; background-size: cover !important; background-position: center top !important;';
	config.bgOptions2 = config.attach.toLowerCase() === 'scroll' ?
		'background-attachment: scroll !important;' :
		'background-attachment: fixed !important;';

	// Don't include closing bracket for a chrome build
	config.newTheme = '<%= grunt.file.read("' + config.themeFile + '") %>' + (config.chrome ? '' : '\n}');

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

	// for a chrome build, remove the @-moz-document for easier copy & pasting into the editor
	if (config.chrome) {
		config.replacements.push({
			pattern: /@-moz-document regexp\((.*)\) \{/,
			replacement: ''
		});
	}

	grunt.initConfig({

		pkg: grunt.file.readJSON( 'package.json' ),
		config: config,

		'string-replace': {
			inline: {
				files: {
					'<%= config.buildFile %>' : 'github-dark.css',
				},
				options: {
					replacements: config.replacements
				}
			}
		},

		watch: {
			css: {
				files: [ 'github-dark.css' ]
			}
		}

	});

	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// register task
	grunt.registerTask( 'default', [ 'string-replace' ] );
	grunt.registerTask( 'dev', [ 'watch' ] );

};
