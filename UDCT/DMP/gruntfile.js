/* 
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
              width: 360,
              quality: 90
              
            },{
              name: 'small',
              width: 720,
              separator: "-",
              suffix: "-2x",
              quality: 90
              
            },{
              name: 'medium',
              width: 948,
              quality: 90
              
            },{
              name: "medium",
              width: 1896,
              separator: "-",
              suffix: "-2x",
              quality: 90
            }]
          },
  
          
          files: [{
            expand: true,
            src: ['*.{gif,jpg,png}'],
            cwd: 'img-src/',
            dest: 'img/'
          }]
        }
      },
  
      /* Clear out the images directory if it exists */
      clean: {
        dev: {
          src: ['img'],
        },
      },
  
      /* Generate the images directory if it is missing */
      mkdir: {
        dev: {
          options: {
            create: ['img']
          },
        },
      },
  
      /* Copy the "fixed" images that don't go through processing  */
      copy: {
        dev: {
          files: [{
            expand: true,
            src: ['*.{svg,jpg}'],
            cwd: 'img-src/fixed/',
            dest: 'img/'
          }]
        },
      },
      /*create webp from processed images*/
      cwebp: {
          dynamic: {
          options: {
            q: 90
          },
          files: [{
            expand: true,
            cwd: 'img/', 
            src: ['**/*.{png,jpg,gif}'],
            dest: 'img/'
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
  