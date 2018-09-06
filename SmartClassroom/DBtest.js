var MongoClient = require('mongodb').MongoClient;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
//var mustacheExpress = require('mustache-express');
var url = "mongodb://localhost:27017/Students";
var express = require('express');
var app = express();
//app.engine('mustache', mustacheExpress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

function connectDB(callback){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    callback(db);
  });
};

function createCollection(db,callback){
  db.createCollection("Studentinfo", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
  });
  callback(db);
};

connectDB(function(db){
  createCollection(db,function(db){
  app.get('/menu', function(req,res){
    app.set('view engine', 'pug');
    res.render('Main-menu',{title:'Menu'});
  });

  app.get('/add', function(req,res){
    app.set('view engine', 'pug');
    res.render('author_form',{title:'Add Student'});
  });

  app.post('/submit', function(req,res){
    var rno = req.body.reg_no.toString();
    db.collection("Studentinfo").find({'reg_no': rno}).toArray(function(err, result) {
      if (err) throw err;
      if (result.length == 0)
      {
      db.collection('Studentinfo').insertOne(req.body, function(err,resu){
        if (err) throw err;
        res.send('Data inserted--><a href="/add" style="padding: 2px 6px 2px 6px;border: 1px solid #333333;  text-decoration: none;background-color: #EEEEEE;color: #333333;">Go Back</a>');
      //  db.collection("Studentinfo").createIndex({ "id": 1 }, { unique: true });
    });
  }
      else {
        res.redirect('/add');
      }
      });
    });

  app.get('/disp', function(req,res){
    //console.log(db.collection("Studentinfo").find({}));
    app.set('view engine', 'pug');
    res.render('disp_data',{title:'View Attendance'});
    /*db.collection("Attendance").find({}).toArray(function(err, result) {
      if (err) throw err;

      /for(i=0;i<result.length;i++)
      {
        console.log(result[i].);

      }

      db.close();
    });*/
  });
  app.post('/dispattn', function(req,res){
    var tmpd = parseInt(req.body.date);
    var tmpm = parseInt(req.body.month);
    var tmpy = parseInt(req.body.year);

    db.collection("Attendance").find({'DandT.Day': tmpd,'DandT.Month': tmpm,'DandT.Year': tmpy}).toArray(function(err, result) {
      if (err) console.log("error");
      /*app.set('views', __dirname + '/views');
      app.set('view engine', 'pug');*/
    //  var template = '<table style="width:100%">  <tr>    <th>Register No:</th>    <th>Date:</th>    <th>Time:</th>  </tr>  <tr><td>{{Reg_no}}</td></tr>{{#DandT}}<tr><td>{{}}</td></tr>';
    if(result.length!=0)
    {
      var tmpdisp = '';
      var r;
      for(i=0;i<result.length;i++)
      {
        r = result[i];
        tmpdisp = tmpdisp + r.Reg_no +'--->   '+ r.DandT.Hours + ' : ' + r.DandT.Minutes + ' : ' + r.DandT.Seconds + "<br />";
        /*
        res.render('dispattn', {
            'dispattn': r
        });*/
      }
      res.writeHead(200,{"Content-Type":"text/html"});
      res.write(r.DandT.Day + ' - ' + r.DandT.Month + ' - ' + r.DandT.Year+'<br />'+'<pre><h2>Register No:     Time:</h2></pre>'+tmpdisp+'<br /><br />'+'<a href="/disp" style="padding: 2px 6px 2px 6px;border: 1px solid #333333;  text-decoration: none;background-color: #EEEEEE;color: #333333;">Go Back</a>');
      res.end();
    }
    else 
      {

      res.send('Date not available-->'+'<a href="/disp" style="padding: 2px 6px 2px 6px;border: 1px solid #333333;  text-decoration: none;background-color: #EEEEEE;color: #333333;">Go Back</a>');
      }
    });
  });
});
});
app.listen(3029);
