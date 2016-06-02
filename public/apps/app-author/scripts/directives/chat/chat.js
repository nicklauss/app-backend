'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('authorApp')
	.directive('chat',function(){
		return {
        templateUrl:'/apps/app-author/scripts/directives/chat/chat.html',
        restrict: 'E',
        replace: true,
    	}
	});
