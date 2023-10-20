const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 7000;

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.get('/api/v1', (req, res) => {
    res.json({ 'message': 'UI Server ok' });
});



app.post('/', (req, res) => {
    // const caller = req.body.caller;
    let ips = (
        req.headers['cf-connecting-ip'] ||
        req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress || ''
    ).split(',');

    console.log(ips)

    const clientIP = ips[0].trim();

    console.log(`Received a request from ${clientIP}`);
    // You can store the caller information or perform any required action here
    res.send('UI Server has received the request from: ' + clientIP);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
