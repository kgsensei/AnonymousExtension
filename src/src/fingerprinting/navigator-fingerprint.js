(() => {
	'use strict';

	const SPOOF = {
		hardwareConcurrency: 4,
		deviceMemory: 8,
		maxTouchPoints: 0,
		platform: 'Win32',
		language: 'en-US',
		languages: ['en-US', 'en'],
		vendor: 'Google Inc.',
		webdriver: false
	};

	function override(obj, prop, value) {
		try {
			Object.defineProperty(obj, prop, {
				get: () => value,
				configurable: true
			});
		} catch (_) { }
	}

	const navProto = Navigator.prototype;

	override(navProto, 'hardwareConcurrency', SPOOF.hardwareConcurrency);
	override(navProto, 'deviceMemory', SPOOF.deviceMemory);
	override(navProto, 'maxTouchPoints', SPOOF.maxTouchPoints);
	override(navProto, 'platform', SPOOF.platform);
	override(navProto, 'language', SPOOF.language);
	override(navProto, 'languages', SPOOF.languages);
	override(navProto, 'vendor', SPOOF.vendor);
	override(navProto, 'webdriver', SPOOF.webdriver);

	const ua = navigator.userAgent;

	override(navProto, 'userAgent', ua);
	override(navProto, 'appVersion', ua);
	override(navProto, 'oscpu', undefined);

	if (navigator.permissions?.query) {
		const originalQuery = navigator.permissions.query;
		navigator.permissions.query = function (params) {
			if (params?.name === 'notifications')
				return Promise.resolve({ state: Notification.permission });
			return originalQuery.apply(this, arguments);
		}
	}
})();
