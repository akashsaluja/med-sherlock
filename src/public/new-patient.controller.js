(function() {
    angular.module('public')
    .controller('NewPatientController', NewPatientController);

    NewPatientController.$inject = ['NewPatientService'];
    function NewPatientController(NewPatientService) {
        var $ctrl = this;
        console.log(NewPatientService.register1);
        $ctrl.mess = 'hhtg';
        $ctrl.success = null;
        NewPatientService.register1();
        $ctrl.submit = function() {
            console.log('Ctrl');
            NewPatientService.regsiter1();
            
        }

    }

})();