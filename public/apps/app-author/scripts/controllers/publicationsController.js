(function() {
    'use strict';

    angular
        .module('authorApp')
        .controller('publicationsCtrl', publicationsCtrl);

    publicationsCtrl.$inject = ['$scope', '$q', 'DataStorePublication', 'DataStoreUser', 'DataStoreCongre'];

    function publicationsCtrl($scope, $q, DataStorePublication, DataStoreUser, DataStoreCongre) {

        $scope.publications = [];
        $scope.publicationsLoading = true;
        $scope.publicationObject = {};
        $scope.modalType = modalType;
        $scope.deletePublication = deletePublication;
        $scope.updatePublication = updatePublication;
        $scope.newPublication = newPublication;
        $scope.removeAuthor = removeAuthor;
        $scope.soumission = false;
        $scope.evaluation = false;
        $scope.finalisation = false;
        $scope.congreStart = false;

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

        function getCongreById(congreId) {
            DataStoreCongre.getCongreById(congreId)
            .then(function(congre) {
                $scope.congreObject = congre.data[0];
                console.log(congre);
                var now = new Date();
                var soumission_start = new Date(congre.data[0].soumission.start);
                var evaluation_start = new Date(congre.data[0].evaluation.start);
                var finalisation_start = new Date(congre.data[0].finalisation.start);
                var soumission_end = new Date(congre.data[0].soumission.end);
                var evaluation_end = new Date(congre.data[0].evaluation.end);
                var finalisation_end = new Date(congre.data[0].finalisation.end);
                var congre_start = new Date(congre.data[0].date_debut);

                console.log(now >= evaluation_start);
                // if(now > soumission_start) {
                //     $scope.soumissionUp = true;
                //     console.log('inside soumissionUp');
                // }
                // if(now > evaluation_start){
                //     $scope.evaluationUp = true;
                //     console.log('inside evaluationUp');                    
                // }
                // if(now > finalisation_start) {
                //     console.log('inside finalisationUp');
                //     $scope.finalisationUp = true;                    
                // }
                if(now > soumission_start && now < soumission_end) {
                    console.log('inside soumission');
                    $scope.soumission = true;
                    $scope.evaluation = false;
                    $scope.finalisation = false;
                }
                if(now > evaluation_start && now < evaluation_end){
                    console.log('inside evaluation');                    
                    $scope.soumission = false;
                    $scope.evaluation = true;
                    $scope.finalisation = false;
                }
                // if(now > finalisation_start && now < finalisation_end) {
                if(now > finalisation_start) {
                    console.log('inside finalisation');
                    $scope.soumission = false;
                    $scope.evaluation = false;
                    $scope.finalisation = true;                    
                }
                if(now > congre_start) {
                    console.log('inside congre_start');
                    $scope.soumission = false;
                    $scope.evaluation = false;
                    $scope.finalisation = false;                    
                    $scope.congreStart = true;                    
                }

                console.log($scope.soumission+' '+$scope.evaluation+' '+$scope.finalisation)
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
                $scope.currentCongreId = currentUser.data.registrations[0].congreId;
                getCongreById($scope.currentCongreId);
            })
            .catch(function(err) {
                console.error(err);
            });
        }

    }

})();
