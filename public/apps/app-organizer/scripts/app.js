'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/dashboard/home');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: '/apps/app-organizer/views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    '/apps/app-organizer/scripts/directives/header/header.js',
                    '/apps/app-organizer/scripts/directives/header/header-notification/header-notification.js',
                    '/apps/app-organizer/scripts/directives/sidebar/sidebar.js',
                    '/apps/app-organizer/scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["/vendor/angular-toggle-switch/angular-toggle-switch.min.js",
                          "/vendor/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['/vendor/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['/vendor/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['/vendor/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['/vendor/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['/vendor/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'/apps/app-organizer/views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              '/apps/app-organizer/scripts/controllers/main.js',
              '/apps/app-organizer/scripts/directives/timeline/timeline.js',
              '/apps/app-organizer/scripts/directives/notifications/notifications.js',
              '/apps/app-organizer/scripts/directives/chat/chat.js',
              '/apps/app-organizer/scripts/directives/dashboard/stats/stats.js',
              '/apps/app-organizer/scripts/services/data-store-publication.js',
              '/apps/app-organizer/scripts/services/data-store-user.js',
              '/apps/app-organizer/scripts/services/data-store-congre.js',
              '/apps/app-program/styles/badge.css',
              '/apps/app-program/styles/checkbox.css'
              ]
            })
          }
        }
      })
      .state('dashboard.form',{
        templateUrl:'/apps/app-organizer/views/form.html',
        url:'/form'
    })
      .state('dashboard.blank',{
        templateUrl:'/apps/app-organizer/views/pages/blank.html',
        url:'/blank'
    })
      .state('login',{
        templateUrl:'/apps/app-organizer/views/pages/login.html',
        url:'/login',
        controller:'loginCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:[
                '/apps/app-organizer/scripts/controllers/loginController.js',
                '/apps/app-organizer/scripts/services/data-store-user.js',
                '/apps/app-organizer/styles/edit-modal.css',
                '/apps/app-organizer/styles/login-form.css'
                ]
            });
          }
        }
    })
      .state('dashboard.chart',{
        templateUrl:'/apps/app-organizer/views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                '/vendor/angular-chart.js/dist/angular-chart.min.js',
                '/vendor/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['/apps/app-organizer/scripts/controllers/chartContoller.js']
            });
          }
        }
    })
      .state('dashboard.table',{
        templateUrl:'/apps/app-organizer/views/table.html',
        url:'/table'
    })
      .state('dashboard.panels-wells',{
          templateUrl:'/apps/app-organizer/views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'/apps/app-organizer/views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'/apps/app-organizer/views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'/apps/app-organizer/views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'/apps/app-organizer/views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'/apps/app-organizer/views/ui-elements/grid.html',
       url:'/grid'
   })
      .state('dashboard.newCongre', {
        templateUrl:'/apps/app-organizer/views/pages/new_congre.html',
        url:'/new-congre',
        controller:'newCongreCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:[
                '/apps/app-organizer/scripts/controllers/newCongreController.js',
                '/apps/app-organizer/scripts/services/data-store-congre.js'
                ]
            });
          }
        }
      })
      .state('dashboard.listCongres', {
        templateUrl:'/apps/app-organizer/views/pages/list_congres.html',
        url:'/list-congres',
        controller:'listCongresCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:[
                '/apps/app-organizer/scripts/controllers/listCongresController.js',
                '/apps/app-organizer/scripts/services/data-store-congre.js',
                '/apps/app-organizer/scripts/services/data-store-user.js'
                ]
            });
          }
        }
      })
      .state('dashboard.experts', {
        templateUrl:'/apps/app-organizer/views/pages/experts.html',
        url:'/experts',
        controller:'expertsCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:[
                '/apps/app-organizer/scripts/controllers/expertsController.js',
                '/apps/app-organizer/scripts/services/data-store-user.js',
                '/apps/app-organizer/styles/edit-modal.css'
                ]
            });
          }
        }
      })
      .state('dashboard.auteurs', {
        templateUrl:'/apps/app-organizer/views/pages/auteurs.html',
        url:'/auteurs',
        controller:'auteursCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:[
                '/apps/app-organizer/scripts/controllers/auteursController.js',
                '/apps/app-organizer/scripts/services/data-store-user.js',
                '/apps/app-organizer/styles/edit-modal.css'
                ]
            });
          }
        }
      })
      .state('dashboard.participants', {
        templateUrl:'/apps/app-organizer/views/pages/participants.html',
        url:'/participants',
        controller:'participantsCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:[
                '/apps/app-organizer/scripts/controllers/participantsController.js',
                '/apps/app-organizer/scripts/services/data-store-user.js',
                '/apps/app-organizer/styles/edit-modal.css'
                ]
            });
          }
        }
      })
      .state('dashboard.badges', {
        templateUrl:'/apps/app-organizer/views/pages/badges.html',
        url:'/badges',
        controller:'badgesCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:[
                '/apps/app-organizer/scripts/controllers/badgesController.js',
                '/apps/app-organizer/scripts/services/data-store-user.js',
                '/apps/app-organizer/styles/edit-modal.css',
                '/apps/app-organizer/styles/business-card.css'
                ]
            });
          }
        }
      })
      .state('dashboard.programs', {
        templateUrl:'/apps/app-organizer/views/pages/programs.html',
        url:'/programs',
        controller:'programsCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:[
                '/apps/app-organizer/scripts/controllers/programsController.js',
                '/apps/app-organizer/scripts/services/data-store-user.js',
                '/apps/app-organizer/styles/edit-modal.css'
                ]
            });
          }
        }
      })
  }]);
