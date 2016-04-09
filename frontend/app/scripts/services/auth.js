'use strict';

/**
 * @ngdoc service
 * @name jwtsApp.auth
 * @description
 * # auth
 * responsible for handling the common logic between Login and register.
 */
angular.module('jwtsApp').service('auth', function ($http, API_URL, authToken, $state) {

  /**
   * responsible for calling setToken from authToken service
   * and redirecting the user to the main state.
   * @param res
     */
  function authSuccessful (res) {
      authToken.setToken(res.token);
      $state.go('main');
  };

  /**
   * responsible for logging the user into the application.
   * @param email
   * @param password
   * @returns {*}
     */
  this.login = function (email, password) {
      return $http.post(API_URL + 'login',
        {
          email : email,
          password : password
        }).success(authSuccessful);
  };

  /**
   * responsible for registering the user into the application.
   * @param email
   * @param password
   * @returns {*}
     */
  this.register = function (email, password) {
    return $http.post(API_URL +  'register', {
      email : email,
      password : password
    }).success(authSuccessful);
  }
});
