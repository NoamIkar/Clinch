/**
 * Created by Yuval on 16/03/2015.
 */


var starter = angular.module('starter');


starter.controller("myRequestedClinchController", function($scope, $stateParams,  $ionicHistory, clinchService, langService) {
    $scope.clinchId = $stateParams.clinchId;
    var index = parseInt($scope.clinchId);
    $scope.myClinch = clinchService.getRequestedClinch(index-1);

    //google.maps.event.addDomListener(window, 'load', function() {
    $scope.$on('$ionicView.enter', function(){
        console.log('****In myRequestedClinchController - on = ');
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

    $scope.goBack = function()
    {
        $ionicHistory.goBack();
    };

    $scope.acceptClinch = function(){
        var currentUser = Parse.User.current();
        var currentUserBusinessName = currentUser.get('BusinessName');
        var toUserEmail = currentUser.get('email');
        
        var params = {};                
        params.messageCode = 2001;
        params.partnerName = $scope.myClinch.partnerName;
        params.currentUserBusinessName = currentUserBusinessName;
        params.clinchType = $scope.myClinch.type;
        params.kilometersTo = $scope.myClinch.kilometersTo;
        params.longDescription = $scope.myClinch.longDescription;
        params.toUserEmail = toUserEmail;
        params.fromUserEmail = $scope.myClinch.fromEmail;
        params.langDirection = langService.getDirection();

        clinchService.sendMail(params).then(function (result) {
            //console.log('In myRequestedClinchController - Got result = '+result);
            //do?            
        },
        function (error) {
            console.log('In myRequestedClinchController - Got error = ['+error.code+'] = '+error.message);
            //alert(error.message);
            //to do - add error codes            
        });
        
        
        //After/Before? sending mail, update the clinch in the Clinch table
        var Clinch = Parse.Object.extend("Clinch");
        var clinch = new Parse.Query(Clinch);
        console.log('In $scope.myClinch.id = '+ $scope.myClinch.id);
        //clinch.set("ClinchType", $scope.myClinch.objectClinchType);
        //clinch.set("FromUser", $scope.myClinch.objectFromUser);
        //clinch.set("ToUser", currentUser);
        //clinch.set("objectId", $scope.myClinch.id);
        //clinch.set("Status", "Canceled");

        clinch.get($scope.myClinch.id, {
          success: function(clinch) {
            // Execute any logic that should take place after the object is saved.
            clinch.set("Status", "Accepted");
            clinch.save();
            alert('Clinch was Accepted');
          },
          error: function(clinch, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to accept clinch, with error code: ' + error.message);
          }
        });
        //$scope.clinchesIRequested = clinchService.getClinchesIRequested();
    }

    $scope.declineClinch = function(){
        var currentUser = Parse.User.current();
        var currentUserBusinessName = currentUser.get('BusinessName');
        var toUserEmail = currentUser.get('email');
        
        var params = {};                
        params.messageCode = 2002;
        params.partnerName = $scope.myClinch.partnerName;
        params.currentUserBusinessName = currentUserBusinessName;
        params.clinchType = $scope.myClinch.type;
        params.kilometersTo = $scope.myClinch.kilometersTo;
        params.longDescription = $scope.myClinch.longDescription;
        params.toUserEmail = toUserEmail;
        params.fromUserEmail = $scope.myClinch.fromEmail;
        params.langDirection = langService.getDirection();

        clinchService.sendMail(params).then(function (result) {
            //console.log('In myRequestedClinchController - Got result = '+result);
            //do?            
        },
        function (error) {
            console.log('In myRequestedClinchController - Got error = ['+error.code+'] = '+error.message);
            //alert(error.message);
            //to do - add error codes            
        });
        
        
        //After/Before? sending mail, update the clinch in the Clinch table
        var Clinch = Parse.Object.extend("Clinch");
        var clinch = new Parse.Query(Clinch);
        console.log('In $scope.myClinch.id = '+ $scope.myClinch.id);
        //clinch.set("ClinchType", $scope.myClinch.objectClinchType);
        //clinch.set("FromUser", $scope.myClinch.objectFromUser);
        //clinch.set("ToUser", currentUser);
        //clinch.set("objectId", $scope.myClinch.id);
        //clinch.set("Status", "Canceled");

        clinch.get($scope.myClinch.id, {
          success: function(clinch) {
            // Execute any logic that should take place after the object is saved.
            clinch.set("Status", "Declined");
            clinch.save();
            alert('Clinch was Declined');
          },
          error: function(clinch, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to decline clinch, with error code: ' + error.message);
          }
        });
        //$scope.clinchesIRequested = clinchService.getClinchesIRequested();
    }

});


starter.controller("myRequestedClinchesController", function($scope, $stateParams, clinchService) {

    $scope.myrequestedclinches = clinchService.getRequestedClinches();


});
