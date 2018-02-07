module.exports = function (grunt) {
    require('jit-grunt')(grunt);
	grunt.initConfig({
        uglify: {
            build: {
                files: {
                    "App_JS/App.min.js": [
                        "App_JS/Kendo.js",
                        "App_JS/App.js"
                    ]
                }
            }
        },
		less: {
            development: {
                files: {
                    "App_CSS/App.min.css": "App_CSS/App.less",
                }
            }
        },
		postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: [
                          "Android 2.3",
                          "Android >= 4",
                          "Chrome >= 20",
                          "Firefox >= 24",
                          "Explorer >= 8",
                          "iOS >= 6",
                          "Opera >= 12",
                          "Safari >= 6"
                        ]
                    }),
                    require('cssnano')({
                        zindex: false,
                        discardUnused: false
                    })
                ]
            },
            dist: {
                src: ['App_CSS/App.min.css']
            }
        },
		watch: {
            styles: {
                files: ['App_CSS/**/*.less', '!App_CSS/App.min.css'],
                tasks: ['less', 'postcss'],
                options: {
                    spawn: false
                }
            },
            js: {
                files: ['App_JS/**/*.js', '!App_JS/App.min.js'],
                tasks: ['uglify']
            }
        }
    });
    grunt.registerTask('default', [
		'uglify', 
		'less',
		'postcss',
		'watch'
	]);
};