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

window.addEventListener("DOMContentLoaded", function() {
	var canvas  = document.getElementsByTagName("canvas")[0]
	  , context = canvas.getContext("2d")
	  , tile    = new Tile(new Point(100, 100))
	  , ratio   = window.devicePixelRatio;
	if(ratio) {
		canvas.width = window.innerWidth * ratio;
		canvas.height = window.innerHeight * ratio;
		canvas.style.width = window.innerWidth + "px";
		canvas.style.height = window.innerHeight + "px";
		context.scale(ratio, ratio);
	} else {
		canvas.width = canvas.style.width = window.innerWidth;
		canvas.height = canvas.style.height = window.innerHeight;
	}
	canvas.addEventListener("mousemove", function(event) {
		tile.position.x = event.pageX;
		tile.position.y = event.pageY;
		context.clearRect(0, 0, canvas.width, canvas.height);
		tile.draw(context);
	});
	tile.draw(context);
});
