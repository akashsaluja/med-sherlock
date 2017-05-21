(function() {
    angular.module('public')
    .controller('TestsController', TestsController);

    TestsController.$inject = ['NewPatientService' ,'TestsService', '$scope'];
    function TestsController(NewPatientService, TestsService, $scope) {
        var $ctrl = this;
        console.log('Hey');
        $ctrl.patientId = '';
        $ctrl.patientMessage = '';
        $ctrl.items = ['Akash', 'Saluja'];
        $ctrl.patient = '';
        $ctrl.noOfTests = 0;
        $ctrl.finalMessage = '';

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

        $ctrl.submit = function() {
            console.log($ctrl.isSugar);
             $ctrl.noOfTests = 0;
             
            if($ctrl.isSugar) {
                 $ctrl.noOfTests++;
            }
            if($ctrl.isHbsag) {
                $ctrl.noOfTests++;
            }
            if($ctrl.isSugar) {
                TestsService.addTest($ctrl.patient.id, 'Sugar', Math.floor($ctrl.amount/$ctrl.noOfTests), $ctrl.testSaveCallback);
            }
            if($ctrl.isHbsag) {
                TestsService.addTest($ctrl.patient.id, 'HBSAG', Math.floor($ctrl.amount/$ctrl.noOfTests), $ctrl.testSaveCallback);
            }
        }

        $ctrl.testSaveCallback = function(testName) {
            $ctrl.noOfTests--;
            console.log($ctrl.noOfTests);
            if($ctrl.noOfTests == 0) {
                $ctrl.finalMessage = 'Tests Saved';
                $scope.$digest();
            }
        }

        



    }

})();