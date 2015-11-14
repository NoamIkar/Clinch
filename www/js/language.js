/**
 * Created by Yuval on 13/03/2015.
 */


var languageModule = angular.module('langModule', []);

languageModule.factory('langService', function() {

    var theService = {};
    theService.currentLanguage = "en";  // currently either "en" or "he"

    theService.heStrings = [];
    theService.enStrings = [];

    theService.setCurrentLanguage = function(lang)
    {
        theService.currentLanguage = lang;
    };

    theService.getCurrentLanguage = function()
    {
        return(theService.currentLanguage);
    };

    theService.getDirection = function()
    {
        if (theService.currentLanguage === "he")
            return("rtl")
        else
            return("ltr");

    };




    theService.getString = function(code)
    {
        if (theService.currentLanguage==="he")
            return(theService.heStrings[code]);
        else
            return(theService.enStrings[code]);
    };

    theService.fillStrings  = function()
    {
        theService.enStrings["clinch"] = "Clinch";
        theService.heStrings["clinch"] = "קלינצ'";

        theService.enStrings["clinchType"] = "Clinch Type";
        theService.heStrings["clinchType"] = "סוג הקלימצ'";

        // ====    Mutual Like  =====
        theService.enStrings["muLike"] = "Mutual Like";
        theService.heStrings["muLike"] = "לייק הדדי";

        theService.enStrings["muLikeShortDesc"] = "Mutual like will give you both a like in your Facebook.com business page.";
        theService.heStrings["muLikeShortDesc"] = "לייקים הדדיים יאפשרו לשניכם לקבל לייק בדף הפייסבוק שלכם.";

        theService.enStrings["muLikeImage"] = "Facebook-like-new.jpg";
        theService.heStrings["muLikeImage"] = "Facebook-like-new.jpg";

        // ====   Mutual Activity ====
        theService.enStrings["muAct"] = "Mutual Activity";
        theService.heStrings["muAct"] = "פעילות משותפת";

        theService.enStrings["muActShortDesc"] = "Your business agenda is close. You can benefit from mutual activity, like selling a product together.";
        theService.heStrings["muActShortDesc"] = "התחומים העסקיים שלכם קרובים. תוכלו לקדם את העסק על ידי יצירת פעילות עסקית משותפת, דוגמת חבילה מוצרים.";

        theService.enStrings["muActImage"] = "Bundle.jpg";
        theService.heStrings["muActImage"] = "Bundle.jpg";




    }
    return theService;
});
