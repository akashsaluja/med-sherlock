(function() {
    angular.module('public')
    .controller('TestsController', TestsController);

    TestsController.$inject = ['NewPatientService' ,'$scope'];
    function TestsController(NewPatientService, $scope) {
        var $ctrl = this;
        console.log('Hey');
        $ctrl.patientId = '';
        $ctrl.patientMessage = '';
        $ctrl.items = ['Akash', 'Saluja'];
        $ctrl.patient = '';

        $ctrl.patientCallback = function(docs) {
            if(docs.length != 0) {
                $ctrl.patient = docs[0];
                 $ctrl.patientMessage = "Patient found";
            } else {
                $ctrl.patientMessage = "No patient found for Id";
                $ctrl.patient = '';
            }
            $scope.$digest();
        }

       $ctrl.getPatientInfo = function() {
            console.log($ctrl.patientId);
            if($ctrl.patientId.trim().length == 0) {
                $ctrl.patientMessage = 'Please enter patient Info';
                $ctrl.patient = '';
                 $scope.$digest();
            } else {
                var ids = [];
                ids.push(parseInt($ctrl.patientId));
                console.log(ids);
                NewPatientService.getPatients(ids, $ctrl.patientCallback);
            }
            
        }

        



    }

})();