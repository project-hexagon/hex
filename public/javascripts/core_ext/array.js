/**
 * Getter and setter for the first item in an Array.
 */
Object.defineProperty(Array.prototype, "first", {
	enumerable: false,
	configurable: false,
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
	enumerable: false,
	configurable: false,
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