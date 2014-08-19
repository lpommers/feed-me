'use strict';

//creates an array of a certain length. To be used to ensure no repeats are given to the user
function recipeIndexArr (num) {
	var recipeIndexes = [];
	for (var i = 0; i < num; i++){
		recipeIndexes.push(i);
	}
	return recipeIndexes;
}

//returns a random number from 0 - 300
function randomStart () {
	return Math.floor(Math.random() * (2000) );
}

//buils the GET request string
function buildURL() {
	var random = randomStart(),
			mainDishes = encodeURIComponent('Main Dishes'),
			salads = encodeURIComponent('Salads');
	return 'http://api.yummly.com/v1/api/recipes?_app_id=09981ac4&_app_key=5f7f4b7a4eb4ebf0bcf4f3f0e5e47e2f&allowedCourse[]=course^course-' + mainDishes + '&allowedCourse[]=course^course-' + salads + '&maxResult=60&start='+ random +'&callback=JSON_CALLBACK';
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
  	var recipes = [],
  			recipeIndexes = recipeIndexArr(60),
			  counter = 0;

  	console.log('counter: ' + counter);
  	console.log(recipeIndexes);

  	$scope.apiCall = function (){

  		 var promise = $http.jsonp(buildURL());
  			promise.then(function(response) {
  			  console.log(response.data);
					recipes = response.data.matches;
					console.log(recipes);
					$scope.someProperty = response.data.matches[0];
				});
  	};

  	$scope.someAction = function() {
  		var promise;
  		console.log('counter: ' + counter);
			console.log(recipeIndexes);
  		if (counter === 0) {


				$scope.apiCall(promise);
				counter += 1;
  		}

			else if (counter === 55) {
			//reset
			//
				recipeIndexes = recipeIndexArr(60);

			 	promise = $http.jsonp(buildURL());

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




