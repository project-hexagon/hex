/**
 * Returns a Function that, when called, changes the value of super on its
 * context, calls the receiver of wrapSuper, and reverts the value of super on
 * its context.
 * @param {Object} sup - The Object to be defined as this.super.
 */
Function.prototype.wrapSuper = function(sup) {
	var func = this;
	return function() {
		var oldSuper = this.super
		  , returnValue;
		this.super = sup;
		try {
			returnValue = func.apply(this, arguments);
		} finally {
			this.super = oldSuper;
		}
		return returnValue;
	}
}