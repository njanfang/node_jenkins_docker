var express = require('express');
var app = express();
app.get('/will', function (req, res) {
    res.send('{ "response": "Hello World" }');
});
app.get('/ready', function (req, res) {
    res.send('{ "response": "It works!" }');
});
app.listen(process.env.PORT || 3100);
module.exports = app;