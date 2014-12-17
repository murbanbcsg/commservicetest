module.exports = function(grunt) {

	grunt.initConfig({

		watch: {
			configFiles: {
				files: ['Gruntfile.js'],
				options: {
					reload: true
				}
			},
			scripts: {
				files: ['./src/**/*.js'],
				tasks: ['jasmine']
			}
		},

		concurrent: {
			prepare: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},

		jasmine: {
			coverage: {
				src: ['./src/**/*.js'],
				options: {
					vendor: 'node_modules/angular/angular.min.js',
					helpers: 'node_modules/angular-mocks/angular-mocks.js',
					specs: './tests/**/*.js',
					template: require('grunt-template-jasmine-istanbul'),
					templateOptions: {
						coverage: 'coverage/coverage.json',
						report: [{
							type: 'html',
							options: {
								dir: 'coverage/html'
							}
						}, {
							type: 'text-summary'
						}]
					}
				}
			}
		},

		nodemon: {
			application: {
				script: 'simpleserver.js'
			}
		}

	});

	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('default', ['concurrent']);
};