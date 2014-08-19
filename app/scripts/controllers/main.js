'use strict';

/**
 * @ngdoc function
 * @name someAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the someAppApp
 */
angular.module('someAppApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

  	$scope.todos = [];
  	$scope.someProperty = "hello computer";

  	$scope.someAction = function() {
	  	var url = 'http://api.yummly.com/v1/api/recipes?_app_id=09981ac4&_app_key=5f7f4b7a4eb4ebf0bcf4f3f0e5e47e2f&callback=JSON_CALLBACK';
			var promise = $http.jsonp(url);

			promise.then(function(response) {
				var results = response.data.matches;
				console.log(response);

				$scope.someProperty = results;

			});
  	}



  }]);



