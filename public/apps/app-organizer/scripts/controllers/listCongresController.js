(function() {
    'use strict';

    angular
        .module('sbAdminApp')
        .controller('listCongresCtrl', listCongresCtrl);

    listCongresCtrl.$inject = ['$scope', '$q', 'DataStoreCongre', 'DataStoreUser'];

    function listCongresCtrl($scope, $q, DataStoreCongre, DataStoreUser) {

        $scope.congreObject = {};
        $scope.congresLoading = true;
        $scope.transform = transform;
        $scope.updateCongre = updateCongre;
        $scope.deleteCongre = deleteCongre;

        getCurrentUser();
        
// Share organizerId of logged in user
        function init() {
            var promises = [getCongreById($scope.currentCongreId)];
            $q.all(promises).then(function() {
                console.log('The congres are ready');
            });
        }

        function transform(atr1, atr2, atr3) {
            $scope.modalObj = {
                
            }
        }

        function getCongreById(congreId) {
            DataStoreCongre.getCongreById(congreId)
            .then(function(congre) {
                $scope.congreObject = congre.data[0];
                console.log(congre);
                $scope.congresLoading = false;
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function updateCongre(congreObject) {
            DataStoreCongre.updateCongre(congreObject)
            .then(function(congre) {
                $scope.congreObject = congre.data;
                $scope.congresLoading = false;
                init();
            })
            .catch(function(err) {
                console.error(err);
            });
        }


        function deleteCongre(congreId) {
            DataStoreCongre.deleteCongre(congreId)
            .then(function(congre) {
                $scope.congreObject = congre.data;
                $scope.congresLoading = false;
                init();
            })
            .catch(function(err) {
                console.error(err);
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

    }

})();
