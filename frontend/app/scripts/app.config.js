angular.module('jwtsApp').config(function ($urlRouterProvider, $stateProvider) {

  $stateProvider

      .state('main', {
        url : '/',
        templateUrl : 'views/main.html'
    })
      .state('register', {
        url : '/register',
        templateUrl : 'views/register.html',
        controller : 'RegisterCtrl'
    });

    $urlRouterProvider.otherwise('/');

});
