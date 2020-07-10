angular.module('loginController', ['loginService'])

.controller('loginCtrl', function($location, $timeout, Login, $rootScope) {
    var app = this;
    app.loadMe = false;
    $rootScope.$on('$routeChangeStart', function() {
        if (Login.isLoggedIn()) {
            Login.getUser().then(function(data) {

                app.username = data.data.username;
                app.email = data.data.email;
                app.isLoggedIn = true;
                app.loadMe = true;
            })
        } else {
            app.loadMe = true;
            app.username = '';
            app.isLoggedIn = false;
        }
        if ($location.hash() == '_=_') $location.hash(null);
    });

    app.loginUser = function(loginData) {
        app.errorMsg = false;
        app.successMsg = false;
        app.loading = true;
        Login.create(app.loginData)
            .then(function(data) {
                if (data.data.success) {
                    app.loading = false;
                    app.successMsg = data.data.message;
                    $timeout(function() {
                        $location.path('/');
                    }, 2000)
                } else {
                    app.loading = false;
                    app.errorMsg = data.data.message;
                }
            });
    }

    app.logout = function() {
        Login.logout();

        $location.path('/logout');
        $timeout(function() {
            $location.path('/');
        }, 2000)

    }

})

.controller('facebookCtrl', function($routeParams, Login, $location, $window) {
    if ($window.location.pathname == '/facebookerror') {
        this.errorMsg = 'facebook email is not found in database';
    } else {
        Login.facebook($routeParams.token);
        $location.path('/');
    }
});