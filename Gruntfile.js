module.exports = function(grunt) {

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    // Before generating any new files, remove any previously-created files.
    clean: {
      distribution: ['dist']
    },

    // Markdown to PDF
    markdownpdf: {
      options: {
        concatFiles: true,
        paperFormat: 'A4',
        renderDelay: 2000,
        paperBorder: '1cm'
      },
      files: {
        src: "chapters/*.md",
        dest: "dist"
      }
    }
  })

  grunt.registerTask('default', ['clean', 'markdownpdf']) 
}