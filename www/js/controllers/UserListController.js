/**
 * Created by Yuval on 02/03/2015.
 */

var starter = angular.module('starter');


//function initialize() {
//    var mapOptions = {
//        center: new google.maps.LatLng(32.062588,34.7830674),
//        zoom: 17
//    };
//    var map = new google.maps.Map(document.getElementById("map-canvas"),
//        mapOptions);
//}


starter.controller("UserListController", function ($scope, $stateParams, $ionicHistory, clinchService, langService) {
    
    //This is for the view
    $scope.selectedClinch = clinchService.getClinch($stateParams.clinchIndex);
    $scope.clinchIndex = $stateParams.clinchIndex;
    
    $scope.$on('$ionicView.enter', function () {
        //console.log('In UserListController.on- Enter');
        //console.log('In UserListController.on- $scope.selectedClinch='+$scope.selectedClinch);
        
        clinchService.getUserListByClinch($stateParams.clinchIndex).then(function (result) {
            //console.log('In clinchesController - Got result = '+result);
            $scope.userListByClinch = result;
            console.log('In UserListController.on- result='+result.length);
        },
        function (error) {
            console.log('In UserListController - Got error = ['+error.code+'] = '+error.message);
            //alert(error.message);
            //to do - add error codes
            if (langService.getDirection() == "rtl"){
                $state.go('rtl.cards');
            }else{
                $state.go('ltr.cards');
            } 
        });
    });  

    $scope.goBack = function()
    {
        $ionicHistory.goBack();
    };
        

});
