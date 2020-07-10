angular.module('appRoutes', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/pages/home.html'
            })
            .when('/about', {
                templateUrl: 'app/views/pages/about.html'
            })
            .when('/register', {
                templateUrl: '/app/views/pages/user/register.html',
                controller: 'regCtrl',
                controllerAs: 'register'
            })
            .when('/login', {
                templateUrl: '/app/views/pages/user/login.html'
            })
            .when('/logout', {
                templateUrl: '/app/views/pages/user/logout.html'
            })
            .when('/profile', {
                templateUrl: '/app/views/pages/user/profile.html'
            })
            .when('/facebook/:token', {
                templateUrl: '/app/views/pages/user/social/social.html',
                controller: "facebookCtrl",
                controllerAs: "facebook"
            })
            .when('/facebookerror', {
                templateUrl: 'app/views/pages/user/login.html',
                controller: "facebookCtrl",
                controllerAs: "facebook"
            })
            .when('/google/:token', {
                templateUrl: '/app/views/pages/user/social/social.html',
                controller: "googleCtrl",
                controllerAs: "google"
            })
            .when('/googleerror', {
                templateUrl: 'app/views/pages/user/login.html',
                controller: "googleCtrl",
                controllerAs: "google"
            })
            .otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    });