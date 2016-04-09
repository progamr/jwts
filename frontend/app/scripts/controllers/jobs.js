'use strict';

/**
 * @ngdoc function
 * @name jwtsApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * responsible for getting a list of jobs from the backend of the application.
 */
angular.module('jwtsApp')
  .controller('JobsCtrl', function ($scope, $http, API_URL, alert) {

    $http.get(API_URL + 'jobs').success(function (jobs) {
      $scope.jobs = jobs;
    }).error(function (error) {
      alert('warning', 'Unable to get jobs :(', error.message);
    });
  });
