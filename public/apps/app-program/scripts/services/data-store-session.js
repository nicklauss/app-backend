(function() {
	'use strict';

	angular
		.module('programApp')
		.factory('DataStoreSession', DataStoreSession);

	DataStoreSession.$inject = ['$http', '$q'];

	function DataStoreSession($http, $q) {
		var services = {
			getSessions : getSessions,
			newSession : newSession,
			getSessionById : getSessionById,
			updateSessionById : updateSessionById,
			deleteSession : deleteSession
		};

		return services;

		function getSessions(congreId) {
			var deferred = $q.defer();

			$http.get('api/v1/sessions/congres/' + congreId)
				.success(function(resp, status) {
					deferred.resolve(resp);
					console.log(resp);
				})
				.error(function(error, status) {
					deferred.reject(error);
				});
			return deferred.promise;
		}

		function getSessionById(sessionId) {
			var deferred = $q.defer();

			$http.get('api/v1/sessions/' + sessionId)
				.success(function(resp, status) {
					deferred.resolve(resp);
					console.log(resp);
				})
				.error(function(error, status) {
					deferred.reject(error);
				});
			return deferred.promise;
		}

		function newSession(sessionObject) {
			var deferred = $q.defer();

			$http.post('api/v1/sessions', sessionObject)
				.success(function(resp, status) {
					deferred.resolve(resp);
				})
				.error(function(error, status) {
					deferred.reject(error);
				});
			return deferred.promise;
		}

		function updateSessionById(presentationObj) {
			var deferred = $q.defer();
            console.log(presentationObj);

			$http.put('api/v1/sessions/' + presentationObj._id, presentationObj)
				.success(function(resp, status) {
					deferred.resolve(resp);
					console.log(resp);
				})
				.error(function(error, status) {
					deferred.reject(error);
				});
		  return deferred.promise;
		}

		function deleteSession(sessionId) {
			var deferred = $q.defer();

			$http.delete('api/v1/sessions/' + sessionId)
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
