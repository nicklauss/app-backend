(function() {
    'use strict';

    angular
        .module('authorApp')
        .controller('presentationsCtrl', presentationsCtrl);

    presentationsCtrl.$inject = ['$scope', '$q', 'DataStorePublication', 'DataStoreUser', 'DataStoreSession', 'DataStoreCongre'];

    function presentationsCtrl($scope, $q, DataStorePublication, DataStoreUser, DataStoreSession, DataStoreCongre) {

        $scope.publications = [];
        $scope.publicationsLoading = true;
        $scope.publicationObject = {};
        $scope.modalType = modalType;
        $scope.newPresentation = newPresentation;
        $scope.soumission = false;
        $scope.evaluation = false;
        $scope.finalisation = false;
        $scope.congreStart = false;


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

        function getCongreById(congreId) {
            DataStoreCongre.getCongreById(congreId)
            .then(function(congre) {
                $scope.congreObject = congre.data[0];
                console.log(congre);
                var now = new Date();
                var soumission_start = new Date(congre.data[0].soumission.start);
                var evaluation_start = new Date(congre.data[0].evaluation.start);
                var finalisation_start = new Date(congre.data[0].finalisation.start);
                var soumission_end = new Date(congre.data[0].soumission.end);
                var evaluation_end = new Date(congre.data[0].evaluation.end);
                var finalisation_end = new Date(congre.data[0].finalisation.end);
                var congre_start = new Date(congre.data[0].date_debut);

                console.log(now >= evaluation_start);
                // if(now > soumission_start) {
                //     $scope.soumissionUp = true;
                //     console.log('inside soumissionUp');
                // }
                // if(now > evaluation_start){
                //     $scope.evaluationUp = true;
                //     console.log('inside evaluationUp');                    
                // }
                // if(now > finalisation_start) {
                //     console.log('inside finalisationUp');
                //     $scope.finalisationUp = true;                    
                // }
                if(now > soumission_start && now < soumission_end) {
                    console.log('inside soumission');
                    $scope.soumission = true;
                    $scope.evaluation = false;
                    $scope.finalisation = false;
                }
                if(now > evaluation_start && now < evaluation_end){
                    console.log('inside evaluation');                    
                    $scope.soumission = false;
                    $scope.evaluation = true;
                    $scope.finalisation = false;
                }
                if(now > finalisation_start && now < finalisation_end) {
                    console.log('inside finalisation');
                    $scope.soumission = false;
                    $scope.evaluation = false;
                    $scope.finalisation = true;                    
                }
                if(now > congre_start) {
                    console.log('inside congre_start');
                    $scope.soumission = false;
                    $scope.evaluation = false;
                    $scope.finalisation = false;                    
                    $scope.congreStart = true;                    
                }

                console.log($scope.soumission+' '+$scope.evaluation+' '+$scope.finalisation)
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
                $scope.currentCongreId = currentUser.data.registrations[0].congreId;
                getCongreById($scope.currentCongreId);
            })
            .catch(function(err) {
                console.error(err);
            });
        }

    }

})();
