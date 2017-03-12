var Datastore = require('nedb')
  , db = new Datastore({ filename: 'sherlock.db' });
  db.loadDatabase(function (err) {    // Callback is optional
  // Now commands will be executed
});
console.log(db);

