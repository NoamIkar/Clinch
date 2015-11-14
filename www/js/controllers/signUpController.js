/**
 * Created by Yuval on 09/05/2015.
 */




var starter = angular.module('starter');


starter.controller("signUpController", function ($scope, langService, $state) {

    $scope.userDetails = {};

    /*$scope.$on('$ionicView.enter', function () {
        var i=5;
    });*/
    $scope.signUp = function () {

        var user = new Parse.User();
        user.set("username", $scope.userDetails.uname);
        user.set("password", $scope.userDetails.password);
        user.set("email", $scope.userDetails.email);
        user.set("BusinessName", $scope.userDetails.businessName);

        user.signUp(null, {
            success: function (user) {
                $scope.goProfession();
            },
            error: function (user, error) {
                // Show the error message somewhere and let the user try again.
                //alert("Error: " + error.code + " " + error.message);
                $scope.errorMesage = error.message;
                $scope.showError = true;
            }
        });
    };

    $scope.goProfession = function(){
        if (langService.getDirection() == "rtl")
            $state.go('rtl.profession');
        else
            $state.go('ltr.profession');
    }

});
