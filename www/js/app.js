var app = angular.module('test-app', ['ionic', 'test-app.services', 'ngCordovaOauth']);

//app.config(['$ngCordovaOauthProvider', function ($ngCordovaOauthProvider) {}]);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {

            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});
