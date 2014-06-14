var sample = {
	'Todo' : TodoForm,
	'Fields' : FieldsList,
	'Members' : Members,
	'TPod' : TPod,
	'Checks' : CheckList
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
	app.show('Checks');
});
