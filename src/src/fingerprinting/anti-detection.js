(() => {
	'use strict';

	const originalToString = Function.prototype.toString;
	const nativeMap = new WeakMap();

	function markNative(fn, name) {
		nativeMap.set(fn, `function ${name || ''}() { [native code] }`);
	}

	Function.prototype.toString = function () {
		if (nativeMap.has(this))
			return nativeMap.get(this);
		return originalToString.call(this);
	};

	function stealthPatch(obj, prop, replacement) {
		const desc = Object.getOwnPropertyDescriptor(obj, prop);
		if (!desc || !desc.configurable) return;

		Object.defineProperty(obj, prop, {
			...desc,
			value: replacement
		});

		markNative(replacement, prop);
	}

	// performance.now
	if (performance?.now)
		stealthPatch(performance, 'now', performance.now);

	// Date.now
	stealthPatch(Date, 'now', Date.now);

	// requestAnimationFrame
	if (window.requestAnimationFrame)
		stealthPatch(window, 'requestAnimationFrame', window.requestAnimationFrame);

	// Canvas
	if (CanvasRenderingContext2D?.prototype?.getImageData) {
		stealthPatch(
			CanvasRenderingContext2D.prototype,
			'getImageData',
			CanvasRenderingContext2D.prototype.getImageData
		);
	}

	// WebGL
	if (WebGLRenderingContext?.prototype?.getParameter) {
		stealthPatch(
			WebGLRenderingContext.prototype,
			'getParameter',
			WebGLRenderingContext.prototype.getParameter
		);
	}

	if (WebGL2RenderingContext?.prototype?.getParameter) {
		stealthPatch(
			WebGL2RenderingContext.prototype,
			'getParameter',
			WebGL2RenderingContext.prototype.getParameter
		);
	}

	// Audio
	if (AudioBuffer?.prototype?.getChannelData) {
		stealthPatch(
			AudioBuffer.prototype,
			'getChannelData',
			AudioBuffer.prototype.getChannelData
		);
	}

	function lock(proto, prop) {
		const desc = Object.getOwnPropertyDescriptor(proto, prop);
		if (!desc) return;

		Object.defineProperty(proto, prop, {
			...desc,
			configurable: false
		});
	}

	[
		[Navigator.prototype, 'hardwareConcurrency'],
		[Navigator.prototype, 'deviceMemory'],
		[Navigator.prototype, 'languages'],
		[Navigator.prototype, 'platform'],
		[Navigator.prototype, 'webdriver']
	].forEach(([p, k]) => lock(p, k));
})();
