module.exports = function(grunt) {
    grunt.registerTask('default', 'Default: build web app', ['build-web-app', 'sign-html']);

    grunt.registerTask('dev', 'Start the dev server', [
        'gitinfo',
        'copy:html',
        'copy:favicon',
        'copy:icons',
        'copy:manifest',
        'webpack-dev-server',
    ]);

    grunt.registerTask('desktop', 'Build web and desktop apps for all platforms', [
        'default',
        'build-desktop',
    ]);

    grunt.registerTask('cordova', 'Build cordova app', ['default', 'build-cordova']);
};
