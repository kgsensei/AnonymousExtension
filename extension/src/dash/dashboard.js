(() => {
	// configuration and browser compatibility
	const is_firefox =
		typeof browser === "object" &&
		typeof browser.runtime === "object";
	const ext = is_firefox ? browser : chrome;

	// translation support
	function localize_html_page() {
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

		ext.runtime.sendMessage({ type: "query", q: "query-tab-url" }, (url) => {
			const tab_url_btn = document.getElementById("whitelist_button");
			const browser_url = is_browser_owned_url(url);

			if (browser_url) {
				tab_url_btn.classList.add("warning");
				tab_url_btn.classList.remove("secondary");
				tab_url_btn.innerText = "Cannot Whitelist this Tab";
			} else {
				const parsed_url = url.split("://")[1].split("/")[0];
				document.getElementById("query_tab_url").innerText = parsed_url;
			}
		});
	}

	function whitelist_domain(domain) {
		ext.runtime.sendMessage({ type: "whitelist-add", domain: domain }, (result) => {
			query_background_data(); // update rule count on result
		});
	}

	document.addEventListener("DOMContentLoaded", () => {
		// dom loaded so we can hook buttons
		document.getElementById("whitelist_button").addEventListener("click", () => {
			const domain = document.getElementById("query_tab_url").textContent.trim();

			if (domain === "anon.kgsensei.dev" || domain.length === 0)
				return;

			whitelist_domain(domain);
		});
	});

	localize_html_page();
	query_background_data();
})();
