(() => {
	// configuration and browser compatibility
	const is_firefox =
		typeof browser === "object" &&
		typeof browser.runtime === "object";
	const ext = is_firefox ? browser : chrome;

	const URL_ATTR_KEY = "data-url";
	const MODE_ATTR_KEY = "data-whitelist-mode";

	// translation support
	function localize_html_page() {
		const objects = document.getElementsByClassName('translate');

		for (let i = 0; i < objects.length; i++) {
			let obj = objects[i];
			let valStrH = obj.innerText.toString();
			let valNewH = valStrH.replace(/__MSG_(\w+)__/g, (match, v1) => {
				return v1 ? ext.i18n.getMessage(v1) : "";
			});

			if (valNewH != valStrH) obj.innerText = valNewH;
		}
	}

	function is_browser_owned_url(url) {
		if (typeof url !== "string" || url.length === 0)
			return false;

		const u = url.toLowerCase().trim();

		return (
			u.startsWith("about:") ||
			u.startsWith("chrome:") ||
			u.startsWith("edge:") ||
			u.startsWith("devtools:") ||
			u.startsWith("view-source:")
		);
	}

	// fetch version and rule count
	function query_background_data() {
		ext.runtime.sendMessage({ type: "query", q: "query-version" }, (version) => {
			document.getElementById("query_res_version").innerText = version;
		});

		ext.runtime.sendMessage({ type: "query", q: "query-rule-count" }, (rule_count) => {
			document.getElementById("query_res_rule_count").innerText = rule_count;
		});

		ext.runtime.sendMessage({ type: "query", q: "query-tab-url" }, (res) => {
			const protection_status = document.getElementById("settings_tracking_protection_status");
			const tab_url_btn = document.getElementById("whitelist_button");
			const browser_url = is_browser_owned_url(res.url);
			const parsed_url = res.url.indexOf("://") != -1 ?
				res.url.split("://")[1].split("/")[0] :
				res.url.split("/")[0];

			if (browser_url) {
				tab_url_btn.classList.add("warning");
				tab_url_btn.classList.remove("secondary");
				tab_url_btn.innerText = ext.i18n.getMessage("whitelist_button_unavailable");
				return;
			}

			if (res.is_whitelisted) {
				protection_status.classList.add("warning");
				protection_status.classList.remove("secondary");
				protection_status.innerText = ext.i18n.getMessage("settings_tracking_protection_low");
			} else {
				protection_status.classList.add("secondary");
				protection_status.classList.remove("warning");
				protection_status.innerText = ext.i18n.getMessage("settings_tracking_protection_on");
			}

			if (res.is_whitelisted) {
				tab_url_btn.classList.add("warning");
				tab_url_btn.classList.remove("secondary");
			} else {
				tab_url_btn.classList.add("secondary");
				tab_url_btn.classList.remove("warning");
			}

			tab_url_btn.innerText =
				`${ext.i18n.getMessage(
					"whitelist_button_" + res.is_whitelisted
						? "remove"
						: "add")
				}: ${parsed_url}`;
			tab_url_btn.setAttribute(URL_ATTR_KEY, parsed_url);
			tab_url_btn.setAttribute(MODE_ATTR_KEY, res.is_whitelisted ? "remove" : "add");
		});
	}

	function whitelist_domain() {
		const tab_url_btn = document.getElementById("whitelist_button");
		const domain = tab_url_btn.getAttribute(URL_ATTR_KEY);
		const mode = tab_url_btn.getAttribute(MODE_ATTR_KEY);

		if (typeof domain !== "string" || typeof mode !== "string")
			return;

		ext.runtime.sendMessage({ type: `whitelist-${mode}`, domain: domain }, (result) => {
			query_background_data(); // update rule count on result
		});
	}

	document.addEventListener("DOMContentLoaded", () => {
		// dom loaded so we can hook buttons
		document.getElementById("whitelist_button").addEventListener("click", () => {
			whitelist_domain();
		});
	});

	localize_html_page();
	query_background_data();
})();
