var Board = Class({
	initialize: function() {
		this.canvas = document.getElementsByTagName("canvas")[0];
		this.context = this.canvas.getContext("2d");
		if(window.devicePixelRatio) {
			this.canvas.width = window.innerWidth * window.devicePixelRatio;
			this.canvas.height = window.innerHeight * window.devicePixelRatio;
			this.canvas.style.width = window.innerWidth;
			this.canvas.style.height = window.innerHeight;
			this.context.scale(window.devicePixelRatio, window.devicePixelRatio);
		} else {
			this.canvas.width = canvas.style.width = window.innerWidth;
			this.canvas.height = canvas.style.height = window.innerHeight;
		}
		this._board = new Array(10);
		for(var y = 0; y < 10; y++) {
			var row    = this._board[y] = new Array(10)
			  , yCoord = y * 16;
			for(var x = 0; x < 10; x++) {
				var xCoord = x * 16;
				if(y.even) xCoord += 8;
				row[x] = new Tile(new Vector(xCoord, yCoord));
				row[x].draw(this.context);
			}
		}
	}
});