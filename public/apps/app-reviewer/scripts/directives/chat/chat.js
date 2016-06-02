'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('reviewerApp')
	.directive('chat',function(){
		return {
        templateUrl:'/apps/app-reviewer/scripts/directives/chat/chat.html',
        restrict: 'E',
        replace: true,
    	}
	});
