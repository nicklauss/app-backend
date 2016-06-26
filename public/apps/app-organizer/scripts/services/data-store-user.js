(function() {
	'use strict';

	angular
		.module('sbAdminApp')
		.factory('DataStoreUser', DataStoreUser);

	DataStoreUser.$inject = ['$http', '$q'];

	function DataStoreUser($http, $q) {
		var services = {
			getUsersByRoleAndCongre : getUsersByRoleAndCongre,
			newUser : newUser,
			updateUser : updateUser,
			deleteUser : deleteUser,
			login : login,
			getCurrentUser : getCurrentUser,
			getAuteursCount : getAuteursCount,
			getExpertsCount : getExpertsCount,
			getParticipantsCount : getParticipantsCount
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

		function getParticipantsCount(role) {
			var deferred = $q.defer();

			$http.get('api/v1/users/role/'+ role)
				.success(function(resp, status) {
					deferred.resolve(resp);
				})
				.error(function(error, status) {
					deferred.reject(error);
				});
			return deferred.promise;
		}

		function getAuteursCount(role) {
			var deferred = $q.defer();

			$http.get('api/v1/users/role/'+ role)
				.success(function(resp, status) {
					deferred.resolve(resp);
				})
				.error(function(error, status) {
					deferred.reject(error);
				});
			return deferred.promise;
		}

		function getExpertsCount(role) {
			var deferred = $q.defer();

			$http.get('api/v1/users/role/'+ role)
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

        function login(emailPw) {
			var deferred = $q.defer();
			$http.post('/api/v1/auth', emailPw)
				.success(function(resp, status) {
					console.log('resp01');
					console.log(JSON.stringify(resp));
					deferred.resolve(resp);
					console.log('resp02');
					console.log(JSON.stringify(resp));
					$http({method: 'GET', url: '/organizer-app', headers: {'Authorization': 'Bearer '+resp.token}})
						.success(function(respp, statuss) {
							console.log('resp03');
							console.log(JSON.stringify(respp));
							deferred.resolve(respp);
							console.log('resp04');
							console.log(JSON.stringify(respp));
						})
						.error(function(error, statuss) {
							deferred.reject(error);
						});
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