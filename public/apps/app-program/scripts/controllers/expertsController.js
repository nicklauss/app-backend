(function() {
    'use strict';

    angular
        .module('programApp')
        .controller('expertsCtrl', expertsCtrl);

    expertsCtrl.$inject = ['$scope', '$q', 'DataStoreUser', 'DataStorePublication'];

    function expertsCtrl($scope, $q, DataStoreUser, DataStorePublication) {

        $scope.testCongreId = "575159c18fdcdf4fbcba2271";


        $scope.experts = [];
        $scope.publications = [];
        $scope.userObject = {};
        $scope.newExpert = newExpert;
        $scope.congresLoading = true;
        $scope.modalType = modalType;
        $scope.deleteExpert = deleteExpert;
        $scope.updateExpert = updateExpert;
        $scope.getPublications = getPublications;
        $scope.updatePublicationAdd = updatePublicationAdd;
        $scope.updatePublicationMinus = updatePublicationMinus;

        function modalType(index, obj) {
            if(index == 0)
                $scope.modalTyper = true;
            else {
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

        function getPublications(reviewer) {
            $scope.userObject = reviewer;
            getPublicationsByReviewer(reviewer._id);
            getPublicationsNotAssigned();
        }

        function updatePublicationMinus(publicationObj, reviewerId) {
            console.log(publicationObj.evaluation);
            publicationObj.evaluation = {
                "value": "NOTASSIGNED"
            };
            console.log(publicationObj.evaluation);
            DataStorePublication.updatePublicationById(publicationObj)
            .then(function(publication) {
                getPublicationsByReviewer(reviewerId);
                getPublicationsNotAssigned();
            })
            .catch(function(err) {
              console.error(err);
            });
        }

        function updatePublicationAdd(publicationObj, reviewerId) {
            console.log(publicationObj);
            publicationObj.evaluation = {
                "value" : "PENDING",
                "reviewer_id" : reviewerId
            };
            console.log(publicationObj);
            DataStorePublication.updatePublicationById(publicationObj)
            .then(function(publication) {
                getPublicationsByReviewer(reviewerId);
                getPublicationsNotAssigned();
            })
            .catch(function(err) {
              console.error(err);
            });
        }

        function getPublicationsByReviewer(reviewerId) {
            DataStorePublication.getPublicationsByReviewer(reviewerId)
            .then(function(publications) {
                $scope.publications = publications.data;
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function getPublicationsNotAssigned() {
            DataStorePublication.getPublicationsNotAssigned()
            .then(function(publicationsNotAssigned) {
                $scope.publicationsNotAssigned = publicationsNotAssigned.data;
                console.log($scope.publicationsNotAssigned);
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function newExpert(userObject) {
            userObject.role = 'reviewer';
            userObject.password = "azerty";
            var reg = {congreId: $scope.testCongreId, status: "REGISTERED", created: new Date()};
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
