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