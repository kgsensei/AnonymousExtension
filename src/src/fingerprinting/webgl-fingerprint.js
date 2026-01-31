(() => {
	'use strict';

	const seed = Math.floor(Math.random() * 10) + 1;

	const PARAM_SPOOF = {
		// Vendor / Renderer
		37445: 'Intel Inc.',
		37446: 'Intel Iris OpenGL Engine',
		3379: 16384,
		34076: 16384
	};

	function patchContext(proto) {
		if (!proto) return;

		const originalGetParameter = proto.getParameter;
		proto.getParameter = function (param) {
			if (PARAM_SPOOF[param] !== undefined)
				return PARAM_SPOOF[param];
			return originalGetParameter.apply(this, arguments);
		}

		const originalGetSupportedExtensions = proto.getSupportedExtensions;
		proto.getSupportedExtensions = function () {
			const exts = originalGetSupportedExtensions.apply(this, arguments);
			if (!exts) return exts;
			return exts.slice();
		}

		const originalGetExtension = proto.getExtension;
		proto.getExtension = function (name) {
			if (name === 'WEBGL_debug_renderer_info')
				return null;
			return originalGetExtension.apply(this, arguments);
		}

		const originalReadPixels = proto.readPixels;
		proto.readPixels = function (...args) {
			originalReadPixels.apply(this, args);

			const pixels = args[0];
			if (pixels && pixels.length) {
				for (let i = 0; i < pixels.length; i += 4) {
					pixels[i]     ^= seed; // R
					pixels[i + 1] ^= seed; // G
					pixels[i + 2] ^= seed; // B
				}
			}
		}
	}

	patchContext(window.WebGLRenderingContext?.prototype);
	patchContext(window.WebGL2RenderingContext?.prototype);
})();
