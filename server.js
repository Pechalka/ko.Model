var express = require('express');
var app = express();
var path = require('path');
var http = require('http');

app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/types', function(req, res){
	res.json(['User', 'Check'])
})




var fields_items = [
	{ id : 1,  title : 'email', type : 'string', object : 'User' },
	{ id : 2, title : 'birthday', type : 'date', object : 'User' },
	{ id : 2, title : 'Pay date', type : 'date', object : 'Check' }
];

app.get('/api/fields', function(req, res){
	if (req.query && req.query.type){
		var filted = fields_items.filter(function(f){
			return f.object == req.query.type;
		})
		res.json(filted);
	} else
	res.json(fields_items)
})

app.post('/api/fields', function(req, res){
	var data = req.body;
	var max = 0;
	fields_items.forEach(function(f){
		if (f.id > max) max = f.id;
	})

	data.id = ++max; 
	fields_items.push(data);
	res.json(data);
});


app.delete('/api/fields/:id', function(req, res){
	var id = req.params.id;

	var index = -1;

	for (var i = 0; i < fields_items.length; i++) {
		if (fields_items[i].id == id){
			index = i;
			break;
		}
	};
	if (index != -1){
		fields_items.splice(index, 1);
	}

	res.json('ok');
});
// var create = function(data){
// 	var d = $.Deferred();

// 	var max = 0;
// 	ko.utils.arrayForEach(fields_items, function(f){
// 		if (f.id > max) max = f.id;
// 	})

// 	data.id = ++max; 
// 	d.resolve(data);

// 	return d.promise();
// }

var todos = [
	{ id : 1,  title : 'create lib for REST access', isCompeted : false }
]

app.get('/api/todo', function(req, res){
	res.json(todos);
})

app.post('/api/todo', function(req, res){
	console.log(req.body);

	var data = req.body;
	var max = 0;
	todos.forEach(function(f){
		if (f.id > max) max = f.id;
	})

	data.id = ++max; 
	todos.push(data);
	res.json(data);
});

app.delete('/api/todo/:id', function(req, res){
	var id = req.params.id;

	var index = -1;

	for (var i = 0; i < todos.length; i++) {
		if (todos[i].id == id){
			index = i;
			break;
		}
	};
	if (index != -1){
		todos.splice(index, 1);
	}

	res.json('ok');
});


app.put('/api/todo/:id', function(req, res){
	var id = req.params.id;

	var index = -1;

	for (var i = 0; i < todos.length; i++) {
		if (todos[i].id == id){
			index = i;
			break;
		}
	};
	if (index != -1){
		todos[index] = req.body;
	}

	res.json('ok');
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});