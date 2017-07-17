(function() {
    angular.module('public')
    .controller('SearchController', SearchController);

    SearchController.$inject = ['NewPatientService', '$scope'];
    function SearchController(NewPatientService, $scope) {

        

        var $ctrl = this;

        $ctrl.patients = [];
        $ctrl.male = true;
        $ctrl.female = true;
        $ctrl.child = true;
        $ctrl.getInfo = function() {
            if(!$ctrl.query) {
                   return; 
            }
            NewPatientService.getAllPatients(function (docs) {
                console.log('response rec');
                $ctrl.patients = docs;
                //filter 
                $scope.$digest();
            });
        }

        $ctrl.filterSearchResults = function(item) {
            console.log($ctrl.query);
            var q = $ctrl.query.toUpperCase();
            if(item.name.toUpperCase().includes(q))
                return true;
            return false;
        }


    }
})();