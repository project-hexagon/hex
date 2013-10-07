var Point = Class({
	initialize: function(x, y) {
		this.x = x;
		this.y = y;
	},
	distance: function(point) {
		return Math.sqrt(
			Math.pow(point.x - this.x, 2) +
			Math.pow(point.y - this.y, 2)
		);
	}
});