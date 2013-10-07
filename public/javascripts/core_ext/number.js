Object.defineProperty(Number.prototype, "even", {
	enumerable: false,
	configurable: false,
	get: function even() {
		return this % 2 == 0;
	}
});

Object.defineProperty(Number.prototype, "odd", {
	enumerable: false,
	configurable: false,
	get: function odd() {
		return this % 2 == 1;
	}
});