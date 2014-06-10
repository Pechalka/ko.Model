var _ = require('lodash');

var makeREST = function(app, url, default_items){
	var collection = [];
	if (default_items){
		collection = collection.concat(default_items)
	}
	console.log(collection);

	app.get(url, function(req, res){

		delete req.query;

		if (req.query && Object.keys(req.query).length > 0){
			var results = _.filter(collection, req.query);
			res.json(results);
		} else
			res.json(collection);
	})

	app.get(url + '/:id', function(req, res){
		var id = req.params.id;

		var index = -1;

		for (var i = 0; i < collection.length; i++) {
			if (collection[i].id == id){
				index = i;
				break;
			}
		};
		if (index != -1){
			res.json(collection[index]);
		} else
			res.send(404);
	})

	app.post(url, function(req, res){
		var data = req.body;
		var max = 0;
		collection.forEach(function(f){
			if (f.id > max) max = f.id;
		})

		data.id = ++max; 
		collection.push(data);
		res.json(data);
	});

	app.delete(url + '/:id', function(req, res){
		var id = req.params.id;

		var index = -1;

		for (var i = 0; i < collection.length; i++) {
			if (collection[i].id == id){
				index = i;
				break;
			}
		};
		if (index != -1){
			collection.splice(index, 1);
		}

		res.json('ok');
	});


	app.put(url + '/:id', function(req, res){
		var id = req.params.id;

		var index = -1;

		for (var i = 0; i < collection.length; i++) {
			if (collection[i].id == id){
				index = i;
				break;
			}
		};
		if (index != -1){
			collection[index] = req.body;
			collection[index].id = id;
		}

		res.json('ok');
	});	
}

module.exports = makeREST;