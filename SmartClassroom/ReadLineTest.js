var SerialPort = require("serialport");
const port = new SerialPort('/dev/ttyACM0', { autoOpen: true ,baudRate: 9600});
const Readline = SerialPort.parsers.Readline;
  const parser = port.pipe(new Readline());
  parser.on('data', function(data){
    var dat = data.toString();
    var trdat = dat.replace(/[\n\t\r]/g,"");
    console.log('..'+dat+'..');
  });
