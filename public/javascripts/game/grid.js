var Grid = Class({
	initialize: function(size) {
		this.size = size;
		this.canvas = new Canvas();
		this.canvas.element.addEventListener("mousemove", this.highlight.bind(this));
		this.context = this.canvas.context;
		this._grid = new Array(this.size.x);
		for(var y = 0; y < this.size.x; y++) {
			var row = this._grid[y] = new Array(this.size.y);
			for(var x = 0; x < this.size.y; x++) {
				var xCoord = x * Tile.gridWidth
				  , yCoord = y * Tile.gridHeight;
				if(x.even) yCoord += Tile.gridHeight / 2;
				row[x] = new Tile(new Vector(xCoord, yCoord));
			}
		}
		window.requestAnimationFrame(this.draw.bind(this));
	},
	draw: function() {
		this.context.clearRect(0, 0, this.canvas.element.width, this.canvas.element.height);
		this.context.beginPath();
		this._grid.forEach(function(row) {
			row.forEach(function(tile) {
				tile.draw(this.context);
			}, this);
		}, this);
		this.context.stroke();
		this.context.beginPath();
		this.context.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
		this.context.fillStyle = 'red';
		this.context.fill();
		this.context.beginPath();
		this.context.arc(this.gX * Tile.gridWidth, this.gY * Tile.gridHeight + (this.gX && this.gX.even ? Tile.gridHeight / 2 : 0), 5, 0, Math.PI * 2, false);
		this.context.fillStyle = 'blue';
		this.context.fill();
		window.requestAnimationFrame(this.draw.bind(this));
	},
	highlight: function(event) {
		this.x = event.pageX;
		this.y = event.pageY;
		var gX = Math.floor((event.pageX + Tile.gridWidth / 3) / Tile.gridWidth);
		var gY = Math.floor((event.pageY + (this.gX && this.gX.odd ? Tile.gridHeight / 2 : 0)) / Tile.gridHeight);
		var aX = gX * Tile.gridWidth;
		var aY = gY * Tile.gridHeight + (this.gX && this.gX.even ? Tile.gridHeight / 2 : 0);
		var dX = event.pageX - aX;
		var dY = event.pageY - aY;
		this.gX = gX;
		this.gY = gY;
	}
});