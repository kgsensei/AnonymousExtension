(() => {
	// configuration and browser compatibility
	const is_firefox =
		typeof browser === "object" &&
		typeof browser.runtime === "object";
	const ext = is_firefox ? browser : chrome;

	// translation support
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

	// fetch version and rule count
	function queryBackgroundData() {
		ext.runtime.sendMessage("query-version", (version) => {
			document.getElementById("query_res_version").innerText = version;
		});

		ext.runtime.sendMessage("query-rule-count", (rule_count) => {
			document.getElementById("query_res_rule_count").innerText = rule_count;
		});
	}

	localizeHtmlPage();
	queryBackgroundData();
})();
