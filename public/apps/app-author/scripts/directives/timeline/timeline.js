'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('authorApp')
	.directive('timeline',function() {
    return {
        templateUrl:'/apps/app-author/scripts/directives/timeline/timeline.html',
        restrict: 'E',
        replace: true,
    }
  });
