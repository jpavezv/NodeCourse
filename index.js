const http = require('node:http')
const url = require('node:url')
/////////////////////////////////
// SERVER
const server = http.createServer((req,res) => {
  console.log(req.url);
  res.end('Hello World from the Server');
});
server.listen(8000, () => {
    console.log('Listening to request on port 8000');
});