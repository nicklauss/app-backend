'use strict';
/**
 * @ngdoc overview
 * @name programApp
 * @description
 * # programApp
 *
 * Main module of the application.
 */
angular
  .module('programApp', [
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
        templateUrl: '/apps/app-program/views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'programApp',
                    files:[
                    '/apps/app-program/scripts/directives/header/header.js',
                    '/apps/app-program/scripts/directives/header/header-notification/header-notification.js',
                    '/apps/app-program/scripts/directives/sidebar/sidebar.js',
                    '/apps/app-program/scripts/directives/sidebar/sidebar-search/sidebar-search.js'
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
        templateUrl:'/apps/app-program/views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'programApp',
              files:[
              '/apps/app-program/scripts/controllers/main.js',
              '/apps/app-program/scripts/directives/timeline/timeline.js',
              '/apps/app-program/scripts/directives/notifications/notifications.js',
              '/apps/app-program/scripts/directives/chat/chat.js',
              '/apps/app-program/scripts/directives/dashboard/stats/stats.js',
              '/apps/app-program/scripts/services/data-store-publication.js',
              '/apps/app-program/scripts/services/data-store-user.js',
              '/apps/app-program/scripts/services/data-store-congre.js',
              '/apps/app-program/styles/badge.css',
              '/apps/app-program/styles/checkbox.css'
              ]
            })
          }
        }
      })
      .state('dashboard.form',{
        templateUrl:'/apps/app-program/views/form.html',
        url:'/form'
    })
      .state('login',{
        templateUrl:'/apps/app-program/views/pages/login.html',
        url:'/login'
    })
      .state('dashboard.chart',{
        templateUrl:'/apps/app-program/views/chart.html',
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
                name:'programApp',
                files:['/apps/app-program/scripts/controllers/chartContoller.js']
            });
          }
        }
    })
      .state('dashboard.table',{
        templateUrl:'/apps/app-program/views/table.html',
        url:'/table'
    })
      .state('dashboard.panels-wells',{
          templateUrl:'/apps/app-program/views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'/apps/app-program/views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'/apps/app-program/views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'/apps/app-program/views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'/apps/app-program/views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'/apps/app-program/views/ui-elements/grid.html',
       url:'/grid'
   })
      .state('dashboard.phases', {
        templateUrl:'/apps/app-program/views/pages/phases.html',
        url:'/phases',
        controller:'phasesCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'programApp',
                files:[
                '/apps/app-program/scripts/controllers/phasesController.js',
                '/apps/app-program/scripts/services/data-store-congre.js',
                '/apps/app-program/styles/phases.css'
                ]
            });
          }
        }
      })
      .state('dashboard.experts', {
        templateUrl:'/apps/app-program/views/pages/experts.html',
        url:'/experts',
        controller:'expertsCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'programApp',
                files:[
                '/apps/app-program/scripts/controllers/expertsController.js',
                '/apps/app-program/scripts/services/data-store-publication.js',
                '/apps/app-program/scripts/services/data-store-user.js',
                '/apps/app-program/styles/edit-modal.css',
                '/apps/app-program/styles/experts.css'
                ]
            });
          }
        }
      })
      .state('dashboard.auteurs', {
        templateUrl:'/apps/app-program/views/pages/auteurs.html',
        url:'/auteurs',
        controller:'auteursCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'programApp',
                files:[
                '/apps/app-program/scripts/controllers/auteursController.js',
                '/apps/app-program/scripts/services/data-store-user.js',
                '/apps/app-program/styles/edit-modal.css'
                ]
            });
          }
        }
      })
      .state('dashboard.rapports', {
        templateUrl:'/apps/app-program/views/pages/rapports.html',
        url:'/rapports',
        controller:'rapportsCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'programApp',
                files:[
                '/apps/app-program/scripts/controllers/rapportsController.js',
                '/apps/app-program/scripts/services/data-store-publication.js',
                '/apps/app-program/scripts/services/data-store-user.js',
                '/apps/app-program/scripts/services/data-store-congre.js',
                '/apps/app-program/styles/edit-modal.css'
                ]
            });
          }
        }
      })
      .state('dashboard.publications', {
        templateUrl:'/apps/app-program/views/pages/publications.html',
        url:'/publications',
        controller:'publicationsCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'programApp',
                files:[
                '/apps/app-program/scripts/controllers/publicationsController.js',
                '/apps/app-program/scripts/services/data-store-publication.js',
                '/apps/app-program/styles/edit-modal.css'
                ]
            });
          }
        }
      })
      .state('dashboard.programme', {
        templateUrl:'/apps/app-program/views/pages/programme.html',
        url:'/programme',
        controller:'programmeCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'programApp',
                files:[
                '/apps/app-program/scripts/controllers/programmeController.js',
                '/apps/app-program/scripts/services/data-store-user.js',
                '/apps/app-program/scripts/services/data-store-session.js',
                '/apps/app-program/styles/edit-modal.css',
                '/apps/app-program/styles/session.css'
                ]
            });
          }
        }
      })
      .state('dashboard.profile',{
        templateUrl:'/apps/app-program/views/pages/profile.html',
        url:'/profile',
        controller:'profileCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'programApp',
                files:[
                '/apps/app-program/scripts/controllers/profileController.js',
                '/apps/app-program/scripts/services/data-store-user.js',
                '/apps/app-program/scripts/services/data-store-congre.js',
                '/apps/app-program/styles/edit-modal.css',
                '/apps/app-program/styles/profile.css'
                ]
            });
          }
        }
    })
  }]);
