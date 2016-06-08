(function() {
	'use strict';

	angular
		.module('sbAdminApp')
		.factory('DataStoreCongre', DataStoreCongre);

	DataStoreCongre.$inject = ['$http', '$q'];

	function DataStoreCongre($http, $q) {
		var services = {
			getCongreById : getCongreById,
			newCongre : newCongre
		};

		return services;

		function getCongreById(congreId) {
			var deferred = $q.defer();

			$http.get('api/v1/congres/' + congreId)
				.success(function(resp, status) {
					deferred.resolve(resp);
				})
				.error(function(error, status) {
					deferred.reject(error);
				});
			return deferred.promise;
		}

		function newCongre(organizerObject) {
			var deferred = $q.defer();
			$http.post('api/v1/congres', organizerObject)
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