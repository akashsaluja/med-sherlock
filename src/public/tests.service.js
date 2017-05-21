(function () {
    angular.module('public')
    .service('TestsService', TestsService);

    function TestsService() {
        var service = this;
        this.addTest = function(patientId, testName, amount, callback) {
            date = new Date().getTime();
            doc = {
                type: 'test',
                patientId: patientId,
                name: testName,
                amount: amount,
                date: date
            }
            db.insert(doc, function (err, newDoc) {   
                    callback(testName);
            });
        }


        this.getTests = function(fromDate, toDate, callback) {
            fromDate.setHours(0);
            fromDate.setMinutes(0);
            fromDate.setSeconds(0);
            fromDate.setMilliseconds(0);

            toDate.setHours(23);
            toDate.setMinutes(59);
            toDate.setSeconds(59);
            toDate.setMilliseconds(999);
            


        
            db.find({date: {$gte: fromDate.getTime(), $lte: toDate.getTime()}, type: {$in: ['test']}}, function(err, docs) {
                ids = [];
                console.log(docs);
                // docs.forEach(function(obj) {
                //     ids.push(obj.patientId);
                // });
                // console.log(ids);
                callback(docs);
            })
        }


        
}

})();