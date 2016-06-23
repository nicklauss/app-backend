(function() {
    'use strict';

    angular
        .module('authorApp')
        .controller('sessionsCtrl', sessionsCtrl);

    sessionsCtrl.$inject = ['$scope', '$q', 'DataStoreUser', 'DataStoreSession'];

    function sessionsCtrl($scope, $q, DataStoreUser, DataStoreSession) {

        $scope.userObject = {};
        $scope.sessionObject = {};
        $scope.sessions = [];
        $scope.newSession = newSession;
        $scope.UpdateModal = UpdateModal;
        $scope.updatePresentationAdd = updatePresentationAdd;
        $scope.updatePresentationMinus = updatePresentationMinus;
        $scope.init = init;
        $scope.deleteSession = deleteSession;

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

        function UpdateModal(session) {
            getGeneralSession();
            getSessionById(session._id);
        }

        function getGeneralSession() {
            DataStoreSession.getSessionById("5766edc5a743455e1e393bd7")
            .then(function(session) {
                $scope.presentationsNotAssigned = session.data;
                console.log($scope.presentationsNotAssigned);
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function getSessionById(sessionId) {
            DataStoreSession.getSessionById(sessionId)
            .then(function(session) {
                $scope.assignedSession = session.data;
                console.log($scope.assignedSession);
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function updatePresentationMinus(presentationObj) {
            console.log(presentationObj);
            let index = $scope.assignedSession.presentations.indexOf(presentationObj);
            $scope.assignedSession.presentations.splice(index, 1);
            console.log($scope.assignedSession.presentations);
            DataStoreSession.updateSessionById($scope.assignedSession)
            .then(function(presentation) {
                $scope.presentationsNotAssigned.presentations.push(presentationObj);
                DataStoreSession.updateSessionById($scope.presentationsNotAssigned)
                .then(function(presentation2) {
                    UpdateModal(presentation.data);
                })
                .catch(function(err) {
                  console.error(err);
                });
            })
            .catch(function(err) {
              console.error(err);
            });
        }

        function updatePresentationAdd(presentationObj) {
            console.log(presentationObj);
            let index = $scope.presentationsNotAssigned.presentations.indexOf(presentationObj);
            $scope.presentationsNotAssigned.presentations.splice(index, 1);
            console.log($scope.presentationsNotAssigned.presentations);
            DataStoreSession.updateSessionById($scope.presentationsNotAssigned)
            .then(function(presentation) {
                $scope.assignedSession.presentations.push(presentationObj);
                DataStoreSession.updateSessionById($scope.assignedSession)
                .then(function(presentation2) {
                    UpdateModal(presentation2.data);
                })
                .catch(function(err) {
                  console.error(err);
                });
            })
            .catch(function(err) {
              console.error(err);
            });
        }

        function deleteSession(sessionId) {
            console.log(sessionId);
            DataStoreSession.deleteSession(sessionId)
            .then(function(session) {
                console.log(session);
                init();
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function newSession(sessionObject) {
            sessionObject.congre_id = $scope.userObject.registrations[0].congreId;
            DataStoreSession.newSession(sessionObject)
            .then(function(session) {
                console.log(session.message);
                getSessions($scope.userObject.registrations[0].congreId);
            })
            .catch(function(err) {
                console.error(err);
            });
        }
	}
})();
