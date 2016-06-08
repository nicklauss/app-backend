(function() {
    'use strict';

    angular
        .module('sbAdminApp')
        .controller('programsCtrl', programsCtrl);

    programsCtrl.$inject = ['$scope', '$q', 'DataStoreUser'];

    function programsCtrl($scope, $q, DataStoreUser) {

        $scope.testCongreId = "575159c18fdcdf4fbcba2271";


        $scope.programs = [];
        $scope.congresLoading = true;
        $scope.userObject = {};
        $scope.newProgram = newProgram;
        $scope.modalType = modalType;
        $scope.deleteProgram = deleteProgram;
        $scope.updateProgram = updateProgram;


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
        init($scope.testCongreId, "program");
// Share organizerId of logged in user

        function init(congreId, role) {
            var promises = [getPrograms(congreId, role)];
            $q.all(promises).then(function() {
                console.log('The programs are ready');
            });
        }

        function newProgram(userObject) {
            userObject.role = 'program';
            userObject.password = "azerty";
            var reg = {congreId: $scope.testCongreId, status: "REGISTERED", created: new Date()};
            userObject.registrations = [];
            userObject.registrations.push(reg);
            console.log(userObject);
            DataStoreUser.newUser(userObject)
            .then(function(program) {

                console.log('Program cree');
                console.log(program);
                init($scope.testCongreId, "program");

            })
            .catch(function(err) {
                console.error(err);
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

        function deleteProgram(id) {
            console.log(id);
            DataStoreUser.deleteUser(id)
            .then(function(program) {
                console.log(program);
                init($scope.testCongreId, "program");
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function updateProgram(userObject) {
            console.log(userObject);
            DataStoreUser.updateUser(userObject)
            .then(function(program) {
                console.log(program);
                $scope.userObject = {};
                init($scope.testCongreId, "program");
            })
            .catch(function(err) {
                console.error(err);
            });
        }
    }

})();
