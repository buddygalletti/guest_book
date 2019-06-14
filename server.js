const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const _err = (res)=> {
  res.setStatus = 500;
  res.write(err.toString());
  res.end();
};

const _get = (req, res)=> {
    fs.readFile('guests.txt', (err, data)=> {
      if(err){
        return _err(res);
      }
      const names = data.toString().split('|').map(name => name.trim()).filter(name => name);
      res.write(`
        <html>
          <body>
            <h1>Guest Book</h1>
            <ul>
              ${ names.map( name => `<li>${ name }</li>`).join('')}
            </ul>
            <form method='POST'>
              <input name='guest' />
              <button>Sign In</button>
            </form>
          </body>
        </html>
        `);
      res.end();
    });
};

const _post = (req, res)=> {
  const _body = [];
  req.on('data', (chunk)=> {
    _body.push(chunk);
  });
  req.on('end', ()=> {
    body = qs.parse(_body.toString());
    fs.appendFile('guests.txt', `${body.guest}|`, (err)=> {
      if(err){
        res.setStatus = 500;
        res.write(err.toString());
        return res.end();
      }
      res.statusCode = 301;
      res.setHeader('location', '/');
      res.end();

    });
  });
}

const server = http.createServer((req, res)=> {
  if(req.method === 'GET'){
    _get(req, res);
  }
  else {
    _post(req, res);
  }

}); 

server.listen(process.env.PORT || 3000);



// const fs = require('fs');
// const path = require('path');
// const http = require('http');
// const qs = require('querystring');
// const guestsFile = path.join(__dirname, 'guests.txt');

// const server = http.createServer((req, res) => {
//     const { method, url } = req;
//     const guests = [];
//     fs.readFile(guestsFile, 'utf8', function(err, contents) {
//         const guestNames = contents.split('|');
//         console.log(guestNames);
//         guestNames.forEach(guest => guests.push(guest));
//     });
//     req.on('data', () => {
//         const html = `
//             <html>
//                 <body>
//                     <p>Hey there</p>
//                 </body>
//             </html>
//         `
//         res.write(html);
//         res.end();
//     });

// });


// server.listen(3000);