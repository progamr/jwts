'use strict';

/**
 * @ngdoc function
 * @name jwtsApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * register controller will handle sending
 * the http request to the back-end
 */
angular.module('jwtsApp')
  .controller('RegisterCtrl', function ($scope, $http, alert) {
    $scope.submit = function () {
      var url = 'http://localhost:3000/register';
      var user = {
        email : $scope.email,
        password : $scope.password
      };
      $http.post(url, user)
        .success(function (response) {
          console.log(response);
          alert('success', 'Ok', 'you are now registered');
        })
        .error(function (error) {
            alert('warning', 'Whoops', 'could not register');
        });
    }
  });
