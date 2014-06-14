


var Check = ko.Model({
	url : '/api/check',
	fields : {
		category : 'Home',
		member : 'Vasa',
		title : 'water',
		perMonth : 20,
		potCategory : 'Personal Pot'
	},
	init : function(data, id){
		console.log(this.category())
		console.log(data);
		console.log(id);
	}
})

var TPod = function() {
	var self = this;

	var c = new Check({
		category : 'name'
	}, 2)

	self.model = ko.observable(c);


	self.activate = function(){

	}

	self.template = 'tpod';
}