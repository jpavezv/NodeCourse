const http = require('node:http')
const url = require ('url')
/////////////////////////////////
// SERVER with Routing
const server = http.createServer((req,res) => {
  const pathName = req.url;
  
  const {query , pathname} = url.parse(req.url,true)
  console.log(query)
  console.log(pathname)
  if (pathName == '/') {
    res.writeHead(200,{'Content-type':'text/html'})*
    res.sendFile('record.html')
    res.end('<h1>Server Responding!</h1>') 
  }
  else if (pathName=='/product'){
  /*  res.writeHead(100,{
      'Content-type':'text/html',
      'my-own-header':'simple-server'
    })*/
    res.end('<h1>Producto!</h1>')
  }
  else {
    res.writeHead(404,{
      'Content-type':'text/html',
      'my-own-header':'simple-server'
    })
    res.end('<h1>Page not Found</h1>')
  }
});
server.listen(8000, () => {
    console.log('Listening to request on port 8000');
});