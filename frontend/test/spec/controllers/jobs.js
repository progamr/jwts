'use strict';

describe('Controller: JobsCtrl', function () {

  // load the controller's module
  beforeEach(module('jwtsApp'));

  var JobsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JobsCtrl = $controller('JobsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(JobsCtrl.awesomeThings.length).toBe(3);
  });
});
