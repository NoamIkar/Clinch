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


starter.controller("clinchController", function ($scope, $stateParams, $ionicHistory, clinchService, langService) {
    
    $scope.userClinchIndex = $stateParams.userClinchIndex;
    $scope.userClinch = clinchService.getUserByClinch($stateParams.userClinchIndex);

    $scope.clinchIndex = $stateParams.clinchIndex;
    $scope.selectedClinch = clinchService.getClinch($stateParams.clinchIndex);
    
    

    //google.maps.event.addDomListener(window, 'load', function() {
    $scope.$on('$ionicView.enter', function () {
        //console.log('****In clinchController - on = ');

        var url = "https://maps.googleapis.com/maps/api/staticmap";
        //var location = "?center=32.191697,34.892365"; // Buy the Way Kfar-Saba
        var location = "?center="+$scope.userClinch.fromUserLocation.latitude +","+$scope.userClinch.fromUserLocation.longitude;
        var zoom = "&zoom=15";
        var size = "&size=300x160";
        var maptype = "&maptype=roadmap";
        var key = "&key=AIzaSyAWkXfBKSmL0YO5RRURIm6cfe4ouT8CJx8";
        //var sensor = "&sensor=false";

        var all = url + location + zoom + size + maptype + key;
        //document.getElementById('my-image-id').src =
        //    "http://maps.google.com/staticmap?center=37.687,-122.407&zoom=8&size=450x300&maptype=terrain&key=[my key here]&sensor=false"
        document.getElementById('theMap').src = all;

    });

    $scope.requestClinch = function(){
        clinchService.requestClinch($scope.clinchIndex, $scope.userClinchIndex).then(function (result) {                    
            $ionicHistory.goBack();            
        },
        function (error) {
        
        });
        
    }

    $scope.goBack = function()
    {
        $ionicHistory.goBack();
        //$ionicHistory.backView();
    };

});

starter.controller("clinchesController", function ($scope, $stateParams, clinchService, langService, $state, $ionicHistory, $ionicLoading) {
    
    //console.log('In clinchesController -> function');
    $scope.$on('$ionicView.beforeEnter', function (event, toState, toParams, fromState, fromParams, error) {
        if(error){
            console.log('In clinchesController GOT ERROR='+error);
        }
        if((toState.stateName === 'rtl.clinches') ||(toState.stateName === 'ltr.clinches')
            || (toState.stateName === 'rtl.cards') ||(toState.stateName === 'ltr.cards'))
        {
            var currentUser = Parse.User.current();
            if (currentUser) {
                //console.log('In clinchesController -> function on');
                /*console.log('In clinchesController Cleaning Chace and Sending a reload request with TRUE...');
                $ionicHistory.clearCache();
                $ionicHistory.clearHistory();
                $scope.clinches = clinchService.getClinches(true);*/
                //Set the clinches on the scope to allow the ng-repeat on the cards.html
                //console.log('In clinchesController Sending a fetchClinches request...');
                //$scope.clinches = clinchService.getClinches(true);
                
                $ionicLoading.show({template: 'Loading...'});
  
                clinchService.fetchClinches().then(function (result) {
                    //console.log('In clinchesController - Got result = '+result);
                    $scope.clinches = result;
                    $ionicLoading.hide();
                },
                function (error) {
                    $ionicLoading.hide();
                    console.log('In clinchesController - Got error = ['+error.code+'] = '+error.message);
                    alert(error.message);
                    //to do - add error codes
                    if(error.message.search("Profession")>-1){
                        if (langService.getDirection() == "rtl"){
                            $state.go('rtl.profession');
                        }else{
                            $state.go('ltr.profession');
                        }
                    } else if (error.message.search("Location")>-1){
                        if (langService.getDirection() == "rtl"){
                            $state.go('rtl.location');
                        }else{
                            $state.go('ltr.location');
                        }
                    } 
                });
                //$scope.$broadcast('$ionicView.beforeEnter');
                
            } else {
                // Not logged in - sign up
                //Clean the cahce before going to Clinch view
                //console.log('In clinchesController cleaning cache');
                //$ionicHistory.clearCache();
                //$ionicHistory.clearHistory();
                if (langService.getDirection() == "rtl"){
                    $state.go('rtl.login');
                }else{
                    $state.go('ltr.login');
                }
            }
        }
    });



    $scope.doRefresh = function() {
        //console.log('In clinchesController - doRefresh');
        
        $ionicLoading.show({template: 'Loading...'});
        clinchService.fetchClinches().then(function (result) {
            //console.log('In doRefresh - Got result = '+result.length);
            $scope.clinches = result;
        },
        function (error) {
            console.log('In clinchesController - Got error = '+error.message);
            alert(error.message);
        });         
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');         
        $ionicLoading.hide();
      };
});


