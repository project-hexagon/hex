/**
 * The formula for a regular hexagon is:
 *   height = (sqrt(3) / 2) * width
 * so, unfortunately, if our choice of hexagon will snap to the pixel grid, we
 * cannot have a perfect hexagon. The width and height were chosen such that the
 * values are close to the sqrt(3)/2 ratio. The width must also be divisible by
 * 4 and the height 2, such that the upper and lower points will snap to the
 * pixel grid. The performance benefits and simplicity of having the shape snap
 * to pixels outweighs the small imperfection in the shape.
 *
 * (sqrt(3)/2) * 60 = 51.961524227
 * 52 / (sqrt(3)/2) = 60.044427996
 *
 * The error is less than 0.05 pixels, which is less than 1/1000th of the size.
 *
 *
 *         |----------------------60px----------------------|
 *         |---15px---|----15px----|
 *   _  _            1____________________________2
 *   |  |  (-15, 26) /                            \ (15, 26)
 *   |  |           /  120deg                      \
 *   |  |          /                                \
 *   |  |         /                                  \
 *   | 26px      /                                    \
 *   |  |       /                                      \
 *   |  |      /                                        \
 *   |  |     /                                          \
 *   |  |    /                                            \
 *   |  |   /                                              \
 *  52px-  / (-30, 0)      ---------X (0,0)                 \3
 *   |    6\                 60deg /                        /  (30, 0)
 *   |      \                     /                        /
 *   |       \                   /                        /
 *   |        \                 /                        /
 *   |         \                                        /
 *   |          \                                      /
 *   |           \                                    /
 *   |            \                                  /
 *   |             \                                /
 *   |              \                              /
 *   -    (-15, -26) \____________________________/ (15, -26)
 *                   5                            4
 */
var Tile = Class({
	initialize: function(position) {
		this.position = position;
	},
	draw: function(context) {
		var x = this.position.x
		  , y = this.position.y;
		context.moveTo(x - 15, y + 26);
		context.lineTo(x + 15, y + 26);
		context.lineTo(x + 30, y     );
		context.lineTo(x + 15, y - 26);
		context.lineTo(x - 15, y - 26);
		context.lineTo(x - 30, y     );
		context.lineTo(x - 15, y + 26);
	}
}).extend({
	width: 60,
	height: 52,
	gridWidth: 45, // Distance on x-axis from centers of polygons.
	gridHeight: 52, // Distance on y-axis from centers of polygons.

});