/**
 * Created by Yuval on 13/03/2015.
 */

var clinchModule = angular.module('clinch', []);

clinchModule.factory('clinchService', function (langService, globalsService) {

        var theService = {};

        theService.clinches = [];
        theService.userListByClinch = [];

        theService.clinchesIRequested = [];
        theService.myRequestedClinches = [];
        theService.myActiveClinches =  [];

        /*theService.getClinches = function (needLoad) {
            if(!needLoad){
                return theService.clinches;
            }else{
                theService.clinches = [];
                
                fetchClinches().then(function (result) {
                    theService.clinches = result;
                },
                function (error) {
                    console.log('In clinchService - Got error = '+error.message);
                });
                return theService.clinches;
            }
        }*/
        theService.getClinches = function(){
            return theService.clinches;
        }

        theService.getClinchesIRequested = function(){
            //console.log('In clinchService.getClinchesIRequested- Enter');
            var params = {};                
            params.locale = langService.getCurrentLanguage();

            return Parse.Cloud.run('getClinchesIRequested', params).then(
                  function (result) {
                    theService.clinchesIRequested = result;
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

            /*var toUser =  Parse.User.current();
            var currentUserLocation = toUser.get('location');
            
            var Clinch = Parse.Object.extend("Clinch");
            var myClinchQuery = new Parse.Query(Clinch);
            myClinchQuery.equalTo("ToUser",toUser);
            myClinchQuery.equalTo("Status",'Requested');
            //myClinchQuery.include('ClinchType');
            myClinchQuery.include('FromUser');

            //console.log('In clinchService.getClinchesIRequested- Enter theService.clinchesIRequested='+theService.clinchesIRequested.length);
            myClinchQuery.find().then(function(clinchesIRequestedR){
                //console.log('In clinchService.getClinchesIRequested- Enter clinchesIRequestedR='+clinchesIRequestedR.length);
                for (var i = 0; i < clinchesIRequestedR.length ; i++){
                    var fromUser =  clinchesIRequestedR[i].get("FromUser");
                    var fromUserProfession = fromUser.get('Profession');
                    var fromUserLocation = fromUser.get('location');
                    var fromUserBusinessName = fromUser.get('BusinessName');
                    var fromUserEmail = fromUser.get('email'); 
                    var clinchType = clinchesIRequestedR[i].get('ClinchType');                   
                    var tempClinchType = globalsService.getClinchType(clinchType.id);
                    var tempFromUserProfession = globalsService.getProfession(fromUserProfession.id);
                /*console.log('In clinchService.getClinchesIRequested- In for['+i+'] values are:\nfromUser='+fromUser+
                                                                                     '\nfromUserProfession='+fromUserProfession+
                                                                                     '\nfromUserLocation='+fromUserLocation+
                                                                                     '\nfromUserBusinessName='+fromUserBusinessName+
                                                                                     '\nfromUserEmail='+fromUserEmail+
                                                                                     '\ntempClinchType='+tempClinchType+
                                                                                     '\ntype='+tempClinchType.get("Title")+
                                                                                     '\ndescription='+tempClinchType.get('ShortDescription')+
                                                                                     '\nlongDescription='+tempClinchType.get('LongDescription')+
                                                                                     '\nimage='+tempClinchType.get('ImageName')+
                                                                                     '\nfromUserProfession='+fromUserProfession+
                                                                                     '\tempFromUserProfession.id='+tempFromUserProfession.id+
                                                                                     '\nprofessionImage='+tempFromUserProfession.get('imageFileName'));*/
              /*      theService.clinchesIRequested[i] = {};
                    theService.clinchesIRequested[i].index = i+1;
                    theService.clinchesIRequested[i].id = clinchesIRequestedR[i].id;
                    theService.clinchesIRequested[i].objectClinchType = clinchType;
                    theService.clinchesIRequested[i].objectFromUser = fromUser;
                    theService.clinchesIRequested[i].type = tempClinchType.get("Title");
                    if(typeof fromUserBusinessName === 'undefined' || fromUserBusinessName === null ){
                        theService.clinchesIRequested[i].partnerName = fromUser.get('username');
                    } else {
                        theService.clinchesIRequested[i].partnerName = fromUserBusinessName;
                    }
                    theService.clinchesIRequested[i].description = tempClinchType.get('ShortDescription');
                    theService.clinchesIRequested[i].longDescription = tempClinchType.get('LongDescription');
                    theService.clinchesIRequested[i].image = tempClinchType.get('ImageName');
                    theService.clinchesIRequested[i].professionImage = tempFromUserProfession.get('imageFileName');//fromUserProfession.get('imageFileName');
                    theService.clinchesIRequested[i].partnerLocation = fromUserLocation;
                    theService.clinchesIRequested[i].kilometersTo = Math.round(fromUserLocation.kilometersTo(currentUserLocation));
                    theService.clinchesIRequested[i].fromEmail = fromUserEmail;
                }  
                //theService.clinchesIRequested = clinchesIRequested;
                //console.log('In clinchService.getClinchesIRequested- Enter theService.clinchesIRequested='+theService.clinchesIRequested.length);
            }, function (error){
                console.log('In clinchService.getClinchesIRequested- Got Error:'+error);
            });


            return theService.clinchesIRequested;*/
        }

        theService.getRequestedClinches = function(){
            //console.log('In clinchService.getRequestedClinches- Enter');
            var params = {};                
            params.locale = langService.getCurrentLanguage();

            return Parse.Cloud.run('getRequestedClinches', params).then(
                  function (result) {
                    theService.myRequestedClinches = result;
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

            /*var user =  Parse.User.current();
            var currentUserLocation = user.get('location');
            
            var Clinch = Parse.Object.extend("Clinch");
            var myClinchQuery = new Parse.Query(Clinch);
            myClinchQuery.equalTo("FromUser",user);
            myClinchQuery.equalTo("Status",'Requested');
            //myClinchQuery.include('ClinchType');
            myClinchQuery.include('ToUser');

            //console.log('In clinchService.getRequestedClinches- Enter theService.clinchesIRequested='+theService.clinchesIRequested.length);
            myClinchQuery.find().then(function(clinchesRequestedFromMeR){
                //console.log('In clinchService.getRequestedClinches- Enter clinchesRequestedFromMeR='+clinchesRequestedFromMeR.length);
                for (var i = 0; i < clinchesRequestedFromMeR.length ; i++){
                    var fromUser =  clinchesRequestedFromMeR[i].get("ToUser");
                    var fromUserProfession = fromUser.get('Profession');
                    var fromUserLocation = fromUser.get('location');
                    var fromUserBusinessName = fromUser.get('BusinessName');
                    var fromUserEmail = fromUser.get('email'); 
                    var clinchType = clinchesRequestedFromMeR[i].get('ClinchType');                   
                    var tempClinchType = globalsService.getClinchType(clinchType.id);
                    var tempFromUserProfession = globalsService.getProfession(fromUserProfession.id);
                console.log('In clinchService.getRequestedClinches- In for['+i+'] values are:\nfromUser='+fromUser+
                                                                                     '\nfromUserProfession='+fromUserProfession+
                                                                                     '\nfromUserLocation='+fromUserLocation+
                                                                                     '\nfromUserBusinessName='+fromUserBusinessName+
                                                                                     '\nfromUserEmail='+fromUserEmail+
                                                                                     '\ntempClinchType='+tempClinchType+
                                                                                     '\ntype='+tempClinchType.get("Title")+
                                                                                     '\ndescription='+tempClinchType.get('ShortDescription')+
                                                                                     '\nlongDescription='+tempClinchType.get('LongDescription')+
                                                                                     '\nimage='+tempClinchType.get('ImageName')+
                                                                                     '\nfromUserProfession='+fromUserProfession)+
                                                                                     '\tempFromUserProfession.id='+tempFromUserProfession.id;//+
                                                                                     //'\nprofessionImage='+tempFromUserProfession.get('imageFileName'));
                    theService.myRequestedClinches[i] = {};
                    theService.myRequestedClinches[i].index = i+1;
                    theService.myRequestedClinches[i].id = clinchesRequestedFromMeR[i].id;
                    theService.myRequestedClinches[i].objectClinchType = clinchType;
                    theService.myRequestedClinches[i].objectFromUser = fromUser;
                    theService.myRequestedClinches[i].type = tempClinchType.get("Title");
                    if(typeof fromUserBusinessName === 'undefined' || fromUserBusinessName === null ){
                        theService.myRequestedClinches[i].partnerName = fromUser.get('username');
                    } else {
                        theService.myRequestedClinches[i].partnerName = fromUserBusinessName;
                    }
                    theService.myRequestedClinches[i].description = tempClinchType.get('ShortDescription');
                    theService.myRequestedClinches[i].longDescription = tempClinchType.get('LongDescription');
                    theService.myRequestedClinches[i].image = tempClinchType.get('ImageName');
                    theService.myRequestedClinches[i].professionImage = tempFromUserProfession.get('imageFileName');//fromUserProfession.get('imageFileName');
                    theService.myRequestedClinches[i].partnerLocation = fromUserLocation;
                    theService.myRequestedClinches[i].kilometersTo = Math.round(fromUserLocation.kilometersTo(currentUserLocation));
                    theService.myRequestedClinches[i].fromEmail = fromUserEmail;
                }  
                //theService.clinchesIRequested = clinchesIRequested;
                //console.log('In clinchService.getRequestedClinches- Enter theService.clinchesIRequested='+theService.clinchesIRequested.length);
            }, function (error){
                console.log('In clinchService.getRequestedClinches- Got Error:'+error);
            });

            return theService.myRequestedClinches;*/
        }
        
        theService.getActiveClinches = function(){
            //console.log('In clinchService.getActiveClinches- Enter');
            /*var params = {};                
            params.userLocation = userLocation;
            params.fromAllProfessions = fromAllProfessions;
            params.professionId = professionId;*/
            var params = {};                
            params.locale = langService.getCurrentLanguage();

            return Parse.Cloud.run('getActiveClinches', params).then(
                  function (result) {
                    theService.myActiveClinches = result;
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

            /*var currentUser =  Parse.User.current();
            
            var Clinch = Parse.Object.extend("Clinch");

            var myClinchQuery = new Parse.Query(Clinch);            
            myClinchQuery.equalTo("ToUser",currentUser);
            myClinchQuery.equalTo("Status",'Accepted');

            var mySecondClinchQuery = new Parse.Query(Clinch);
            mySecondClinchQuery.equalTo("FromUser",currentUser);
            mySecondClinchQuery.equalTo("Status",'Accepted');
            
            
            //myClinchQuery.include('ClinchType');
            //myClinchQuery.include('ClinchRule');
            //myClinchQuery.include('FromUser');
            //myClinchQuery.include(['FromUser.Profession']);
            
            
            //mySecondClinchQuery.include('ClinchType');
            //mySecondClinchQuery.include('ClinchRule');
            //mySecondClinchQuery.include('ToUser');
            //mySecondClinchQuery.include(['ToUser.Profession']);
            
            
            var query = Parse.Query.or(myClinchQuery,mySecondClinchQuery);
            query.include('ClinchType');
            query.include('ClinchRule');
            query.include('FromUser');
            query.include(['FromUser.Profession']);
            query.include('ClinchType');
            query.include('ClinchRule');
            query.include('ToUser');
            query.include(['ToUser.Profession']);
            
            return query.find(function(myActiveClinchesR){
                for (var i = 0; i < myActiveClinchesR.length ; i++){
                    var clinchEntry = myActiveClinchesR[i];
                    console.log('In clinchService.getActiveClinches- clinch['+i+']='+clinchEntry.id+' date:'+clinchEntry.updatedAt);
                    var fromUser =  clinchEntry.get("FromUser");
                    var toUser =  clinchEntry.get("ToUser");
                    var clinchType = clinchEntry.get('ClinchType');                   
                    var clinchRule = clinchEntry.get('ClinchRule');
                    var clinch = buildCompleteClinch(toUser,fromUser,clinchType,clinchRule);
                    clinch.index = i;
                    clinch.id = clinchEntry.id;
                    //tempArray.push(Clinch);
                    //theService.myActiveClinches[i] = {};
                    
                    theService.myActiveClinches.push(clinch);
                }  
                //theService.myActiveClinches = myActiveClinches;                
            }).then(function(){
                console.log('In clinchService.getActiveClinches- Enter theService.myActiveClinches='+theService.myActiveClinches.length);
                return theService.myActiveClinches;    
            }, function (error){
                console.log('In clinchService.getActiveClinches- Got Error:'+error);
            });

            return theService.myActiveClinches;*/
        }

        theService.getUserListByClinch = function(index){
            var clinch = theService.clinches[index];
            var userLocation = globalsService.getToUser().get('location');
            var fromAllProfessions = clinch.fromAllProfessions;
            var professionId = clinch.professionId;
            var clinchTypeId = clinch.clinchTypeId;
            var ruleId = clinch.ruleId;

            var params = {};                
            params.userLocation = userLocation;
            params.fromAllProfessions = fromAllProfessions;
            params.professionId = professionId;
            params.clinchTypeId = clinchTypeId;
            params.ruleId = ruleId;

            return Parse.Cloud.run('getUserListByClinch', params).then(
                  function (result) {
                    theService.userListByClinch = result;
                    var successful = new Parse.Promise();
                    successful.resolve(result);
                    //console.log('In clinchService fetchClinches. Got result = '+result.length+' records.');
                    return successful;
                  },
                  function (error) {
                    var failed = new Parse.Promise();
                    failed.reject(error); 
                    return failed;               
                  });
/*
            console.log('In clinchService.getClinchesByUserList- Enter');
            var toUser =  Parse.User.current();
            //var clinch = theService.clinches[index];
            //var fromAllProfessions = clinch.fromAllProfessions;
                      
            
            

            var existsClinches = [];
            var Clinch = Parse.Object.extend("Clinch");
            var clinchQuery = new Parse.Query(Clinch);
            clinchQuery.equalTo("ToUser",toUser);
            var ClinchTypeObject = Parse.Object.extend('ClinchType');
            var clinchTypeObject = new ClinchTypeObject();
            clinchTypeObject.id = clinch.clinchTypeId;
            clinchQuery.equalTo("ClinchType",clinchTypeObject);
            var ClinchRulesObject = Parse.Object.extend('ClinchRules');
            var clinchRuleObject = new ClinchRulesObject();
            clinchRuleObject.id = clinch.ruleId;
            clinchQuery.equalTo("ClinchRule",clinchRuleObject);
            clinchQuery.containedIn("Status",['Accepted', 'Requested']);
            clinchQuery.find().then(function(clinchQueryR){
                existsClinches = clinchQueryR;
console.log('In clinchService.getClinchesByUserList- existsClinches='+existsClinches.length);
                var userQuery = new Parse.Query(Parse.User);
                userQuery.notEqualTo('objectId',toUser.id);
                if(!fromAllProfessions){
                    var ProfessionObject = Parse.Object.extend('Profession');
                    var fromProfessionObject = new ProfessionObject();
                    fromProfessionObject.id = clinch.professionId;
                    userQuery.equalTo('Profession',fromProfessionObject);
                }
                return userQuery.find();
            })
            //userQuery.doesNotMatchKeyInQuery("objectId", "FromUser", innerQuery);
            //userQuery.include('Profession');
            .then(function(userUsers){
console.log('In clinchService.getClinchesByUserList- userUsers='+userUsers.length);
//theService.userListByClinch = [];
                for (var i = 0; i < userUsers.length ; i++){
                    var fromUserId = userUsers[i].id;
                    var fromUserProfession = userUsers[i].get('Profession');
                    var fromUserEmail = userUsers[i].get('email');
                    var fromUserBusinessName = userUsers[i].get('BusinessName');
                    var fromUserLocation = userUsers[i].get('location');
                    if(typeof fromUserProfession === 'undefined' || fromUserProfession === null){
                        var message = 'User Profession is '+fromUserProfession+'.\nPlease set profession, for user <'+userUsers[i].get('username')+'>';
                        console.log(message);
                        continue;
                    }
                    if(typeof fromUserLocation === 'undefined' || fromUserLocation === null ){
                        var message = 'User Location is '+fromUserLocation+'.\nPlease set location, for user <'+userUsers[i].get('username')+'>';
                        console.log(message);
                        continue;
                    }
                    if(typeof fromUserBusinessName === 'undefined' || fromUserBusinessName === null ){
                        var message = 'User BusinessName is '+fromUserBusinessName+'.\nPlease set BusinessName, for user <'+userUsers[i].get('username')+'>';
                        console.log(message);
                        continue;
                    }
                    var kilometersTo = Math.round(fromUserLocation.kilometersTo(globalsService.getToUser().get('location')));
                    var isRequested = false;
                    var isAccepted = false;
                    console.log('In clinchService.getClinchesByUserList- in loop fromUserId='+fromUserId);
                    for(var j=0; j<existsClinches.length; j++){
                        console.log('In clinchService.getClinchesByUserList- in loop['+j+'].FromUser='+existsClinches[j].get('FromUser').id);
                        if(existsClinches[j].get('FromUser').id == fromUserId){
                            console.log('In clinchService.getClinchesByUserList- in loop found match='+fromUserId);
                            console.log('In clinchService.getClinchesByUserList- in loop existsClinches[j].get(Status)='+existsClinches[j].get('Status'));
                            if(existsClinches[j].get('Status') == 'Requested'){
                                console.log('isRequested TRUE!');
                                isRequested = true;    
                            }else if(existsClinches[j].get('Status') == 'Accepted'){
                                console.log('isAccepted TRUE!');
                                isAccepted = true;    
                            }                    
                        }
                    }

                    var fromUser = {};
                    fromUser.fromUserId = fromUserId;
                    fromUser.fromUserProfession = fromUserProfession;
                    fromUser.fromUserEmail = fromUserEmail;
                    fromUser.fromUserBusinessName = fromUserBusinessName;
                    fromUser.fromUserLocation = fromUserLocation;
                    fromUser.kilometersTo = kilometersTo;
                    fromUser.isRequested = isRequested;
                    theService.userListByClinch.push(fromUser);                    
                }
                //for now till move to cloud
                var successful = new Parse.Promise();
                successful.resolve(theService.userListByClinch);                    
                return successful;
                //theService.myActiveClinches = myActiveClinches;
                //console.log('In clinchService.getActiveClinches- Enter theService.myActiveClinches='+theService.myActiveClinches.length);
            }, function (error){
                console.log('In clinchService.getClinchesByUserList- Got Error:'+error.message);
            });
//console.log('In clinchService.getClinchesByUserList- theService.userListByClinch='+theService.userListByClinch.length);
            return theService.userListByClinch;
            */
        }

        theService.requestClinch = function(clinchIndex, userClinchIndex){
            var userClinch = theService.getUserByClinch(userClinchIndex);
            var selectedClinch = theService.getClinch(clinchIndex);

            /*var currentUser = Parse.User.current();
            var currentUserBusinessName = currentUser.get('BusinessName');
            var toUserEmail = currentUser.get('email');
            
            var params = {};                
            params.messageCode = 2000;
            params.partnerName = userClinch.fromUserBusinessName;
            params.currentUserBusinessName = currentUserBusinessName;
            params.clinchType = selectedClinch.ruleTitle;
            params.kilometersTo = userClinch.kilometersTo;
            params.longDescription = selectedClinch.longDescription;
            params.toUserEmail = toUserEmail;
            params.fromUserEmail = userClinch.fromUserEmail;
            params.langDirection = langService.getDirection();

            theService.sendMail(params).then(function (result) {
                //console.log('In clinchesController - Got result = '+result);
                //do?            
                console.log('sent mail');
            },
            function (error) {
                console.log('In clinchesController - Got error = ['+error.code+'] = '+error.message);
                //alert(error.message);
                //to do - add error codes            
            });*/
            
            ////////////////////////
            var fromUserId = userClinch.fromUserId;
            var clinchTypeId = selectedClinch.clinchTypeId;
            var clinchRuleId = selectedClinch.ruleId;
            var params = {};                
            params.fromUserId = fromUserId;
            params.clinchTypeId = clinchTypeId;
            params.clinchRuleId = clinchRuleId;

            return Parse.Cloud.run('requestClinch', params).then(function (result) {
                var currentUser = Parse.User.current();
                var currentUserBusinessName = currentUser.get('BusinessName');
                var toUserEmail = currentUser.get('email');
                
                var params = {};                
                params.messageCode = 2000;
                params.otherUserBusinessName = userClinch.fromUserBusinessName;
                params.currentUserBusinessName = currentUserBusinessName;
                params.ruleTitle = selectedClinch.ruleTitle;
                params.ruleTitle_he = selectedClinch.ruleTitle_he;
                params.kilometersTo = userClinch.kilometersTo;
                params.longDescription = selectedClinch.longDescription;
                params.longDescription_he = selectedClinch.longDescription_he;
                params.toUserEmail = toUserEmail;
                params.fromUserEmail = userClinch.fromUserEmail;
                params.langDirection = langService.getDirection();
                return theService.sendMail(params);
            }).then(function (result) {

                    //theService.clinches = result;
                    //alert("Thank you. Your Clinch Request was submitted successfully.");
                    //var message = "Thank you. Your Clinch Request was submitted successfully.";

                    //globalsService.showMessage(message,function(){},null,null);
                    globalsService.showMessageByCode(3002);

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
            //After/Before? sending mail, create the clinch in the Clinch table
            /*var Clinch = Parse.Object.extend("Clinch");
            var clinch = new Clinch();

            var ClinchType = Parse.Object.extend('ClinchType');
            var clinchType = new ClinchType();
            clinchType.id = selectedClinch.clinchTypeId;
            
            var User = Parse.Object.extend('User');
            var fromUser = new User();
            fromUser.id = userClinch.fromUserId;

            clinch.set("ClinchType", clinchType);
            clinch.set("FromUser", fromUser);
            clinch.set("ToUser", currentUser);
            clinch.set("Status", "Requested");

            clinch.save(null, {
              success: function(clinch) {
                // Execute any logic that should take place after the object is saved.
                //alert('New object created with objectId: ' + clinch.id);
              },
              error: function(clinch, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                //alert('Failed to create new object, with error code: ' + error.message);
              }
            });*/
        
        }

        theService.acceptClinch = function(clinchIndex){
            //console.log('In clinchService clinchIndex = '+clinchIndex);
            var selectedClinch = theService.myRequestedClinches[clinchIndex];
            var Clinch = Parse.Object.extend("Clinch");
            var clinch = new Parse.Query(Clinch);
            return clinch.get(selectedClinch.id).then( function (clinch) {
                // Execute any logic that should take place after the object is saved.
                clinch.set("Status", "Accepted");
                return clinch.save();
            }).then (function (clinch){
                var currentUser = Parse.User.current();
                var currentUserBusinessName = currentUser.get('BusinessName');
                var toUserEmail = currentUser.get('email');
                
                var params = {};                
                params.messageCode = 2001;
                params.otherUserBusinessName = selectedClinch.otherUserBusinessName;
                params.currentUserBusinessName = currentUserBusinessName;
                params.ruleTitle = selectedClinch.ruleTitle;
                params.ruleTitle_he = selectedClinch.ruleTitle_he;
                params.kilometersTo = selectedClinch.kilometersTo;
                params.longDescription = selectedClinch.longDescription;
                params.longDescription_he = selectedClinch.longDescription_he;
                params.toUserEmail = toUserEmail;
                params.fromUserEmail = selectedClinch.fromUserEmail;
                params.langDirection = langService.getDirection();
                return theService.sendMail(params);
            }).then(function (result) {
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
        }

        theService.declineClinch = function(clinchIndex){
            var selectedClinch = theService.myRequestedClinches[clinchIndex];
            var Clinch = Parse.Object.extend("Clinch");
            var clinch = new Parse.Query(Clinch);
            return clinch.get(selectedClinch.id).then( function (clinch) {
                // Execute any logic that should take place after the object is saved.
                clinch.set("Status", "Declined");
                return clinch.save();
            }).then (function (clinch){
                var currentUser = Parse.User.current();
                var currentUserBusinessName = currentUser.get('BusinessName');
                var toUserEmail = currentUser.get('email');
                
                var params = {};                
                params.messageCode = 2002;
                params.otherUserBusinessName = selectedClinch.otherUserBusinessName;
                params.currentUserBusinessName = currentUserBusinessName;
                params.ruleTitle = selectedClinch.ruleTitle;
                params.ruleTitle_he = selectedClinch.ruleTitle_he;
                params.kilometersTo = selectedClinch.kilometersTo;
                params.longDescription = selectedClinch.longDescription;
                params.longDescription_he = selectedClinch.longDescription_he;
                params.toUserEmail = toUserEmail;
                params.fromUserEmail = selectedClinch.fromUserEmail;
                params.langDirection = langService.getDirection();
                return theService.sendMail(params);
            }).then(function (result) {
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
        }



        theService.getClinch = function (index) {
            return theService.clinches[index];
        }
        theService.getMyClinch = function (index) {
            return theService.clinchesIRequested[index];
        }
        theService.getRequestedClinch = function (index) {
            return theService.myRequestedClinches[index];
        }
        theService.getActiveClinch = function (index) {
            return theService.myActiveClinches[index];
        }

        theService.getUserByClinch = function(index){
            return theService.userListByClinch[index];
        }

        theService.sendMail = function (params){
            //console.log('In clinchController - requestClinch - Starting...');
            return Parse.Cloud.run('sendEmailToUser', params).then(
                  function (result) {      
                    //console.log('In clinchController - requestClinch - got result...'+result);
                    var successful = new Parse.Promise();
                    successful.resolve(result);
                    //console.log("Got Clinch request");
                    //alert("Thank you. Your Clinch Request was submitted successfully.");
                    return successful;
                  },
                  function (error) {
                    //console.log('In clinchController - requestClinch - got error...'+error);
                    var failed = new Parse.Promise();
                    failed.reject(error);
                    //alert("Got Error:"+error); 
                    return failed;               
                  }
            );
        }

        
       theService.fetchClinches = function() {

            //console.log('In clinchService fetchClinches...going to run');
            var cloud = true;
            if(cloud){
                var params = {};                
                params.locale = langService.getCurrentLanguage();

               return Parse.Cloud.run('fetchClinches', params).then(
                  function (result) {
                    theService.clinches = result;
                    var successful = new Parse.Promise();
                    successful.resolve(result);
                    //console.log('In clinchService fetchClinches. Got result = '+result.length+' records.');
                    return successful;
                  },
                  function (error) {
                    var failed = new Parse.Promise();
                    failed.reject(error); 
                    return failed;               
                  });
            }else{
                var request = {};
                var response = {};
                
                
                theService.localParseCloud(request,response);
                
                //theService.clinches = answer;
                var successful = new Parse.Promise();
                successful.resolve(theService.clinches);                    
                return successful;
            }
        }

        theService.localParseCloud = function(request,response){

           
            
            var currentUser = Parse.User.current();
            var clinches = [];
            var clinchTypes = [];
            var typeMap = [];
            var userRules = [];
            //var otherUsers = [];

            var currentUserProfession = currentUser.get('Profession');
            if(typeof currentUserProfession === 'undefined' || currentUserProfession === null){
                var message = 'Current User Profession is '+currentUserProfession+'.\nPlease set your profession, for user <'+currentUser.get('username')+'>';
                console.log(message);
                response.error(message);
                return;
            }
            var currentUserLocation = currentUser.get('location');
            if(typeof currentUserLocation === 'undefined' || currentUserLocation === null){
                var message = 'Current User Location is '+currentUserLocation+'.\nPlease set your location, for user <'+currentUser.get('username')+'>';
                console.log(message);
                response.error(message);
                return;
            }

            var refClinchTypes = new Parse.Query("ClinchType");                
            refClinchTypes.addAscending("Priority");
            refClinchTypes.find().then(function (refClinchTypesR){
                clinchTypes = refClinchTypesR;
                for(var z=0; z <refClinchTypesR.length; z++){
//console.log('Got refClinchTypesR['+z+']='+refClinchTypesR[z].id+' Priority='+refClinchTypesR[z].get('Priority')+', Name='+refClinchTypesR[z].get('Name'));
                    typeMap[refClinchTypesR[z].id] = [];
                }
                return currentUser.get('Profession').fetch();
            }).then( function(currentUserProfession) {                
                var rulesToProfession = new Parse.Query("ClinchRules");
                rulesToProfession.equalTo('ToProfession',currentUserProfession);
                var rulesToAllProfessions = new Parse.Query("ClinchRules");
                rulesToAllProfessions.equalTo('ToAllProfessions',true);
                var query = Parse.Query.or(rulesToProfession, rulesToAllProfessions);  
                query.include('ClinchType');
                query.include('FromProfession');
                query.addAscending("updatedAt");
                return query.find();
            }).then( function(rules) {                
                userRules = rules;        
                for (var i = 0; i < userRules.length; i++) {
                    var rule = userRules[i];
//console.log('Got userRules['+i+']='+userRules[i].id+' ClinchType='+userRules[i].get('ClinchType').id+', title='+userRules[i].get('RuleTitle'));
                    var tempRuleClinchType = rule.get('ClinchType');
                    if(typeof tempRuleClinchType === 'undefined' || tempRuleClinchType === null ){
                        var message = 'ClinchType is '+tempRuleClinchType+'.\nPlease set ClinchType, for rule <'+rule.id+'>';
                        console.log(message);
                        continue;
                    }
                    var tempFromProfession = rule.get('FromProfession');

                    var Clinch = buildValidateClinch(currentUser, rule, tempRuleClinchType, tempFromProfession);
                    if(typeof Clinch === 'undefined' || Clinch === null){                                    
                        continue;
                    }
//console.log('*Adding to typeMap - Type='+tempRuleClinchType.id+', title='+userRules[i].get('RuleTitle'));
                    typeMap[tempRuleClinchType.id].push(Clinch);
                }//end of for

                var clinchIndex = 0; 
                var longestArray = 0;
                for(var i=0; i<longestArray || i==0; i++){

                    for(var z=0; z <clinchTypes.length; z++){
                        if(z==0 && typeMap[clinchTypes[z].id].length > longestArray){
                            longestArray = typeMap[clinchTypes[z].id].length;
                        }
                        
                        if(!typeMap[clinchTypes[z].id][i] || typeMap[clinchTypes[z].id][i] === 'undefined' || typeMap[clinchTypes[z].id][i] === null){                                    
                            continue;
                        }


                        clinches[clinchIndex] = typeMap[clinchTypes[z].id][i];
                        clinchIndex++;
                    }
                }                
                console.log('In generateClinches - returning clinches = '+clinches.length +' records');
                //response.success(clinches);
                 theService.clinches = clinches;
            }, function(error) {
                response.error(error);
            });            
        }//end of function

        function buildValidateClinch(toUser, rule, ruleClinchType, fromProfession){        
            //var ruleClinchTypeTitle = ruleClinchType.get('Title');
            var ruleClinchTypeShortDesc = ruleClinchType.get('ShortDescription');
            var ruleClinchTypeLongDesc = ruleClinchType.get('LongDescription');
            var ruleClinchTypeImageName = ruleClinchType.get('ImageName');
            var ruleDescription = rule.get('RuleDescription');
            var ruleTitle = rule.get('RuleTitle');
            var fromAllProfessions = rule.get('FromAllProfessions');
            
            var Clinch = {};
            //is this needed?
            //Clinch.objectClinchType = ruleClinchType;
            //Clinch.type = ruleClinchTypeTitle;
            Clinch.ruleId = rule.id;
            Clinch.clinchTypeId = ruleClinchType.id;
            Clinch.shortDescription = ruleClinchTypeShortDesc;
            Clinch.longDescription = ruleClinchTypeLongDesc;    
            Clinch.clinchTypeImage = ruleClinchTypeImageName;
            Clinch.ruleDescription = ruleDescription;
            Clinch.ruleTitle = ruleTitle;
            Clinch.fromAllProfessions = fromAllProfessions;
            if(fromProfession){
                Clinch.professionImage = fromProfession.get('imageFileName');
                Clinch.professionName = fromProfession.get('ProfessionName');
                Clinch.professionId = fromProfession.id;
            }
            return Clinch;
        }

        function buildCompleteClinch(toUser, fromUser, clinchType, clinchRule){
            var fromUserProfession = fromUser.get('Profession');

            var Clinch = {};
            Clinch.clinchTypeId = clinchType.id;
            Clinch.clinchTypeTitle = clinchType.get("Title");
            Clinch.fromUserBusinessName = fromUser.get('BusinessName');
            Clinch.shortDescription = clinchType.get('ShortDescription');
            Clinch.longDescription = clinchType.get('LongDescription');
            Clinch.clinchTypeImage = clinchType.get('ImageName');
            Clinch.professionImage = fromUserProfession.get('imageFileName');
            Clinch.professionName = fromUserProfession.get('ProfessionName');
            Clinch.professionId = fromUserProfession.id;
            Clinch.fromUserLocation = fromUser.get('location');
            Clinch.kilometersTo = Math.round(fromUser.get('location').kilometersTo(toUser.get('location')));
            Clinch.fromUserEmail = fromUser.get('email');
            if(clinchRule){
                Clinch.ruleId = clinchRule.id;
                Clinch.ruleDescription = clinchRule.get('RuleDescription');
                Clinch.ruleTitle = clinchRule.get('RuleTitle');  
            }
            return Clinch;
        }

        return theService;
    }
);


