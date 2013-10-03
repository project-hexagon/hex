window.addEventListener("DOMContentLoaded", function() {
	var canvas = document.getElementsByTagName("canvas")[0];
});

/**
 * Getter and setter for the first item in an Array.
 */
Object.defineProperty(Array.prototype, "first", {
	get: function first() {
		return this[0];
	},
	set: function first(value) {
		return this[0] = value;
	}
});

/**
 * Getter and setter for the last item in an Array.
 */
Object.defineProperty(Array.prototype, "last", {
	get: function last() {
		return this[this.length - 1];
	},
	set: function last(value) {
		return this[this.length - 1] = value;
	}
});

/**
 * Returns arg if it is an Array, otherwise returns [arg].
 * @param {Array|Object} arg - The Array to return or Object to wrap.
 */
Array.prototype.wrap = function(arg) {
	return arg instanceof Array ? arg : [arg];
}

/**
 * Iterates over the keys in obj and if the key is the obj's own property,
 * include it in the receiver.
 * @param {Object} obj - The object to include.
 */
Object.prototype.extend = function(obj) {
	for(key in obj) {
		if(obj.hasOwnProperty(key)) {
			this[key] = obj[key];
		}
	}
}

/**
 * Similar to extend except it applies Function.wrapSuper whenever the receiver
 * and obj have a Function as key.
 * @param {Object} obj - The object to include.
 */
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

/**
 * Returns a Function that, when called, changes the value of super on its
 * context, calls the receiver of wrapSuper, and reverts the value of super on
 * its context.
 * @param {Function} sup - The Function to be defined as this.super.
 */
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

/**
 * Returns a class with all but the last arguments merged into the last argument
 * as super classes. Methods present in the child and the parent have wrapSuper
 * called on them.
 * @param {...Object} [parent] - A super class.
 * @param {Object} obj - The attribute and methods definitions.
 */
var Class = function() {

	var args        = [].slice.call(arguments)
	  , obj         = args.last
	  , parents     = args.slice(0, -1)
	  , constructor;

	if(obj.initialize) {
		constructor = function() {
			obj.initialize.apply(this, arguments);
		};
	} else {
		constructor = function() {};
	}

	constructor.prototype = obj;
	constructor.constructor = constructor;
	parents.forEach(function(parent) {
		constructor.mixin(parent);
		constructor.prototype.mixin(parent.prototype);
		constructor.constructor = constructor.constructor.wrapSuper(parent.constructor);
	});

	return constructor;

}
