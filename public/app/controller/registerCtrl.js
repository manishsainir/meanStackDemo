angular.module('registerController', ['registerService'])
    .controller("regCtrl", function($http, $location, $timeout, Register) {
        var app = this;

        this.regUser = function(regData) {
            app.errorMsg = false;
            app.successMsg = false;
            app.loading = true;
            Register.create(app.regData)
                .then(function(data) {
                    if (data.data.success) {
                        app.loading = false;
                        app.successMsg = data.data.message;
                        $timeout(function() {
                            $location.path("/");
                        }, 2000);
                    } else {
                        app.loading = false;
                        app.errorMsg = data.data.message;
                    }
                })
        }
    });