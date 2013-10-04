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