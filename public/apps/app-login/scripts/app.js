'use strict';
/**
 * @ngdoc overview
 * @name loginApp
 * @description
 * # loginApp
 *
 * Main module of the application.
 */
angular
  .module('loginApp', [
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

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('login',{
        templateUrl:'/apps/app-login/views/pages/login.html',
        url:'/',
        controller:'loginCtrl',
        controllerAs: 'vm',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'loginApp',
                files:[
                '/apps/app-login/scripts/controllers/loginController.js',
                '/apps/app-login/scripts/services/data-store-user.js',
                '/apps/app-login/styles/login-form.css'
                ]
            });
          }
        }
    });
  }]);
