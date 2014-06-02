var ObjectType = ko.Model({
	url : '/api/types'
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
									type : self.objectType
								}
							}
						});

	
	self.newField = ko.observable()
						.extend({
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


var Todo = ko.Model({
	url : '/api/todo',
	fields : {
		title : '',
		isCompeted : false
	}
})

var TodoForm = function(){
	var self = this;

	self.todos = ko.observableArray([])
				   .extend({
				   		model : {
				   			type : Todo,
				   			autoUpdate : true
				   		}
				   });
    self.newItem = ko.observable()
    				 .extend({
    				 	model : Todo
    				 })

    self.remove = function(todo){
    	self.todos.remove(todo);
    }

    self.create = function(){
    	self.todos.push(self.newItem);
    }

	self.showMode = ko.observable('all');
    self.filteredTodos = ko.computed(function(){
    	switch (self.showMode()) {
			case 'active':
				return self.todos().filter(function (todo) {
					return !todo.isCompeted();
				});
			case 'completed':
				return self.todos().filter(function (todo) {
					return todo.isCompeted();
				});
			default:
				return self.todos();
		}
    })

	self.completedCount = ko.computed(function () {
		return self.todos().filter(function (todo) {
			return todo.isCompeted();
		}).length;
	});


	self.activate = function(){
		return self.todos.fetch();
	}

	self.template = 'todo-list';
}

var app = {
	showTodo : function(){
		var view = new TodoForm();
		app.content(view);
		view.activate();
	},
	showFields : function(){
		var view = new FieldsList();
		app.content(view);
		view.activate();
	},	
	content : ko.observable(null)
}




$(function(){
	ko.applyBindings(app);
	app.showTodo();
});
