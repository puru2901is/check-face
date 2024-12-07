'use strict';
app
 
.controller('LoginCtrl',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        console.log("in login ctrl")
        $rootScope.activePage = 'login';
        $rootScope.counterForGameEnd = 0;
      // AuthenticationService.ClearCredentials();

       $scope.logout = function() {
            console.log('logout function')
            AuthenticationService.ClearCredentials();
           // $cookieStore.remove('score');
            $location.path('/login');

        }
      
 
        $scope.submit = function(){
            console.log("in login function")
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/main');
                } else {
                    console.log("error in login")
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);



/*angular.module('checkFaceApp')
  .controller('LoginCtrl',['$scope','$timeout','$location','$rootScope','$cookies',function ($scope,$timeout,$location,$rootScope,$cookies) {
  	
  	console.log("in login controller")

  	$scope.submit = function(){
  			console.log("in submit")
  			var uname = $scope.username;
  			var password = $scope.password;
  			if(uname == "admin" && password == "cool"){
  				console.log("in check")
  				$cookies.loggedIn = true;
  				$location.path("/startpage");
  			}else{
  				alert("Wrong Credentials");
  			}		
  	}
  
  }]);*/