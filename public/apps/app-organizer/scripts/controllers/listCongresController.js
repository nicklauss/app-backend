(function() {
    'use strict';

    angular
        .module('sbAdminApp')
        .controller('listCongresCtrl', listCongresCtrl);

    listCongresCtrl.$inject = ['$scope', '$q', 'DataStoreCongre'];

    function listCongresCtrl($scope, $q, DataStoreCongre) {

        $scope.congreObject = {};
        $scope.congresLoading = true;
        $scope.transform = transform;

        init("575159c18fdcdf4fbcba2271");
// Share organizerId of logged in user
        function init(congreById) {
            var promises = [getCongreById(congreById)];
            $q.all(promises).then(function() {
                console.log('The congres are ready');
            });
        }

        function transform(atr1, atr2, atr3) {
            $scope.modalObj = {
                
            }
        }

        function getCongreById(organizerId) {
            DataStoreCongre.getCongreById(organizerId)
            .then(function(congres) {
                $scope.congreObject = congres.data;
                $scope.congresLoading = false;
            })
            .catch(function(err) {
                console.error(err);
            });
        }

    }

})();
