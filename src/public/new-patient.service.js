(function () {
    angular.module('public')
    .service('NewPatientService', NewPatientService);

    function NewPatientService() {
        var service = this;
        service.userInfo = null;
        this.register = function (name, age, complaints, bp, temp, notes, callback) {
            db.find({ type: 'patient_id' }, function (err, docs) {
            // docs is an array containing documents Mars, Earth, Jupiter
            // If no document is found, docs is equal to []
                var id;
                console.log('docs are' + docs.length);
                if(docs.length == 0) {
                    doc = {
                        type: "patient_id",
                        value: 1 
                    };
                    db.insert(doc, function(err, docs) {
                        console.log("Id inserted");
                    });
                    id = 1;
                } else {
                    id = docs[0].value;
                    id = id + 1;
                    console.log(docs);
                    console.log('id is ' + id );
                    
                    db.update({type: "patient_id"}, { type: "patient_id", value: docs[0].value + 1}, {}, function (error, numReplaced) {
                        console.log("Replaced " + numReplaced);
                        
                    })
                    

                }
                doc = {
                    type: "patient",
                    name: name,
                    age: age,
                    complaints: complaints,
                    vitals: {
                        bp: bp,
                        temp: temp
                    },
                    createDate: new Date(),
                    notes: notes,
                    id: id
                }
                console.log(doc);
                db.insert(doc, function (err, newDoc) {   // Callback is optional
                // newDoc is the newly inserted document, including its _id
                // newDoc has no key called notToBeSaved since its value was undefined
                    console.log(doc);
                    console.log(err);
                    callback(id);
                    
                });
                console.log(db);
            });
            
        }
        

        
}

})();