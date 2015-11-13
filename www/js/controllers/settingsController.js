/**
 * Created by Yuval on 09/03/2015.
 */

var starter = angular.module('starter');


starter.controller("settingsController", function ($scope, $state, globalsService, langService, clinchData) {

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
        if (globalsService.getClinchDisplayState() === "cards") {
            globalsService.setClinchDisplayState("list");
            $scope.showList = true;
            if (langService.getDirection() == "ltr")
                switch (clinchData) {
                    case "clinches":
                        $state.go('ltr.clinches');
                        break;
                    case "myclinches":
                        $state.go('ltr.myclinches');
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
                    case "myclinches":
                        $state.go('rtl.myclinches');
                        break;
                    case "requested":
                        $state.go('rtl.myrequestedclinch');
                        break;
                    case "active":
                        $state.go('rtl.activeclinch');
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
                    case "myclinches":
                        $state.go('ltr.mycards');
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
                    case "myclinches":
                        $state.go('rtl.mycards');
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
