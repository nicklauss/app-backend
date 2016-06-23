(function() {
    'use strict';

    angular
        .module('authorApp')
        .controller('publicationsCtrl', publicationsCtrl);

    publicationsCtrl.$inject = ['$scope', '$q', 'DataStorePublication', 'DataStoreUser'];

    function publicationsCtrl($scope, $q, DataStorePublication, DataStoreUser) {

        $scope.publications = [];
        $scope.publicationsLoading = true;
        $scope.publicationObject = {};
        $scope.modalType = modalType;
        $scope.deletePublication = deletePublication;
        $scope.updatePublication = updatePublication;
        $scope.newPublication = newPublication;
        $scope.removeAuthor = removeAuthor;

        function modalType(index, obj) {
            if(index == 0)
                $scope.modalTyper = true;
            else if(index == 2) {
                $scope.modalTyper = true;
                $scope.publicationObject = obj;
            } else {
                  $scope.modalTyper = false;
                  $scope.publicationObject = obj;
            }
        }
        init();
// Share authorId of logged in user
        function init() {
            var promises = [getCurrentUser()];
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

        function newPublication(publicationObj) {
            console.log(publicationObj);
            publicationObj.author = [];
            publicationObj.author.push($scope.userObject);
            DataStorePublication.newPublication(publicationObj)
            .then(function(publication) {
              init();
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

        function removeAuthor(authObj) {
            let index = $scope.publicationObject.author.indexOf(authObj);
            $scope.publicationObject.author.splice(index, 1);
            DataStorePublication.updatePublicationById($scope.publicationObject)
            .then(function(publication) {
              init();
            })
            .catch(function(err) {
              console.error(err);
            });
        }

        function updatePublication(publicationObj) {
            DataStorePublication.updatePublicationById(publicationObj)
            .then(function(publication) {
              init();
            })
            .catch(function(err) {
              console.error(err);
            });
        }

        function getCurrentUser() {
            DataStoreUser.getCurrentUser()
            .then(function(currentUser) {
                $scope.userObject = currentUser.data;
                console.log($scope.userObject);
                getPublicationsByAuthor($scope.userObject._id);
            })
            .catch(function(err) {
                console.error(err);
            });
        }

    }

})();
