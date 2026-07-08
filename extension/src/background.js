// configuration and browser compatibility
const is_firefox =
	typeof browser === "object" &&
	typeof browser.runtime === "object";
const ext = is_firefox ? browser : chrome;

// constants
const DEV_MODE = false; // make sure this is false on prod

const URL_BASE = DEV_MODE
	? "http://localhost:3000/"
	: "https://cdn.jsdelivr.net/gh/kgsensei/AnonymousExtension@latest/hosts/";

const BLACKLIST = "blacklist.txt";
const VERSION = "vrCh.txt";

const MAX_DYNAMIC_RULES = 30_000;

// block behavior "enum"
const BlockType = {
	Normal: 0,
	All: 1
};

// storage Helper
const storage = {
	get_item: async (key) => {
		const result = await ext.storage.local.get(key);
		return result[key];
	},

	set_item: async (key, val) => {
		await ext.storage.local.set({ [key]: val });
	}
};

// makes a request to the CDN where the blacklist is stored
// and saves the resulting text locally in the extension
async function download_ruleset() {
	try {
		const res = await fetch(URL_BASE + BLACKLIST);

		if (!res.ok)
			throw new Error(`Failed to Fetch Blacklist: Status: ${res.status}`);

		const remote_blacklist = await res.text();

		// store locally
		await storage.set_item(
			BLACKLIST,
			remote_blacklist
		);

		await build_ruleset();
	} catch (e) {
		console.error("[download_ruleset]", e);
		throw e;
	}
}

// build a new ruleset, this should only be triggered during an update
async function build_ruleset() {
	let request_handle_type = BlockType.Normal;

	const new_rules = [];

	const stored_rules = await storage.get_item(BLACKLIST);
	if (typeof stored_rules !== "string" || stored_rules.length === 0) {
		console.warn("[build_ruleset] No Saved Blacklist Available");
		return;
	}

	const split_hosts = stored_rules.split(/\r?\n/);

	const default_resource_types = [
		"font",
		"ping",
		"other",
		"media",
		"image",
		"object",
		"script",
		"sub_frame",
		"websocket",
		"stylesheet",
		"csp_report",
		"xmlhttprequest"
	];

	// non-firefox browsers support these other request types
	// that also should be blocked if possible
	if (!is_firefox) {
		default_resource_types.push(
			"webbundle",
			"webtransport"
		);
	}

	let next_rule_id = 1;

	for (const line of split_hosts) {
		let filter = line.trim();

		// comment or empty line
		if (!filter || filter.startsWith('#'))
			continue;

		// directive line
		if (filter.startsWith('~')) {
			const new_block_type = filter.slice(1).trim();

			request_handle_type =
				new_block_type === "Block_All"
					? BlockType.All
					: BlockType.Normal;

			continue;
		}

		if (new_rules.length >= MAX_DYNAMIC_RULES) {
			console.warn(`[build_ruleset] Reached Rule Limit: ${MAX_DYNAMIC_RULES}`);
			break;
		}

		const block_resource_types = [ ...default_resource_types ];

		// if the current block directive is to block the entire
		// page the include 'main_frame' as a blocked resource type
		if (request_handle_type === BlockType.All)
			block_resource_types.push("main_frame");

		new_rules.push({
			id: next_rule_id++,
			priority: 1,

			condition: {
				urlFilter: filter,
				resourceTypes: block_resource_types
			},

			action: {
				type: "block"
			}
		});
	}

	await replace_dynamic_rules(new_rules);
}

// replace all dynamic rules with newly generated rules
async function replace_dynamic_rules(new_rules) {
	if (!Array.isArray(new_rules))
		return;

	try {
		const old_rules = await ext.declarativeNetRequest.getDynamicRules();
		const old_rule_ids = old_rules.map(rule => rule.id);

		await ext.declarativeNetRequest.updateDynamicRules({
			removeRuleIds: old_rule_ids,
			addRules: new_rules
		});

		await storage.set_item("rule_count", new_rules.length);
		console.log(`[replace_dynamic_rules] Installed ${new_rules.length} Rules`);
	} catch (e) {
		await storage.set_item("rule_count", 0);
		console.error("[replace_dynamic_rules]", e);
		throw e;
	}
}

// check for update and install if needed
async function update_checker() {
	try {
		const res = await fetch(URL_BASE + VERSION);

		if (!res.ok)
			throw new Error(`Failed to Fetch Version: Status: ${res.status}`);

		const remote_version = (await res.text()).trim();
		const local_version = (await storage.get_item("local_version"))?.trim();
		console.log("Version Compare", remote_version, local_version);

		if (remote_version !== local_version || DEV_MODE) {
			console.log(`[update_checker] Updating Ruleset (${local_version} -> ${remote_version})`);

			await download_ruleset();

			await storage.set_item(
				"local_version",
				remote_version
			);
		} else {
			// rebuild from cache if something happened and there are no rules installed
			const installed_rules = await ext.declarativeNetRequest.getDynamicRules();
			if (installed_rules.length === 0) {
				console.warn("[update_checker] Dynamic Rules Missing, Rebuilding from Cache");

				await build_ruleset();
			} else {
				console.log(`[update_checker] ${installed_rules.length} Dynamic Rules Already Installed`);
			}
		}
	} catch (e) {
		console.error("[update_checker]", e);
	}
}

// listen for events from UI component
ext.runtime.onMessage.addListener((message, _, sendResponse) => {
	if (message === "query-version") {
		storage.get_item("local_version")
			.then((r) => r.trim())
			.then((r) =>
				sendResponse(`${ext.runtime.getManifest().version}x${r}`));
	}

	if (message === "query-rule-count") {
		storage.get_item("rule_count")
			.then((r) => sendResponse(r));
	}

	return true;
});

// first installation
ext.runtime.onInstalled.addListener(async () => {
	console.log(`[onInstalled] First Install/Update Triggered (is_firefox? ${is_firefox})`);

	try {
		try {
			await ext.declarativeNetRequest.setExtensionActionOptions({
				displayActionCountAsBadgeText: true
			});
		} catch (e) {
			console.log("[onInstalled] Failed to Enable 'displayActionCountAsBadgeText'");
		}

		// Ensure a fresh install immediately downloads and installs rules.
		await update_checker();
	} catch (e) {
		console.error("[onInstalled]", e);
	}
});

// run update checker on browser startup
ext.runtime.onStartup.addListener(async () => {
	console.log("[onStartup] Startup Triggered");

	try {
		await update_checker();
	} catch (e) {
		console.error("[onStartup]", e);
	}
});
