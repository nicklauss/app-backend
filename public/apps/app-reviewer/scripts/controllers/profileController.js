(function() {
    'use strict';

    angular
        .module('reviewerApp')
        .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['$scope', '$q', 'DataStoreUser'];

    function profileCtrl($scope, $q, DataStoreUser) {
        $scope.userObject = {};
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.disable = true;

        init();
// Share organizerId of logged in user
        function init() {
            var promises = [getCurrentUser()];
            $q.all(promises).then(function() {
                console.log('The congres are ready');
            });
        }

        // function getCongreById(congreId) {
        //     DataStoreCongre.getCongreById(congreId)
        //     .then(function(congre) {
        //     	console.log('ctrl   :')
        //         $scope.congreObject = congre.data[0];
        //         $scope.congresLoading = false;
        //     })
        //     .catch(function(err) {
        //         console.error(err);
        //     });
        // }

        function updateUser(userObject) {
            DataStoreUser.updateUser(userObject)
            .then(function(user) {
                $scope.userObject = user.data;
                init();
                $scope.disable = true;
            })
            .catch(function(err) {
                console.error(err);
            });
        }


        function deleteUser(userId) {
            DataStoreUser.deleteUser(userId)
            .then(function(user) {
                $scope.userObject = user.data;
                init();
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function getCurrentUser() {
            DataStoreUser.getCurrentUser()
            .then(function(currentUser) {
                $scope.userObject = currentUser.data;
                console.log($scope.userObject);
            })
            .catch(function(err) {
                console.error(err);
            });
        }

    }

})();
