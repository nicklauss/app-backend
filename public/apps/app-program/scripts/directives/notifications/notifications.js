'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('programApp')
	.directive('notifications',function(){
		return {
        templateUrl:'/apps/app-program/scripts/directives/notifications/notifications.html',
        restrict: 'E',
        replace: true,
    	}
	});
