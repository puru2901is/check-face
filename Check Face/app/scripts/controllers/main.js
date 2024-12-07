'use strict';

/**
 * @ngdoc function
 * @name checkFaceApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the checkFaceApp
 */
angular.module('checkFaceApp')
    .controller('MainCtrl', ['$scope', '$timeout', '$rootScope', 'AuthenticationService', '$location', '$cookieStore', function($scope, $timeout, $rootScope, AuthenticationService, $location, $cookieStore) {

        console.log("In MainCtrl");

        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.score = 0;
        $rootScope.activePage = 'main'
        $scope.showingCorrectOption = false;
        $scope.showingWrongOption = false;
        $scope.result = "";
        $scope.valueOfOptions = ["bani", "me", "vj", "kundan"];
        $scope.correctOption = "vj";
        $scope.image = "vj";
        $scope.theImage = ["bani", "me", "vj", "kundan"];
        $rootScope.totalNumberOfImagesShown = 0;
        $rootScope.totalNumbarOfImagesCorrectlyIdentified = 0;

        function init() {
            console.log("in init")
            timerForGameEnd(60);
        }

        //init();

        function timerForNextQuestion(value) {
            console.log("timer value is ", value)
            $scope.counter = value;
            $scope.onTimeout = function() {
                $scope.counter--;
                mytimeout = $timeout($scope.onTimeout, 1000);
                if ($scope.counter == 0) {
                    $scope.stop();
                    $scope.nextQuestion();
                }
            }
            var mytimeout = $timeout($scope.onTimeout, 1000);
            $scope.stop = function() {
                $timeout.cancel(mytimeout);
            }
        }


        function timerForGameEnd(value1) {
            console.log("timer value is ", value1)
            $rootScope.counterForGameEnd = value1;
            $scope.onTimeout1 = function() {
                $rootScope.counterForGameEnd--;
                mytimeout1 = $timeout($scope.onTimeout1, 1000);
                if ($rootScope.counterForGameEnd == 0) {
                    $scope.stopForGameEnd();
                    $rootScope.scoreOfThisGame = $scope.score;
                    $scope.finalScore = $cookieStore.get('score') + $scope.score;
                    $cookieStore.put('score', $scope.finalScore)
                    $location.path('/score');
                }
            }
            var mytimeout1 = $timeout($scope.onTimeout1, 1000);
            $scope.stopForGameEnd = function() {
                $timeout.cancel(mytimeout1);
            }
        }


        $scope.checkValue = function() {
            console.log("in checkValue");
            console.log("value is ", $scope.result);
            $scope.showingWrongOption = false;
            $scope.showingCorrectOption = false;
            if ($scope.result == $scope.correctOption) {

                $scope.showingCorrectOption = true;
                $scope.result = "";
                $scope.score = $scope.score + 100;
                console.log("$scope.score " + $scope.score)
                $rootScope.totalNumbarOfImagesCorrectlyIdentified++;
                $rootScope.totalNumberOfImagesShown++;
                timerForNextQuestion(1);

            } else {
                $scope.showingWrongOption = true;
                $scope.score = $scope.score - 25;
                console.log("$scope.score " + $scope.score);
                $rootScope.totalNumberOfImagesShown++;
                timerForNextQuestion(1);
            }

        }

        $scope.prevRandomNum = 2;
        $scope.nextQuestion = function() {
            $scope.showingWrongOption = false;
            $scope.showingCorrectOption = false;
            console.log("next face is");
            var randomNum = Math.floor(Math.random() * $scope.theImage.length);

            console.log("randomNum ", randomNum);
            console.log("prevRandomNum ", $scope.prevRandomNum);
            if (randomNum != $scope.prevRandomNum) {
                //console.log("randomNum ",randomNum);
                $scope.image = $scope.theImage[randomNum];
                $scope.correctOption = $scope.image;
                $scope.prevRandomNum = randomNum;

            } else {

                $scope.nextQuestion();
            }

        }

        $scope.logout = function() {
            console.log('logout function')
            AuthenticationService.ClearCredentials();
           // $cookieStore.remove('score');
            $location.path('/login');

        }

    }]);