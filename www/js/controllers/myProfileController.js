/**
 * Created by Yuval on 01/05/2015.
 */



var starter = angular.module('starter');

starter.controller("myProfileController", function ($scope, langService, $state, professionService, $ionicPopover, globalsService) {

	$scope.$on('$ionicView.enter', function(){
        console.log('****In myProfileController - on = ');

		var toUser = globalsService.getToUser();
		var toUserProfession = toUser.get('Profession');

	    $scope.toUserName = toUser.get('username');
	    $scope.toUserEmail = toUser.get('email');
	    $scope.toUserBusinessName = toUser.get('BusinessName');
	    var toUserLocation = toUser.get('location');
	    $scope.professionImage = toUserProfession.get('imageFileName');
	    $scope.professionName = toUserProfession.get('ProfessionName');

        var url = "https://maps.googleapis.com/maps/api/staticmap";
        var location = "?center="+toUserLocation.latitude +","+toUserLocation.longitude;
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

    $scope.goLocation = function () {
        if (langService.getDirection() == "rtl")
            $state.go('rtl.location');
        else
            $state.go('ltr.location');
    }


});