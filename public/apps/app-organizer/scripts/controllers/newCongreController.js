(function() {
    'use strict';

    angular
        .module('sbAdminApp')
        .controller('newCongreCtrl', newCongreCtrl);

    newCongreCtrl.$inject = ['$rootScope', '$scope', '$q', 'DataStoreCongre'];

    function newCongreCtrl($rootScope, $scope, $q, DataStoreCongre) {

        $scope.congreObject = {};
        $scope.alert = false;
        $scope.newCongre = newCongre;
        
        function newCongre(congreObject) {
            console.log(congreObject);
            DataStoreCongre.newCongre(congreObject)
            .then(function(congre) {
                $scope.alert = true;
                console.log('Congre cree');
            })
            .catch(function(err) {
                console.error(err);
            });
        }

    }

})();
