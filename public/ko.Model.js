var REST = function(url){
	var self = this;

	self.getAll = function(q){
		if (q){
			var params = ko.toJS(q)
			return $.get(url, params);
		} else {
			return $.get(url);			
		}
	}

	self.getOne = function(id, q){
		if (q)
			return $.get(url + '/' + id, q);
		else
			return $.get(url + '/' + id);		
	}

	self.create = function(data){
		return $.ajax({
                type: 'POST',
                url: url,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data)
            });;
	}

	self.update = function(id, data){
		return $.ajax({
			url : url + '/' + id,
			type : 'PUT',
            dataType: 'json',
            contentType: 'application/json',
			data : JSON.stringify(data)
		})
	}

	self.delete = function(id){
		return  $.ajax({
			url : url + '/' + id,
			type : 'DELETE'
		})
	}
}

ko.Model = function(options){
	return options;
}

var Model = function(data, options){

}

ko.extenders.model = function(target, options){

	var m = options;
	var params = options.getParams;
	if (options.type)
		m = options.type;

	target.m = m;

	var api = new REST(m.url);
	var autoUpdate = !!options.autoUpdate;

	var isObservableArray = ko.isObservable(target) && 'push' in target;


	var makeModel = target.makeModel = function(defaults, fields){
		var _fields = fields || {};
		var that = defaults || {};
		for(var key in _fields){
			var value = ko.utils.unwrapObservable(that[key]);
			that[key] = ko.observable(value|| _fields[key]);
		}

		var lastValue = ko.observable(ko.toJSON(that));
        var isDirty = that.isDirty = ko.computed({
            read: function () {
            	return ko.toJSON(that) !== lastValue();
            },
            write: function (newValue) {
                if (newValue) {
                    lastValue('');
                } else {
                    lastValue(ko.toJSON(that));
                }
            }
        });

        if (autoUpdate){
	        ko.computed(function () {   	    
				if (isDirty()) {
	                var data = ko.toJS(that);
					var id = ko.utils.unwrapObservable(data.id);
					api.update(id, data);

	                isDirty(false)
	            }
	        }).extend({throttle: 200 });
    	}

		return that;
	}

	if (isObservableArray){
		if (params){
			var track = ko.computed(function(){
				var q = ko.toJS(params)
				if (track) //not sent get request first time
					api.getAll(q).done(target);
			})
		}

		target.fetch = function(){
			return api.getAll(params).done(function(json){
				var values = json.map(function(d){
					return makeModel(d, m.fields);
				})
				target(values)
			});
		}

		var _remove = target.remove;
		target.remove = function(obj){
			return api.delete(obj.id).done(function(){
				_remove.apply(target, [obj])
			})
		}

		

		var _push = target.push;
		target.push = function(obj){
			data = ko.utils.unwrapObservable(obj);

			return api.create(ko.toJS(data)).done(function(json){
				_push.call(target, makeModel(json, m.fields));
				
				if (obj.makeModel) {
					var value = makeModel({}, obj.m.fields); 
					obj(value)

				};
			})
		}
	
		for(var key in m){
			if (key == 'url' || key == 'fields') continue;

			target[key] = function(){
				return m[key].apply(target, arguments);
			}
		}

	} else {
		
		target.isNew = ko.computed(function(){
			return !target() || !target().id;
		})

		target.fetch = function(){
			if (!target.isNew())
				return api.getOne(target().id, function(json){
					var obj = makeModel(json, m.fields); 
					target(obj);
				})
			else {
				var d = $.Deferred();
				
				d.resolve(target());

				return d.promise();
			}
		}
		
		if (m.fields){
			var obj = makeModel(target(), m.fields); 
			target(obj);	
		}

		target.save = function(){
			if (target.isNew()){
				var data = ko.toJS(target());
				return api.create(data);			
			} else {
				var data = ko.toJS(target());
				var id = ko.utils.unwrapObservable(target().id);
				return api.update(id, data);				
			}
		}	
	}

	

	return target;
}