/**
 * Created by Yuval on 19/03/2015.
 */

var starter = angular.module('starter');


starter.controller("loginController", function($scope, langService, $state, clinchService, $ionicHistory, globalsService) {

    $scope.userDetails = {};

    
    $scope.login = function()
    {
        //console.log('In loginController LOGIN...');
        Parse.User.logIn($scope.userDetails.uname, $scope.userDetails.password, {
            success: function (user) {
                globalsService.fetchToUser();
                $scope.goClinches();
            },
            error: function (user, error) {
                $scope.failMessage = true;
            }
        });
    };


    $scope.goClinches = function(){
        
        //console.log('In loginController cleaning cache');
        //$ionicHistory.clearCache();
        //$ionicHistory.clearHistory();
        //console.log('In loginController Sending a reload request with FALSE...');
        //clinchService.getClinches(false);
       
        if (langService.getDirection() == "rtl"){
            //$state.go('rtl.clinches');
            //clinchService.getClinches(true);
            $state.go('rtl.cards');
        }else{
            //$state.go('ltr.clinches');
            //clinchService.getClinches(true);
            $state.go('ltr.cards');
        }
    }
    
    $scope.goSignUp = function()
    {
        if (langService.getDirection() == "rtl")
            $state.go('rtl.signup');
        else
            $state.go('ltr.signup');
    }

    $scope.hideErrorMessage = function()
    {
        $scope.failMessage=false;
    }

    /*$scope.$on('$ionicView.beforeLeave', function (event, toState, toParams, fromState, fromParams, error) {
        //Clean the cahce before going to Clinch view
        console.log('In clinchesController cleaning cache');
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
    });*/

});