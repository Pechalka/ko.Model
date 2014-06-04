
var Model = function(options){
	return function(data){
		var self = this;

		for(var key in options.fields){
			var value = options.fields[key];
			self[key] = ko.observable(data[key] || value);
		}
		
		if (options.init)
			options.init.apply(self, data)
	}
}

var Check = Model({
	url : '/api/check',
	fields : {
		category : 'Home',
		member : 'Vasa',
		title : 'water',
		perMonth : 20,
		potCategory : 'Personal Pot'
	},
	init : function(data){
		console.log(this.category())
	}
})

var TPod = function() {
	var self = this;

	var c = new Check({
	})

	self.model = ko.observable(c);


	self.activate = function(){

	}

	self.template = 'tpod';
}