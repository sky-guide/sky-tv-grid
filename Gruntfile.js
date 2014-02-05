module.exports = function (grunt) {
    grunt.util.linefeed = '\n';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.config.init({
        pkg: grunt.file.readJSON('package.json')
    });

    grunt.config('clean', {
        dist: 'dist'
    });

    grunt.config('jshint', {
        options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
        },
        src: [
            'Gruntfile.js',
            'src/js/**/*.js'
        ],
        test: {
            options: {
                jshintrc: 'test/.jshintrc'
            },
            src: ['test/spec/**/*.js']
        }
    });

    var banner = '/*!\n<%= pkg.name %> - <%= pkg.version %>\n' +
        '<%= pkg.description %>\n' +
        'Build date: <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n';

    grunt.config('cssmin', {
        css: {
            options: {
                banner: banner
            },
            files: [
                {
                    dest: 'dist/css/sky-tv-grid.css',
                    src: ['src/css/sky-tv-grid.css']
                }
            ]
        }
    });

    grunt.config('concat', {
        dist: {
            options: {
                banner: banner
            },
            src: ['src/js/module.js', 'src/js/**/*.js'],
            dest: 'dist/js/sky-tv-grid.js'
        }
    });

    grunt.config('uglify', {
        options: {
            banner: banner
        },
        dist: {
            src: ['<%= concat.dist.dest %>'],
            dest: 'dist/js/sky-tv-grid.min.js'
        }
    });

    grunt.config('bower-install', {
        app: {
            html: 'index.html'
        }
    });

    grunt.config('connect', {
        options: {
            port: 9000,
            hostname: '0.0.0.0',
            livereload: 35729
        },
        livereload: {
            options: {
                open: true,
                base: [
                    '.'
                ]
            }
        },
        test: {
            options: {
                port: 9001,
                base: [
                    '.'
                ]
            }
        },
        dist: {
            options: {
                base: 'dist'
            }
        }
    });

    grunt.config('watch', {
        js: {
            files: ['src/**/*.js'],
            tasks: ['newer:jshint:src'],
            options: {
                livereload: true
            }
        },
        jsTest: {
            files: ['test/spec/**/*.js'],
            tasks: ['newer:jshint:test', 'karma']
        },
        gruntfile: {
            files: ['Gruntfile.js']
        },
        livereload: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            files: [
                '**/*.html',
                'src/css/**/*.css',
                'src/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
            ]
        }
    });

    grunt.config('release', {
        options: {
            file: 'bower.json',
            npm: false,
            commitMessage: 'bumping up version to <%= version %>', //default: 'release <%= version %>'
            tagMessage: 'tagging version <%= version %>', //default: 'Version <%= version %>',
            github: {
                repo: 'sky-guide/sky-tv-grid', //put your user/repo here
                usernameVar: 'GITHUB_USERNAME', //ENVIRONMENT VARIABLE that contains Github username
                passwordVar: 'GITHUB_PASSWORD' //ENVIRONMENT VARIABLE that contains Github password
            }
        }
    });

    grunt.config('karma', {
        unit: {
            configFile: 'karma.conf.js',
            singleRun: true
        },
        e2e: {
            configFile: 'karma-e2e.conf.js',
            singleRun: true
        }
    });

    grunt.registerTask('run-app', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean',
            'bower-install',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('test-app', [
        'build',
        'connect:test',
        'karma'
    ]);

    //metatasks
    grunt.registerTask('build', [
        'jshint',
        'clean',
        'cssmin',
        'concat',
        'uglify'
    ]);

    grunt.registerTask('default', [
        'test-app',
        'build'
    ]);
};
