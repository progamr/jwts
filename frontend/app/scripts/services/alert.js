'use strict';

/**
 * @ngdoc service
 * @name jwtsApp.alert
 * @description
 * # alert
 * Service in the jwtsApp.
 */
angular.module('jwtsApp')
  .service('alert', function ($rootScope, $timeout) {
    var alertTimeout;
    return function (type, title, message, timeout) {
        $rootScope.alert = {
          hasBeenShown : true,
          show : true,
          type : type,
          title : title,
          message : message,
        };
        $timeout(function () {
          $rootScope.alert.show = false;
        }, timeout || 2000);
        $timeout.cancel(alertTimeout);
      };
  });
