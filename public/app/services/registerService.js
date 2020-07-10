angular.module('registerService', [])
    .factory('Register', function($http) {
        registerFactory = {};
        registerFactory.create = function(regData) {
            return $http.post('user/register', regData);
        }
        return registerFactory;
    });