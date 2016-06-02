'use strict';
/**
 * @ngdoc overview
 * @name authorApp
 * @description
 * # authorApp
 *
 * Main module of the application.
 */
angular
  .module('authorApp', [
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
        templateUrl: '/apps/app-author/views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'authorApp',
                    files:[
                    '/apps/app-author/scripts/directives/header/header.js',
                    '/apps/app-author/scripts/directives/header/header-notification/header-notification.js',
                    '/apps/app-author/scripts/directives/sidebar/sidebar.js',
                    '/apps/app-author/scripts/directives/sidebar/sidebar-search/sidebar-search.js'
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
        templateUrl:'/apps/app-author/views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'authorApp',
              files:[
              '/apps/app-author/scripts/controllers/main.js',
              '/apps/app-author/scripts/directives/timeline/timeline.js',
              '/apps/app-author/scripts/directives/notifications/notifications.js',
              '/apps/app-author/scripts/directives/chat/chat.js',
              '/apps/app-author/scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.form',{
        templateUrl:'/apps/app-author/views/form.html',
        url:'/form'
    })
      .state('dashboard.blank',{
        templateUrl:'/apps/app-author/views/pages/blank.html',
        url:'/blank'
    })
      .state('login',{
        templateUrl:'/apps/app-author/views/pages/login.html',
        url:'/login'
    })
      .state('dashboard.chart',{
        templateUrl:'/apps/app-author/views/chart.html',
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
                name:'authorApp',
                files:['/apps/app-author/scripts/controllers/chartContoller.js']
            });
          }
        }
    })
      .state('dashboard.table',{
        templateUrl:'/apps/app-author/views/table.html',
        url:'/table'
    })
      .state('dashboard.panels-wells',{
          templateUrl:'/apps/app-author/views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'/apps/app-author/views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'/apps/app-author/views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'/apps/app-author/views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'/apps/app-author/views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'/apps/app-author/views/ui-elements/grid.html',
       url:'/grid'
   })
      .state('dashboard.newCongre', {
        templateUrl:'/apps/app-author/views/pages/new_congre.html',
        url:'/new-congre',
        controller:'newCongreCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'authorApp',
                files:[
                '/apps/app-author/scripts/controllers/newCongreController.js',
                '/apps/app-author/scripts/services/data-store-congre.js'
                ]
            });
          }
        }
      })
      .state('dashboard.listCongres', {
        templateUrl:'/apps/app-author/views/pages/list_congres.html',
        url:'/list-congres',
        controller:'listCongresCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'authorApp',
                files:[
                '/apps/app-author/scripts/controllers/listCongresController.js',
                '/apps/app-author/scripts/services/data-store-congre.js'
                ]
            });
          }
        }
      })
      .state('dashboard.experts', {
        templateUrl:'/apps/app-author/views/pages/experts.html',
        url:'/experts',
        controller:'expertsCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'authorApp',
                files:[
                '/apps/app-author/scripts/controllers/expertsController.js',
                '/apps/app-author/scripts/services/data-store-user.js',
                '/apps/app-author/styles/edit-modal.css'
                ]
            });
          }
        }
      })
      .state('dashboard.auteurs', {
        templateUrl:'/apps/app-author/views/pages/auteurs.html',
        url:'/auteurs',
        controller:'auteursCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'authorApp',
                files:[
                '/apps/app-author/scripts/controllers/auteursController.js',
                '/apps/app-author/scripts/services/data-store-user.js',
                '/apps/app-author/styles/edit-modal.css'
                ]
            });
          }
        }
      })
      .state('dashboard.participants', {
        templateUrl:'/apps/app-author/views/pages/participants.html',
        url:'/participants',
        controller:'participantsCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'authorApp',
                files:[
                '/apps/app-author/scripts/controllers/participantsController.js',
                '/apps/app-author/scripts/services/data-store-user.js',
                '/apps/app-author/styles/edit-modal.css'
                ]
            });
          }
        }
      })
      .state('dashboard.programs', {
        templateUrl:'/apps/app-author/views/pages/programs.html',
        url:'/programs',
        controller:'programsCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'authorApp',
                files:[
                '/apps/app-author/scripts/controllers/programsController.js',
                '/apps/app-author/scripts/services/data-store-user.js',
                '/apps/app-author/styles/edit-modal.css'
                ]
            });
          }
        }
      })
  }]);