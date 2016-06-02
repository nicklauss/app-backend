(function() {
    'use strict';

    angular
        .module('sbAdminApp')
        .controller('auteursCtrl', auteursCtrl);

    auteursCtrl.$inject = ['$scope', '$q', 'DataStoreUser'];

    function auteursCtrl($scope, $q, DataStoreUser) {

        $scope.auteurs = [];
        $scope.congresLoading = true;

        init("574f5adf4aeb629f22ee8ca8", "author");
// Share organizerId of logged in user
        function init(congreId, role) {
            var promises = [getAuteurs(congreId, role)];
            $q.all(promises).then(function() {
                console.log('The author are ready');
            });
        }

        function getAuteurs(congreId, role) {
            DataStoreUser.getUsersByRoleAndCongre(congreId, role)
            .then(function(auteurs) {
                $scope.auteurs = auteurs.data;
                $scope.congresLoading = false;
            })
            .catch(function(err) {
                console.error(err);
            });
        }

    }

})();
