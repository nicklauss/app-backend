(function() {
    'use strict';

    angular
        .module('sbAdminApp')
        .controller('badgesCtrl', badgesCtrl);

    badgesCtrl.$inject = ['$scope', '$q', 'DataStoreUser'];

    function badgesCtrl($scope, $q, DataStoreUser) {

        $scope.testCongreId = "575159c18fdcdf4fbcba2271";


        $scope.participants = [];
        $scope.auteurs = [];
        $scope.experts = [];
        $scope.congresLoading = true;
        $scope.userObject = {};
        // $scope.newParticipant = newParticipant;
        $scope.modalType = modalType;

// Share organizerId of logged in user
        getCurrentUser();

        function modalType(index, obj) {
            if(index == 0)
                $scope.modalTyper = true;
            else if(index == 2) {
                $scope.modalTyper = true;
                $scope.userObject = obj;
            } else {
                $scope.modalTyper = false;
                $scope.userObject = obj;
            }
        }

        function init(congreId, role) {
            var promises = [getParticipants(congreId, role)];
            $q.all(promises).then(function() {
                console.log('The participant are ready');
            });
        }

        function getCurrentUser() {
            DataStoreUser.getCurrentUser()
            .then(function(currentUser) {
                $scope.currentUser = currentUser.data;
                console.log(currentUser.data.registrations[0].congreId);
                $scope.currentCongreId = currentUser.data.registrations[0].congreId;
                init($scope.currentCongreId, "user");
                getAuteurs($scope.currentCongreId, "author");
                getExperts($scope.currentCongreId, "reviewer");
                getOrganizer($scope.currentCongreId, "organizer");
                getProgram($scope.currentCongreId, "program");
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function getOrganizer(congreId, role) {
            DataStoreUser.getUsersByRoleAndCongre(congreId, role)
            .then(function(organizer) {
                $scope.organizer = organizer.data;
                $scope.congresLoading = false;
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function getProgram(congreId, role) {
            DataStoreUser.getUsersByRoleAndCongre(congreId, role)
            .then(function(program) {
                $scope.program = program.data;
                $scope.congresLoading = false;
            })
            .catch(function(err) {
                console.error(err);
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

        // function newParticipant(userObject) {
        //     userObject.role = 'user';
        //     userObject.password = "azerty";
        //     var reg = {congreId: $scope.testCongreId, status: "REGISTERED", created: new Date()};
        //     userObject.registrations = [];
        //     userObject.registrations.push(reg);
        //     console.log(userObject);
        //     DataStoreUser.newUser(userObject)
        //     .then(function(participant) {

        //         console.log('Participant cree');
        //         console.log(participant);
        //         init($scope.testCongreId, "user");

        //     })
        //     .catch(function(err) {
        //         console.error(err);
        //     });
        // }

    }

})();
