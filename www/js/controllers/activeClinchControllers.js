/**
 * Created by Yuval on 16/03/2015.
 */


var starter = angular.module('starter');


starter.controller("activeClinchController", function($scope, $stateParams, $ionicHistory, clinchService) {
    $scope.clinchId = $stateParams.clinchId;
    var index = parseInt($scope.clinchId);
    $scope.myClinch = clinchService.getActiveClinch(index);

    //google.maps.event.addDomListener(window, 'load', function() {
    $scope.$on('$ionicView.enter', function(){
        console.log('****In activeClinchController - on = ');
        var url = "https://maps.googleapis.com/maps/api/staticmap";
        var location = "?center="+$scope.myClinch.fromUserLocation.latitude +","+$scope.myClinch.fromUserLocation.longitude;
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

    $scope.goBack = function()
    {
        $ionicHistory.goBack();
    };

});

starter.controller("activeClinchesController", function($scope, $stateParams, $ionicLoading, clinchService) {

    //$scope.activeclinches = clinchService.getActiveClinches();
    $scope.$on('$ionicView.enter', function () {
        //console.log('In UserListController.on- Enter');
        //console.log('In UserListController.on- $scope.selectedClinch='+$scope.selectedClinch);
        $ionicLoading.show({template: 'Loading...'});
        clinchService.getActiveClinches().then(function (result) {
            //console.log('In clinchesController - Got result = '+result);
            $scope.activeclinches = result;
            //console.log('In UserListController.on- result='+result.length);
            $ionicLoading.hide();
        },
        function (error) {
            $ionicLoading.hide();
            console.log('In ClinchesIRequestedController - Got error = ['+error.code+'] = '+error.message);
            //alert(error.message);
            //to do - add error codes
            /*if (langService.getDirection() == "rtl"){
                $state.go('rtl.cards');
            }else{
                $state.go('ltr.cards');
            } */
        });
    });  

});

