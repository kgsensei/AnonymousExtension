(() => {
	'use strict';

	const seed = Math.random() * 0.05;

	const originalMeasureText = CanvasRenderingContext2D.prototype.measureText;
	CanvasRenderingContext2D.prototype.measureText = function (text) {
		const metrics = originalMeasureText.call(this, text);
		const proxy = Object.create(metrics);

		Object.defineProperty(proxy, 'width', {
			get() {
				return metrics.width + seed;
			}
		});

		return proxy;
	}

	function patchDimension(proto, prop) {
		const original = Object.getOwnPropertyDescriptor(proto, prop);
		if (!original || !original.get) return;

		Object.defineProperty(proto, prop, {
			get() {
				const value = original.get.call(this);

				if (
					this instanceof HTMLElement &&
					this.style &&
					this.style.visibility === 'hidden'
				) {
					return value + seed;
				}

				return value;
			}
		});
	}

	patchDimension(HTMLElement.prototype, 'offsetWidth');
	patchDimension(HTMLElement.prototype, 'offsetHeight');
	patchDimension(HTMLElement.prototype, 'clientWidth');
	patchDimension(HTMLElement.prototype, 'clientHeight');
})();
