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
  //selenium.getCommentsInfobae('https://infobae.talk.coralproject.net/embed/stream?asset_url=https%3A%2F%2Fwww.infobae.com%2Fpolitica%2F2019%2F11%2F20%2Falberto-fernandez-suspendio-su-viaje-a-europa-para-concentrarse-en-la-definicion-del-gabinete-y-las-primeras-medidas-de-su-gobierno%2F&initialWidth=1138&childId=coral_talk_stream&parentTitle=Alberto%20Fern%C3%A1ndez%20suspendi%C3%B3%20su%20viaje%20a%20Europa%20para%20concentrarse%20en%20la%20definici%C3%B3n%20del%20Gabinete%20y%20las%20primeras%20medidas%20de%20su%20Gobierno%20-%20Infobae&parentUrl=https%3A%2F%2Fwww.infobae.com%2Fpolitica%2F2019%2F11%2F20%2Falberto-fernandez-suspendio-su-viaje-a-europa-para-concentrarse-en-la-definicion-del-gabinete-y-las-primeras-medidas-de-su-gobierno%2F');

  selenium.captureCorlTalkJsonBody('https://infobae.talk.coralproject.net/embed/stream?asset_url=https%3A%2F%2Fwww.infobae.com%2Fopinion%2F2019%2F11%2F25%2Fun-casi-empate-en-uruguay-que-no-impide-a-la-argentina-reflexionar-sobre-neutralidad-y-politica-militante%2F&initialWidth=938&childId=coral_talk_stream&parentTitle=Un%20casi%20empate%20en%20Uruguay%20que%20no%20impide%20a%20la%20Argentina%20reflexionar%20sobre%20neutralidad%20y%20pol%C3%ADtica%20militante%20-%20Infobae&parentUrl=https%3A%2F%2Fwww.infobae.com%2Fopinion%2F2019%2F11%2F25%2Fun-casi-empate-en-uruguay-que-no-impide-a-la-argentina-reflexionar-sobre-neutralidad-y-politica-militante%2F');
  // selenium.getCoralTalkUrls('https://www.infobae.com/');
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