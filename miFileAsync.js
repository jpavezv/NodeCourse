//Using Promise, que es asincrónico.
const fs = require('fs');

fs.readFile('data.txt','utf-8',(err,data) => {
    fs.writeFileSync('dataOut2,txt',data);
    console.log(data);
});
console.log('Reading File..')
