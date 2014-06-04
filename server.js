var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var makeREST = require('./makeREST');

app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));




makeREST(app, '/api/types', [
	{ title : 'User', id : 1 },
	{ title : 'Check', id : 2 }	
]);

makeREST(app, '/api/fields');
makeREST(app, '/api/todo');
makeREST(app, '/api/check');

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});