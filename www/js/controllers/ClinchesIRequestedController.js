/**
 * Created by Yuval on 16/03/2015.
 */



var starter = angular.module('starter');


starter.controller("ClinchIRequestedController", function($scope, $stateParams, $ionicHistory, clinchService, langService, globalsService) {
    $scope.clinchId = $stateParams.clinchId;
    var index = parseInt($scope.clinchId);
    $scope.myClinch = clinchService.getMyClinch(index);

    //google.maps.event.addDomListener(window, 'load', function() {
    $scope.$on('$ionicView.enter', function(){
        //console.log('****In ClinchIRequestedController - on = ');
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

    $scope.cancelClinch = function(){
        /*var currentUser = Parse.User.current();
        var currentUserBusinessName = currentUser.get('BusinessName');
        var toUserEmail = currentUser.get('email');
        
        var params = {};                
        params.messageCode = 2000;
        params.partnerName = $scope.myClinch.partnerName;
        params.currentUserBusinessName = currentUserBusinessName;
        params.clinchType = $scope.myClinch.type;
        params.kilometersTo = $scope.myClinch.kilometersTo;
        params.longDescription = $scope.myClinch.longDescription;
        params.toUserEmail = toUserEmail;
        params.fromUserEmail = $scope.myClinch.fromEmail;
        params.langDirection = langService.getDirection();

        clinchService.sendMail(params).then(function (result) {
            //console.log('In clinchesController - Got result = '+result);
            //do?            
        },
        function (error) {
            console.log('In clinchesController - Got error = ['+error.code+'] = '+error.message);
            //alert(error.message);
            //to do - add error codes            
        });*/
        
        
        //After/Before? sending mail, create the clinch in the Clinch table
        var Clinch = Parse.Object.extend("Clinch");
        var clinch = new Parse.Query(Clinch);
        //console.log('In $scope.myClinch.id = '+ $scope.myClinch.id);
        //clinch.set("ClinchType", $scope.myClinch.objectClinchType);
        //clinch.set("FromUser", $scope.myClinch.objectFromUser);
        //clinch.set("ToUser", currentUser);
        //clinch.set("objectId", $scope.myClinch.id);
        //clinch.set("Status", "Canceled");

        clinch.get($scope.myClinch.id, {
          success: function(clinch) {
            // Execute any logic that should take place after the object is saved.
            clinch.set("Status", "Canceled");
            clinch.save();
            //alert('Clinch was canceled');
            globalsService.showMessageByCode(3006);
            $ionicHistory.goBack(); 
          },
          error: function(clinch, error) {
            globalsService.showMessageByCode(1014);
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            //alert('Failed to cancel clinch, with error code: ' + error.message);
          }
        });
        //$scope.clinchesIRequested = clinchService.getClinchesIRequested();
    }

});

starter.controller("ClinchesIRequestedController", function($scope, $stateParams, $ionicLoading, clinchService, globalsService) {

    //$scope.clinchesIRequested = clinchService.getClinchesIRequested();

    $scope.$on('$ionicView.enter', function () {
        //console.log('In UserListController.on- Enter');
        //console.log('In UserListController.on- $scope.selectedClinch='+$scope.selectedClinch);
        $ionicLoading.show({template: globalsService.getLoadingTemplate()});
        clinchService.getClinchesIRequested().then(function (result) {
            //console.log('In clinchesController - Got result = '+result.length);
            $scope.clinchesIRequested = result;
            //console.log('In UserListController.on- result='+result.length);
            $scope.$broadcast('scroll.refreshComplete');         
            $ionicLoading.hide();
        },
        function (error) {
            $scope.$broadcast('scroll.refreshComplete');         
            $ionicLoading.hide();
            console.log('In ClinchesIRequestedController - Got error = ['+error.code+'] = '+error.message);
            globalsService.showMessageByCode(1013);
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
        clinchService.getClinchesIRequested().then(function (result) {
            //console.log('In clinchesController - Got result = '+result.length);
            $scope.clinchesIRequested = result;
            //console.log('In UserListController.on- result='+result.length);
            $scope.$broadcast('scroll.refreshComplete');         
            $ionicLoading.hide();
        },
        function (error) {
            $scope.$broadcast('scroll.refreshComplete');         
            $ionicLoading.hide();
            console.log('In ClinchesIRequestedController - Got error = ['+error.code+'] = '+error.message);
            globalsService.showMessageByCode(1013);
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

