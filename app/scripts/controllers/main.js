'use strict';

//creates an array of a certain length. To be used to ensure no repeats are given to the user
function recipeIndexArr (num) {
	var recipeIndexes = [];
	for (var i = 0; i < num; i++){
		recipeIndexes.push(i);
	}
	return recipeIndexes;
}

//returns a random number from 0 - 5000 to get varied results
function randomStart () {
	return Math.floor(Math.random() * (5000) );
}

//builds the GET request string
//bool == var related to whether veggie option has been ticked
function buildURL(bool) {
	var apiString		= 'http://api.yummly.com/v1/api/recipes?_app_id=09981ac4&_app_key=5f7f4b7a4eb4ebf0bcf4f3f0e5e47e2f',
			mainDishes 	= '&allowedCourse[]=course^course-' + encodeURIComponent('Main Dishes'),
			salads 			= '&allowedCourse[]=course^course-' + encodeURIComponent('Salads'),
			vegetarian  = '&allowedDiet[]=387^' + encodeURIComponent('Lacto-ovo vegetarian'),
			startPoint 			= '&maxResult=90&start=' + randomStart(),
			responseData = '&callback=' + encodeURIComponent('JSON_CALLBACK');

	//console.log(startPoint);

	//if veggie
	if (bool === true) {
		return apiString + mainDishes + salads + vegetarian + startPoint + responseData;
	}
	//if not veggie
	else {
		return apiString + mainDishes + salads + startPoint + responseData;
	}

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

  	//declare some variables
  	$scope.someProperty = '';
  	$scope.htmlAttr 		= '';
  	var recipes 				= [],
  			recipeIndexes 	= recipeIndexArr(90),
			  counter 				= 0,
			  veggieOption    = false,
			  checkbox 		= document.getElementById('vegetarian');

  	//function to make a call to the yummly api. once the promise is complete, then:
  	//recipes = all the recipes
  	// scope.someProperty = first recipe from the response
  	$scope.apiCall = function (bool){
			var promise = $http.jsonp(buildURL(bool))
				.catch(function(response){
					if (status === 409){
						$scope.someProperty = 'It looks like the API call limit has been reached. Yummly only allows for 500 free calls a day.. you\'l have to try again tomorrow';
					}
				})
				.then(function(response) {
				  //console.log(response.data);
					recipes = response.data.matches;
					//console.log(recipes);
					$scope.someProperty = response.data.matches[0];
					$scope.htmlAttr = response.data.attribution.html;
				});
			//console.log(promise);
  	};

  	//this is the button click
  	$scope.someAction = function() {
  		//console.log('counter: ' + counter);
			// console.log(recipeIndexes);

			//if recipes array is empty, it means the api has never called so, so we call it once. And update the counter
  		if (recipes.length === 0 || checkbox.checked !== veggieOption) {
  			veggieOption = checkbox.checked;
				$scope.apiCall(checkbox.checked);
				counter = 1;
  		}
  		//if the counter is at 88 then we've shown the user almost all the recipes from our response and it's time to update the recipes by making another api call and refreshing the recipe index array and reseting our counter
			else if (counter === 88) {
				recipeIndexes = recipeIndexArr(90);
			 	$scope.apiCall(checkbox.checked);
				counter = 1;
  		}
  		//this means we don't need to call the api and just need to send the user a new recipe
  		else {
  			//get a random number, that we won't call more than once for each api call
  			var randomIndex = recipeIndexes.splice(Math.random()*recipeIndexes.length, 1)[0];
  			$scope.someProperty = recipes[randomIndex];
  			counter += 1;
  		}

  		//console.log($scope.someProperty);
  	};
}]);