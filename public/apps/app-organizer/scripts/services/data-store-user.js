(function() {
	'use strict';

	angular
		.module('sbAdminApp')
		.factory('DataStoreUser', DataStoreUser);

	DataStoreUser.$inject = ['$http', '$q'];

	function DataStoreUser($http, $q) {
		var services = {
			getUsersByRoleAndCongre : getUsersByRoleAndCongre
		};

		return services;

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

	}

})();