(function() {
    angular.module('public')
    .controller('NewPatientController', NewPatientController);

    NewPatientController.$inject = ['NewPatientService'];
    function NewPatientController(NewPatientService) {
        var $ctrl = this;
        $ctrl.mess = 'hhtg';
        $ctrl.sexes = ["Male", "Female"];
        $ctrl.success = null;
        $ctrl.submit = function() {
            console.log('Ctrl');
            NewPatientService.register($ctrl.name, $ctrl.age, $ctrl.sex, $ctrl.vitals.bp, $ctrl.vitals.temp);
            
        }

    }

})();