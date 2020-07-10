angular.module('userApp', ['appRoutes', 'registerController', 'loginController'])

.config(function($httpProvider) {
    $httpProvider.interceptors.push('LoginInterceptors');
});