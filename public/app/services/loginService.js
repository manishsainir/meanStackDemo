angular.module('loginService', [])

.factory('Login', function($http, LoginToken) {
    loginFactory = {};
    loginFactory.create = function(loginData) {
        return $http.post('/user/login', loginData).then(function(data) {
            LoginToken.setToken(data.data.token);
            return data;
        })
    }

    loginFactory.facebook = function(token) {
        LoginToken.setToken(token);
    }

    loginFactory.isLoggedIn = function() {
        if (LoginToken.getToken()) {
            return true;
        } else {
            return false;
        }
    }

    loginFactory.logout = function() {
        LoginToken.setToken();
    }

    loginFactory.getUser = function() {
        if (LoginToken.getToken()) {
            return $http.post('/user/me');
        } else {
            $q.reject({ message: "user has no token" });
        }
    }

    return loginFactory;
})

.factory('LoginToken', function($window) {
    loginTokenFectory = {};
    loginTokenFectory.setToken = function(token) {
        if (token) {
            $window.localStorage.setItem('token', token);
        } else {
            $window.localStorage.removeItem('token');
        }
    }

    loginTokenFectory.getToken = function() {
        return $window.localStorage.getItem('token');
    }

    return loginTokenFectory;
})

.factory('LoginInterceptors', function(LoginToken) {
    loginInterceptorsFactory = {};

    loginInterceptorsFactory.request = function(config) {
        var token = LoginToken.getToken();
        if (token) config.headers['x-access-token'] = token;
        return config;
    }
    return loginInterceptorsFactory;
})