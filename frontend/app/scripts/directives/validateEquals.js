
'use strict';

angular.module('jwtsApp')
  .directive('validateEquals', function () {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelCtrl){
        function validateEqual(value){
          var valid = (value ===  scope.$eval(attrs.validateEquals));
          ngModelCtrl.$setValidity('equal', valid);
          return valid ? value : undefined;
        }

        ngModelCtrl.$parsers.push(validateEqual);
        ngModelCtrl.$formatters.push(validateEqual);

        scope.$watch(attrs.validateEquals, function(){
          ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
        });
      }
    };
  });
