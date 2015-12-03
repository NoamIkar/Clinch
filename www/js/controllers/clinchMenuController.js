/**
 * Created by Yuval on 13/03/2015.
 */


/**
 * Created by Yuval on 09/03/2015.
 */

var starter = angular.module('starter');

starter.value("clinchData", "clinches");

// clinchDisplayState - "list" or "cards"
// langService.getDirection()  - "rtl" or "ltr"
// clinchData -  One of the four types: "clinches", "clinchesirequested" , "requested", "active"

starter.controller("clinchMenuController", function ($scope, $state, globalsService, langService) {

    $scope.$watch(function(scope) {
            return Parse.User.current()
        },
        function(newValue, oldValue ){
            if (newValue) {
                $scope.isConnected = true;
            } else {
                $scope.isConnected = false;
            }
        }
    );

    //*****   Clinches
    $scope.goClinches = function () {
        starter.value("clinchData", "clinches");
        var clinchDisplayState = globalsService.getClinchDisplayState();

        if (langService.getDirection() === "rtl")
            if (clinchDisplayState == "list")
                $state.go('rtl.clinches');
            else
                $state.go('rtl.cards');
        else if (clinchDisplayState == "list")
            $state.go('ltr.clinches');
        else
            $state.go('ltr.cards');
    }


    //*****   My Clinches
    $scope.goMyClinches = function () {
        var clinchDisplayState = globalsService.getClinchDisplayState();

        starter.value("clinchData", "clinchesirequested");

        if (langService.getDirection() === "rtl")
            if (clinchDisplayState == "list")
                $state.go('rtl.clinchesirequested');
            else
                $state.go('rtl.cardsirequested');
        else if (clinchDisplayState == "list")
            $state.go('ltr.clinchesirequested');
        else
            $state.go('ltr.cardsirequested');
    }


    //*****   My Requested Clinches
    $scope.goMyRequestedClinches = function () {

        var clinchDisplayState = globalsService.getClinchDisplayState();

        starter.value("clinchData", "requested");

        if (langService.getDirection() === "rtl")
            if (clinchDisplayState == "list")
                $state.go('rtl.myrequestedclinches');
            else
                $state.go('rtl.myrequestedcards');
        else
            if (clinchDisplayState == "list")
                $state.go('ltr.myrequestedclinches');
            else
                $state.go('ltr.myrequestedcards');
    }



    //*****   My Active Clinches
    $scope.goActiveClinches = function () {
        starter.value("clinchData", "active");
        var clinchDisplayState = globalsService.getClinchDisplayState();

        if (langService.getDirection() === "rtl")
            if (clinchDisplayState == "list")
                $state.go('rtl.activeclinches');
            else
                $state.go('rtl.activecards');
        else
            if (clinchDisplayState == "list")
                $state.go('ltr.activeclinches');
            else
                $state.go('ltr.activecards');
    }

    //*********** goMyProfile
    $scope.goMyProfile = function () {
        //starter.value("clinchData", "active");
        var clinchDisplayState = globalsService.getClinchDisplayState();

        if (langService.getDirection() === "rtl")
            if (clinchDisplayState == "list")
                $state.go('rtl.myprofile');
            else
                $state.go('rtl.myprofile');
        else
            if (clinchDisplayState == "list")
                $state.go('ltr.myprofile');
            else
                $state.go('ltr.myprofile');
    }

});
