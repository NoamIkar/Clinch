/**
 * Created by Yuval on 29/03/2015.
 */



var usersModule = angular.module('users', []);


/*usersModule.run(
    function () {

        // Initialize parse with the application key and Javascript key
        Parse.initialize("bk8PWoMjrqIo6MwRsKDPGxz25zcCRCV4FvXchh1F", "4X6Tsq9jFqvRAMMFOIatn0xGNZFmLiMOdg4R4deT");
    }
);*/


usersModule.factory('usersService', function () {

        var theService = {};


        theService.Login = function (uname, password) {
            Parse.User.logIn(uname, password, {
                success: function (user) {
                    // Do stuff after successful login.
                },
                error: function (user, error) {
                    // The login failed. Check error to see why.
                }
            });
        }

        return theService;
    }
);
