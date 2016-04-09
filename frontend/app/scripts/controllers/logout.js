'use strict';

/**
 * @ngdoc function
 * @name jwtsApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * logout functionality for the application.
 */
angular.module('jwtsApp')
  .controller('LogoutCtrl', function (authToken, $state) {
    authToken.removeToken();
    $state.go('main');
  });
