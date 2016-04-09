'use strict';

/**
 * @ngdoc service
 * @name jwtsApp.authInterceptor
 * @description
 * this interceptor is responsible for adding
 * the authentication token (if exists) to each request
 * sent to the backend
 * Factory in the jwtsApp.
 */
angular.module('jwtsApp')
  .factory('authInterceptor', function (authToken) {
    return {
      request : function (config) {
        var token = authToken.getToken();
        if(token)
          config.headers.Authorization = 'Bearer ' + token;
        return config;
      },
      response : function (response) {
        return response;
      }
    };

  });
