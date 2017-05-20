(function() {
    angular.module('public')
    .controller('OPDController', OPDController);

    OPDController.$inject = ['NewPatientService', '$scope'];
    function OPDController(NewPatientService, $scope) {
        var $ctrl = this;
        $ctrl.fromDate = "";
        $ctrl.toDate = "";
        $ctrl.opds = [];
        $ctrl.message = "";
        var patientConsultationMap = {};
        $ctrl.submit = function() {
            console.log($ctrl.date);
            NewPatientService.getOPD($ctrl.fromDate, $ctrl.toDate, $ctrl.opdCallback);
            
        }

        $ctrl.opdCallback = function(consultations) {
            if(consultations.length > 0) {
                //create a map of patient id with its consultation
                ids=[];
                consultations.forEach(function(obj) {
                     ids.push(obj.patientId);
                     patientConsultationMap[obj.patientId] = obj;
                 });
                NewPatientService.getPatients(ids,  $ctrl.patientCallback);
            } else {
                console.log("No patient");
                 $ctrl.opds = [];
                $ctrl.message = "No patient for day";
                 $scope.$digest();
            }
           
        }

        $ctrl.patientCallback = function(docs) {
            var amount = 0;
            if(docs) {
                docs.forEach(function(obj) {
                    Object.assign(obj, patientConsultationMap[obj.id]);
                    if(obj.amount) {
                        amount = amount + parseInt(obj.amount);
                    }
                });
                docs.sort(function(a,b) {return (a.patientId > b.patientId) ? 1 : ((b.patientId > a.patientId) ? -1 : 0);} ); 
                 $ctrl.opds = docs;
                 $ctrl.message = "Total amount for time period is " + amount;
            } else {
                $ctrl.message = "No patient for specified time period";
            }
            $scope.$digest();
        }




    }

})();