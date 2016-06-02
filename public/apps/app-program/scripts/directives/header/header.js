'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('programApp')
	.directive('header',function(){
		return {
        templateUrl:'/apps/app-program/scripts/directives/header/header.html',
        restrict: 'E',
        replace: true,
    	}
	});
