(() => {
	const inject = (file) => {
		const s = document.createElement('script');
		s.src = chrome.runtime.getURL(file);
		s.type = 'text/javascript';
		s.async = false; // preserve execution order
		(document.documentElement || document.head).appendChild(s);
		s.remove();
	};

	const modules = [
		'src/fingerprinting/anti-detection.js',
		'src/fingerprinting/audio-context.js',
		'src/fingerprinting/canvas-fingerprint.js',
		'src/fingerprinting/offscreen-canvas.js',
		'src/fingerprinting/webgl-fingerprint.js',
		'src/fingerprinting/font-fingerprint.js',
		'src/fingerprinting/timing-fingerprint.js',
		'src/fingerprinting/navigator-fingerprint.js'
	];

	for (const m of modules)
		inject(m);
})();
