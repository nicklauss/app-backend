'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('authorApp')
	.directive('notifications',function(){
		return {
        templateUrl:'/apps/app-author/scripts/directives/notifications/notifications.html',
        restrict: 'E',
        replace: true,
    	}
	});
