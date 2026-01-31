(() => {
	'use strict';

	if (!('AudioContext' in window || 'webkitAudioContext' in window)) return;

	const seed = Math.random() * 1e-7;

	function noisify(buffer) {
		for (let ch = 0; ch < buffer.numberOfChannels; ch++) {
			const data = buffer.getChannelData(ch);
			for (let i = 0; i < data.length; i += 100)
				data[i] += seed;
		}
		return buffer;
	}

	const originalGetChannelData = AudioBuffer.prototype.getChannelData;
	AudioBuffer.prototype.getChannelData = function (...args) {
		const data = originalGetChannelData.apply(this, args);
		const copy = new Float32Array(data);

		for (let i = 0; i < copy.length; i += 100) {
			copy[i] += seed;
		}

		return copy;
	}

	const originalStartRendering = OfflineAudioContext.prototype.startRendering;
	OfflineAudioContext.prototype.startRendering = function () {
		originalStartRendering.apply(this, arguments);
		return noisify(buffer);
	}
})();
