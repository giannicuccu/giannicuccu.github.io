/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'gm',
          sizes: [{
            name: 'small',
            width: 400,
            quality: 60
            
          },{
            name: 'small',
            width: 800,
            separator: "-",
            suffix: "-2x",
            quality: 60
            
          },{
            name: 'medium',
            width: 800,
            quality: 60
            
          },{
            name: "medium",
            width: 1600,
            separator: "-",
            suffix: "-2x",
            quality: 60
          }]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'images_src/',
          dest: 'images/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['images','images_webp'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['images','images_webp']
        },
      },
    },

    /* Copy the "fixed" images that don't go through processing into the images/directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          //src: 'images_src/fixed/*.{gif,jpg,png}',
          src: ['*.{gif,jpg,png}'],
          cwd: 'images_src/fixed/',
          dest: 'images/fixed/'
        }]
      },
    },

    cwebp: {
        dynamic: {
        options: {
          q: 40
        },
        files: [{
          expand: true,
          cwd: 'images/', 
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images_webp/'
        }]
      }
    }



  });
  
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images','cwebp']);

  grunt.loadNpmTasks('grunt-cwebp');
  grunt.registerTask('jpgtowebp', ['cwebp']);

};
