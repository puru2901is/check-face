angular.module('checkFaceApp')
  .controller('ScoreCtrl',['$scope','$timeout','$location','$rootScope','$cookieStore',function ($scope,$timeout,$location,$rootScope,$cookieStore) {


	$rootScope.counterForGameEnd = 0;
 	$scope.score1 = $cookieStore.get('score');
 	console.log("final score in cookie in scorejs is "+$scope.score1)
 	$scope.scoreGame = $rootScope.scoreOfThisGame;
}]);  	