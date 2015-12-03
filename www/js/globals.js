/**
 * Created by Yuval on 17/03/2015.
 */



var clinchModule = angular.module('globalsModule', []);

clinchModule.factory('globalsService', function (langService) {

    var theService = {};
    theService.clinchDisplayState = "cards";
    theService.professionMap = [];
    theService.professionMapArray = [];
    theService.clinchTypeMap = [];
    theService.clinchTypeMapArray = [];
    theService.errorMessagesMap = [];
    theService.toUser = {}

    theService.getToUser = function()
    {
        return this.toUser;
    }

    theService.getClinchDisplayState = function()
    {
        return this.clinchDisplayState;
    }

    theService.setClinchDisplayState = function(state)
    {
        this.clinchDisplayState = state;
    }

    theService.init = function(){
//alert('globalsService.init - fetchProfessions');
        theService.fetchProfessions();
//alert('globalsService.init - fetchClinchTypes');
        theService.fetchClinchTypes();
//alert('globalsService.init - fetchToUser');
//Moved fetchToUser to the login functions
        if(Parse.User.current()){
            theService.fetchToUser();
        }
//alert('globalsService.init end');
    }

    theService.getProfession = function(professionId)
    {
        //console.log('In globalsService.getProfession- Enter. professionId='+professionId);
        return theService.professionMap[professionId];        
        
        /*if(theService.professionMap.length == 0 ){
            theService.fetchProfessions().then(function(results){
                var object = theService.professionMap[professionId];
                console.log('In globalsService.getProfession- returning='+object.professionName+' and '+object.imageFileName);
            }, function(error){
                console.log('In globalsService.getProfession- Got Error:'+error);
            });                
        }else{
                var object = theService.professionMap[professionId];
                console.log('In globalsService.getProfession- returning='+object.professionName+' and '+object.imageFileName);
        }
        console.log('In globalsService.getProfession- returning='+object.professionName+' and '+object.imageFileName);
        return object;*/
    }

    theService.getAllProfessions = function()
    {
        //console.log('In globalsService.getAllProfessions- Enter.');
        return theService.professionMapArray;       
        
    }

    theService.fetchProfessions = function()
    {
        //console.log('In globalsService.fetchProfessions- Enter.');        
//alert('globalsService.fetchProfessions 1');
        var ProfessionClass = Parse.Object.extend("Profession");
//alert('globalsService.fetchProfessions 2');
        var query = new Parse.Query(ProfessionClass);
//alert('globalsService.fetchProfessions 3');
        //query.equalTo("playerName", "Dan Stemkoski");
        return query.find({
          success: function(results) {            
//alert("fetchProfessions - Successfully retrieved " + results.length + " scores.");
            // Do something with the returned Parse.Object values
            var ind = 0;
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                var roleInd = object.get('Role');
                if(roleInd && roleInd == 'Admin' ){
                    //console.log('Found Admin='+roleInd);       
                    continue;
                }


                theService.professionMap[object.id] = object;
                //theService.professionMap[object.id].id = object.id;
                //theService.professionMap[object.id].professionName = object.get('ProfessionName');
                //theService.professionMap[object.id].imageFileName  = object.get('imageFileName');
                
                theService.professionMapArray[ind] = {};
                theService.professionMapArray[ind].id = object.id;
                theService.professionMapArray[ind].index = ind;
                theService.professionMapArray[ind].professionName = object.get('ProfessionName');
                theService.professionMapArray[ind].imageFileName  = object.get('imageFileName');
                ind++;
            }
            var successful = new Parse.Promise();
            successful.resolve(results);
            //console.log('In clinchService fetchClinches. Got result = '+result.length+' records.');            
            return successful;
          },
          error: function(error) {
            //alert("Error: " + error.code + " " + error.message);
            var failed = new Parse.Promise();
            failed.reject(error); 
            return failed;
          }
        });//end of find
    }

    theService.fetchToUser = function()
    {

        //console.log('In globalsService.fetchProfessions- Enter.');        
        var userQuery = new Parse.Query(Parse.User);
        //userQuery.equalTo('objectId',Parse.User.current().id);
        userQuery.include('Profession');
        userQuery.get(Parse.User.current().id, {
            success: function(user) {
//alert('globalsService.fetchToUser user='+user);
                // The object was retrieved successfully.
                //var toUserId = user.id;
                //var toUserProfession = user.get('Profession');
                //var toUserEmail = user.get('email');
                //var toUserBusinessName = user.get('BusinessName');
                //var toUserLocation = user.get('location');
                theService.toUser = user;
                var successful = new Parse.Promise();
                successful.resolve(user);
                //console.log('In clinchService fetchClinches. Got result = '+result.length+' records.');            
                return successful;
            },
            error: function(user, error) {
//alert('globalsService.fetchToUser error='+error);
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and message.
                var failed = new Parse.Promise();
                failed.reject(error); 
                return failed;
            }
        });//end of get
    }

    theService.getClinchType = function(clinchTypeId)
    {
        //console.log('In globalsService.getClinchType- Enter. clinchTypeId='+clinchTypeId);
        return theService.clinchTypeMap[clinchTypeId];        
    }

    theService.getAllClinchTypes = function()
    {
        //console.log('In globalsService.getAllClinchTypes- Enter.');
        return theService.clinchTypeMapArray;        
    }

    theService.fetchClinchTypes = function()
    {
        //console.log('In globalsService.fetchClinchTypes- Enter.');        
        var ClinchTypeClass = Parse.Object.extend("ClinchType");
        var query = new Parse.Query(ClinchTypeClass);
        //query.equalTo("playerName", "Dan Stemkoski");
        return query.find({
          success: function(results) {
//alert(" ClinchType - Successfully retrieved " + results.length + " scores.");            
            //alert("Successfully retrieved " + results.length + " scores.");
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                theService.clinchTypeMap[object.id] = {};                
                theService.clinchTypeMap[object.id] = object;
                //theService.clinchTypeMap[object.id].name = object.get('Name');
                //theService.clinchTypeMap[object.id].title  = object.get('Title');
                //theService.clinchTypeMap[object.id].imageName  = object.get('ImageName');
                //theService.clinchTypeMap[object.id].longDescription  = object.get('LongDescription');
                //theService.clinchTypeMap[object.id].shortDescription  = object.get('ShortDescription');

                theService.clinchTypeMapArray[i] = {};
                theService.clinchTypeMapArray[i].id = object.id;
                theService.clinchTypeMapArray[i].name = object.get('Name');
                theService.clinchTypeMapArray[i].title  = object.get('Title');
                theService.clinchTypeMapArray[i].imageName  = object.get('ImageName');
                theService.clinchTypeMapArray[i].longDescription  = object.get('LongDescription');
                theService.clinchTypeMapArray[i].shortDescription  = object.get('ShortDescription');
            }
            var successful = new Parse.Promise();
            successful.resolve(results);
            //console.log('In clinchService fetchClinches. Got result = '+result.length+' records.');            
            return successful;
          },
          error: function(error) {
            //alert("Error: " + error.code + " " + error.message);
            var failed = new Parse.Promise();
            failed.reject(error); 
            return failed;
          }
        });//end of find
    }

    theService.getErrorMessage = function(errorCode, locale)
    {
        //console.log('In globalsService.getErrorMessage- Enter. errorCode='+errorCode+" and locale="+locale);
        var key = errorCode+"_"+locale;
        return theService.errorMessagesMap[key];        
    }

    theService.getErrorMessage = function(errorCode)
    {
        //console.log('In globalsService.getErrorMessage- Enter. errorCode='+errorCode);                
        return theService.getErrorMessage(errorCode,langService.getCurrentLanguage());        
    }

    theService.fetchErrorMessages = function()
    {
        //console.log('In globalsService.fetchErrorMessages- Enter.');        
        var MessagesClass = Parse.Object.extend("Messages");
        var query = new Parse.Query(MessagesClass);
        query.equalTo("Type", "Error");
        return query.find({
          success: function(results) {            
            //alert("Successfully retrieved " + results.length + " scores.");
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                var key = object.get('Code')+"_"+object.get('Locale');
                theService.errorMessagesMap[key] = {};                
                // console.log(object.id + ' - ' + object.get('ProfessionName'));
                theService.errorMessagesMap[key].title = object.get('Title');
                theService.errorMessagesMap[key].message  = object.get('Message');                
            }
            var successful = new Parse.Promise();
            successful.resolve(results);
            //console.log('In clinchService fetchClinches. Got result = '+result.length+' records.');            
            return successful;
          },
          error: function(error) {
            //alert("Error: " + error.code + " " + error.message);
            var failed = new Parse.Promise();
            failed.reject(error); 
            return failed;
          }
        });//end of find
    }

    theService.showMessage = function(message, callback, title, buttonName) {

        title = title || "Message";
        buttonName = buttonName || 'OK';

        if(navigator.notification && navigator.notification.alert) {

            navigator.notification.alert(
                message,    // message
                callback,   // callback
                title,      // title
                buttonName  // buttonName
            );

        } else {

            alert(message);
            callback();
        }

    }

    return theService;

});