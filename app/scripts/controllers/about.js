'use strict';

/**
 * @ngdoc function
 * @name someAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the someAppApp
 */
angular.module('someAppApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
