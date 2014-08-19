'use strict';

/**
 * @ngdoc function
 * @name someAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the someAppApp
 */
angular.module('someAppApp')
  .controller('MainCtrl', ['$scope','$http', function ($scope, $http) {




  	var recipeIndexes =  recipeIndexArr();
  	console.log(recipeIndexes);
  	var counter = 0;
  	console.log('counter: ' + counter);
  	var recipes= [];
  	$scope.someProperty = '';
  	$scope.someOtherProperty = [];

  	$scope.someAction = function() {
  		console.log('counter: ' + counter);

  		if (counter === 95 || counter === 0) {
  			//reset
  			counter = 0;
  			recipeIndexes = recipeIndexArr();
				var mainDishes = encodeURIComponent('Main Dishes');
	  		var salads = encodeURIComponent('Salads');
	  		var randomStart = Math.floor(Math.random() * (100) );

		  	var url = 'http://api.yummly.com/v1/api/recipes?_app_id=09981ac4&_app_key=5f7f4b7a4eb4ebf0bcf4f3f0e5e47e2f&allowedCourse[]=course^course-' + mainDishes + '&allowedCourse[]=course^course-' + salads + '&maxResult=50&start='+ randomStart +'&callback=JSON_CALLBACK';

				var promise = $http.jsonp(url);

				promise.then(function(response) {
					recipes = response.data.matches;
					$scope.someProperty = response.data.matches[0];
					//console.log($scope.someOtherProperty);
				});

  		} else {
  			var randomIndex = recipeIndexes.splice(Math.random()*recipeIndexes.length, 1)[0];
  			$scope.someProperty = recipes[randomIndex];
  		}
  		// console.log($scope.someOtherProperty);
  		counter += 1;

  		console.log(recipes);
  		console.log($scope.someProperty);
  	};



  }]);



function recipeIndexArr () {
	var recipeIndexes = [];
	for (var i = 0; i < 50; i++){
		recipeIndexes.push(i);
	}
	return recipeIndexes;
}

