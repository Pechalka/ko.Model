
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




// var Member = ko.Model({
// 	url : '/api/members',
	

// 	//init
// 	//initialize 
// 	// map : function(self, data){
//  //        self.firstName = ko.observable(data.firstName)
//  //            .extend({
//  //                required: true,
//  //                maxLength: 30
//  //            });
// 	// }

// 	, showEmail : ko.computed(function(){
//         return this.relationship() != 'Son' && 
//                this.relationship() != 'Daughter' ;
// 	})

// 	, fields : {
// 		firstName : { 
// 			default : '', 
// 			extend : {
// 				required: true,
// 				maxLength: 30
// 			}
// 		},
// 		relationship : ''
// 		lastName : '',
// 		email : {
// 			extend : {
//                 email: {
//                     message: 'please use valid email address'
//                     , onlyIf : this.showEmail
//                 },
// 			}
// 		}
// 	},
// })

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

    self.edit = function(member){
    	self.selectedMember.fetch(member.id);
    }

	self.activate = function(){
        self.members.fetch();
	}
	self.template = 'members-template';
}



        // self.relationship = ko.observable(data.relationship);

        // self.firstName = ko.observable(data.firstName)
        //     .extend({
        //         required: true,
        //         maxLength: 30
        //     });
        // self.lastName = ko.observable(data.lastName)
        //     .extend({
        //         required: true,
        //         maxLength: 30
        //     });

        // self.day = ko.observable('');
        // self.month = ko.observable('');
        // self.year = ko.observable('');

        // self.dateOfBirth = ko.observable(data.birthDate)
        //     .extend({
        //         date_parts: {
        //             day: self.day,
        //             month: self.month,
        //             year: self.year
        //         }
        //     });
        // self.address = ko.observable(data.address);
        // self.telephoneNumber = ko.observable(data.tel);
        // self.occupation = ko.observable(data.occupation);
        // self.accountHolder = ko.observable(data.accountHolder);
        // self.town = ko.observable(data.town);

        // self.dateInvalid = ko.observable(false);

        // self.showEmail = ko.computed(function(){
        //     return self.relationship() != 'Son' && 
        //            self.relationship() != 'Daughter' ;
        // })

        // self.email = ko.observable(data.email)
        //     .extend({
        //         required: {
        //             onlyIf : self.showEmail
        //         },
        //         email: {
        //             message: 'please use valid email address'
        //             , onlyIf : self.showEmail
        //         },
        //         minLength: {
        //             params : 2 
        //             , onlyIf : self.showEmail
        //         },
        //         maxLength: {
        //             params : 80 
        //             , onlyIf : self.showEmail
        //         },
        //     });

        // self.emailRepeat = ko.observable(data.email)
        //     .extend({
        //         required: {
        //             onlyIf : self.showEmail
        //         },
        //         email: {
        //             message: 'please use valid email address'
        //             , onlyIf : self.showEmail
        //         },
        //         minLength: {
        //             params : 2
        //             , onlyIf : self.showEmail
        //         },
        //         maxLength: {
        //             params : 80 
        //             , onlyIf : self.showEmail
        //         },
        //         equal: {
        //             params : self.email
        //             , onlyIf : self.showEmail
        //         }
        //     });

        // self.tempUrlMemberAvatar = ko.observable();