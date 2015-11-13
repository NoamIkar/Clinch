/**
 * Created by Yuval on 01/05/2015.
 */



var starter = angular.module('starter');


starter.controller("myProfileController", function ($scope, langService, $state, professionService, $ionicPopover) {


    $scope.goLocation = function () {
        if (langService.getDirection() == "rtl")
            $state.go('rtl.location');
        else
            $state.go('ltr.location');
    }


});