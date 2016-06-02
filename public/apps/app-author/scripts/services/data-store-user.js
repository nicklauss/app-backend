(function() {
	'use strict';

	angular
		.module('authorApp')
		.factory('DataStoreUser', DataStoreUser);

	DataStoreUser.$inject = ['$http', '$q'];

	function DataStoreUser($http, $q) {
		var services = {
			getUsersByRoleAndCongre : getUsersByRoleAndCongre,
			newUser : newUser,
			updateUser : updateUser,
			deleteUser : deleteUser
		};

		return services;

		function newUser(userObject) {
			var deferred = $q.defer();

			$http.post('api/v1/users', userObject)
				.success(function(resp, status) {
					deferred.resolve(resp);
				})
				.error(function(error, status) {
					deferred.reject(error);
				});
			return deferred.promise;
		}

		function getUsersByRoleAndCongre(congreId, role) {
			var deferred = $q.defer();

			$http.get('api/v1/users/'+ role +'/congres/' + congreId )
				.success(function(resp, status) {
					deferred.resolve(resp);
				})
				.error(function(error, status) {
					deferred.reject(error);
				});
			return deferred.promise;
		}

        function deleteUser(id) {
            var deferred = $q.defer();
            $http.delete('/api/v1/users/' + id)
              	.success(function(resp, status) {
                  	deferred.resolve(resp);
              	})
              	.error(function(error, status) {
                  	deferred.reject(error);
              	});
            return deferred.promise;
        }

        function updateUser(userObject) {
			var deferred = $q.defer();
			$http.put('/api/v1/users/' + userObject._id, userObject)
				.success(function(resp, status) {
					console.log('resp01' + JSON.stringify(resp));
					deferred.resolve(resp);
					console.log('resp02' + JSON.stringify(resp));
				})
				.error(function(error, status) {
					deferred.reject(error);
				});
			return deferred.promise;
        }		

	}

})();