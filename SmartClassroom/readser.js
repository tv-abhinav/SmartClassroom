var MongoClient = require('mongodb').MongoClient;
var SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/ttyACM0');
const parser = port.pipe(new Readline());
var url = "mongodb://192.168.2.9:27017/Students";
//var UIDstr = buffer.toString("utf-8", 0, 8);

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

function mainp(db,callback)
{
    console.log("main called");
parser.on('data', function(data){
  console.log(data);
var tmp =  db.collection("Studentinfo").find({UID : data});
});
callback(db,tmp);
}
function matchrec(db,tmp){
  db.collection("Attendance").insertOne(tmp, function(err,res){
    if (err) throw err;
    console.log(result);
  //  db.collection("Studentinfo").createIndex({ "id": 1 }, { unique: true });
});
}
  console.log(result);
  db.close();
}

connectDB(function(db){createCollection(db,function(db){mainp(db,function(db,tmp){matchrec(db,tmp);});});});




/*port.on('open', function () {
  console.log('open');
  port.on('data', function(data) {
    console.log(data);
  });
});*/
