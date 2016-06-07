(function() {
    'use strict';

    angular
        .module('sbAdminApp')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope', '$q', 'DataStoreUser', '$location'];

    function loginCtrl($scope, $q, DataStoreUser, $location) {

    	$scope.emailPw = {};
    	$scope.message = {};
    	$scope.login = login;
		console.log($scope.emailPw);

        function login() {
        	if($scope.emailPw) {
                console.log($scope.emailPw);
	            DataStoreUser.login($scope.emailPw)
	            .then(function(message) {
	                $scope.message = message;
	                console.log($scope.message);
	                $location.path("/");
	            })
	            .catch(function(err) {
	                console.error(err);
	            });
        	}
        }
    }

})();
