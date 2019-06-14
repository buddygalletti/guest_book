const fs = require('fs');
const path = require('path');
const http = require('http');
const qs = require('querystring');
const guestsFile = path.join(__dirname, 'guests.txt');

const server = http.createServer((req, res) => {
    const { method, url } = req;
    const guests = [];
    fs.readFile(guestsFile, 'utf8', function(err, contents) {
        const guestNames = contents.split('|');
        console.log(guestNames);
        guestNames.forEach(guest => guests.push(guest));
    });
    req.on('data', () => {
        const html = `
            <html>
                <body>
                    <p>Hey there</p>
                </body>
            </html>
        `
        res.write(html);
        res.end();
    });

});


server.listen(3000);