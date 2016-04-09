'use strict';

/**
 * @ngdoc function
 * @name jwtsApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * responsible for calling the register function
 * inside auth service to register the user and
 * display an alert success message to welcome the user.
 */
angular.module('jwtsApp').controller('RegisterCtrl', function ($scope, alert, auth) {
    $scope.submit = function () {
      auth.register($scope.email, $scope.password)
        .success(function (response) {
          console.log(response);
          alert('success', 'account created', 'welcome' + response.user.email + '!');
        })
        .error(function (error) {
          alert('warning', 'Something went wrong :(', error.message);
        });
    };
  });
