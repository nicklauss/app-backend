'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('reviewerApp')
	.directive('header',function(){
		return {
        templateUrl:'/apps/app-reviewer/scripts/directives/header/header.html',
        restrict: 'E',
        replace: true,
    	}
	});
