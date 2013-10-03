window.addEventListener("DOMContentLoaded", function() {
	var canvas = document.getElementsByTagName("canvas")[0];
});

Object.defineProperty(Array.prototype, "first", {
	get: function first() {
		return this[0];
	},
	set: function first(value) {
		return this[0] = value;
	}
});

Object.defineProperty(Array.prototype, "last", {
	get: function last() {
		return this[this.length - 1];
	},
	set: function last(value) {
		return this[this.length - 1] = value;
	}
});

Array.prototype.wrap = function(arg) {
	return arg instanceof Array ? arg : [arg];
}

Object.prototype.extend = function() {
	var length = arguments.length
	  , i      = 0
	  , key;
	for(; i < length; i++) {
		for(key in arguments[i]) {
			if(arguments[i].hasOwnProperty(key)) {
				this[key] = arguments[i][key];
			}
		}
	}
}

Object.prototype.mixin = function(obj) {
	for(var key in obj) {
		if(obj.hasOwnProperty(key)) {
			var newValue = obj[key]
			  , oldValue = this[key];
			if(oldValue instanceof Function && newValue instanceof Function) {
				newValue = oldValue.wrapSuper(newValue);
			}
			this[key] = newValue;
		}
	}
}

Function.prototype.wrapSuper = function(sup) {
	var func = this;
	return function() {
		var oldSuper = this.super
		  , returnValue;
		this.super = sup;
		returnValue = func.apply(this, arguments);
		this.super = oldSuper;
		return returnValue;
	}
}

var Class = function() {

	var args        = [].slice.call(arguments)
	  , obj         = args.last
	  , parents     = args.slice(0, -1)
	  , constructor = obj.initialize || function() {};

	constructor.prototype = obj;
	parents.forEach(function(obj) {
		constructor.mixin(obj);
		constructor.prototype.mixin(obj.prototype);
	});
	constructor.constructor = constructor;

	return constructor;

}

var Agent = Class({
	toString: function() {
		return "Agent";
	}
});

var Tower = Class(Agent, {
	toString: function() {
		return this.super() + "::Tower";
	}
});

console.log(new Tower().toString());

