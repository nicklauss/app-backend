(function() {
	'use strict';

	angular
		.module('reviewerApp')
		.factory('DataStoreUser', DataStoreUser);

	DataStoreUser.$inject = ['$http', '$q'];

	function DataStoreUser($http, $q) {
		var services = {
			getUsersByRoleAndCongre : getUsersByRoleAndCongre,
			newUser : newUser,
			updateUser : updateUser,
			deleteUser : deleteUser,
			getCurrentUser : getCurrentUser
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

        function getCurrentUser() {
			var deferred = $q.defer();
			var access_token = window.location.search.split("=");
			$http.get('/api/v1/users/me',
			  {
    			headers: 
    				{'Authorization': 'Bearer ' + access_token[1]}
			  })
				.success(function(resp, status) {
					deferred.resolve(resp);
				})
				.error(function(error, status) {
					deferred.reject(error);
				});
			return deferred.promise;
        }		

	}

})();