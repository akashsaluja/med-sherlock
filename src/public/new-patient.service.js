(function () {
    angular.module('public')
    .service('NewPatientService', NewPatientService);

    function NewPatientService() {
        var service = this;
        this.register = function (name, age, sex, residence, phone, disease, amount, isOpd, callback) {
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
                date = new Date();
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
                doc = {
                    type: "patient",
                    name: name,
                    age: age,
                    sex: sex,
                    createDate: date.getTime(),
                    residence: residence,
                    phone: phone,
                    id: id
                }
                console.log(doc);
                
                db.insert(doc, function (err, newDoc) {   
                    //adding consultation also
                    callback(id);
                    if(isOpd) {
                        consultation = {
                            type: "consultation",
                            date: date.getTime(),
                            disease: disease,
                            amount: amount,
                            patientId: id
                        }
                        db.insert(consultation, function(err, doc) {
                            console.log(doc);
                            console.log(err);
                            
                        });
                    }
                    
                    
                });
                
                console.log(db);
            });
            
        }

        this.getOPD = function(fromDate, toDate, callback) {
            fromDate.setHours(0);
            fromDate.setMinutes(0);
            fromDate.setSeconds(0);
            fromDate.setMilliseconds(0);

            toDate.setHours(23);
            toDate.setMinutes(59);
            toDate.setSeconds(59);
            toDate.setMilliseconds(999);
            


        
            db.find({date: {$gte: fromDate.getTime(), $lte: toDate.getTime()}, type: {$in: ['consultation']}}, function(err, docs) {
                ids = [];
                console.log(docs);
                // docs.forEach(function(obj) {
                //     ids.push(obj.patientId);
                // });
                // console.log(ids);
                callback(docs);
            })
        }

        this.getPatients = function(ids, callback) {
            console.log(ids);
            if(ids.length == 0) {
                console.log('zero length');
                callback(ids);
            } else {
                db.find({type: 'patient', id: {$in: Array.from(ids)}}, function(err, docs) {
                    console.log(err);
                    console.log(docs);
                    callback(docs);
                })
            }
        }

        this.getAllPatients = function(callback) {
            
            
            db.find({type: 'patient'}, function(err, docs) {
                    console.log(err);
                    console.log(docs);
                    callback(docs);
                })
            }
        }


        
}

)();