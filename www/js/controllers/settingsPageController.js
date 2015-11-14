/**
 * Created by Yuval on 26/03/2015.
 */


/**
 * Created by Yuval on 09/03/2015.
 */

var starter = angular.module('starter');


starter.controller("settingsPageController", function ($scope, $state, globalsService, langService, clinchData, $ionicLoading) {
	$scope.isToAllPropessions = false;
	$scope.isFromAllPropessions = false;
	$scope.toProfession = {};
	$scope.fromProfession = {};	
	$scope.clinchRule = {};	
    $scope.toProfessions = [];
    $scope.fromProfessions = [];
    $scope.clinchTypes = [];
    $scope.clinchTypeId = 'fHkl03bZH0';

    $scope.$on('$ionicView.beforeEnter', function (event, toState, toParams, fromState, fromParams, error) {
        //console.log('In settingsPageController - enter = loading');
        if(error){
            console.log('In settingsPageController GOT ERROR='+error);
        }
        if($scope.toProfessions.length<=0 && $scope.fromProfessions.length<=0){
	        $ionicLoading.show({template: 'Loading...'});
			//console.log('In settingsPageController - enter = $scope.toProfessions.length'+$scope.toProfessions.length);
	        $scope.toProfessions = globalsService.getAllProfessions();
	        $scope.fromProfessions = globalsService.getAllProfessions();
	        $scope.clinchTypes = globalsService.getAllClinchTypes();
			//console.log('In settingsPageController - enter = $scope.toProfessions.length'+$scope.toProfessions.length);
	        $scope.$broadcast('scroll.refreshComplete');
	        $ionicLoading.hide();
	     }
    });

	$scope.createNewClinchRule = function(){        
        if (langService.getDirection() == "rtl"){        	
            $state.go('rtl.createNewClinchRule');
        }else{        	
            $state.go('ltr.createNewClinchRule');
        }
    }

    $scope.filterToFunction = function(element) {
        //console.log('In professionController - filterFunction - searchText.name='+$scope.searchText.name);
        if (typeof $scope.toProfession.professionName == 'undefined') return true;
        if ($scope.toProfession.professionName.length == 0) return true;

        if(element.professionName.trim().toUpperCase().search($scope.toProfession.professionName.trim().toUpperCase())> -1){
            return true;
        }else{
            return false;
        }

    }

    $scope.filterFromFunction = function(element) {
        //console.log('In professionController - filterFunction - searchText.name='+$scope.searchText.name);
        if (typeof $scope.fromProfession.professionName == 'undefined') return true;
        if ($scope.fromProfession.professionName.length == 0) return true;

        if(element.professionName.trim().toUpperCase().search($scope.fromProfession.professionName.trim().toUpperCase())> -1){
            return true;
        }else{
            return false;
        }

    }

    $scope.onToClick = function(){
    	//console.log('In settingsPageController -> onToClick='+this.isToAllPropessions);
    }

    $scope.onFromClick = function(){
    	//console.log('In settingsPageController -> onFromClick='+this.isFromAllPropessions);
    }

    $scope.setFromProfession = function(profession){
    	//console.log('In settingsPageController -> setFromProfession='+profession);
    	//console.log('In settingsPageController -> setFromProfession.id='+profession.id);
    	$scope.fromProfession = profession;
    }

    $scope.setToProfession = function(profession){
    	//console.log('In settingsPageController -> setToProfession='+profession);
    	//console.log('In settingsPageController -> setToProfession.id='+profession.id);
    	$scope.toProfession = profession;
    }

    $scope.createClinchRule = function(){
    	/*console.log('******************');
		console.log('In settingsPageController -> createClinchRule. FromAll='+this.isFromAllPropessions);
		console.log('In settingsPageController -> createClinchRule. ToAll='+this.isToAllPropessions);
		console.log('In settingsPageController -> createClinchRule. FromProfession='+this.fromProfession.professionName);
		console.log('In settingsPageController -> createClinchRule. ToProfession='+this.toProfession.professionName);
		console.log('In settingsPageController -> createClinchRule. clinchTypeId='+this.clinchTypeId);*/
		console.log('In settingsPageController -> createClinchRule. clinchType.='+globalsService.getClinchType(this.clinchTypeId));
		console.log('In settingsPageController -> createClinchRule. clinchType.name='+globalsService.getClinchType(this.clinchTypeId).name);

		var ClinchRules = Parse.Object.extend("ClinchRules");
        var clinchRule = new ClinchRules();
        var tempToProfession = globalsService.getProfession(this.toProfession.id);
        var tempFromProfession = globalsService.getProfession(this.fromProfession.id);
        
        clinchRule.set("ToAllProfessions", this.isToAllPropessions);
        clinchRule.set("FromAllProfessions", this.isFromAllPropessions);

        if(!this.isToAllPropessions){
        	if(typeof tempToProfession === 'undefined' || tempToProfession === null){
	            var message = 'To Profession is '+tempToProfession+'.\nPlease set To profession';
	            console.log(message);
	            alert(message);
	            return;
	        }
        	clinchRule.set("ToProfession", tempToProfession);
        }
        if(!this.isFromAllPropessions){        	
        	if(typeof tempFromProfession === 'undefined' || tempFromProfession === null){
	            var message = 'From Profession is '+tempFromProfession+'.\nPlease set From profession';
	            console.log(message);
	            alert(message);
	            return;
	        }
        	clinchRule.set("FromProfession", tempFromProfession);
        }
        clinchRule.set("ClinchType", globalsService.getClinchType(this.clinchTypeId));        

        clinchRule.save(null, {
          success: function(clinchRule) {
            // Execute any logic that should take place after the object is saved.
            console.log('New Rule created with objectId: ' + clinchRule.id);
            alert('New Rule created with objectId: ' + clinchRule.id);
          },
          error: function(clinchRule, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new Rule, with error: ' +error.code +" - "+ error.message);
          }
        });
    }

});
