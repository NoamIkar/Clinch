/**
 * Created by Yuval on 19/03/2015.
 */

var starter = angular.module('starter');


starter.controller("loginController", function($scope, langService, $state, clinchService, $ionicHistory, $ionicLoading, globalsService) {

    $scope.userDetails = {};
    $scope.errorMessage = '';

    $scope.$on('$ionicView.enter', function () {
        //console.log('In loginController cleaning cache');
        //$ionicHistory.clearCache();
        //$ionicHistory.clearHistory();
        $scope.userDetails = {};
        $scope.errorMessage = '';
        $scope.userDetails.password = '';
        $scope.userDetails.uname = '';
    });
    
    $scope.login = function()
    {
        //console.log('In loginController LOGIN...');
        if(!$scope.userDetails.uname) {
            $scope.errorMesage = globalsService.showMessageByCode(1018);
            $scope.showError = true;
            return;
        }
        if($scope.userDetails.uname.length < 4 || $scope.userDetails.uname.length > 30) {
            $scope.errorMesage = globalsService.showMessageByCode(1019);
            $scope.showError = true;
            return;
        }
        if(!$scope.userDetails.password) {
            $scope.errorMesage = globalsService.showMessageByCode(1020);
            $scope.showError = true;
            return;
        }
        if($scope.userDetails.password.length < 4 || $scope.userDetails.password.length > 16) {
            $scope.errorMesage = globalsService.showMessageByCode(1021);
            $scope.showError = true;
            return;
        }
        
        $ionicLoading.show({template: globalsService.getLoadingTemplate()});
        Parse.User.logIn($scope.userDetails.uname, $scope.userDetails.password, {
            success: function (user) {
                $ionicLoading.hide();
                globalsService.fetchToUser();
                $scope.goClinches();
            },
            error: function (user, error) {
                //console.log('In loginController error code='+error.code);
                $scope.failMessage = true;
                //$scope.errorMessage = error.message && error.message[0].toUpperCase() + error.message.slice(1);
                globalsService.showMessageByCode(1001);
                $ionicLoading.hide();
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