module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
                checktextdomain: {
                        options:{
                                text_domain: 'bridgy-publish',
                                keywords: [
                                        '__:1,2d',
                                        '_e:1,2d',
                                        '_x:1,2c,3d',
                                        'esc_html__:1,2d',
                                        'esc_html_e:1,2d',
                                        'esc_html_x:1,2c,3d',
                                        'esc_attr__:1,2d',
                                        'esc_attr_e:1,2d',
                                        'esc_attr_x:1,2c,3d',
                                        '_ex:1,2c,3d',
                                        '_n:1,2,4d',
                                        '_nx:1,2,4c,5d',
                                        '_n_noop:1,2,3d',
                                        '_nx_noop:1,2,3c,4d'
                                ]
                        },
                        files: {
                                src:  [
                                        '**/*.php',         // Include all files
                                        'includes/*.php', // Include includes
                                        '!sass/**',       // Exclude sass/
                                        '!node_modules/**', // Exclude node_modules/
                                        '!tests/**',        // Exclude tests/
                                        '!vendor/**',       // Exclude vendor/
                                        '!build/**'           // Exclude build/
                                ],
                                expand: true
                        }
                },


 copy: {
           main: {
               options: {
                   mode: true
               },
               src: [
                   '**',
                   '!node_modules/**',
                   '!build/**',
                   '!.git/**',
                   '!Gruntfile.js',
                   '!package.json',
                   '!.gitignore'
               ],
               dest: 'build/trunk/'
           }
       },

    wp_readme_to_markdown: {
      target: {
        files: {
          'readme.md': 'readme.txt'
        }
      }
     },
   makepot: {
        target: {
            options: {
		mainFile: 'bridgy-publish.php', // Main project file.
                domainPath: '/languages',                   // Where to save the POT file.
                potFilename: 'bridgy.pot',
                type: 'wp-plugin',                // Type of project (wp-plugin or wp-theme).
            exclude: [
                'build/.*'
            ], 
               updateTimestamp: true             // Whether the POT-Creation-Date should be updated without other changes.
            	}
            }
      },
  });

  grunt.loadNpmTasks('grunt-wp-readme-to-markdown');
  grunt.loadNpmTasks( 'grunt-wp-i18n' );
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-checktextdomain');
  grunt.loadNpmTasks( 'grunt-contrib-clean' );
  grunt.loadNpmTasks( 'grunt-git' );
  // Default task(s).
  grunt.registerTask('default', ['wp_readme_to_markdown', 'makepot', 'checktextdomain']);

};
