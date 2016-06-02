'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('reviewerApp')
	.directive('timeline',function() {
    return {
        templateUrl:'/apps/app-reviewer/scripts/directives/timeline/timeline.html',
        restrict: 'E',
        replace: true,
    }
  });
