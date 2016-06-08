(function() {
	'use strict';

	angular
		.module('programApp')
		.factory('DataStoreCongre', DataStoreCongre);

	DataStoreCongre.$inject = ['$http', '$q'];

	function DataStoreCongre($http, $q) {
		var services = {
			getCongres : getCongres,
			newCongre : newCongre,
			getCongreById : getCongreById
		};

		return services;

		function getCongreById(congreId) {
			var deferred = $q.defer();
			console.log('getCongreById '+congreId);
			var access_token = window.location.search.split("=");
			console.log(access_token);
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