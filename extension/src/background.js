// configuration and browser compatibility
const is_firefox =
	typeof browser === "object" &&
	typeof browser.runtime === "object";
const ext = is_firefox ? browser : chrome;

// dev mode flag
const DEV_MODE = false; // make sure this is false on prod

const URL_BASE = DEV_MODE
	? "http://localhost:3000/"
	: "https://cdn.jsdelivr.net/gh/kgsensei/AnonymousExtension@latest/hosts/";

// storage keys
const WHITELIST_KEY = "whitelist";
const RULE_COUNT_KEY = "rule_count";
const LOCAL_VERSION_KEY = "local_version";

// alarm names
const ALARM_TEMP_DISABLE = "temp_disable";
const ALARM_TEST_UPDATE = "update_checker";

// url base extensions
const BLACKLIST = "blacklist.txt";
const VERSION = "vrCh.txt";

// random constants
const DAY_IN_MINUTES = 1_440; // 60 * 24;

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

	// non-firefox browsers support these other request
	// types that also should be blocked if possible
	if (!is_firefox) {
		default_resource_types.push(
			"webbundle",
			"webtransport"
		);
	}

	let next_rule_id = 1;

	// handle blacklist rules
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

		const block_resource_types = [ ...default_resource_types ];

		// if the current block directive is to block the
		// entire page the include 'main_frame' as a
		// blocked resource type
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

	// handle whitelist rules
	const whitelist = await storage.get_item(WHITELIST_KEY);
	if (typeof whitelist === "string" && whitelist.length > 0) {
		// parsed_whitelist must be mutable since the rule
		// id's may change when the ruleset is rebuilt
		let parsed_whitelist = JSON.parse(whitelist);
		const whitelist_domains = Object.keys(parsed_whitelist);

		for (let i = 0; i < whitelist_domains.length; i++) {
			new_rules.push({
				id: next_rule_id,
				priority: 2, // higher priority for whitelist

				condition: {
					urlFilter: `||${whitelist_domains[i]}/*`,
					resourceTypes: [ "main_frame" ]
				},

				action: {
					type: "allowAllRequests" // allow ALL frame requests
				}
			});

			// update whitelist rule id since it's
			// possibly different now
			parsed_whitelist[whitelist_domains[i]] = next_rule_id;
			next_rule_id++;
		}

		await storage.set_item(WHITELIST_KEY, JSON.stringify(parsed_whitelist));
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

		await storage.set_item(RULE_COUNT_KEY, new_rules.length);
		console.log(`[replace_dynamic_rules] Installed ${new_rules.length} Rules`);
	} catch (e) {
		await storage.set_item(RULE_COUNT_KEY, 0);
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
		const local_version = (await storage.get_item(LOCAL_VERSION_KEY))?.trim();
		console.log("[update_checker] Version Compare", remote_version, local_version);

		if (remote_version !== local_version || DEV_MODE) {
			console.log(`[update_checker] Updating Ruleset (${local_version} -> ${remote_version})`);

			await download_ruleset();

			await storage.set_item(
				LOCAL_VERSION_KEY,
				remote_version
			);
		} else {
			// rebuild from cache if something happened
			// and there are no rules installed
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

async function add_to_whitelist(domain) {
	// the rule id's start at 1 in build_ruleset so
	// if we get the current number of rules and add
	// 1 to them then the id should be the next valid
	// number, this way we can add whitelist rules without
	// having to rebuild the entire blacklist too.
	const installed_rules = await ext.declarativeNetRequest.getDynamicRules();
	const current_id = installed_rules.length + 1;

	const new_whitelist_rule = [{
		id: current_id,
		priority: 2, // higher priority for whitelist

		condition: {
			urlFilter: `||${domain}/*`,
			resourceTypes: [ "main_frame" ]
		},

		action: {
			type: "allowAllRequests" // allow ALL frame requests
		}
	}];

	try {
		await ext.declarativeNetRequest.updateDynamicRules({
			addRules: new_whitelist_rule
		});

		await storage.set_item(RULE_COUNT_KEY, current_id);
		console.log("[add_to_whitelist] Installed 1 Rule to Whitelist");
	} catch (e) {
		console.error("[add_to_whitelist]", e);
	}

	const whitelist = await storage.get_item(WHITELIST_KEY);
	if (typeof whitelist !== "string" || whitelist.length === 0) {
		// if whitelist doesn't exist then create it and
		// store the currently added domain and rule id
		await storage.set_item(WHITELIST_KEY, JSON.stringify({
			[domain]: current_id
		}));
	} else {
		// whitelist exists, so add the rule to it
		let parsed_whitelist = JSON.parse(whitelist);
		parsed_whitelist[domain] = current_id; // add current whitelist rule
		await storage.set_item(WHITELIST_KEY, JSON.stringify(parsed_whitelist));
	}
}

async function remove_from_whitelist(domain) {
	const whitelist = await storage.get_item(WHITELIST_KEY);
	if (typeof whitelist !== "string" || whitelist.length === 0)
		return;

	let parsed_whitelist = JSON.parse(whitelist);

	// only remove if the id is valid and the domain is in the whitelist
	let rule_id = parsed_whitelist[domain];
	if (typeof rule_id !== "number")
		return;

	// remove domain from whitelist
	delete parsed_whitelist[domain];

	// remove whitelist rule from dynamic rules list
	await ext.declarativeNetRequest.updateDynamicRules({
		removeRuleIds: [ rule_id ]
	});

	// update the stored whitelist
	await storage.set_item(WHITELIST_KEY, JSON.stringify(parsed_whitelist));

	// updated the stored rule count
	const installed_rules = await ext.declarativeNetRequest.getDynamicRules();
	await storage.set_item(RULE_COUNT_KEY, installed_rules.length);
}

// listen for events from UI component
ext.runtime.onMessage.addListener((message, _, sendResponse) => {
	if (message.type === "query") {
		if (message.q === "query-version") {
			storage.get_item(LOCAL_VERSION_KEY)
				.then((r) => (r ?? "").trim())
				.then((r) =>
					sendResponse(`${ ext.runtime.getManifest().version }x${ r }`)
				);
		}

		if (message.q === "query-rule-count") {
			storage.get_item(RULE_COUNT_KEY)
				.then((r) => sendResponse(r));
		}

		if (message.q === "query-tab-url") {
			ext.tabs.query({
				active: true,
				currentWindow: true
			}, (tabs) => {
				const url = tabs[0]?.url;
				const domain = url.indexOf("://") != -1 ?
					url.split("://")[1].split("/")[0] :
					url.split("/")[0];

				storage.get_item(WHITELIST_KEY)
					.then((r) => JSON.parse(r ?? "{}"))
					.then((r) => sendResponse({
						url: url,
						is_whitelisted: r.hasOwnProperty(domain)
					}));
			});
		}
	}

	if (message.type === "whitelist-add") {
		add_to_whitelist(message.domain)
			.then(() => sendResponse({ success: true }))
			.catch((e) => sendResponse({
				success: false,
				error: e.message
			}));
	}

	if (message.type === "whitelist-remove") {
		remove_from_whitelist(message.domain)
			.then(() => sendResponse({ success: true }))
			.catch((e) => sendResponse({
				success: false,
				error: e.message
			}));
	}

	if (message.type === "temp-disable") {
		// sending an empty array to replace_dynamic_rules
		// should delete all existing rules and add none
		replace_dynamic_rules([]);

		// persistAcrossSessions = false because we should
		// (in-theory) rebuild the blacklist on browser
		// startup if there are no existing rules
		ext.alarms.create(ALARM_TEMP_DISABLE, {
			delayInMinutes: 5,
			persistAcrossSessions: false
		});
	}

	return true;
});

// alarm listener
ext.alarms.onAlarm.addListener((alarm) => {
	if (alarm.name === ALARM_TEMP_DISABLE) {
		// re-build ruleset
		build_ruleset();
	}

	if (alarm.name === ALARM_TEST_UPDATE) {
		// run update checker once a day
		update_checker();
	}
});

// first installation
ext.runtime.onInstalled.addListener(async () => {
	console.log(`[onInstalled] First Install/Update Triggered (is_firefox? ${is_firefox})`);
	await storage.set_item(WHITELIST_KEY, JSON.stringify({})); // save an empty object on installation

	try {
		try {
			await ext.declarativeNetRequest.setExtensionActionOptions({
				displayActionCountAsBadgeText: true
			});
		} catch (e) {
			console.log("[onInstalled] Failed to Enable 'displayActionCountAsBadgeText'");
		}

		// Ensure a fresh install immediately
		// downloads and installs rules
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

	// run update checker once every day because
	// some users never close their browser
	ext.alarms.create(ALARM_TEST_UPDATE, {
		delayInMinutes: DAY_IN_MINUTES,
		periodInMinutes: DAY_IN_MINUTES,
		persistAcrossSessions: false
	});
});
