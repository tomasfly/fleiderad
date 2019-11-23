const MongoClient = require('mongodb').MongoClient;
var common= require('../resources/common.json');


MongoClient.connect(common.mongoDBConnectionString, (err, client) => {
    if (err) return console.log(err);
    db = client.db('test');

    insertValue = {
        summary:"Finish Tasks FE",
        projectId:"1",
        priorityId:"1",
        description:"This is a placerholder for finishing FE",
        assignee:"tfleiderman",
        reporter:"tfleiderman",
        creationDate:Date.now(),
        comments:[],
        statusId:"1"
    }
    db.collection('tasks').insertOne(insertValue);
    db.collection('tasks').find().toArray(function (err, results) {
      console.log(results);
    })
  });