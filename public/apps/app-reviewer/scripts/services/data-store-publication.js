(function() {
	'use strict';

	angular
		.module('reviewerApp')
		.factory('DataStorePublication', DataStorePublication);

	DataStorePublication.$inject = ['$http', '$q'];

	function DataStorePublication($http, $q) {
		var services = {
			getPublicationsByReviewer : getPublicationsByReviewer,
			deletePublicationById : deletePublicationById,
			updatePublicationById : updatePublicationById
		};

		return services;

		function getPublicationsByReviewer(authorId) {
			var deferred = $q.defer();

			$http.get('api/v1/publications/reviewers/' + authorId)
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

			$http.put('api/v1/publications/' + publicationObj._id, publicationObj)
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
