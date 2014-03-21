module.exports = function (grunt) {
    "use strict";
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    "build/github-dark.css": "github-dark.scss"
                }
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: "build/",
                dest: "build/",
                src: "github-dark.css",
                ext: ".min.css"
            }
        }
    });

    grunt.registerTask("compile", ["sass"]);
    grunt.registerTask("default", ["sass", "cssmin"]);

    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-sass");
};
