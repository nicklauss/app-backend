'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('authorApp')
	.directive('header',function(){
		return {
        templateUrl:'/apps/app-author/scripts/directives/header/header.html',
        restrict: 'E',
        replace: true,
    	}
	});
