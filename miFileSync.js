//Using Promise, que es asincrónico.
const fs = require('fs');

const textIn = fs.readFileSync('data.txt','utf-8')
console.log(textIn)

const textOut = 'Linea 3: Esta línea la puse ejecutando el programa\n';
fs.writeFileSync('dataOut.txt',textOut);
console.log ('File Written!');

