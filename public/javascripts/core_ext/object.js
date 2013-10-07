/**
 * Iterates over the keys in obj and if the key is the obj's own property,
 * include it in the receiver.
 * @param {Object} obj - The object to include.
 */
Object.prototype.extend = function(obj) {
	Object.keys(obj).forEach(function(key) {
		this[key] = obj[key];
	}, this);
	return this;
}

/**
 * Similar to extend except it applies Function.wrapSuper whenever the receiver
 * and obj have a Function as key.
 * @param {Object} obj - The object to include.
 */
Object.prototype.mixin = function(obj) {
	Object.keys(obj).forEach(function(key) {
		var child, parent;
		if(child = Object.getOwnPropertyDescriptor(this, key)) {
			if(parent = Object.getOwnPropertyDescriptor(obj, key)) {
				if(parent.get && child.get) {
					child.get = child.get.wrapSuper(parent.get);
				}
				if(parent.set && parent.set) {
					child.set = child.set.wrapSuper(parent.set);
				}
			} else if(child.get) {
				child.get = child.get.wrapSuper(obj[key]);
			}
			Object.defineProperty(this, key, child);
		} else if((child = this[key]) && child && child.wrapSuper) {
			this[key] = child.wrapSuper(obj[key]);
		}
	}, this);
	return this;
}