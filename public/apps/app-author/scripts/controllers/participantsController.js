(function() {
    'use strict';

    angular
        .module('authorApp')
        .controller('participantsCtrl', participantsCtrl);

    participantsCtrl.$inject = ['$scope', '$q', 'DataStoreUser'];

    function participantsCtrl($scope, $q, DataStoreUser) {

        $scope.testCongreId = "574f5adf4aeb629f22ee8ca8";


        $scope.participants = [];
        $scope.congresLoading = true;
        $scope.userObject = {};
        // $scope.newParticipant = newParticipant;
        $scope.modalType = modalType;
        $scope.deleteParticipant = deleteParticipant;
        $scope.updateParticipant = updateParticipant;

// Share organizerId of logged in user
        init($scope.testCongreId, "user");

        function modalType(index, obj) {
            if(index == 0)
                $scope.modalTyper = true;
            else {
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

        function deleteParticipant(id) {
            console.log(id);
            DataStoreUser.deleteUser(id)
            .then(function(participant) {
                console.log(participant);
                init($scope.testCongreId, "user");
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function updateParticipant(userObject) {
            console.log(userObject);
            DataStoreUser.updateUser(userObject)
            .then(function(participant) {
                console.log(participant);
                $scope.userObject = {};
                init($scope.testCongreId, "user");
            })
            .catch(function(err) {
                console.error(err);
            });
        }




    }

})();
