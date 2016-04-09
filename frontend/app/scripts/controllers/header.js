'use strict';

/**
 * @ngdoc function
 * @name jwtsApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * responsible for setting the isAuthenticated property
 * for the user th handle UI [logout, register, login] buttons.
 */
angular.module('jwtsApp')
  .controller('HeaderCtrl', function ($scope, authToken) {
    $scope.isAuthenticated = authToken.isAuthenticated;
  });
