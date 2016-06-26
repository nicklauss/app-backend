(function() {
	'use strict';

	angular
		.module('sbAdminApp')
		.factory('DataStorePublication', DataStorePublication);

	DataStorePublication.$inject = ['$http', '$q'];

	function DataStorePublication($http, $q) {
		var services = {
			getPublications : getPublications,
			deletePublicationById : deletePublicationById,
			updatePublicationById : updatePublicationById,
			getPublicationsCount : getPublicationsCount,
			getPublicationsByReviewer : getPublicationsByReviewer,
			getPublicationsNotAssigned : getPublicationsNotAssigned
		};

		return services;

		function getPublications() {
			var deferred = $q.defer();

			$http.get('api/v1/publications')
				.success(function(resp, status) {
					deferred.resolve(resp);
				})
				.error(function(error, status) {
					deferred.reject(error);
				});
			return deferred.promise;
		}

		function getPublicationsNotAssigned() {
			var deferred = $q.defer();

			$http.get('api/v1/publications/NotAssigned')
				.success(function(resp, status) {
					deferred.resolve(resp);
					console.log(resp);
				})
				.error(function(error, status) {
					deferred.reject(error);
				});
			return deferred.promise;
		}

		function getPublicationsByReviewer(reviewerId) {
			var deferred = $q.defer();

			$http.get('api/v1/publications/reviewers/' + reviewerId)
				.success(function(resp, status) {
					deferred.resolve(resp);
				})
				.error(function(error, status) {
					deferred.reject(error);
				});
			return deferred.promise;
		}

		function getPublicationsCount() {
			var deferred = $q.defer();

			$http.get('api/v1/publications/count')
				.success(function(resp, status) {
					deferred.resolve(resp);
				})
				.error(function(error, status) {
					deferred.reject(error);
				});
			return deferred.promise;
		}

		function deletePublicationById(publicationId) {
			var deferred = $q.defer();

			$http.delete('api/v1/publications/' + publicationId)
				.success(function(resp, status) {
					deferred.resolve(resp);
				})
				.error(function(error, status) {
					deferred.reject(error);
				});
		  return deferred.promise;
		}

		function updatePublicationById(publicationObj) {
			var deferred = $q.defer();
            console.log(publicationObj);

			$http.put('api/v1/publications/' + publicationObj._id, publicationObj)
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
