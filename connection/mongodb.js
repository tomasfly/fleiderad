// const MongoClient = require('mongodb').MongoClient;
// var common = require('../resources/common.json');
// let returnValue;

// class Mongodb {
//     constructor() {
//     }

//     async getTasks() {
//         return await MongoClient.connect(common.mongoDBConnectionString, (err, client) => {
//             if (err) return console.log(err);
//             let db;
//             db = client.db('test');
//             db.collection('tasks').find().toArray(function (err, results) {
//                 console.log(results);
//                 returnValue =  results;
//             })
//         });
//     }
// }
// module.exports = new Mongodb();
var common = require('../resources/common.json');
const MongoClient = require('mongodb').MongoClient;

var _db;

module.exports = {

    connectToServer: function (callback) {
        MongoClient.connect(common.mongoDBConnectionString, { useNewUrlParser: true }, function (err, client) {
            _db = client.db('test');
            return callback(err);
        });
    },

    getDb: function () {
        return _db;
    },

    getTasks: function () {
        let returnValue;
        _db.collection('tasks').find().toArray(function (err, results) {
            console.log(results);
            returnValue = results;
        })
        
    }
};