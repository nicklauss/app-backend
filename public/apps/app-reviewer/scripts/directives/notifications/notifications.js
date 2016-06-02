'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('reviewerApp')
	.directive('notifications',function(){
		return {
        templateUrl:'/apps/app-reviewer/scripts/directives/notifications/notifications.html',
        restrict: 'E',
        replace: true,
    	}
	});
