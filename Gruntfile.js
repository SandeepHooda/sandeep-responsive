/*
 After you have changed any settings for the responsive_images task,
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
  'sw-precache': {
		options: {
			cacheId: 'sandeep-responsive-v1',
			workerFileName: 'service-worker.js',
			verbose: true,
			baseDir : "WebContent"
		},
		'default': {
			staticFileGlobs: [
				'css/**/*.css',
				'images/**/*.{gif,png,jpg}',
				'js/**/*.js',
				'**.html',
			],
		},
		
	},

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['dist'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['dist']
        },
      },
    },

    /* Copy the "fixed" images that don't go through processing into the images/directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          src: ['dist/firebase-messaging-sw.js'],
          dest: 'WebContent/',
          flatten: true,
        }]
      },
    },

  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-sw-precache');
  grunt.registerTask('default', ['clean', 'mkdir', 'sw-precache', 'copy']);

};
