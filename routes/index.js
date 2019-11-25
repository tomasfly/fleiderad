var express = require('express');
var common = require('../resources/common.json');
var app = express();
var selenium = require('../selenium/selenium')
const MongoClient = require('mongodb').MongoClient;

let mongoDb = require('../connection/mongodb');

app.get('/', function (req, res, next) {
  res.render('index', { title: 'FleiderAd' });
  console.log('going to index');
});

app.get('/campaigns', function (req, res, next) {
  MongoClient.connect(common.mongoDBConnectionString, (err, client) => {
    if (err) return console.log(err);
    db = client.db('test');
    db.collection('campaigns').find().toArray(function (err, results) {
      res.render('campaigns', results[0]);
    })
  })
});
//How DB should be used from now on.
app.get('/home', function (req, res, next) {
  var db = mongoDb.getDb();
  db.collection('tasks').find().toArray(function (err, results) {
    res.render('home', { results });
  })
});

app.get('/investigations', function (req, res, next) {
  res.render('investigations', { title: 'Investigations' });
});

app.get('/create-task', function (req, res, next) {
  res.render('create-task', { title: 'Creat Task' });
});

app.post('/create-task', function (req, res, next) {
  MongoClient.connect(common.mongoDBConnectionString, (err, client) => {
    if (err) return console.log(err);
    db = client.db('test');

    insertValue = {
      summary: req.body.summary,
      projectId: "1",
      priorityId: "1",
      description: "This is a placerholder for finishing FE",
      assignee: "tfleiderman",
      reporter: "tfleiderman",
      creationDate: Date.now(),
      comments: [],
      statusId: "1"
    }
    db.collection('tasks').insertOne(insertValue);
    db.collection('tasks').find().toArray(function (err, results) {
      console.log(results);
    })
  });
  res.render('create-task', { title: 'Creat Task' });
});

app.get('/analyze', function (req, res, next) {
  //selenium.getCommentsInfobae(common.evoMoralesArticulo);

  selenium.getHeadlineUrlsInfobaeBeta('https://www.infobae.com/america/');
  res.render('investigations', { title: 'Investigations' });
});

app.get('/marketing-digital', function (req, res, next) {
  Date.now()
  res.render('investigation', { title: 'Marketing Digital' });
});

app.get('/customers', function (req, res, next) {
  Date.now()
  res.render('customers', { title: 'Customers' });
});

module.exports = app;