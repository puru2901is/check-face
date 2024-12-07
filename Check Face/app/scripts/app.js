'use strict';

/**
 * @ngdoc overview
 * @name checkFaceApp
 * @description
 * # checkFaceApp
 *
 * Main module of the application.
 */
var app = angular
  .module('checkFaceApp', [
    'ngAnimate',
    'ngCookies',
    'ngStorage',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

  'use strict';

  console.log("sdsd");
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: '/views/login.html',
      controller: 'LoginCtrl'
    })

    .state('main', {
      url: '/main', 
      templateUrl: '/views/main.html',
      controller: 'MainCtrl',
      resolve:{
            "check": function($location,$rootScope,$cookies,$cookieStore,$localStorage){
                //console.log($cookieStore.get('globals'));
                console.log(localStorage.getItem('globals'));
                $rootScope.user = JSON.parse(localStorage.getItem('globals'));
               console.log($rootScope.user);
                 /* if (!$rootScope.user || $rootScope.user.currentUser.role != "ADMIN" ) {

                    $location.path("/");
                  }*/
            }
          }
    });

      $urlRouterProvider.otherwise('login');

})
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$stateChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });

   }]);



/*  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/main', {*/
      /*  resolve:{
            "check": function($location,$rootScope,$cookies){
                  if (!$cookies.loggedIn) {
                    $location.path("/");
                  }
            }
          },*/
    /*    templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        requireLogin: false
      })
       .when('/startpage', {*/
       /*   resolve:{
            "check": function($location,$rootScope,$cookies){
                  if (!$cookies.loggedIn) {
                    $location.path("/");
                  }
            }
          },*/
    /*    templateUrl: 'views/startPage.html',
        controller: 'StartPageCtrl',
        controllerAs: 'startpage'
      })
       .when('/score',{
         templateUrl: 'views/score.html',
        controller: 'ScoreCtrl',
        controllerAs: 'score'
       })
      .otherwise({
        redirectTo: '/startpage'
      });
  })
  .run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });*/

 //   }]);
