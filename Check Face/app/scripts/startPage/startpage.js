angular.module('checkFaceApp')
  .controller('StartPageCtrl',['$scope','$timeout','$location','$rootScope','$cookieStore',function ($scope,$timeout,$location,$rootScope,$cookieStore) {
	
	console.log("In startPage");
    $rootScope.activePage = 'startpage'
    $rootScope.counterForGameEnd = 0;
   


	$scope.counterStartPage = 3;
    $scope.onTimeoutStartPage = function(){
        $scope.counterStartPage--;
        mytimeoutStartPage = $timeout($scope.onTimeoutStartPage,1000);
        if($scope.counterStartPage == 0){
        	$scope.stopStartPage();
        	$location.path("/main");
        }
    }
    var mytimeoutStartPage = $timeout($scope.onTimeoutStartPage,1000);
     $scope.stopStartPage = function(){
        $timeout.cancel(mytimeoutStartPage);
    }

}]);