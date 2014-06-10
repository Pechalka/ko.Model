
var Member = ko.Model({
	url : '/api/members',
	fields : {
		firstName : '',
		lastName : '',
		email : '',
		relationship : 'Son'
	},
	init : function(){
        var self = this;
		self.showEmail = ko.computed(function(){
	        return self.relationship() != 'Son' && 
	               self.relationship() != 'Daughter' ;
		})
        
        self.firstName.extend({
             required: true,
             maxLength: 30
        })
        
        self.lastName.extend({
             required: true,
             maxLength: 30
        })

		self.email.extend({
            email: {
                message: 'please use valid email address'
                , onlyIf : self.showEmail
            }
        });

	}
})



var Members = function() {
	var self = this;

	self.members = ko.observableArray([])
					 .extend({
					 	model : Member
					 })

	self.relationships = ['jena', 'Son', 'Daughter'];


	
	self.selectedMember = ko.observable()
						    .extend({
						    	model : Member
						    });

    self.save = function(){
    	self.selectedMember.save()
                           .then(self.members.fetch)
                           .then(self.selectedMember.clean);
    }

    self.remove = function(member){
        self.members.remove(member);
    }

    self.edit = function(member){
    	self.selectedMember.fetch(member.id);
    }

	self.activate = function(){
        self.members.fetch();
	}

	self.template = 'members-template';
}

