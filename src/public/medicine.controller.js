(function() {
    angular.module('public')
    .controller('MedicineController', MedicineController);

    MedicineController.$inject = ['MedicineService', '$scope'];
    function MedicineController(MedicineService, $scope) {
        var $ctrl = this;
        $ctrl.price = 0;
        $ctrl.name = "";
        $ctrl.medicineList = [];
        console.log(MedicineService);
        
        console.log(MedicineService);
        $ctrl.submit = function() {
            MedicineService.addMedicine($ctrl.name, $ctrl.price, $ctrl.callback); 
                
        }

        $ctrl.callback = function() {
            $ctrl.medicineAddMessage = "Medicine added";
            $scope.$digest();
            MedicineService.getMedicines($ctrl.medicineListCallback);
        }

        $ctrl.medicineListCallback = function(docs) {
            if(docs.length == 0) {
                $ctrl.medicineListMessage = "No Medicines yet!"
            } else {
                $ctrl.medicineListMessage = "Medicine List"
                $ctrl.medicineList = docs;
            }
            $scope.$digest();
        }

        MedicineService.getMedicines($ctrl.medicineListCallback);



    }

})();