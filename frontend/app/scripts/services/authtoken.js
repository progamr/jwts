'use strict';

/**
 * @ngdoc service
 * @name jwtsApp.authToken
 * @description
 * # authToken
 * Factory in the jwtsApp.
 */
angular.module('jwtsApp')
  .factory('authToken', function ($window) {

    var storage = $window.localStorage;
    var cachedToken;
    var userToken = 'userToken';
    // Public API to be returned
    var authToken =  {
      setToken : function (token) {
        cachedToken = token;
        storage.setItem(userToken, token);
      },
      getToken : function () {
        if(!cachedToken)
          cachedToken = storage.getItem(userToken);
        return cachedToken;
      },
      isAuthenticated : function () {
        return !!authToken.getToken();
      },
      removeToken : function () {
        cachedToken = null;
        storage.removeItem(userToken);
      }
    };

    return authToken;
  });
