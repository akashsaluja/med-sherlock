(function() {
    angular.module('public')
    .controller('OPDController', OPDController);

    OPDController.$inject = ['NewPatientService', 'TestsService', '$scope'];
    function OPDController(NewPatientService, TestsService, $scope) {
        var $ctrl = this;
        $ctrl.fromDate = "";
        $ctrl.toDate = "";
        $ctrl.opds = [];
        $ctrl.message = "";
        var patientMap = {};
        var patientIds = new Set();
        var entries = [];
        $ctrl.submit = function() {
            console.log($ctrl.date);
            NewPatientService.getOPD($ctrl.fromDate, $ctrl.toDate, $ctrl.opdCallback);
            
        }

        $ctrl.opdCallback = function(consultations) {
            if(consultations.length > 0) {
                //create a map of patient id with its consultation
                patientIds = new Set();
                entries = [];
                consultations.forEach(function(obj) {
                     patientIds.add(obj.patientId);
                     entries.push(obj);
                 });
            }
            TestsService.getTests($ctrl.fromDate, $ctrl.toDate, $ctrl.testsCallback);
           
        }

        $ctrl.testsCallback = function(tests) {
            if(tests.length > 0) {
                tests.forEach(function(obj) {
                    patientIds.add(obj.patientId);
                    entries.push(obj);
                });
                
            }
            if(patientIds.length == 0) {
                 console.log("No patient");
                 $ctrl.opds = [];
                 $ctrl.message = "No patient for day";
                 $scope.$digest();
            } else {
                entries.sort(function(a,b) {return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0);} ); 
                NewPatientService.getPatients(patientIds,  $ctrl.patientCallback);
            }
            
                

        }

        $ctrl.patientCallback = function(docs) {
            var amount = 0;
            console.log('Hey');
            console.log(docs);
            if(docs) {
                docs.forEach(function(obj) {
                   patientMap[obj.id] = obj;
                });
                entries.forEach(function(obj) {
                    entry = {};
                    patient = patientMap[obj.patientId];
                    entry.name = patient.name;
                    entry.age = patient.age;
                    entry.sex = patient.sex;
                    entry.residence = patient.residence;
                    entry.phone = patient.phone;
                    entry.amount = obj.amount;
                    if(obj.type === 'consultation') {
                        if(obj.date == patient.createDate) {
                            //first visit to clinic
                            entry.type = 'consultation-first-visit';
                        } else {
                            entry.type = 'consultation-follow-up';
                        }
                    } else {
                        entry.type = 'test-' + obj.name;
                    }
                    $ctrl.opds.push(entry);
                    if(obj.amount) {
                       amount = amount + parseInt(entry.amount);
                    }
                }); 
                console.log($ctrl.opds);
                $ctrl.message = "Total amount for time period is " + amount;
            } else {
                $ctrl.message = "No patient for specified time period";
            }
            $scope.$digest();
        }




    }

})();