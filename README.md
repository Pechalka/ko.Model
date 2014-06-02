ko.Model
========

    var Todo = ko.Model({
        url : '/api/todo',
        fields : {
            title : '',
            isCompeted : false
        }
    })

    var TodoList = function(){
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
        
        self.activate = function(){
           return self.todos.fetch();
        }
     }
