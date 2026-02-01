(() => {
	function localizeHtmlPage() {
		const objects = document.getElementsByClassName('translate');

		for (let i = 0; i < objects.length; i++) {
			let obj = objects[i];
			let valStrH = obj.innerText.toString();
			let valNewH = valStrH.replace(/__MSG_(\w+)__/g, (match, v1) => {
				return v1 ? chrome.i18n.getMessage(v1) : "";
			});

			if (valNewH != valStrH) obj.innerText = valNewH;
		}
	}

	localizeHtmlPage();
})();
