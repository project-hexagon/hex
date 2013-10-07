var Tile = Class({
	initialize: function(position) {
		this.position = position;
	},
	draw: function(context) {
		var x = this.position.x
		  , y = this.position.y;
		context.beginPath();
		context.moveTo(x - 4, y + 8);
		context.lineTo(x + 4, y + 8);
		context.lineTo(x + 9, y);
		context.lineTo(x + 4, y - 8);
		context.lineTo(x - 4, y - 8);
		context.lineTo(x - 9, y);
		context.closePath();
		context.strokeStyle = "#000";
		context.stroke();
	}
});