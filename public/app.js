
var keys = function(d){
	var result = [];
	for(var key in d){
		result.push(key)
	}

	return result;
}

var sample = {
	'Todo' : TodoForm,
	'Fields' : FieldsList,
	'Members' : Members,
	'TPod' : TPod
}
var app = {
	samples : keys(sample), 
	show : function(title){
		var VM = sample[title];
		var view = new VM();
		app.content(view);
		app.content().activate();
	},
	content : ko.observable(null)
}


$(function(){
	ko.applyBindings(app);
	app.show('Todo');
});
