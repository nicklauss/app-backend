'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('programApp')
	.directive('chat',function(){
		return {
        templateUrl:'/apps/app-program/scripts/directives/chat/chat.html',
        restrict: 'E',
        replace: true,
    	}
	});
