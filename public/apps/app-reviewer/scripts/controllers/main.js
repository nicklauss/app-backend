'use strict';
/**
 * @ngdoc function
 * @name reviewerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the reviewerApp
 */

(function() {
    'use strict';

    angular
        .module('reviewerApp')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$position', '$q', 'DataStorePublication', 'DataStoreUser'];

    function MainCtrl($scope, $position, $q, DataStorePublication, DataStoreUser) {

        $scope.publications = [];

		getCurrentUser();

        function init() {
            var promises = [getPublicationsByReviewer($scope.userObject._id)];
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
            })
            .catch(function(err) {
                console.error(err);
            });
        }
        function getPublicationsByReviewer(reviewerId) {
            DataStorePublication.getPublicationsByReviewer(reviewerId)
            .then(function(publications) {
                $scope.pendingPub = [];
                $scope.otherPub = [];
                $scope.publications = publications.data;
                $scope.publications.forEach((item, index) => {
                    if(item.evaluation.value === "PENDING")
                        $scope.pendingPub.push(item);
                    else
                        $scope.otherPub.push(item);
                });
            })
            .catch(function(err) {
                console.error(err);
            });
        }
    }

})();
