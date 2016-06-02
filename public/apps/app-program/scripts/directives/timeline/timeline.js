'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('programApp')
	.directive('timeline',function() {
    return {
        templateUrl:'/apps/app-program/scripts/directives/timeline/timeline.html',
        restrict: 'E',
        replace: true,
    }
  });
