var Canvas = Class({
	initialize: function() {
		this.element = document.createElement("canvas");
		this.context = this.element.getContext("2d");
		this.normalizeResolution();
		document.body.appendChild(this.element);
	},
	normalizeResolution: function() {
		var ratio  = window.devicePixelRatio
		  , width  = window.innerWidth
		  , height = window.innerHeight;
		if(ratio) {
			this.element.width  = width  * ratio;
			this.element.height = height * ratio;
			this.context.scale(ratio, ratio);
		} else {
			this.element.width = width;
			this.element.height = height;
		}
		this.element.style.width = width;
		this.element.style.height = height;
	}
});