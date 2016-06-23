(function() {
    'use strict';

    angular
        .module('authorApp')
        .controller('presentationsCtrl', presentationsCtrl);

    presentationsCtrl.$inject = ['$scope', '$q', 'DataStorePublication', 'DataStoreUser', 'DataStoreSession'];

    function presentationsCtrl($scope, $q, DataStorePublication, DataStoreUser, DataStoreSession) {

        $scope.publications = [];
        $scope.publicationsLoading = true;
        $scope.publicationObject = {};
        $scope.modalType = modalType;
        $scope.newPresentation = newPresentation;


        function modalType(index, obj) {
            if(index == 0)
                $scope.modalTyper = true;
            else if(index == 2) {
                $scope.modalTyper = true;
                $scope.publicationObject = obj;
            } else {
                  $scope.modalTyper = false;
                  $scope.presObj = obj;
            }
        }
        init();
// Share authorId of logged in user
        function init() {
            var promises = [getCurrentUser()];
            $q.all(promises).then(function() {
                console.log('The publications are ready');
            });
        }

        function getPublicationsByAuthor(authorId) {
            DataStorePublication.getPublicationsByAuthor(authorId)
            .then(function(publications) {
                $scope.publications = publications.data;
                $scope.publicationsLoading = false;
                getGeneralSession();
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function getGeneralSession() {
            DataStoreSession.getSessionById("5766edc5a743455e1e393bd7")
            .then(function(session) {
                $scope.sessions = session.data;
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function newPresentation(presentationObj, user) {
            console.log($scope.sessions.presentations);
            user.role = 'speaker';
            user.firstName = 'Mr';
            user.gender = 'male';
            user.password = "azerty";
            var reg = {congreId: $scope.userObject.registrations[0].congreId, status: "REGISTERED", created: new Date()};
            user.registrations = [];
            user.registrations.push(reg);
            console.log(user);
            DataStoreUser.newUser(user)
            .then(function(speaker) {

                console.log('Speaker cree');
                console.log(speaker);
                presentationObj.speaker = speaker.data._id;
                $scope.sessions.presentations.push(presentationObj);
                console.log($scope.sessions.presentations);
                DataStoreSession.updateSessionById($scope.sessions)
                .then(function(presentation) {
                  console.log(presentation);
                  getPublicationsByAuthor($scope.userObject._id);
                })
                .catch(function(err) {
                  console.error(err);
                });
            })
            .catch(function(err) {
                console.error(err);
            });


        }
        function getCurrentUser() {
            DataStoreUser.getCurrentUser()
            .then(function(currentUser) {
                $scope.userObject = currentUser.data;
                $scope.userObjectId = currentUser.data._id;
                console.log($scope.userObject._id);
                getPublicationsByAuthor($scope.userObject._id);
            })
            .catch(function(err) {
                console.error(err);
            });
        }

    }

})();
