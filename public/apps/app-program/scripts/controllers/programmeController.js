(function() {
    'use strict';

    angular
        .module('programApp')
        .controller('programmeCtrl', programsCtrl);

    programsCtrl.$inject = ['$scope', '$q', 'DataStoreUser'];

    function programmeCtrl($scope, $q, DataStoreUser) {


})();