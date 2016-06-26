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
                    '/apps/app-author/scripts/directives/sidebar/sidebar-search/sidebar-search.js',
                    '/apps/app-author/scripts/services/data-store-publication.js',
                    '/apps/app-author/scripts/services/data-store-user.js',
                    '/apps/app-author/scripts/services/data-store-congre.js'
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
              '/apps/app-author/scripts/directives/dashboard/stats/stats.js',
              '/apps/app-author/scripts/services/data-store-publication.js',
              '/apps/app-author/scripts/services/data-store-user.js',
              '/apps/app-author/scripts/services/data-store-congre.js',
              '/apps/app-author/styles/badge.css',
              '/apps/app-author/styles/checkbox.css'
              ]
            });
          }
        }
      })
      .state('dashboard.publications', {
        templateUrl:'/apps/app-author/views/pages/publications.html',
        url:'/publications',
        controller:'publicationsCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'authorApp',
                files:[
                '/apps/app-author/scripts/controllers/publicationsController.js',
                '/apps/app-author/scripts/services/data-store-publication.js',
                '/apps/app-author/scripts/services/data-store-user.js',
                '/apps/app-author/styles/edit-modal.css'
                ]
            });
          }
        }
      })
      .state('dashboard.presentations', {
        templateUrl:'/apps/app-author/views/pages/presentations.html',
        url:'/presentations',
        controller:'presentationsCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'authorApp',
                files:[
                '/apps/app-author/scripts/controllers/presentationsController.js',
                '/apps/app-author/scripts/services/data-store-publication.js',
                '/apps/app-author/scripts/services/data-store-user.js',
                '/apps/app-author/scripts/services/data-store-session.js',
                '/apps/app-author/scripts/services/data-store-congre.js',
                '/apps/app-author/styles/edit-modal.css'
                ]
            });
          }
        }
      })
      .state('dashboard.sessions', {
        templateUrl:'/apps/app-author/views/pages/sessions.html',
        url:'/session',
        controller:'sessionsCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'authorApp',
                files:[
                '/apps/app-author/scripts/controllers/sessionsController.js',
                '/apps/app-author/scripts/services/data-store-session.js',
                '/apps/app-author/scripts/services/data-store-user.js',
                '/apps/app-author/styles/edit-modal.css',
                '/apps/app-author/styles/session.css'
                ]
            });
          }
        }
      })
      .state('dashboard.profile',{
        templateUrl:'/apps/app-author/views/pages/profile.html',
        url:'/profile',
        controller:'profileCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'authorApp',
                files:[
                '/apps/app-author/scripts/controllers/profileController.js',
                '/apps/app-author/scripts/services/data-store-user.js',
                '/apps/app-author/styles/edit-modal.css',
                '/apps/app-author/styles/profile.css'
                ]
            });
          }
        }
    })
  }]);
