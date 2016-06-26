'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */

(function() {
    'use strict';

    angular
        .module('sbAdminApp')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$position', '$q', 'DataStorePublication', 'DataStoreUser', 'DataStoreCongre'];

    function MainCtrl($scope, $position, $q, DataStorePublication, DataStoreUser, DataStoreCongre) {

        $scope.publications = [];
        $scope.soumission = false;
        $scope.evaluation = false;
        $scope.finalisation = false;
        $scope.congreStart = false;
        $scope.toggleModal = toggleModal;

        function toggleModal(obj) {
            $scope.modalObj = obj;
        }

        getCurrentUser();

        function init() {
            var promises = [getPublications(), getPublicationsCount(), getAuteursCount(), getExpertsCount(), getParticipantsCount()];
            $q.all(promises).then(function() {
                console.log('The publications are ready');
                $scope.getEvaluations = getEvaluations;
                $scope.filterByEvaluations = filterByEvaluations;
                $scope.getStatus = getStatus;
                $scope.filterByStatus = filterByStatus;
                $scope.getStatusE = getStatusE;
                $scope.filterByStatusE = filterByStatusE;
            });
        }

        function getCurrentUser() {
            console.log('main ctrl');
            DataStoreUser.getCurrentUser()
            .then(function(currentUser) {
                $scope.userObject = currentUser.data;
                console.log($scope.userObject);
                $scope.currentCongreId = currentUser.data.registrations[0].congreId;
                init();
                getCongreById($scope.currentCongreId);
                getAuteurs();
                getExperts();
                getParticipants();
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
                    console.log('inside finalisation');
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

        function getPublications() {
            DataStorePublication.getPublications()
            .then(function(publications) {
                $scope.publications = publications.data;
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function getPublicationsCount() {
            DataStorePublication.getPublicationsCount()
            .then(function(PublicationsCount) {
                $scope.PublicationsCount = PublicationsCount.data;
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function getParticipants() {
            DataStoreUser.getUsersByRoleAndCongre($scope.currentCongreId, "user")
            .then(function(participants) {
                $scope.participants = participants.data;
                $scope.congresLoading = false;
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function getParticipantsCount() {
            DataStoreUser.getParticipantsCount("user")
            .then(function(participants) {
                $scope.participantsCount = participants.data;
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function getAuteurs() {
            DataStoreUser.getUsersByRoleAndCongre($scope.currentCongreId, "author")
            .then(function(auteurs) {
                $scope.auteurs = auteurs.data;
                $scope.congresLoading = false;
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function getAuteursCount() {
            DataStoreUser.getAuteursCount("author")
            .then(function(auteurs) {
                $scope.auteursCount = auteurs.data;
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function getExperts() {
            DataStoreUser.getUsersByRoleAndCongre($scope.currentCongreId, "reviewer")
            .then(function(experts) {
                $scope.experts = experts.data;
                $scope.congresLoading = false;
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function getExpertsCount() {
            DataStoreUser.getExpertsCount("reviewer")
            .then(function(experts) {
                $scope.expertsCount = experts.data;
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        $scope.panel = '';
        
        $scope.filter = {};

        function getEvaluations() {
            return ($scope.publications || []).map(function (w) {
                return w.evaluation.value;
            }).filter(function (w, idx, arr) {
                return arr.indexOf(w) === idx;
            });
        };
        
        function filterByEvaluations(publication) {
            return $scope.filter[publication.evaluation.value] || noFilter($scope.filter);
        };
        
        function noFilter(filterObj) {
            for (var key in filterObj) {
                if (filterObj[key]) {
                    return false;
                }
            }
            return true;
        }

        $scope.statusFilter = {};

        function getStatus() {
            return ($scope.auteurs || []).map(function (w) {
                return w.registrations[0].status;
            }).filter(function (w, idx, arr) {
                return arr.indexOf(w) === idx;
            });
        };
        
        function filterByStatus(auteur) {
            return $scope.statusFilter[auteur.registrations[0].status] || noFilter($scope.statusFilter);
        };

        function getStatusE() {
            return ($scope.experts || []).map(function (w) {
                return w.registrations[0].status;
            }).filter(function (w, idx, arr) {
                return arr.indexOf(w) === idx;
            });
        };
        
        function filterByStatusE(expert) {
            return $scope.statusFilter[expert.registrations[0].status] || noFilter($scope.statusFilter);
        };

    }

})();
