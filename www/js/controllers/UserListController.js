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


starter.controller("UserListController", function ($scope, $stateParams, $ionicHistory, $state, $ionicLoading, clinchService, langService) {
    
    //This is for the view
    $scope.selectedClinch = clinchService.getClinch($stateParams.clinchIndex);
    $scope.clinchIndex = $stateParams.clinchIndex;

    //$scope.userListByClinch = clinchService.getUserListByClinch($stateParams.clinchIndex);
    
    $scope.$on('$ionicView.enter', function () {
        //console.log('In UserListController.on- Enter');
        //console.log('In UserListController.on- $scope.selectedClinch='+$scope.selectedClinch);
        $ionicLoading.show({template: 'Loading...'});
        var dimensions = {            
            // Define ranges to bucket data points into meaningful segments
            ClinchType: ''+$scope.selectedClinch.clinchTypeId,
            ClinchRule: ''+$scope.selectedClinch.ruleId,
            User: ''+Parse.User.current().id,
            // Did the user filter the query?
            Activity: 'Entered'
        };
        // Send the dimensions to Parse along with the 'search' event
        Parse.Analytics.track('Clinch_Enter', dimensions);

        clinchService.getUserListByClinch($stateParams.clinchIndex).then(function (result) {
            //console.log('In clinchesController - Got result = '+result);
            $scope.userListByClinch = result;
            /*for(var i=0; i<result.length;i++){
                console.log('In UserListController.on- result['+i+'].fromUserBusinessName='+result[i].fromUserBusinessName);
                console.log('In UserListController.on- result['+i+'].isRequested='+result[i].isRequested);
                console.log('In UserListController.on- result['+i+'].isAccepted='+result[i].isAccepted);
            }*/
            //console.log('In UserListController.on- result='+result.length);
            $ionicLoading.hide();
        },
        function (error) {
            $ionicLoading.hide();
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
