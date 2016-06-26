'use strict';
/**
 * @ngdoc function
 * @name authorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the authorApp
 */

(function() {
    'use strict';

    angular
        .module('authorApp')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$position', '$q', 'DataStorePublication', 'DataStoreUser', 'DataStoreCongre'];

    function MainCtrl($scope, $position, $q, DataStorePublication, DataStoreUser, DataStoreCongre) {

        $scope.publications = [];
        $scope.soumission = false;
        $scope.evaluation = false;
        $scope.finalisation = false;
        $scope.congreStart = false;
        

        getCurrentUser();

        function init() {
            var promises = [getPublicationsByAuthor($scope.userObject._id)];
            $q.all(promises).then(function() {
                console.log('The publications are ready');
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

        function checkPhases() {
            DataStoreCongre.getCongreById($scope.currentCongreId)
            .then(function(congre) {
            })
            .catch(function(err) {
                console.error(err);
            });            
        }

        function getPublicationsByAuthor(authorId) {
            DataStorePublication.getPublicationsByAuthor(authorId)
            .then(function(publications) {
            	$scope.pendingPub = [];
            	$scope.acceptedPub = [];
            	$scope.rejectedPub = [];
                $scope.publications = publications.data;
                console.log($scope.publications);
                $scope.publications.forEach((item, index) => {
                	if(item.evaluation.value === "PENDING" || item.evaluation.value === "NOTASSIGNED")
	                	$scope.pendingPub.push(item);
	                if(item.evaluation.value === "ACCEPTED")
	                	$scope.acceptedPub.push(item);
	                if(item.evaluation.value === "REJECTED")
	                	$scope.rejectedPub.push(item);
                });
            })
            .catch(function(err) {
                console.error(err);
            });
        }

    }

})();
