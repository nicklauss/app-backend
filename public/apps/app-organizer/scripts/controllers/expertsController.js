(function() {
    'use strict';

    angular
        .module('sbAdminApp')
        .controller('expertsCtrl', expertsCtrl);

    expertsCtrl.$inject = ['$scope', '$q', 'DataStoreUser'];

    function expertsCtrl($scope, $q, DataStoreUser) {

        $scope.testCongreId = "575159c18fdcdf4fbcba2271";


        $scope.experts = [];
        $scope.userObject = {};
        $scope.newExpert = newExpert;
        $scope.congresLoading = true;
        $scope.modalType = modalType;
        $scope.deleteExpert = deleteExpert;
        $scope.updateExpert = updateExpert;

        function modalType(index, obj) {
            if(index == 0) {
                $scope.modalTyper = true;
                $scope.modalTypers = true;                
            } else if(index == 2) {
                $scope.modalTypers = false;
                $scope.userObject = obj;
            } else {
                $scope.modalTypers = true;
                $scope.modalTyper = false;
                $scope.userObject = obj;
            }
        }

        getCurrentUser();
// Share organizerId of logged in user
        function init(congreId, role) {
            var promises = [getExperts(congreId, role)];
            $q.all(promises).then(function() {
                console.log('The experts are ready');
            });
        }

        function getCurrentUser() {
            DataStoreUser.getCurrentUser()
            .then(function(currentUser) {
                $scope.currentUser = currentUser.data;
                console.log(currentUser.data.registrations[0].congreId);
                $scope.currentCongreId = currentUser.data.registrations[0].congreId;
                init($scope.currentCongreId, "reviewer");
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function newExpert(userObject) {
            userObject.role = 'reviewer';
            userObject.password = "azerty";
            var reg = {congreId: $scope.currentCongreId, status: "REGISTERED", created: new Date()};
            userObject.registrations = [];
            userObject.registrations.push(reg);
            console.log(userObject);
            DataStoreUser.newUser(userObject)
            .then(function(expert) {

                console.log('Expert cree');
                console.log(expert);
                init($scope.currentCongreId, "reviewer");

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

        function deleteExpert(id) {
            console.log(id);
            DataStoreUser.deleteUser(id)
            .then(function(expert) {
                console.log(expert);
                init($scope.currentCongreId, "reviewer");
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function updateExpert(userObject) {
            console.log(userObject);
            DataStoreUser.updateUser(userObject)
            .then(function(expert) {
                console.log(expert);
                $scope.userObject = {};
                init($scope.currentCongreId, "reviewer");
            })
            .catch(function(err) {
                console.error(err);
            });
        }

    }

})();
