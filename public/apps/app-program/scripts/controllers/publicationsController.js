(function() {
    'use strict';

    angular
        .module('programApp')
        .controller('publicationsCtrl', publicationsCtrl);

    publicationsCtrl.$inject = ['$scope', '$q', 'DataStorePublication'];

    function publicationsCtrl($scope, $q, DataStorePublication) {

        $scope.publications = [];
        $scope.publicationsLoading = true;
        $scope.publicationObject = {};
        $scope.modalType = modalType;
        $scope.deletePublication = deletePublication;
        $scope.updatePublication = updatePublication;

        function modalType(index, obj) {
            if(index == 0)
                $scope.modalTyper = true;
            else if(index == 2) {
                $scope.modalTyper = true;
                $scope.publicationObject = obj;
            } else {
                  $scope.modalTyper = false;
                  $scope.publicationObject = obj;
            console.log(obj);
            console.log($scope.publicationObject);
                  
            }
        }
        init();
// Share authorId of logged in user
        function init() {
            var promises = [getPublications()];
            $q.all(promises).then(function() {
                console.log('The publications are ready');
            });
        }

        function getPublications() {
            DataStorePublication.getPublications()
            .then(function(publications) {
                $scope.publications = publications.data;
                $scope.publicationsLoading = false;
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function deletePublication(publicationId) {
            DataStorePublication.deletePublicationById(publicationId)
            .then(function(publication) {
              init();
            })
            .catch(function(err) {
              console.error(err);
            });
        }

        function updatePublication(publicationObj) {
            console.log(publicationObj);
            DataStorePublication.updatePublicationById(publicationObj)
            .then(function(publication) {
              init();
            })
            .catch(function(err) {
              console.error(err);
            });
        }

    }

})();
