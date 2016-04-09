'use strict';

/**
 * @ngdoc function
 * @name jwtsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * responsible for calling the login function
 * inside auth service to log the user in and
 * display an alert success message to welcome the user.
 */
angular.module('jwtsApp').controller('LoginCtrl', function ($scope, alert, auth) {
  $scope.submit = function () {
    auth.login($scope.email, $scope.password)
      .success(function (response) {
        console.log(response);
        alert('success', 'Thanks for coming back', 'welcome' + response.user.email + '!');
      })
      .error(function (error) {
        alert('warning', 'Something went wrong :(', error.message);
      });
  };
  });
