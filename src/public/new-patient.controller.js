(function() {
    angular.module('public')
    .controller('NewPatientController', NewPatientController);

    NewPatientController.$inject = ['NewPatientService', '$scope'];
    function NewPatientController(NewPatientService, $scope) {
        var $ctrl = this;
        $ctrl.mess = 'hhtg';
        $ctrl.sexes = ["Male", "Female"];
        $ctrl.success = null;
        $ctrl.message = "";
        $ctrl.individuals = ["Akash", "Manuj"];
        $ctrl.submit = function() {
            console.log('Ctrl');
            NewPatientService.register($ctrl.name, $ctrl.age, $ctrl.sex, $ctrl.residence, $ctrl.disease, this.patientRegisteredCallback);
            
        }

        $ctrl.patientRegisteredCallback = function(id) {
            console.log('Saved id ' + id);
            $ctrl.message = "Patient details saved. Id is " + id;
            $scope.$digest();
        }

    }

})();