(function() {
    'use strict';

    angular
        .module('programApp')
        .controller('publicationsCtrl', publicationsCtrl);

    publicationsCtrl.$inject = ['$scope', '$q', 'DataStorePublication'];

    function publicationsCtrl($scope, $q, DataStorePublication) {

        $scope.publications = [];
        $scope.publicationsLoading = true;

        init();
// Share authorId of logged in user
        function init() {
            var promises = [getPublicationsByAuthor("57515baf8fdcdf4fbcba2275")];
            $q.all(promises).then(function() {
                console.log('The publications are ready');
            });
        }

        function getPublicationsByAuthor(authorId) {
            DataStorePublication.getPublicationsByAuthor(authorId)
            .then(function(publications) {
                $scope.publications = publications.data;
                $scope.publicationsLoading = false;
            })
            .catch(function(err) {
                console.error(err);
            });
        }

    }

})();
