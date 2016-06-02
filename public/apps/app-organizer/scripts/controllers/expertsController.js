(function() {
    'use strict';

    angular
        .module('sbAdminApp')
        .controller('expertsCtrl', expertsCtrl);

    expertsCtrl.$inject = ['$scope', '$q', 'DataStoreUser'];

    function expertsCtrl($scope, $q, DataStoreUser) {

        $scope.experts = [];
        $scope.congresLoading = true;

        init("574f5adf4aeb629f22ee8ca8", "reviewer");
// Share organizerId of logged in user
        function init(congreId, role) {
            var promises = [getExperts(congreId, role)];
            $q.all(promises).then(function() {
                console.log('The experts are ready');
            });
        }

        function getExperts(congreId, role) {
            DataStoreUser.getUsersByRoleAndCongre(congreId, role)
            .then(function(experts) {
                $scope.experts = experts.data;
                $scope.congresLoading = false;
            })
            .catch(function(err) {
                console.error(err);
            });
        }

    }

})();
