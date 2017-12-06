// To execute this script type the following int terminal:
// node/nodejs finder.js <file name> <file path>

var Finder = require('fs-finder');
var process = require('process');
var colors = require('colors/safe');

var myArgs = process.argv.slice(2);
if (myArgs.length != 2 ) {
    console.log("Error: Invalid number of arguments");
} else {
    console.log(colors.green("Process ID: ", process.pid));
    files = Finder.from(myArgs[1]).findFiles(myArgs[0]);
    for (var i in files) {
        console.log(colors.blue(files[i]));
    }
    console.log(colors.green("Script runtime: ", process.uptime()));
    console.log(colors.green("Process memory usage", process.memoryUsage().heapUsed));
}
