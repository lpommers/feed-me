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

		var url = 'http://api.yummly.com/v1/api/recipes?_app_id=09981ac4&_app_key=5f7f4b7a4eb4ebf0bcf4f3f0e5e47e2f&allowedIngredient[]=rice&callback=JSON_CALLBACK';
		var promise = $http.jsonp(url);

		promise.then(function(response) {
			var results = response.data.matches;
			console.log(response);

			$scope.todos = results;

		});
  }]);
