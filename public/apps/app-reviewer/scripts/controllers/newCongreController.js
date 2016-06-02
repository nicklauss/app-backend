(function() {
    'use strict';

    angular
        .module('reviewerApp')
        .controller('newCongreCtrl', newCongreCtrl);

    newCongreCtrl.$inject = ['$scope', '$q', 'DataStoreCongre'];

    function newCongreCtrl($scope, $q, DataStoreCongre) {

        $scope.congreObject = {};
        $scope.newCongre = newCongre;
        
        function newCongre(congreObject) {
            console.log(congreObject);
            DataStoreCongre.newCongre(congreObject)
            .then(function(congre) {
                console.log('Congre cree');
            })
            .catch(function(err) {
                console.error(err);
            });
        }

    }

})();
