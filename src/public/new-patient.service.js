(function () {
    angular.module('public')
    .service('NewPatientService', NewPatientService);

    function NewPatientService() {
        var service = this;
        service.userInfo = null;
        this.register = function (name, age, complaints, bp, temp) {
            doc = {
                "type": "patient",
                "name": name,
                "age": age,
                "complaints": complaints,
                "vitals": {
                    "bp": bp,
                    "temp": temp
                }
            }
            db.insert(doc, function (err, newDoc) {   // Callback is optional
            // newDoc is the newly inserted document, including its _id
            // newDoc has no key called notToBeSaved since its value was undefined
                console.log(doc);
                console.log(err);

            });
            console.log(db);
        }
    }

})();