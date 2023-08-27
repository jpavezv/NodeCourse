//Using Promise, que es asincrónico.
const fs = require('fs');

fs.readFile('data.txt','utf-8',(err,data1) => {
    if (err) return console.log('Error:!')
    fs.readFile(`${data1}.txt`,'utf-8',(err,data2) =>{
      console.log(data2);
      fs.writeFile('final.txt',`${data2}\n${data1}\n`, 'utf-8',err=>{
        console.log('Archivo Actualizado!!');
      })
    });
});
console.log('Reading File..')
