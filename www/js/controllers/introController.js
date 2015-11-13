/**
 * Created by Yuval on 14/03/2015.
 */


var starter = angular.module('starter');


starter.controller("introController", function($scope, $state, langService) {

    //document.getElementById("vid1").play();


    $scope.next = function()
    {
        window.localStorage.setItem("Intro", "wasShown");
        //document.getElementById("vid1").pause();
        var user = Parse.User.current();
        //console.log('In introController -> user is:'+user); // print into console
        if (user) {
            //console.log('In introController -> user is logged in');
            if (langService.getDirection() == "rtl")
                $state.go('rtl.cards');
            else
                $state.go('ltr.cards');
        } else {
            //console.log('In introController -> user is not logged in');
            if (langService.getDirection() == "rtl")
                $state.go('rtl.login');
            else
                $state.go('ltr.login');
        }
    }

    $scope.play = function()
    {
        //console.log('In introController.js play function.\ndocument.getElementById("vid1") ==>'+document.getElementById("vid1")+'\n'); // print into console
        //document.getElementById("vid1").play();

    }


});
