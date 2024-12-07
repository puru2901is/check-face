app.config(function ($stateProvider, $urlRouterProvider) {

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
      controller: 'MainCtrl'
    });

      $urlRouterProvider.otherwise('/');

});

// app.run(function ($rootScope, $location, AuthenticationService, RoleService, SessionService) {

//   'use strict';

//   // enumerate routes that don't need authentication
//   var routesThatDontRequireAuth = ['/login'];
//   var routesForAdmin = ['/admin'];

//   // check if current location matches route  
//   var routeClean = function (route) {
//     return _.find(routesThatDontRequireAuth,
//       function (noAuthRoute) {
//         return _.str.startsWith(route, noAuthRoute);
//       });
//   };

//   // check if current location matches route  
//   var routeAdmin = function (route) {
//     return _.find(routesForAdmin,
//       function (noAuthRoute) {
//         return _.str.startsWith(route, noAuthRoute);
//       });
//   };

//   $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
//     // if route requires auth and user is not logged in
//     if (!routeClean($location.url()) && !AuthenticationService.isLoggedIn()) {
//       // redirect back to login
//       ev.preventDefault();
//       $location.path('/login');
//     }
//     else if (routeAdmin($location.url()) && !RoleService.validateRoleAdmin(SessionService.currentUser)) {
//       // redirect back to login
//       ev.preventDefault();
//       $location.path('/error');
//     }
//   });
//});
