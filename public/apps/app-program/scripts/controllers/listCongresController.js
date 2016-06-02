(function() {
    'use strict';

    angular
        .module('programApp')
        .controller('listCongresCtrl', listCongresCtrl);

    listCongresCtrl.$inject = ['$scope', '$q', 'DataStoreCongre'];

    function listCongresCtrl($scope, $q, DataStoreCongre) {

        $scope.congres = [];
        $scope.congresLoading = true;

        init("57409008ee4a72230e8a8e8b");
// Share organizerId of logged in user
        function init(organizerId) {
            var promises = [getCongres(organizerId)];
            $q.all(promises).then(function() {
                console.log('The congres are ready');
            });
        }

        function getCongres(organizerId) {
            DataStoreCongre.getCongres(organizerId)
            .then(function(congres) {
                $scope.congres = congres.data;
                $scope.congresLoading = false;
            })
            .catch(function(err) {
                console.error(err);
            });
        }

    }

})();
