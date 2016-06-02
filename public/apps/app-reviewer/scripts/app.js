'use strict';
/**
 * @ngdoc overview
 * @name reviewerApp
 * @description
 * # reviewerApp
 *
 * Main module of the application.
 */
angular
  .module('reviewerApp', [
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
        templateUrl: '/apps/app-reviewer/views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'reviewerApp',
                    files:[
                    '/apps/app-reviewer/scripts/directives/header/header.js',
                    '/apps/app-reviewer/scripts/directives/header/header-notification/header-notification.js',
                    '/apps/app-reviewer/scripts/directives/sidebar/sidebar.js',
                    '/apps/app-reviewer/scripts/directives/sidebar/sidebar-search/sidebar-search.js'
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
        templateUrl:'/apps/app-reviewer/views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'reviewerApp',
              files:[
              '/apps/app-reviewer/scripts/controllers/main.js',
              '/apps/app-reviewer/scripts/directives/timeline/timeline.js',
              '/apps/app-reviewer/scripts/directives/notifications/notifications.js',
              '/apps/app-reviewer/scripts/directives/chat/chat.js',
              '/apps/app-reviewer/scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.form',{
        templateUrl:'/apps/app-reviewer/views/form.html',
        url:'/form'
    })
      .state('dashboard.blank',{
        templateUrl:'/apps/app-reviewer/views/pages/blank.html',
        url:'/blank'
    })
      .state('login',{
        templateUrl:'/apps/app-reviewer/views/pages/login.html',
        url:'/login'
    })
      .state('dashboard.chart',{
        templateUrl:'/apps/app-reviewer/views/chart.html',
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
                name:'reviewerApp',
                files:['/apps/app-reviewer/scripts/controllers/chartContoller.js']
            });
          }
        }
    })
      .state('dashboard.table',{
        templateUrl:'/apps/app-reviewer/views/table.html',
        url:'/table'
    })
      .state('dashboard.panels-wells',{
          templateUrl:'/apps/app-reviewer/views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'/apps/app-reviewer/views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'/apps/app-reviewer/views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'/apps/app-reviewer/views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'/apps/app-reviewer/views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'/apps/app-reviewer/views/ui-elements/grid.html',
       url:'/grid'
   })
      .state('dashboard.newCongre', {
        templateUrl:'/apps/app-reviewer/views/pages/new_congre.html',
        url:'/new-congre',
        controller:'newCongreCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'reviewerApp',
                files:[
                '/apps/app-reviewer/scripts/controllers/newCongreController.js',
                '/apps/app-reviewer/scripts/services/data-store-congre.js'
                ]
            });
          }
        }
      })
      .state('dashboard.listCongres', {
        templateUrl:'/apps/app-reviewer/views/pages/list_congres.html',
        url:'/list-congres',
        controller:'listCongresCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'reviewerApp',
                files:[
                '/apps/app-reviewer/scripts/controllers/listCongresController.js',
                '/apps/app-reviewer/scripts/services/data-store-congre.js'
                ]
            });
          }
        }
      })
      .state('dashboard.experts', {
        templateUrl:'/apps/app-reviewer/views/pages/experts.html',
        url:'/experts',
        controller:'expertsCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'reviewerApp',
                files:[
                '/apps/app-reviewer/scripts/controllers/expertsController.js',
                '/apps/app-reviewer/scripts/services/data-store-user.js',
                '/apps/app-reviewer/styles/edit-modal.css'
                ]
            });
          }
        }
      })
      .state('dashboard.auteurs', {
        templateUrl:'/apps/app-reviewer/views/pages/auteurs.html',
        url:'/auteurs',
        controller:'auteursCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'reviewerApp',
                files:[
                '/apps/app-reviewer/scripts/controllers/auteursController.js',
                '/apps/app-reviewer/scripts/services/data-store-user.js',
                '/apps/app-reviewer/styles/edit-modal.css'
                ]
            });
          }
        }
      })
      .state('dashboard.participants', {
        templateUrl:'/apps/app-reviewer/views/pages/participants.html',
        url:'/participants',
        controller:'participantsCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'reviewerApp',
                files:[
                '/apps/app-reviewer/scripts/controllers/participantsController.js',
                '/apps/app-reviewer/scripts/services/data-store-user.js',
                '/apps/app-reviewer/styles/edit-modal.css'
                ]
            });
          }
        }
      })
      .state('dashboard.programs', {
        templateUrl:'/apps/app-reviewer/views/pages/programs.html',
        url:'/programs',
        controller:'programsCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'reviewerApp',
                files:[
                '/apps/app-reviewer/scripts/controllers/programsController.js',
                '/apps/app-reviewer/scripts/services/data-store-user.js',
                '/apps/app-reviewer/styles/edit-modal.css'
                ]
            });
          }
        }
      })
  }]);