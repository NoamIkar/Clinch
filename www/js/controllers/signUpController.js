/**
 * Created by Yuval on 09/05/2015.
 */




var starter = angular.module('starter');


starter.controller("signUpController", function ($scope, langService, $state, globalsService, $ionicLoading) {

    $scope.userDetails = {};

    /*$scope.$on('$ionicView.enter', function () {
        var i=5;
    });*/
    $scope.$on('$ionicView.enter', function () {
        //console.log('In loginController cleaning cache');
        //$ionicHistory.clearCache();
        //$ionicHistory.clearHistory();
        //$scope.userDetails = {};
        $scope.errorMesage = '';
        $scope.userDetails.uname = '';
        $scope.userDetails.password = '';
        $scope.userDetails.email = '';
        $scope.userDetails.businessName = '';
    });

    $scope.signUp = function () {
//console.log('In loginController $scope.userDetails.uname='+$scope.userDetails.uname);        
//console.log('In loginController $scope.userDetails.email='+$scope.userDetails.email); 
        

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
        /*if(!$scope.userDetails.email) {
            $scope.errorMesage = globalsService.showMessageByCode(1024);
            $scope.showError = true;
            return;
        }*/
        var pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!pattern.test($scope.userDetails.email)) {
            $scope.errorMesage = globalsService.showMessageByCode(1022);
            $scope.showError = true;
            return;
        }
        /*if($scope.userDetails.email.length < 4 || $scope.userDetails.email.length > 30) {
            $scope.errorMesage = globalsService.showMessageByCode(1019);
            $scope.showError = true;
            return;
        }*/
        if(!$scope.userDetails.businessName) {
            $scope.errorMesage = globalsService.showMessageByCode(1025);
            $scope.showError = true;
            return;
        }
        if($scope.userDetails.businessName.length < 4 || $scope.userDetails.businessName.length > 30) {
            $scope.errorMesage = globalsService.showMessageByCode(1023);
            $scope.showError = true;
            return;
        }

        $ionicLoading.show({template: globalsService.getLoadingTemplate()});

        var user = new Parse.User();
        user.set("username", $scope.userDetails.uname);
        user.set("password", $scope.userDetails.password);
        user.set("email", $scope.userDetails.email);
        user.set("BusinessName", $scope.userDetails.businessName);
        user.set("Locale", langService.getCurrentLanguage());

        user.signUp(null, {
            success: function (user) {
                $ionicLoading.hide();
                $scope.goProfession();
            },
            error: function (user, error) {
                // Show the error message somewhere and let the user try again.
                //alert("Error: " + error.code + " " + error.message);
                //$scope.errorMesage = error.message;
                $scope.errorMesage = globalsService.showMessageByCode(1002);
                $scope.showError = true;
                $ionicLoading.hide();
            }
        });
    };

    $scope.goProfession = function(){
        if (langService.getDirection() == "rtl")
            $state.go('rtl.profession');
        else
            $state.go('ltr.profession');
    }

    $scope.goLogin = function(){
        if (langService.getDirection() == "rtl")
            $state.go('rtl.login');
        else
            $state.go('ltr.login');
    }

});
