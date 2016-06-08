(function() {
    'use strict';

    angular
        .module('loginApp')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$http', '$q', 'DataStoreUser', '$window'];

    function loginCtrl($http, $q, DataStoreUser, $window) {
        var vm = this;
        vm.authenticationCredentiels = {};
        vm.message = {};
        vm.login = login;

        function login() {
            DataStoreUser.login(vm.authenticationCredentiels)
                .then(function(resp) {
                    switch(resp.role) {
                      case 'organizer' :
                        $window.location = '/?access_token=' + resp.token;
                        break;
                      case 'author' :
                        $window.location = '/author-app?access_token=' + resp.token;
                        break;
                      case 'reviewer' :
                        $window.location = '/reviewer-app?access_token=' + resp.token;
                        break;
                      case 'program' :
                        $window.location = '/program-app?access_token=' + resp.token;
                        break;
                    }
                })
                .catch(function(err) {
                    console.error(err);
                });
        }
    }

})();
