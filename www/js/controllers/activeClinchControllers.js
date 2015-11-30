/**
 * Created by Yuval on 16/03/2015.
 */


var starter = angular.module('starter');


starter.controller("activeClinchController", function($scope, $stateParams, clinchService) {
    $scope.clinchId = $stateParams.clinchId;
    var index = parseInt($scope.clinchId);
    $scope.myClinch = clinchService.getActiveClinch(index-1);

    //google.maps.event.addDomListener(window, 'load', function() {
    $scope.$on('$ionicView.enter', function(){
        console.log('****In activeClinchController - on = ');
        var url = "https://maps.googleapis.com/maps/api/staticmap";
        var location = "?center="+$scope.myClinch.partnerLocation.latitude +","+$scope.myClinch.partnerLocation.longitude;
        var zoom = "&zoom=15";
        var size = "&size=300x160";
        var maptype = "&maptype=roadmap";
        var key = "&key=AIzaSyAWkXfBKSmL0YO5RRURIm6cfe4ouT8CJx8";
        //var sensor = "&sensor=false";

        var all = url + location + zoom + size + maptype + key;// + sensor;
        //document.getElementById('my-image-id').src =
        //    "http://maps.google.com/staticmap?center=37.687,-122.407&zoom=8&size=450x300&maptype=terrain&key=[my key here]&sensor=false"
        document.getElementById('theMap').src = all;
    });

});

starter.controller("activeClinchesController", function($scope, $stateParams, clinchService) {

    $scope.activeclinches = clinchService.getActiveClinches();

});

