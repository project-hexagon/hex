/**
 *
 * The hexagon grid is indexed as such:
 *    _____         _____
 *   /     \       /     \
 *  /  0,0  \_____/  2,0  \
 *  \       /     \       /
 *   \_____/  1,0  \_____/
 *   /     \       /     \
 *  /  0,1  \_____/  2,1  \
 *  \       /     \       /
 *   \_____/  1,1  \_____/
 *   /     \       /     \
 *  /  0,2  \_____/  2,2  \
 *  \       /     \       /
 *   \_____/  1,2  \_____/
 *         \       /
 *          \_____/
 *
 * To convert from pixel coordinates to hex coordinates, the hex grid is broken
 * up like this:
 * 
 *         |----------------------60px----------------------|
 *         |---15px---|----------------45px-----------------|
 *   _  _             ________________________________________
 *   |  |            /|                           \          |
 *   |  |           / |                            \         |
 *   |  |          /  |                             \        |
 *   |  |         /   |                              \       |
 *   | 26px      /    |                               \      |
 *   |  |       /     |                                \     |
 *   |  |      /      |                                 \    |
 *   |  |     /       |                                  \   |
 *   |  |    /        |                                   \  |
 *   |  |   /         |                                    \ |
 *  52px-  /          |             X                       \|
 *   |     \          |                                     /|
 *   |      \         |                                    / |
 *   |       \        |                                   /  |
 *   |        \       |                                  /   |
 *   |         \      |                                 /    |
 *   |          \     |                                /     |
 *   |           \    |                               /      |
 *   |            \   |                              /       |
 *   |             \  |                             /        |
 *   |              \ |                            /         |
 *   -               \|___________________________/__________|
 *
 * It is trivial to split up the grid on a rectangular basis, which is the first
 * step. The vertical lines represent where the grid gets laid out in relation
 * to the hexagon. After you know the x and y indices of the rectangular grid,
 * you can figure out which hexagon the point lies within.
 *
 * So, we must test whether the pixel coordinates are inside the hexagon. First,
 * if the mouse is within the left section of the grid, we know it is in the
 * hexagon. If the mouse is near the right side of the hexagon, we must test
 * whether it is over the upper right or lower right neighbors.
 */
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
		this._grid.forEach(function(row) {
			row.forEach(function(tile) {
				tile.draw(this.context);
				if(tile == this.hovered) {
					this.context.fill();
				}
			}, this);
		}, this);
		window.requestAnimationFrame(this.draw.bind(this));
	},
	/**
	 * Returns the Tile at the given pixel coordinates if there is one.
	 * @param {Vector} position - The pixel coordinates where a hexagon may be.
	 */
	tileAt: function(position) {
		// Normalize x position because hexagons are positioned at their
		// centers. Y position takes care of itself.
		var x = position.x + Tile.width / 4
		  , y = position.y
		  , xIndex, yIndex
		  , xDelta, yDelta
		  , tile, row;

		xIndex = Math.floor(x / Tile.gridWidth);
		// If xIndex is odd, then shift the y value by half the gridHeight,
		// because the odd zero-indexed hexagon columns are shifted by that
		// much.
		yIndex = Math.floor((xIndex.odd ? y + Tile.gridHeight / 2 : y) / Tile.gridHeight);

		// xDelta and yDelta represent the relative coordinates inside the 
		// rectangular grid.
		xDelta = x - xIndex * Tile.gridWidth;
		// Shift yDelta by half gridHeight if xIndex is odd to get correct
		// offset.
		yDelta = y - yIndex * Tile.gridHeight - (xIndex.odd ? Tile.gridHeight / 2 : y);

		// If the relative mouse position lies within the left portion of the 
		// hexagon, then we do not need to check whether the mouse is actually
		// in the upper or lower right neighbor.
		if(xDelta > 30) {

			// If the mouse could be in the upper right neighbor, check to see
			// if it actually is.
			if(yDelta < 26 && false) {

				// Shift up a row or stay at the same level, depending on the
				// parity of the column index.
				yIndex += (xIndex.odd ? 0 : -1);
				// Shift over a column.
				xIndex++;

			// If the mouse could be in the lower right neighbor, check to see
			// if it actually is.
			} else if(yDelta > 26 && false) {

				// Shift down a row or stay at the same level, depending on the
				// parity of the column index.
				yIndex += (xIndex.odd ? 1 : 0);
				// Shift over a column.
				xIndex++;

			}
		}

		// Try to return a tile at xIndex, yIndex in this._grid, there may not
		// be one, so check for nulity.
		row = this._grid[yIndex];
		tile = row ? row[xIndex] : null;
		return tile;
	},
	highlight: function(event) {
		this.hovered = this.tileAt(Vector.fromEvent(event));
	}
});