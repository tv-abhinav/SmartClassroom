var SerialPort = require("serialport");
var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
//const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/ttyACM0', { autoOpen: true ,baudRate: 9600});
const Readline = SerialPort.parsers.Readline;
var url = "mongodb://localhost:27017/Students";
var d = new Date();//year, month, day, hours, minutes, seconds, milliseconds
function connectDB(callback){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
      callback(db);
  });
}

function createCollection(db,callback){
  db.createCollection("Attendance", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    callback(db);
  });
}
function prog(db)
{
  var obj = {};
  console.log('opened port');
  const parser = port.pipe(new Readline());
  var tmp = '';
    parser.on('data', function(data){
    var dat = data.toString();
    tmp = dat.replace(/[\n\t\r]/g,"");
    app.get('/reqid',function(request,response){
      response.write('Your ID is: '+tmp);
      response.end();

    });
    console.log(tmp);
    db.collection("Studentinfo").find({"UID":tmp}).toArray(function(err, result) {
      if (err) {console.log('UID does not exist');}
      if (result.length==0)
      {console.log("student info not found!");}
      else {
      var rno = result[0].reg_no;
      obj={};
      obj.Reg_no = rno;
      obj.DandT = {};
      obj.DandT.Day = d.getDate();
      obj.DandT.Month = d.getMonth()+1;
      obj.DandT.Year = d.getFullYear();
      obj.DandT.Hours = d.getHours()+1;
      obj.DandT.Minutes = d.getMinutes()+1;
      obj.DandT.Seconds = d.getSeconds()+1;
      db.collection("Attendance").find({'Reg_no': obj.Reg_no,'DandT.Day':obj.DandT.Day}).toArray(function(err, result) {
        if (err) {console.log("Error in Attendance");}
        if (result.length == 0)
        {
          console.log(obj);
        db.collection('Attendance').insertOne(obj, function(err,res){
          if (err) throw err;
          console.log('Data inserted');
        //  db.collection("Studentinfo").createIndex({ "id": 1 }, { unique: true });
      });
    }
        else {
          console.log("Already exist");
        }
        });
      }
  });
  });
}
port.on('error', function(err) {
  console.log('Error: ', err.message);
});

connectDB(function(db){
  createCollection(db,function(db){
    prog(db);
});
});
app.listen(3050);
