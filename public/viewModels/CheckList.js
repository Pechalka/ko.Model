 var frequencyMap = {
    'day': 30,
    'week': 4,
    'fortnightly': 2,
    'fourweekly': 1,
    'month': 1,
    'quarterly': 1 / 3,
    'halfyearly': 1 / 6,
    'tenmonthly': 1 / 10,
    'year': 1 / 12
};

var Check = ko.Model({
	url : '/api/check',
	fields : {
		title : '',
		frequency : 'month',
		perMonth : 0
	},
	init : function(data){
		var self = this;
		self.value = ko.observable();

		self.isValid = ko.computed(function () {
			 return !isNaN(self.value());
        });

        self.perMonth = ko.computed({
            read: function () {
                if (!(self.isValid() && self.value() && self.frequency())) {
                    return null;
                }
                return frequencyMap[self.frequency()] * self.value();
            },
            write: function (newValue) {
                if (newValue) {
                    var perFrequency = newValue / frequencyMap[self.frequency()];
                    self.value(Math.round(perFrequency * 100) / 100);
                } else {
                    self.value(null);
                }
            }
        });
        self.perMonth(data.perMonth);
	}
})

var CheckList = function() {
	var self = this;
	self.items = ko.observableArray([])
				   .extend({
				   		model : {
				   			type : Check,
				   			autoUpdate : true
				   		}
				   })

	self.frequencyList = keys(frequencyMap);

	self.activate = function(){
		self.items.fetch();
	}

	self.hasError = ko.computed(function(){
		var incorectItem = ko.utils.arrayFirst(self.items(), function(i){
			return !i.isValid()
		})
		return incorectItem!=null;
	})

	self.total = ko.computed(function(){
		var sum = 0;
		ko.utils.arrayForEach(self.items(), function(i){
			sum += +(i.perMonth()) || 0;
		})
		return sum;
	})

	self.template = 'check-list';
}