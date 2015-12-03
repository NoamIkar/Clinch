/**
 * Created by Yuval on 04/04/2015.
 */

var professionModule = angular.module('professionModule', []);


professionModule.factory('professionService', function ($q, globalsService) {

    var theService = {};
    theService.professions=[];    // Real parse.com objects



    theService.getAllProfessions = function()
    {
        /*var d = $q.defer();
        var allProfessions = [];

        var ProfessionClass = Parse.Object.extend("Profession");
        var query = new Parse.Query(ProfessionClass);

        query.find().then(
            function (professionsQ) {
                theService.professions = professionsQ;

                for (var i = 0; i < professionsQ.length; i++) {
                    allProfessions[i] = {};
                    allProfessions[i].professionName = professionsQ[i].get('ProfessionName');
                    allProfessions[i].imageFileName = professionsQ[i].get('imageFileName');
                    allProfessions[i].index = i;
                    allProfessions[i].id = professionsQ[i].id;
                }
                d.resolve(allProfessions);
            }
        )

        return d.promise;*/
        return globalsService.getAllProfessions();
    }

    /*theService.getProfession = function(i)
    {
        return  theService.professions[i];
    }*/

    theService.saveProfession = function(profession)
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
        //var parseProfession = theService.getProfession(profession.index);
        var parseProfession = globalsService.getProfession(profession.id);
        //console.log('In professionController - setProfession - parseProfession='+parseProfession.id);
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
    }

    return theService;
});