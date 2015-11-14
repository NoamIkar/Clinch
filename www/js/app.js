// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('starter', ['ionic', 'ngCordova','langModule','clinch','globalsModule', 'users', 'professionModule','ngMessages'])

.run(function($ionicPlatform, $state, langService, clinchService, globalsService) {
  $ionicPlatform.ready(function($urlRouterProvider) {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    if (typeof navigator.globalization === "undefined"){
          console.log('the navigator.globalization is not available and undefined.\nIt may be that you are using your browser for testing.\nSetting to English...'); // print into console
          langService.setCurrentLanguage("en");
          globalsService.init();
          //langService.fillStrings();
          

          if(window.localStorage.getItem("Intro") === "wasShown")
          {
              var currentUser = Parse.User.current();
              if (currentUser) {
                  //$state.go('ltr.clinches');
                  //console.log('In app.js Sending a reload request with FALSE...');
                  //clinchService.getClinches(false);
                  $state.go('ltr.cards');
              } else {
                  $state.go('ltr.login');
              }

          }
          else
              $state.go('ltr.intro');
    } else {
            
          navigator.globalization.getPreferredLanguage(
              function (language, $stateProvider) {
                  if (language.value === "he-IL") {
                      langService.setCurrentLanguage("he");
                      globalsService.init();
                      //langService.fillStrings();
                      

                      if(window.localStorage.getItem("Intro") === "wasShown")
                      {
                          var currentUser = Parse.User.current();
                          if (currentUser) {
                              //$state.go('rtl.clinches');
                              //clinchService.getClinches(false);
                              $state.go('rtl.cards');
                          } else {
                              $state.go('rtl.login');
                          }

                      }
                      else
                          $state.go('rtl.intro');
                  }
                  else {
                      langService.setCurrentLanguage("en");
                      globalsService.init();
                      //langService.fillStrings();
                      

                      if(window.localStorage.getItem("Intro") === "wasShown")
                      {
                          var currentUser = Parse.User.current();
                          if (currentUser) {
                              //$state.go('ltr.clinches');
                              //clinchService.getClinches(false);
                              $state.go('ltr.cards');
                          } else {
                              $state.go('ltr.login');
                          }

                      }
                      else
                          $state.go('ltr.intro');
                  }
              }, function () {
                  alert('Error getting language\n');
              });
            }

  });
})
.config(function($stateProvider, $urlRouterProvider) {

        //*******************   Base States - RTL and LRT  (not activated directly - are abstract  **********************
        $stateProvider
            .state('rtl', {
                url: '/rtl',
                abstract: true,
                templateUrl: 'rtlTemplates/rtlMain.html',
                controller: 'clinchesController'
            })
            .state('ltr', {
                url: '/ltr',
                abstract: true,
                templateUrl: 'Templates/main.html',
                controller: 'clinchesController'
            })

            //*******************************    LTR states  ***********************************************
            .state('ltr.activecards', {
                url: '/activecards',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/activeCards.html',
                        controller: 'activeClinchesController'
                    }
                }
            })
            .state('ltr.activeclinch', {
                url: '/activeclinches/:clinchId',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/activeClinch.html',
                        controller: 'activeClinchController'
                    }
                }
            })
            .state('ltr.activeclinches', {
                url: '/activeclinches',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/activeClinches.html',
                        controller: 'activeClinchesController'
                    }
                }
            })
            .state('ltr.cards', {
                url: '/clinches',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/Cards.html',
                        controller: 'clinchesController' //<- was this a typo or a placeholder to set new controller
                    }
                }
            })
            .state('ltr.userslist', {
                url: '/clinches/:clinchIndex',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/UsersList.html',
                        controller: 'UserListController' //<- was this a typo or a placeholder to set new controller
                    }
                }
            })
            .state('ltr.clinch', {
                url: "/clinches/:clinchIndex/:userClinchIndex",
                views: {
                    'menuContent': {
                        templateUrl: "Templates/Clinch.html",
                        controller: "clinchController"
                    }
                }

            })
            .state('ltr.clinches', {
                url: '/clinches',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/Clinches.html',
                        //controller: 'clinchesController'
                    }
                }
            })
            .state('ltr.editmyprofile', {
                url: '/editmyprofile',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/myProfile.html',
                        controller: 'myProfileController'
                    }
                }
            })
            .state('ltr.intro', {
                url: '/intro/',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/Intro.html',
                        controller: 'introController'
                    }
                }
            })
            .state('ltr.location', {
                url: '/location',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/Location.html',
                        controller: 'locationController'
                    }
                }
            })
            .state('ltr.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/Login.html',
                        controller: 'loginController'
                    }
                }
            })
            .state('ltr.signup', {
                url: '/signup',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/SignUp.html',
                        controller: 'signUpController'
                    }
                }
            })
            .state('ltr.cardsirequested', {
                url: '/cardsirequested',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/CardsIRequested.html',
                        controller: 'ClinchesIRequestedController'
                    }
                }
            })
            .state('ltr.clinchirequested', {
                url: '/clinchirequested/:clinchId',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/ClinchIRequested.html',
                        controller: 'ClinchIRequestedController'
                    }
                }
            })
            .state('ltr.clinchesirequested', {
                url: '/clinchesirequested',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/ClinchesIRequested.html',
                        controller: 'ClinchesIRequestedController'
                    }
                }
            })
            .state('ltr.myprofile', {
                url: '/myprofile',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/myProfile.html',
                        controller: 'myProfileController'
                    }
                }
            })
            .state('ltr.myrequestedcards', {
                url: '/myrequestedcards',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/myRequestedCards.html',
                        controller: 'myRequestedClinchesController'
                    }
                }
            })
            .state('ltr.myrequestedclinch', {
                url: '/myrequestedclinches/:clinchId',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/myRequestedClinch.html',
                        controller: 'myRequestedClinchController'
                    }
                }
            })
            .state('ltr.myrequestedclinches', {
                url: '/myrequestedclinches',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/myRequestedClinches.html',
                        controller: 'myRequestedClinchesController'
                    }
                }
            })
            .state('ltr.profession', {
                url: '/profession',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/Profession.html',
                        controller: 'professionController'
                    }
                }
            })
            .state('ltr.settings', {
                url: '/settings',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/settingsPage.html',
                        controller: 'settingsPageController'
                    }
                }
            })
            .state('ltr.createNewClinchRule', {
                url: '/createNewClinchRule',
                views: {
                    'menuContent': {
                        templateUrl: 'Templates/CreateNewClinchRule.html',
                        controller: 'settingsPageController'
                    }
                }
            })
            //*****************************   RTL starts here ***************************************

            .state('rtl.activecards', {
                url: '/rtlactivecards',
                views: {
                    'menuContent': {
                        templateUrl: 'rtlTemplates/rtlActiveCards.html',
                        controller: 'activeClinchesController'
                    }
                }
            })
            .state('rtl.activeclinch', {
                url: '/rtlactiveclinches/:clinchId',
                views: {
                    'menuContent': {
                        templateUrl: 'rtlTemplates/rtlActiveClinch.html',
                        controller: 'activeClinchController'
                    }
                }
            })
            .state('rtl.activeclinches', {
                url: '/rtlactiveclinches',
                views: {
                    'menuContent': {
                        templateUrl: 'rtlTemplates/rtlActiveClinches.html',
                        controller: 'activeClinchesController'
                    }
                }
            })
            .state('rtl.cards', {
                url: "/rtlcards",
                views: {
                    'menuContent': {
                        templateUrl: "rtlTemplates/rtlCards.html",
                        //controller: 'clinchesController'
                    }
                }
            })
            .state('rtl.clinch', {
                url: "/rtlclinches/:clinchId",
                views: {
                    'menuContent': {
                        templateUrl: "rtlTemplates/rtlClinch.html",
                        controller: "clinchController"
                    }
                }

            })
            .state('rtl.clinches', {
                url: '/rtlclinches',
                views: {
                    'menuContent': {
                        templateUrl: 'rtlTemplates/rtlClinches.html',
                        //controller: 'clinchesController'
                    }
                }
            })
            .state('rtl.editmyprofile', {
                url: '/rtleditmyprofile',
                views: {
                    'menuContent': {
                        templateUrl: 'rtlTemplates/rtlMyProfile.html',
                        controller: 'editMyProfileController'
                    }
                }
            })
            .state('rtl.intro', {
                url: '/rtlintro/',
                views: {
                    'menuContent': {
                        templateUrl: 'rtlTemplates/rtlIntro.html',
                        controller: 'introController'
                    }
                }
            })
            .state('rtl.location', {
                url: '/rtllocation',
                views: {
                    'menuContent': {
                        templateUrl: 'rtlTemplates/rtlLocation.html',
                        controller: 'locationController'
                    }
                }
            })
            .state('rtl.login', {
                url: '/rtllogin',
                views: {
                    'menuContent': {
                        templateUrl: 'rtlTemplates/rtlLogin.html',
                        controller: 'loginController'
                    }
                }
            })
            .state('rtl.signup', {
                url: '/rtlsignup',
                views: {
                    'menuContent': {
                        templateUrl: 'rtlTemplates/rtlSignUp.html',
                        controller: 'signUpController'
                    }
                }
            })
            .state('rtl.cardsirequested', {
                url: '/rtlcardsirequested',
                views: {
                    'menuContent': {
                        templateUrl: 'rtlTemplates/rtlCardsIRequested.html',
                        controller: 'ClinchesIRequestedController'
                    }
                }
            })
            .state('rtl.clinchirequested', {
                url: '/rtlclinchirequested/:clinchId',
                views: {
                    'menuContent': {
                        templateUrl: 'rtlTemplates/rtlClinchIRequested.html',
                        controller: 'ClinchIRequestedController'
                    }
                }
            })
            .state('rtl.clinchesirequested', {
                url: '/rtlclinchesirequested',
                views: {
                    'menuContent': {
                        templateUrl: 'rtlTemplates/rtlClinchesIRequested.html',
                        controller: 'ClinchesIRequestedController'
                    }
                }
            })
            .state('rtl.myprofile', {
                url: '/rtlmyprofile',
                views: {
                    'menuContent': {
                        templateUrl: 'rtlTemplates/rtlMyProfile.html',
                        controller: 'myProfileController'
                    }
                }
            })
            .state('rtl.myrequestedcards', {
                url: '/rtlmyrequestedcards',
                views: {
                    'menuContent': {
                        templateUrl: 'rtlTemplates/rtlMyRequestedCards.html',
                        controller: 'myRequestedClinchesController'
                    }
                }
            })
            .state('rtl.myrequestedclinch', {
                url: '/rtlmyrequestedclinches/:clinchId',
                views: {
                    'menuContent': {
                        templateUrl: 'rtlTemplates/rtlMyRequestedClinch.html',
                        controller: 'myRequestedClinchController'
                    }
                }
            })
            .state('rtl.myrequestedclinches', {
                url: '/rtlmyrequestedclinches',
                views: {
                    'menuContent': {
                        templateUrl: 'rtlTemplates/rtlMyRequestedClinches.html',
                        controller: 'myRequestedClinchesController'
                    }
                }
            })
            .state('rtl.profession', {
                url: '/rtlprofession',
                views: {
                    'menuContent': {
                        templateUrl: 'rtlTemplates/rtlProfession.html',
                        controller: 'professionController'
                    }
                }
            })
            .state('rtl.settings', {
                url: '/rtlsettings',
                views: {
                    'menuContent': {
                        templateUrl: 'rtlTemplates/rtlSettingsPage.html',
                        controller: 'settingsPageController'
                    }
                }
            })
            .state('rtl.createNewClinchRule', {
                url: '/rtlCreateNewClinchRule',
                views: {
                    'menuContent': {
                        templateUrl: 'rtlTemplates/rtlCreateNewClinchRule.html',
                        controller: 'settingsPageController'
                    }
                }
            })
        ;


        //$urlRouterProvider.otherwise('/app/playlists');



    });