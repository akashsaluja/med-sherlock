(function () {
    angular.module('public')
    .service('MedicineService', MedicineService);

    function MedicineService() {
        var service = this;
        service.addMedicine = function (name, price, callback) {
            db.remove({type: 'medicine', name: name},{},  function(err, numRemoved) {
                db.insert({type: 'medicine', name: name, price: price}, function(err, docs) {
                    callback();
                });
            })
        }

        service.getMedicines = function (callback) {
            db.find({type: 'medicine'}, function (err, docs) {
                callback(docs);
            });

        }

        
}

})();