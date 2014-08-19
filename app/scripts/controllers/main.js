'use strict';
function recipeIndexArr () {
	var recipeIndexes = [];
	for (var i = 0; i < 50; i++){
		recipeIndexes.push(i);
	}
	return recipeIndexes;
}

/**
 * @ngdoc function
 * @name someAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the someAppApp
 */

angular.module('someAppApp')
  .controller('MainCtrl', ['$scope','$http', function ($scope, $http) {
  	$scope.someProperty = '';
  	var recipes= [],
  			recipeIndexes =  recipeIndexArr(),
  			mainDishes = encodeURIComponent('Main Dishes'),
			  salads = encodeURIComponent('Salads'),
			  counter = 0;
		var randomStart = function() {
			return Math.floor(Math.random() * (100) );
		};
		var url = function () {
			 var random = randomStart();
			return 'http://api.yummly.com/v1/api/recipes?_app_id=09981ac4&_app_key=5f7f4b7a4eb4ebf0bcf4f3f0e5e47e2f&allowedCourse[]=course^course-' + mainDishes + '&allowedCourse[]=course^course-' + salads + '&maxResult=50&start='+ random +'&callback=JSON_CALLBACK';
		};
		var promise;


  	console.log('counter: ' + counter);

  	$scope.someAction = function() {
  		console.log('counter: ' + counter);
			console.log(recipeIndexes);
  		if (counter === 0) {

				promise = $http.jsonp(url());

				promise.then(function(response) {
					recipes = response.data.matches;
					console.log(recipes);
					$scope.someProperty = response.data.matches[0];
				});
				counter += 1;
  		}

			else if (counter === 45) {
			//reset
			//
				recipeIndexes = recipeIndexArr();

			 	promise = $http.jsonp(url());

				promise.then(function(response) {
					recipes = response.data.matches;
					console.log(recipes);
					$scope.someProperty = response.data.matches[0];

				});
				counter += 1;

  		} else {
  			var randomIndex = recipeIndexes.splice(Math.random()*recipeIndexes.length, 1)[0];
  			$scope.someProperty = recipes[randomIndex];
  			counter += 1;
  			console.log(recipes);
  		}

  		console.log($scope.someProperty);
  	};



  }]);




