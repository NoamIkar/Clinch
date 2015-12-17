/**
 * Created by Yuval on 16/03/2015.
 */


var starter = angular.module('starter');


starter.controller("myRequestedClinchController", function($scope, $stateParams,  $ionicHistory, clinchService, langService, globalsService) {
    $scope.clinchId = $stateParams.clinchId;
    var index = parseInt($scope.clinchId);
    $scope.myClinch = clinchService.getRequestedClinch(index);

    //google.maps.event.addDomListener(window, 'load', function() {
    $scope.$on('$ionicView.enter', function(){
        console.log('****In myRequestedClinchController - on = ');
        var url = "https://maps.googleapis.com/maps/api/staticmap";
        var location = "?center="+$scope.myClinch.fromUserLocation.latitude +","+$scope.myClinch.fromUserLocation.longitude;
        var zoom = "&zoom=15";
        var size = "&size=300x160";
        var maptype = "&maptype=roadmap";
        var key = "&key=AIzaSyAWkXfBKSmL0YO5RRURIm6cfe4ouT8CJx8";
        var language = {};
        if(langService.getCurrentLanguage() === "he"){
            language = '&language=iw';
        }else{
            language = '&language=en';
        }
        //var sensor = "&sensor=false";

        var all = url + location + zoom + size + maptype + key + language;
        //document.getElementById('my-image-id').src =
        //    "http://maps.google.com/staticmap?center=37.687,-122.407&zoom=8&size=450x300&maptype=terrain&key=[my key here]&sensor=false"
        document.getElementById('theMap').src = all;
    });

    $scope.goBack = function()
    {
        $ionicHistory.goBack();
    };

    $scope.acceptClinch = function(){
        clinchService.acceptClinch($scope.clinchId).then(function (result) {
            globalsService.showMessageByCode(3004);
            $ionicHistory.goBack(); 
        }, function (error) {
            console.log('In myRequestedClinchesController - Got error = ['+error.code+'] = '+error.message);
            globalsService.showMessageByCode(1015);
        });
        //$scope.clinchesIRequested = clinchService.getClinchesIRequested();
    }

    $scope.declineClinch = function(){
        clinchService.declineClinch($scope.clinchId).then(function (result) {
            globalsService.showMessageByCode(3005);
            $ionicHistory.goBack(); 
        }, function (error) {
            console.log('In myRequestedClinchesController - Got error = ['+error.code+'] = '+error.message);
            globalsService.showMessageByCode(1016);
        });
        //$scope.clinchesIRequested = clinchService.getClinchesIRequested();
    }

});


starter.controller("myRequestedClinchesController", function($scope, $stateParams, $ionicLoading, clinchService, globalsService) {

    //$scope.myrequestedclinches = clinchService.getRequestedClinches();

    $scope.$on('$ionicView.enter', function () {
        //console.log('In UserListController.on- Enter');
        //console.log('In UserListController.on- $scope.selectedClinch='+$scope.selectedClinch);
        $ionicLoading.show({template: globalsService.getLoadingTemplate()});
        clinchService.getRequestedClinches().then(function (result) {
            //console.log('In clinchesController - Got result = '+result);
            $scope.myrequestedclinches = result;
            //console.log('In UserListController.on- result='+result.length);
            $scope.$broadcast('scroll.refreshComplete');         
            $ionicLoading.hide();
        },
        function (error) {
            $scope.$broadcast('scroll.refreshComplete');         
            $ionicLoading.hide();
            globalsService.showMessageByCode(1013);
            console.log('In myRequestedClinchesController - Got error = ['+error.code+'] = '+error.message);
            //alert(error.message);
            //to do - add error codes
            /*if (langService.getDirection() == "rtl"){
                $state.go('rtl.cards');
            }else{
                $state.go('ltr.cards');
            } */
        });
    });  

    $scope.doRefresh = function() {
        //console.log('In clinchesController - doRefresh');
        
        $ionicLoading.show({template: globalsService.getLoadingTemplate()});
        clinchService.getRequestedClinches().then(function (result) {
            //console.log('In clinchesController - Got result = '+result);
            $scope.myrequestedclinches = result;
            //console.log('In UserListController.on- result='+result.length);
            $scope.$broadcast('scroll.refreshComplete');         
            $ionicLoading.hide();
        },
        function (error) {
            $scope.$broadcast('scroll.refreshComplete');         
            $ionicLoading.hide();
            globalsService.showMessageByCode(1013);
            console.log('In myRequestedClinchesController - Got error = ['+error.code+'] = '+error.message);
            //alert(error.message);
            //to do - add error codes
            /*if (langService.getDirection() == "rtl"){
                $state.go('rtl.cards');
            }else{
                $state.go('ltr.cards');
            } */
        });

    }


});
