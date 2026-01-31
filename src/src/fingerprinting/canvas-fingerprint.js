(() => {
	'use strict';

	const seed = Math.floor(Math.random() * 10) + 1;

	function noisify(imageData) {
		for (let i = 0; i < imageData.data.length; i += 4) {
			imageData.data[i]     += seed; // R
			imageData.data[i + 1] += seed; // G
			imageData.data[i + 2] += seed; // B
		}

		return imageData;
	}

	const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;
	CanvasRenderingContext2D.prototype.getImageData = function (...args) {
		const imageData = originalGetImageData.apply(this, args);
		return noisify(imageData);
	}

	const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
	HTMLCanvasElement.prototype.toDataURL = function(...args) {
		const ctx = this.getContext("2d");
		if (ctx) {
			const { width, height } = this;
			const imageData = ctx.getImageData(0, 0, width, height);
			ctx.putImageData(noisify(imageData), 0, 0);
		}
		return originalToDataURL.apply(this, args);
	}

	const originalToBlob = HTMLCanvasElement.prototype.toBlob;
	HTMLCanvasElement.prototype.toBlob = function (...args) {
		const ctx = this.getContext("2d");
		if (ctx) {
			const { width, height } = this;
			const imageData = ctx.getImageData(0, 0, width, height);
			ctx.putImageData(noisify(imageData), 0, 0);
		}
		return originalToBlob.apply(this, args);
	}
})();
