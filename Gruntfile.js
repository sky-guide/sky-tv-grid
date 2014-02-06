module.exports = function (grunt) {
    grunt.util.linefeed = '\n';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.config.init({
        pkg: grunt.file.readJSON('bower.json')
    });

    grunt.config('clean', {
        dev: {
            src: ['src/css']
        },
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
            src: ['test/**/*.js']
        }
    });

    var banner = '/*!\n<%= pkg.name %>\n' +
        '<%= pkg.description %>\n' +
        'Build date: <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n';
    grunt.config('sass', {
        all: {
            options: {
                style: 'expanded',
                compass: true
            },
            files: [{
                expand: true,
                cwd: 'src/scss',
                src: ['**/*.scss'],
                dest: 'src/css/',
                ext: '.css'
            }]
        }
    });

    grunt.config('cssmin', {
        css: {
            options: {
                banner: banner
            },
            files: [
                {
                    dest: 'dist/css/sky-tv-grid.css',
                    src: ['src/css/**/*.css']
                }
            ]
        }
    });

    grunt.config('copy', {
        dist: {
            files: [
                { expand: true, cwd: 'src', src: ['images/**'], dest: 'dist' }
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
                livereload: '<%= connect.options.livereload %>'
            }
        },
        jsTest: {
            files: ['test/spec/**/*.js'],
            tasks: ['newer:jshint:test', 'karma']
        },
        gruntfile: {
            files: ['Gruntfile.js'],
            options: {
                livereload: '<%= connect.options.livereload %>'
            }
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
        },
        sass: {
            files: 'src/scss/**/*.scss',
            tasks: ['sass']
        }
    });

    grunt.config('release', {
        options: {
            file: 'bower.json',
            npm: false,
            commitMessage: 'bumping up version to <%= version %>',
            tagMessage: 'tagging version <%= version %>',
            github: {
                repo: 'sky-guide/sky-tv-grid',
                usernameVar: 'GITHUB_USERNAME',
                passwordVar: 'GITHUB_PASSWORD'
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
            'clean:dev',
            'sass',
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
        'sass',
        'cssmin',
        'concat',
        'uglify',
        'copy'
    ]);

    grunt.registerTask('default', [
        'test-app',
        'build'
    ]);
};
