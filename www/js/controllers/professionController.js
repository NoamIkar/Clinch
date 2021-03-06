/**
 * Created by Yuval on 20/03/2015.
 */

/**
 * Created by Yuval on 19/03/2015.
 */

var starter = angular.module('starter');


starter.controller("professionController", function ($scope, $timeout,langService, $state, professionService, $ionicPopover,$ionicLoading,$ionicSlideBoxDelegate,globalsService) {

    $scope.searchText = {};
    $scope.currentProfession = {};
    $scope.professions = [];
    
    
        
    $scope.$on('$ionicView.beforeEnter', function (event, toState, toParams, fromState, fromParams, error) {
        //console.log('In professionController - enter = loading professions');
        if(error){
            console.log('In professionController GOT ERROR='+error);
        }
        /*$ionicLoading.show({template: 'Loading...'});
  
        professionService.getAllProfessions().then(function (result) {
            //console.log('In clinchesController - Got result = '+result);
            $scope.professions = result;
        },
        function (error) {
            console.log('In professionController - Got error = ['+error.code+'] = '+error.message);
            alert(error.message);                    
        });
        $scope.$broadcast('scroll.refreshComplete');
        $ionicLoading.hide();*/
        $scope.professions = professionService.getAllProfessions();
    });
        
    
    $scope.filterFunction = function(element) {
        //console.log('In professionController - filterFunction - searchText.name='+$scope.searchText.name);
        if (typeof $scope.searchText.name == 'undefined') return false;
        if ($scope.searchText.name.length == 0) return false;
        var elementProfessionName = '';
        if(element && element.professionName){
            element.professionName.trim().toUpperCase();
        }
        if(langService.getCurrentLanguage() === "he"){
            if(element && element.professionName_he){
                elementProfessionName = element.professionName_he.trim().toUpperCase();
            }
        }

        if(elementProfessionName.search($scope.searchText.name.trim().toUpperCase())> -1){            
            return true;
        }else{
            return false;
        }

    };

    $scope.filterImagesFunction = function(element) {
        //console.log('In professionController - filterImagesFunction - searchText.name='+$scope.searchText.name);
        if (typeof $scope.searchText.name == 'undefined') return true;
        if ($scope.searchText.name.length == 0) return true;
        var elementProfessionName = '';
        if(element && element.professionName){
            element.professionName.trim().toUpperCase();
        }
        if(langService.getCurrentLanguage() === "he"){
            if(element && element.professionName_he){
                elementProfessionName = element.professionName_he.trim().toUpperCase();
            }
        }


        if(elementProfessionName.search($scope.searchText.name.trim().toUpperCase())> -1){
            return true;
        }else{
            return false;
        }

    };

    /*$scope.saveProfession = function(profession)
    {

        if(!profession){
            var message = "Please select a profession.";
            //globalsService.showMessage(message,function(){},null,null);
            //return;
            var failed = new Parse.Promise();
            failed.reject(message); 
            return failed;
        }
        //professionService.saveProfession(profession.index);
        //console.log('In professionController - setProfession - profession='+profession.id);
        var user = Parse.User.current();
        var parseProfession = professionService.getProfession(profession.index);
        user.set("Profession", parseProfession );
        //user.save();
        return user.save().then(
              function (result) {
                var successful = new Parse.Promise();
                successful.resolve(result);
                //console.log('In clinchService fetchClinches. Got result = '+result.length+' records.');
                return successful;
              },
              function (error) {
                var failed = new Parse.Promise();
                failed.reject(error); 
                return failed;               
              }
        );
    }*/

    //professionService.getAllProfessionNames().then(
    /*professionService.getAllProfessions().then(

        function (results) {
            $scope.professions = results;
        }
        , function (error) {
        }
    );*/

    $scope.confirm = function()
    {
        if(!$scope.currentProfession){
            globalsService.showMessageByCode(1004);
            return;
        }
        professionService.saveProfession($scope.currentProfession).then(function (result) {
                $scope.goLocation();
            },function (error) {
                //console.log('In clinchesController - Got error = ['+error.code+'] = '+error.message);
                //globalsService.showMessage(error,function(){},null,null);
                globalsService.showMessageByCode(1005);
            });        
    }

    $scope.goLocation = function () {
        var location = Parse.User.current().get('location');
        if(!location){
            if (langService.getDirection() == "rtl")
                $state.go('rtl.location');
            else
                $state.go('ltr.location');
        }else{
            if (langService.getDirection() == "rtl")
                $state.go('rtl.cards');
            else
                $state.go('ltr.cards');
        }
    }

    $scope.setSearchString = function(profession, index)
    {        
        //console.log('In professionController - setSearchString - profession='+profession.id);
        $scope.currentProfession = profession;
        
        if(langService.getCurrentLanguage() === "he"){
            $scope.searchText.name = profession.professionName_he;
        }else{
            $scope.searchText.name = profession.professionName;
        }
        $scope.refresh(index);
    }

    $scope.refresh = function(index){
        //console.log('In professionController - refresh. Index='+index);
        //console.log('In professionController - count - '+$ionicSlideBoxDelegate.$getByHandle('professionsSlide').slidesCount());
        //$timeout(function(){ $scope.professions.pop(); }, 0);
        /*$timeout(function(){ 
            $ionicSlideBoxDelegate.$getByHandle('professionsSlide').update();
            //console.log('In professionController - after update count - '+$ionicSlideBoxDelegate.$getByHandle('professionsSlide').slidesCount());
        }, 5); 
        //$ionicSlideBoxDelegate.$getByHandle('professionsSlide').update(); 
        //$ionicSlideBoxDelegate.$getByHandle('professionsSlide').previous();  
        
        $ionicSlideBoxDelegate.$getByHandle('professionsSlide').slide(index);
        */
    }

});