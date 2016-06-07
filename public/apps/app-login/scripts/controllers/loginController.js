(function() {
    'use strict';

    angular
        .module('loginApp')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope', '$q', 'DataStoreUser', '$location'];

    function loginCtrl($scope, $q, DataStoreUser, $location) {

    	$scope.emailPw = {};
    	$scope.message = {};
    	$scope.login = login;
		console.log($scope.emailPw);

        function login() {
        	if($scope.emailPw) {
	            DataStoreUser.login($scope.emailPw)
	            .then(function(message) {
	                $scope.message = message;
	            })
	            .catch(function(err) {
	                console.error(err);
	            });
        	}
        }
    }

})();
