/**
 * Created by Yuval on 09/03/2015.
 */

var starter = angular.module('starter');


starter.controller("settingsController", function ($scope, $state, globalsService, langService) {

    $scope.showList = false;

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


    $scope.toggleListCards = function () {
        var clinchData = globalsService.getClinchDataMenuSelection();
        //alert("clinchData="+clinchData);
        //alert("ClinchDisplayState="+globalsService.getClinchDisplayState());
        if (globalsService.getClinchDisplayState() === "cards") {
            globalsService.setClinchDisplayState("list");
            $scope.showList = true;
            if (langService.getDirection() == "ltr")
                switch (clinchData) {
                    case "clinches":
                        $state.go('ltr.clinches');
                        break;
                    case "clinchesirequested":
                        $state.go('ltr.clinchesirequested');
                        break;
                    case "requested":
                        $state.go('ltr.myrequestedclinches');
                        break;
                    case "active":
                        $state.go('ltr.activeclinches');
                        break;
                }

            else
                switch (clinchData) {
                    case "clinches":
                        $state.go('rtl.clinches');
                        break;
                    case "clinchesirequested":
                        $state.go('rtl.clinchesirequested');
                        break;
                    case "requested":
                        $state.go('rtl.myrequestedclinches');
                        break;
                    case "active":
                        $state.go('rtl.activeclinches');
                        break;
                }
        }
        else {
            globalsService.setClinchDisplayState("cards");

            $scope.showList = false;
            if (langService.getDirection() == "ltr")
                switch (clinchData) {
                    case "clinches":
                        $state.go('ltr.cards');
                        break;
                    case "clinchesirequested":
                        $state.go('ltr.cardsirequested');
                        break;
                    case "requested":
                        $state.go('ltr.myrequestedcards');
                        break;
                    case "active":
                        $state.go('ltr.activecards');
                        break;
                }

            else
                switch (clinchData) {
                    case "clinches":
                        $state.go('rtl.cards');
                        break;
                    case "clinchesirequested":
                        $state.go('rtl.cardsirequested');
                        break;
                    case "requested":
                        $state.go('rtl.myrequestedcards');
                        break;
                    case "active":
                        $state.go('rtl.activecards');
                        break;
                }
        }
    };

    $scope.watchVideoAgain = function () {
        window.localStorage.setItem("Intro", "");

        if (langService.getDirection() == "rtl")
            $state.go('rtl.intro');
        else
            $state.go('ltr.intro');
    };


    $scope.goSettingsPage = function () {

        if (langService.getDirection() == "rtl")
            $state.go('rtl.settings');
        else
            $state.go('ltr.settings');
    };


    $scope.leave = function()
    {
        if (navigator.app) {
            navigator.app.exitApp();
        } else if (navigator.device) {
            navigator.device.exitApp();
        }
    };

    $scope.logout = function()
    {
        Parse.User.logOut();
        $scope.isConnected = false; // For the message
        if (langService.getDirection() == "rtl")
            $state.go('rtl.login');
        else
            $state.go('ltr.login');
    }

    
});
