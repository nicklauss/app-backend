(function() {
    'use strict';

    angular
        .module('sbAdminApp')
        .controller('programsCtrl', programsCtrl);

    programsCtrl.$inject = ['$scope', '$q', 'DataStoreUser'];

    function programsCtrl($scope, $q, DataStoreUser) {

        $scope.programs = [];
        $scope.congresLoading = true;

        init("574f5adf4aeb629f22ee8ca8", "program");
// Share organizerId of logged in user
        function init(congreId, role) {
            var promises = [getPrograms(congreId, role)];
            $q.all(promises).then(function() {
                console.log('The programs are ready');
            });
        }

        function getPrograms(congreId, role) {
            DataStoreUser.getUsersByRoleAndCongre(congreId, role)
            .then(function(programs) {
                $scope.programs = programs.data;
                $scope.congresLoading = false;
            })
            .catch(function(err) {
                console.error(err);
            });
        }

    }

})();
