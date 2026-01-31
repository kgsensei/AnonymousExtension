(() => {
	'use strict';

	if (!('OffscreenCanvas' in window)) return;

	const seed = Math.floor(Math.random() * 10) + 1;

	function noisify(imageData) {
		for (let i = 0; i < imageData.data.length; i += 4) {
			imageData.data[i]     += seed; // R
			imageData.data[i + 1] += seed; // G
			imageData.data[i + 2] += seed; // B
		}

		return imageData;
	}

	const originalGetImageData = OffscreenCanvasRenderingContext2D.prototype.getImageData;
	OffscreenCanvasRenderingContext2D.prototype.getImageData = function (...args) {
		const imageData = originalGetImageData.apply(this, args);
		return noisify(imageData);
	}

	const originalConvertToBlob = OffscreenCanvas.prototype.convertToBlob;
	OffscreenCanvas.prototype.convertToBlob = function (...args) {
		const ctx = this.getContext("2d");
		if (ctx) {
			const { width, height } = this;
			const imageData = ctx.getImageData(0, 0, width, height);
			ctx.putImageData(noisify(imageData), 0, 0);
		}
		return originalConvertToBlob.apply(this, args);
	}
})();
