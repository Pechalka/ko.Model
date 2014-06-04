var ObjectType = ko.Model({
	url : '/api/types',
	fields : {
		title : ''
	}
})

var Field = ko.Model({
	url : '/api/fields',
	fields : {
		title : '',
		type : 'date'
	}
})

var FieldsList = function(){
	var self = this;

	self.types = ['string', 'date', 'digets'];



	self.objectTypes = 	ko.observableArray([])
						.extend({
							model : ObjectType
						});

	self.objectType = ko.observable();

	self.fields = ko.observableArray([])
						.extend({
							model : {
								type : Field,
								getParams : {
									object : self.objectType
								}
							}
						});

	
	self.newField = ko.observable({
		object : self.objectType
	}).extend({
				model : Field
			})


	self.activate = function(){
		self.objectTypes.fetch()
			.then(self.fields.fetch)
	}

	self.addField = function(){
		self.fields.push(self.newField);
	}

	self.removeField = function(field){
		self.fields.remove(field)
	}

	self.template = 'list-field';
}

