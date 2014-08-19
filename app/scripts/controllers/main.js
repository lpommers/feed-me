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

  	var cuisines = ['american', 'italian', 'isian', 'mexican', 'southern & soul food', 'french', 'southwestern', 'barbecue', 'indian', 'chinese', 'Cajun & Creole', 'english', 'mediterranean', 'greek', 'spanish', 'german', 'thai', 'moroccan', 'irish', 'japanese', 'cuban', 'hawaiin', 'swedish', 'hungarian', 'portugese'];

  	$scope.todos = [];
  	$scope.someProperty = "hello computer";

  	$scope.someAction = function() {
  		var randomCuisine = encodeURIComponent(cuisines[Math.floor(Math.random() * (cuisines.length + 1) )]);
  		console.log(randomCuisine);
	  	var url = 'http://api.yummly.com/v1/api/recipes?_app_id=09981ac4&_app_key=5f7f4b7a4eb4ebf0bcf4f3f0e5e47e2f&allowedCuisine[]=cuisine^cuisine-' + randomCuisine + '&callback=JSON_CALLBACK';
	  	console.log(url);
			var promise = $http.jsonp(url);

			promise.then(function(response) {
				var results = response.data.matches;


				$scope.someProperty = results[0];


			});
  	}



  }]);



