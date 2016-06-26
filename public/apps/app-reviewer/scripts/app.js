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
              '/apps/app-reviewer/scripts/directives/dashboard/stats/stats.js',
              '/apps/app-reviewer/scripts/services/data-store-publication.js',
              '/apps/app-reviewer/scripts/services/data-store-user.js',
              '/apps/app-author/styles/badge.css'
              ]
            })
          }
        }
      })
      .state('dashboard.publications', {
        templateUrl:'/apps/app-reviewer/views/pages/publications.html',
        url:'/publications',
        controller:'publicationsCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'reviewerApp',
                files:[
                '/apps/app-reviewer/scripts/controllers/publicationsController.js',
                '/apps/app-reviewer/scripts/services/data-store-publication.js',
                '/apps/app-reviewer/scripts/services/data-store-user.js'
                ]
            });
          }
        }
      })
      .state('dashboard.profile',{
        templateUrl:'/apps/app-reviewer/views/pages/profile.html',
        url:'/profile',
        controller:'profileCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'reviewerApp',
                files:[
                '/apps/app-reviewer/scripts/controllers/profileController.js',
                '/apps/app-reviewer/scripts/services/data-store-user.js',
                '/apps/app-reviewer/styles/edit-modal.css',
                '/apps/app-reviewer/styles/profile.css'
                ]
            });
          }
        }
    })
  }]);