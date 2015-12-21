/**
 * Created by Yuval on 25/03/2015.
 */

/**
 * Created by Yuval on 20/03/2015.
 */

var starter = angular.module('starter');
var map;
var marker;

starter.controller("locationController", function($scope, langService, clinchService, $state, $cordovaGeolocation, $ionicLoading, $ionicHistory, globalsService) {

    $scope.goClinches = function(){
        //Clean the cahce before going to Clinch view
        //console.log('In locationController cleaning cache');
        //$ionicHistory.clearCache();
        //$ionicHistory.clearHistory();
        //reload the clinches for this user
        //console.log('In locationController Sending a reload request with FALSE...');
        //clinchService.getClinches(false);
        //globalsService.fetchToUser();
        if (langService.getDirection() == "rtl")
            $state.go('rtl.cards');
        else
            $state.go('ltr.cards');
    }

    $scope.saveLocation = function()
    {
        //console.log('In locationController.saveLocation -> position:'+marker.getPosition());
        var position = marker.getPosition();
        var point = new Parse.GeoPoint(position.lat(), position.lng());
        var user = Parse.User.current();
        user.set("location", point);
        user.save();

        $scope.goClinches();
    }


    $scope.$on('$ionicView.enter', function(){
        //console.log('In locationController.scope.on');
        /*document.addEventListener("deviceready", onDeviceReady, false);
        
        function onDeviceReady() {
            console.log("navigator.geolocation works well");
        }*/
        /*$ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });*/
        var language = {};
        if(langService.getCurrentLanguage() === "he"){
            language = 'iw';
        }else{
            language = 'en';
        }
        
        var theDiv = document.getElementById("map");
        var mapOptions = {
            //center: new google.maps.LatLng(32.086697, 34.789748),
            zoom: 17,
            disableDefaultUI: true,
            zoomControl: true
        };
        
        map = new google.maps.Map(theDiv,mapOptions);
             
        //google.maps.event.addListener(map, 'click', function(event) {

        //Try finding user location
        /*console.log('Tring to set User location1...');
        Parse.GeoPoint.current({
            success: function (point) {
                //use current location
                console.log('User location is:'+point);
                alert('User location is:'+point);
                map.setCenter(point);
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });*/

         
             
        
//          infoWindow = new google.maps.InfoWindow({map: map});

          // Try HTML5 geolocation.
          var myLocationObj = globalsService.getErrorMessage(3001);
          var myLocation = {};
          if(!myLocationObj){
            if(langService.getCurrentLanguage() === "he"){
                myLocation = 'העסק שלי';
            }else{
                myLocation = 'My Business';
            }
          }else{
            myLocation = myLocationObj.title;
          }
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };

              //infoWindow.setPosition(pos);
              //infoWindow.setContent('Location found.');
              map.setCenter(pos);
              marker = new google.maps.Marker({
                position: pos,
                map: map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                title: myLocation
              });
              map.panTo(pos);
            }, function(error) {
              //handleLocationError(true, map.getCenter());
              //alert(error.message);
              globalsService.showMessage(1000);
            }, {
                        enableHighAccuracy: true
                        ,timeout : 5000
                        ,maximumAge: 0
            });
          } else {
            // Browser doesn't support Geolocation
            //console.log('else1');
            handleLocationError(false, map.getCenter());

            map.setCenter({lat:32.086697, lng: 34.789748});
          } 

        map.addListener('click', function(event) {
            //console.log('In locationController. marker is='+marker);
            if (marker != undefined)
                marker.setMap(null);
            marker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                title: myLocation
            });
            map.panTo(event.latLng);
        });
    });

    handleLocationError = function (browserHasGeolocation, pos) {
        //console.log('In locationController.handleLocationError -> browserHasGeolocation='+browserHasGeolocation);
        //infoWindow = new google.maps.InfoWindow({map: map});
        //infoWindow.setPosition(pos);
        //infoWindow.setContent(browserHasGeolocation ?
        if(browserHasGeolocation){
            globalsService.showMessageByCode(1006);
        }else{
            globalsService.showMessageByCode(1007);
        }
    }

    $scope.codeAddess = function () {
        //console.log('In locationController.codeAddess');
        var address = document.getElementById("address").value;
        //console.log('In locationController.codeAddess -> address='+address);
        if(!address){
            return;
        }
        /*var autocomplete = new google.maps.places.Autocomplete(address);
        autocomplete.bindTo('bounds', map);
        console.log('In locationController.codeAddess -> autocomplete='+autocomplete);
        autocomplete.addListener('place_changed', function() {
            //infowindow.close();
            //marker.setVisible(false);
            var place = autocomplete.getPlace();
            console.log('In locationController.codeAddess -> place='+place);
            if (!place.geometry) {
              window.alert("Autocomplete's returned place contains no geometry");
              return;
            }
        });*/

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': address}, function(results, status) {
            //console.log('In locationController.codeAddess -> results='+results.length);
          if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            //console.log('In locationController.codeAddess -> marker='+marker);
            if (marker != undefined)
                marker.setMap(null);
            marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });

          } else {
            globalsService.showMessageByCode(1006);
          }
        });
    }
});