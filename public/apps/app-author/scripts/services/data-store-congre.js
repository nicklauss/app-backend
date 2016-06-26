(function() {
	'use strict';

	angular
		.module('authorApp')
		.factory('DataStoreCongre', DataStoreCongre);

	DataStoreCongre.$inject = ['$location', '$http', '$q'];

	function DataStoreCongre($location, $http, $q) {
		var services = {
			getCongreById : getCongreById,
		};

		return services;

		function getCongreById(congreId) {
			var deferred = $q.defer();
			console.log('getCongreById '+congreId);
			var access_token = window.location.search.split("=");
			$http.get('api/v1/congres/' + congreId,
			  {
    			headers: 
    				{'Authorization': 'Bearer ' + access_token[1]}
			  })
				.success(function(resp, status) {
					deferred.resolve(resp);
					console.log(resp);
				})
				.error(function(error, status) {
					deferred.reject(error);
				});
			return deferred.promise;
		}

	}

})();