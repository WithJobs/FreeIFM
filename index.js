var net = require("net");

/*var ip1;
var port1;*/
var IFM_Camera = new net.Socket();


var conveyormoves = true;

function makeReq(ticket, message) {
let length = "" + (message.length + 6);
while (length.length < 9) {
length = "0" + length;
}
IFM_Camera.write(ticket + "L" + length + "\r\n" + ticket + message + "\r\n");
}

var fs = require('fs');
var logger = fs.createWriteStream('Base of Data.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
});

const prompt = require('prompt-sync')();
const ip1 = prompt('Enter ip1: ');
const port1 = prompt('Enter port1: ');
let date_ob = new Date();
//logger.write('       '+date_ob.getDate()+' '+date_ob.getMonth()+' '+date_ob.getFullYear()+'\n');
logger.write('\n');
IFM_Camera.connect(port1, ip1, function() {
console.log("Camera#1 connected");
});
IFM_Camera.on("data", function(data) {
console.log("Received: " + data);
logger.write('Item number: '+' Data: '+data+'\n');

});
IFM_Camera.on("error", function(err) {
console.log(err);
});
IFM_Camera.on("close", function() {
console.log("Connection closed");
});
