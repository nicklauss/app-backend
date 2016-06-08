(function() {
	'use strict';

	angular
		.module('sbAdminApp')
		.factory('DataStoreCongre', DataStoreCongre);

	DataStoreCongre.$inject = ['$location', '$http', '$q'];

	function DataStoreCongre($location, $http, $q) {
		var services = {
			getCongreById : getCongreById,
			newCongre : newCongre,
			updateCongre : updateCongre,
			deleteCongre : deleteCongre
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

		function newCongre(organizerObject) {
			var deferred = $q.defer();
			var access_token = window.location.search.split("=");
			console.log(access_token[1]);
			$http.post('api/v1/congres', organizerObject,
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

		function updateCongre(congreObject) {
			var deferred = $q.defer();
			var access_token = window.location.search.split("=");
			$http.put('api/v1/congres/' + congreObject._id, congreObject,
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

		function deleteCongre(congreId) {
			var deferred = $q.defer();
			var access_token = window.location.search.split("=");
			$http.delete('api/v1/congres/' + congreId,
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