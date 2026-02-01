// Configuration and Browser Compatibility
const is_firefox = typeof browser !== 'undefined';
const ext = is_firefox ? browser : chrome;

// URL Constants
const URL_BASE = "https://cdn.jsdelivr.net/gh/kgsensei/AnonymousExtension@latest/hosts/";
const BLACKLIST = "blacklist.txt";
const VERSION = "vrCh.txt";

// Block Behavior Enum
const BlockType = {
	Normal: 0,
	All: 1
};

// Storage Helper
const storage = {
	get_item: async (key) => {
		const result = await ext.storage.local.get(key);
		return result ? result[key] : undefined;
	},
	set_item: (key, val) => ext.storage.local.set({ [key]: val })
};

/*
* Makes a request to the CDN where the blacklist is stored
* and saves the resulting text locally in the extension
*/
function update_ruleset() {
	fetch(URL_BASE + BLACKLIST)
	.then((res) => {
		if (!res.ok)
			throw new Error(`Failed to fetch blacklist ${res.status}`);
		return res.text();
	})
	.then((remote_blacklist) => storage.set_item(
		BLACKLIST,
		remote_blacklist
	))
	.then(build_ruleset)
	.catch((err) => {
		console.error("[update_ruleset]", err);
	});
}

/*
* Build a new ruleset and remove the previous ruleset,
* this should only be triggered when performing an update.
*/
async function build_ruleset() {
	let request_handle_type = BlockType.Normal;

	const new_rules = [];
	const stored_rules = await storage.get_item(BLACKLIST);
	const split_hosts = (stored_rules || '').split('\n');

	const default_resource_types = [
		"font", "ping", "other", "media", "image", "object", "script",
		"sub_frame", "websocket", "stylesheet", "csp_report", "xmlhttprequest"
	];

	for (const [index, line] of split_hosts.entries()) {
		let filter = line.trim();

		if (!filter || filter.startsWith('#')) continue;
		if (filter.startsWith('~')) {
			const new_block_type = filter.split(' ')[1]?.trim();
			request_handle_type = (new_block_type === "Block_All")
				? BlockType.All
				: BlockType.Normal;
			continue;
		}

		const block_resource_types = [...default_resource_types];

		if (!is_firefox) block_resource_types.push("webbundle", "webtransport");
		if (request_handle_type === BlockType.All) block_resource_types.push("main_frame");

		new_rules.push({
			id: index + 1,
			priority: 1,
			condition: { urlFilter: filter, resourceTypes: block_resource_types },
			action: { type: "block" }
		});
	}

	ext.declarativeNetRequest.getDynamicRules(old_rules => {
		const old_rule_ids = old_rules.map(rule => rule.id);

		ext.declarativeNetRequest.updateDynamicRules({
			removeRuleIds: old_rule_ids,
			addRules: new_rules
		});
	});
}

/*
* If we're on a chromium based browser we'll want to
* link the extension badge to the number of requests
* blocked on the current page.
*/
ext.runtime.onInstalled.addListener(() => {
	if (!is_firefox) {
		ext.declarativeNetRequest.setExtensionActionOptions({
			displayActionCountAsBadgeText: true
		});
	}

	// Update ruleset on first install
	update_ruleset();
});

/*
* Run update checker on extension startup. This should
* cut down on the number of times the version is checked.
*/
ext.runtime.onStartup.addListener(() => {
	fetch(URL_BASE + VERSION)
	.then((res) => {
		if (!res.ok)
			throw new Error(`Failed to fetch version ${res.status}`);
		return res.text();
	})
	.then(async (remote_version) => {
		if (remote_version != await storage.get_item("local_version")) {
			update_ruleset();
			storage.set_item(
				"local_version",
				remote_version
			);
		} else {
			build_ruleset();
		}
	})
	.catch((err) => {
		console.error("[onStartup]", err);
	});
});
