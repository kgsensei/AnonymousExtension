(() => {
	'use strict';

	const offset = Math.floor(Math.random() * 1000);
	const jitter = Math.random() * 0.1;

	const originalPerformanceNow = performance.now.bind(performance);

	let lastNow = 0;

	performance.now = function () {
		const now = originalPerformanceNow() + offset;
		const noisy = now + (Math.random() * jitter);

		lastNow = Math.max(lastNow, noisy);
		return lastNow;
	}

	const originalDataNow = Date.now;
	Date.now = function () {
		return originalDataNow() + offset;
	}

	const originalRequestAnimationFrame = window.requestAnimationFrame;
	window.requestAnimationFrame = function (callback) {
		return originalRequestAnimationFrame.call(this, function (timestamp) {
			callback(timestamp + jitter);
		})
	}
})();
