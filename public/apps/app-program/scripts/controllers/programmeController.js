(function() {
    'use strict';

    angular
        .module('programApp')
        .controller('programmeCtrl', programmeCtrl);

    programmeCtrl.$inject = ['$scope', '$q', 'DataStoreUser', 'DataStoreSession'];

    function programmeCtrl($scope, $q, DataStoreUser, DataStoreSession) {

        $scope.userObject = {};
        $scope.sessions = [];

        init();
// Share organizerId of logged in user
        function init() {
            var promises = [getCurrentUser()];
            $q.all(promises).then(function() {
                console.log('The congres are ready');
            });
        }

        function getCurrentUser() {
            DataStoreUser.getCurrentUser()
            .then(function(currentUser) {
                $scope.userObject = currentUser.data;
                console.log($scope.userObject);
                console.log($scope.userObject.registrations[0].congreId);
                getSessions($scope.userObject.registrations[0].congreId);
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function getSessions(congreId) {
            DataStoreSession.getSessions(congreId)
            .then(function(sessions) {
                $scope.sessions = sessions.data;
                console.log($scope.sessions);
            })
            .catch(function(err) {
                console.error(err);
            });
        }
	}
})();