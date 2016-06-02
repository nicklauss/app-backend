(function() {
    'use strict';

    angular
        .module('reviewerApp')
        .controller('auteursCtrl', auteursCtrl);

    auteursCtrl.$inject = ['$scope', '$q', 'DataStoreUser'];

    function auteursCtrl($scope, $q, DataStoreUser) {

        $scope.testCongreId = "574f5adf4aeb629f22ee8ca8";

        $scope.auteurs = [];
        $scope.congresLoading = true;
        $scope.userObject = {};
        // $scope.newAuteur = newAuteur;
        $scope.modalType = modalType;
        $scope.deleteAuteur = deleteAuteur;
        $scope.updateAuteur = updateAuteur;


// Share organizerId of logged in user
        init($scope.testCongreId, "author");


        function modalType(index, obj) {
            if(index == 0)
                $scope.modalTyper = true;
            else {
                $scope.modalTyper = false;
                $scope.userObject = obj;     
            }
        }

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

        // function newAuteur(userObject) {
        //     userObject.role = 'author';
        //     userObject.password = "azerty";
        //     var reg = {congreId: $scope.testCongreId, status: "REGISTERED", created: new Date()};
        //     userObject.registrations = [];
        //     userObject.registrations.push(reg);
        //     console.log(userObject);
        //     DataStoreUser.newUser(userObject)
        //     .then(function(auteur) {

        //         console.log('Auteur cree');
        //         console.log(auteur);
        //         init($scope.testCongreId, "author");

        //     })
        //     .catch(function(err) {
        //         console.error(err);
        //     });
        // }

        function deleteAuteur(id) {
            console.log(id);
            DataStoreUser.deleteUser(id)
            .then(function(auteur) {
                console.log(auteur);
                init($scope.testCongreId, "author");
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function updateAuteur(userObject) {
            console.log(userObject);
            DataStoreUser.updateUser(userObject)
            .then(function(auteur) {
                console.log(auteur);
                $scope.userObject = {};
                init($scope.testCongreId, "author");
            })
            .catch(function(err) {
                console.error(err);
            });
        }


    }

})();