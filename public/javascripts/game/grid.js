var Grid = Class({
	initialize: function(size) {
		this.size = size;
		this.canvas = new Canvas();
		this.canvas.element.addEventListener("mousemove", function(event) {
			var x = event.pageX
			  , y = event.pageY;
			x = (x - 30) / 60;

			t1 = y / 50, t2 = Math.floor(x + t1);
			r = Math.floor((Math.floor(t1 - x) + t2) / 3); 
			q = Math.floor((Math.floor(2 * x + 1) + t2) / 3) - r;

			console.log(q, r);
			this._grid[r] && (this._grid[r][q].draw(this.context, true));
		}.bind(this));
		this.context = this.canvas.context;
		this._grid = new Array(this.size.x);
		for(var y = 0; y < this.size.x; y++) {
			var row = this._grid[y] = new Array(this.size.y);
			for(var x = 0; x < this.size.y; x++) {
				var xCoord = x * Tile.gridWidth
				  , yCoord = y * Tile.gridHeight;
				if(x.even) yCoord += Tile.gridHeight / 2;
				row[x] = new Tile(new Vector(xCoord, yCoord));
				row[x].draw(this.context);
			}
		}
	}
});