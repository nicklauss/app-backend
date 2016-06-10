'use strict';
/**
 * @ngdoc function
 * @name programApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the programApp
 */

(function() {
    'use strict';

    angular
        .module('programApp')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$position', '$q', 'DataStorePublication', 'DataStoreUser'];

    function MainCtrl($scope, $position, $q, DataStorePublication, DataStoreUser) {

        $scope.publications = [];

        getCurrentUser();

        function init() {
            var promises = [getPublications(), getPublicationsCount(), getAuteursCount(), getExpertsCount()];
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
                getAuteurs();
                getExperts();
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
