module.exports = function(grunt) {

   // Project configuration.
   grunt.initConfig({
       pkg: grunt.file.readJSON('package.json'),
       //uglify 설정
       uglify: {
           options: {
               banner: '/* <%= grunt.template.today("yyyy-mm-dd") %> */ ' //파일의 맨처음 붙는 banner 설정
           },
           build: {
               src: 'public/js/common.js', //uglify할 대상 설정
               dest: 'public/js/common.min.js' //uglify 결과 파일 설정
           }
       }
   });

   // Load the plugin that provides the "uglify", "concat" tasks.
   grunt.loadNpmTasks('grunt-contrib-uglify');

   // Default task(s).
   grunt.registerTask('default', ['uglify']); //grunt 명령어로 실행할 작업

};
