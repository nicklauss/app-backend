(function() {
	'use strict';

	angular
		.module('loginApp')
		.factory('DataStoreCongre', DataStoreCongre);

	DataStoreCongre.$inject = ['$http', '$q'];

	function DataStoreCongre($http, $q) {
		var services = {
			getCongres : getCongres,
			newCongre : newCongre
		};

		return services;

		function getCongres(organizerId) {
			var deferred = $q.defer();

			$http.get('api/v1/congres/organizer/' + organizerId)
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