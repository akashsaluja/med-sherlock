(function() {
    angular.module('public')
    .controller('OPDController', OPDController);

    OPDController.$inject = ['NewPatientService', '$scope'];
    function OPDController(NewPatientService, $scope) {
        var $ctrl = this;
        $ctrl.date = "";
        $ctrl.opds = [];
        $ctrl.submit = function() {
            console.log($ctrl.date);
            NewPatientService.getOPD($ctrl.date, $ctrl.opdCallback);
            
        }

        $ctrl.opdCallback = function(docs) {
            if(docs) {
                 $ctrl.opds = docs;
            }
            $scope.$digest();
        }




    }

})();