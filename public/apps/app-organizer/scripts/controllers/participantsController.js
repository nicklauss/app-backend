(function() {
    'use strict';

    angular
        .module('sbAdminApp')
        .controller('participantsCtrl', participantsCtrl);

    participantsCtrl.$inject = ['$scope', '$q', 'DataStoreUser'];

    function participantsCtrl($scope, $q, DataStoreUser) {

        $scope.participants = [];
        $scope.congresLoading = true;

        init("574f5adf4aeb629f22ee8ca8", "participant");
// Share organizerId of logged in user
        function init(congreId, role) {
            var promises = [getParticipants(congreId, role)];
            $q.all(promises).then(function() {
                console.log('The participant are ready');
            });
        }

        function getParticipants(congreId, role) {
            DataStoreUser.getUsersByRoleAndCongre(congreId, role)
            .then(function(participants) {
                $scope.participants = participants.data;
                $scope.congresLoading = false;
            })
            .catch(function(err) {
                console.error(err);
            });
        }

    }

})();
