(function() {
    angular.module('public')
    .controller('SearchController', SearchController);

    SearchController.$inject = ['NewPatientService', '$scope'];
    function SearchController(NewPatientService, $scope) {


        var $ctrl = this;
        $ctrl.getInfo = function() {
            console.log("hello akash");
        }


    }
})();