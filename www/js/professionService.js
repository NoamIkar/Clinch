/**
 * Created by Yuval on 04/04/2015.
 */

var professionModule = angular.module('professionModule', []);


professionModule.factory('professionService', function ($q) {

    var theService = {};
    theService.professions=[];    // Real parse.com objects



    theService.getAllProfessions = function()
    {
        var d = $q.defer();
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

        return d.promise;
    }
    theService.getProfession = function(i)
    {
        return  theService.professions[i];
    }
    return theService;
});