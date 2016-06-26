(function() {
    'use strict';

    angular
        .module('programApp')
        .controller('rapportsCtrl', rapportsCtrl);

    rapportsCtrl.$inject = ['$scope', '$q', 'DataStorePublication', 'DataStoreUser', 'DataStoreCongre'];

    function rapportsCtrl($scope, $q, DataStorePublication, DataStoreUser, DataStoreCongre) {

        $scope.soumission = false;
        $scope.evaluation = false;
        $scope.finalisation = false;
        $scope.soumissionUp = false;
        $scope.evaluationUp = false;
        $scope.finalisationUp = false;                    
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

        getCurrentUser();
// Share authorId of logged in user
        function init() {
            var promises = [checkPhases()];
            $q.all(promises).then(function() {
                console.log('The publications are ready');
            });
        }

        function getCurrentUser() {
            DataStoreUser.getCurrentUser()
            .then(function(currentUser) {
                $scope.currentUser = currentUser.data;
                console.log(currentUser.data.registrations[0].congreId);
                $scope.currentCongreId = currentUser.data.registrations[0].congreId;
                init();
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function checkPhases() {
            DataStoreCongre.getCongreById($scope.currentCongreId)
            .then(function(congre) {
                var now = new Date();
                var soumission_start = new Date(congre.data[0].soumission.start);
                var evaluation_start = new Date(congre.data[0].evaluation.start);
                var finalisation_start = new Date(congre.data[0].finalisation.start);
                var soumission_end = new Date(congre.data[0].soumission.end);
                var evaluation_end = new Date(congre.data[0].evaluation.end);
                var finalisation_end = new Date(congre.data[0].finalisation.end);
                // var congre_start = new Date(congre.data[0].date_debut);

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
                // if(now > date_debut) {
                //     console.log('inside finalisation');
                //     $scope.soumission = false;
                //     $scope.evaluation = false;
                //     $scope.finalisation = true;                    
                // }

                console.log($scope.soumission+' '+$scope.evaluation+' '+$scope.finalisation)
                getPublications();
            })
            .catch(function(err) {
                console.error(err);
            });            
        }

        function getPublications() {
            DataStorePublication.getPublications()
            .then(function(publications) {
                $scope.publications = publications.data;
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
