(function() {
	'use strict';

	angular
		.module('programApp')
		.factory('DataStoreSession', DataStoreSession);

	DataStoreSession.$inject = ['$http', '$q'];

	function DataStoreSession($http, $q) {
		var services = {
			getSessions : getSessions
		};

		return services;

		function getSessions(congreId) {
			var deferred = $q.defer();

			$http.get('api/v1/sessions/congres/' + congreId)
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
