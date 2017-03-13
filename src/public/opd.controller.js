(function() {
    angular.module('public')
    .controller('OPDController', OPDController);

    OPDController.$inject = ['NewPatientService', '$scope'];
    function OPDController(NewPatientService, $scope) {
        var $ctrl = this;
        $ctrl.date = "";
        $ctrl.opds = [];
        $ctrl.message = "";
        $ctrl.submit = function() {
            console.log($ctrl.date);
            NewPatientService.getOPD($ctrl.date, $ctrl.opdCallback);
            
        }

        $ctrl.opdCallback = function(ids) {
            if(ids.length > 0) {
                NewPatientService.getPatients(ids,  $ctrl.patientCallback);
            } else {
                console.log("No patient");
                 $ctrl.opds = [];
                $ctrl.message = "No patient for day";
                 $scope.$digest();
            }
           
        }

        $ctrl.patientCallback = function(docs) {
            if(docs) {
                 $ctrl.opds = docs;
                 $ctrl.message = "";
            } else {
                $ctrl.message = "No patient for day";
            }
            $scope.$digest();
        }




    }

})();