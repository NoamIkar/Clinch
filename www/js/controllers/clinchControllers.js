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


starter.controller("clinchController", function ($scope, $stateParams, $ionicHistory, clinchService, langService, globalsService) {
    
    $scope.userClinchIndex = $stateParams.userClinchIndex;
    $scope.userClinch = clinchService.getUserByClinch($stateParams.userClinchIndex);

    $scope.clinchIndex = $stateParams.clinchIndex;
    $scope.selectedClinch = clinchService.getClinch($stateParams.clinchIndex);
    
    

    //google.maps.event.addDomListener(window, 'load', function() {
    $scope.$on('$ionicView.enter', function () {
        //console.log('****In clinchController - on = ');
        //console.log('In clinchesController userClinch='+$scope.userClinch);
        //console.log('In clinchesController userClinch.isRequested='+$scope.userClinch.isRequested);
        //console.log('In clinchesController userClinch.isAccepted='+$scope.userClinch.isAccepted);
        //console.log('In clinchesController userClinch.logic='+(!$scope.userClinch.isRequested && !$scope.userClinch.isAccepted));

        var url = "https://maps.googleapis.com/maps/api/staticmap";
        //var location = "?center=32.191697,34.892365"; // Buy the Way Kfar-Saba
        var location = "?center="+$scope.userClinch.fromUserLocation.latitude +","+$scope.userClinch.fromUserLocation.longitude;
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

    $scope.requestClinch = function(){
        clinchService.requestClinch($scope.clinchIndex, $scope.userClinchIndex).then(function (result) {    
            clinchService.getUserByClinch($stateParams.userClinchIndex).isRequested = true;                
            $ionicHistory.goBack();            
        },
        function (error) {
            console.log('In clinchesController - Got error = ['+error.code+'] = '+error.message);
            //alert(error.message);
            switch(error.code){                
                case 141:
                    switch(error.message){
                        case 1010:
                        case '1010':
                            globalsService.showMessageByCode(1010);
                            break;
                        case 1011:
                        case '1011':
                            globalsService.showMessageByCode(1011);
                            break;
                        default:
                            globalsService.showMessageByCode(error.message);
                            break;
                    }                            
                    break;
                default:
                    globalsService.showMessageByCode(error.code);
                    break;
            } 
        });
        
    };

    $scope.goBack = function()
    {
        $ionicHistory.goBack();
        //$ionicHistory.backView();
    };

});

starter.controller("clinchesController", function ($scope, $stateParams, clinchService, langService, $state, $ionicHistory, $ionicLoading, globalsService) {
    
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


//alert("$scope.clinches="+$scope.clinches);
//if(!$scope.clinches){                
                $ionicLoading.show({template: '<h2>'+globalsService.getLoadingTemplate()+'</h2><ion-spinner></ion-spinner><br><img src="img/logo.png" alt="" width="74" height="48" />',
                                   //content: 'Loading',
                                   animation: 'fade-in',
                                   showBackdrop: true,
                                   maxWidth: 300,
                                   showDelay: 0,
                                   hideOnStateChange: true});


                clinchService.fetchClinches().then(function (result) {
                    //console.log('In clinchesController - Got result = '+result);
                    $scope.clinches = result;
                    $ionicLoading.hide();
                },
                function (error) {
                    $ionicLoading.hide();
                    handleError(error);
                    /*console.log('In clinchesController - Got error = ['+error.code+'] = '+error.message);
                    //alert(error.message);
                    switch(error.code){
                        case 100:
                            globalsService.showMessageByCode(1003);
                            break;
                        case 141:
                            switch(error.message){
                                case 1008:
                                case '1008':
                                    globalsService.showMessageByCode(1008);
                                    if (langService.getDirection() == "rtl"){
                                        $state.go('rtl.login');
                                    }else{
                                        $state.go('ltr.login');
                                    }
                                    break;
                                case 1004:
                                case '1004':
                                    globalsService.showMessageByCode(1004);
                                    if (langService.getDirection() == "rtl"){
                                        $state.go('rtl.profession');
                                    }else{
                                        $state.go('ltr.profession');
                                    }
                                    break;
                                case 1009:
                                case '1009':
                                    globalsService.showMessageByCode(1009);
                                    if (langService.getDirection() == "rtl"){
                                        $state.go('rtl.location');
                                    }else{
                                        $state.go('ltr.location');
                                    }
                                    break;
                                default:
                                    globalsService.showMessageByCode(error.message);
                                    break;
                            }                            
                            break;
                        default:
                            globalsService.showMessageByCode(1000);
                            break;
                    } */
                });
                //$scope.$broadcast('$ionicView.beforeEnter');
  //  }
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

    $scope.goUser = function(){
        //console.log('In clinchesController - goUser');
        //Thought about adding Analytics here, but moved to UserListController onLoad
 
    }



    $scope.doRefresh = function() {
        //console.log('In clinchesController - doRefresh');
        
        $ionicLoading.show({template: globalsService.getLoadingTemplate()});
        clinchService.fetchClinches().then(function (result) {
            //console.log('In doRefresh - Got result = '+result.length);
            $scope.clinches = result;
        },
        function (error) {
            //console.log('In clinchesController - Got error = '+error.message);
            //alert(error.message);
            handleError(error);
        });         
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');         
        $ionicLoading.hide();
      };

      handleError = function(error){
        console.log('In clinchesController - Got error = ['+error.code+'] = '+error.message);
        //alert(error.message);
        switch(error.code){
            case 100:
                globalsService.showMessageByCode(1003);
                break;
            case 141:
                switch(error.message){
                    case 1008:
                    case '1008':
                        globalsService.showMessageByCode(1008);
                        if (langService.getDirection() == "rtl"){
                            $state.go('rtl.login');
                        }else{
                            $state.go('ltr.login');
                        }
                        break;
                    case 1004:
                    case '1004':
                        globalsService.showMessageByCode(1004);
                        if (langService.getDirection() == "rtl"){
                            $state.go('rtl.profession');
                        }else{
                            $state.go('ltr.profession');
                        }
                        break;
                    case 1009:
                    case '1009':
                        globalsService.showMessageByCode(1009);
                        if (langService.getDirection() == "rtl"){
                            $state.go('rtl.location');
                        }else{
                            $state.go('ltr.location');
                        }
                        break;
                    default:
                        globalsService.showMessageByCode(error.message);
                        break;
                }                            
                break;
            default:
                globalsService.showMessageByCode(error.code);
                break;
        } 
      }
});


