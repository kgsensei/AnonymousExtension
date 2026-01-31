const is_firefox = typeof browser !== 'undefined';
const ext = is_firefox ? browser : chrome;

const storage = {
	getAllItems: () => ext.storage.local.get(),
	getItem: async (key) => (await ext.storage.local.get(key))[key],
	setItem: (key, val) => ext.storage.local.set({ [key]: val }),
	removeItems: (keys) => ext.storage.local.remove(keys)
};

const base = "https://raw.githubusercontent.com/kgsensei/AnonymousExtension/master/hosts/";
const list = "blacklist.txt";

const updateRuleset = async () => {
	await fetch(base + list)
	.then(r => r.text())
	.then(async r => {
		storage.setItem(list, r);
		buildBrowserRules();
	});
}

const buildBrowserRules = async () => {
	let blockType = "Block_Normal";
	let rulesList = [];
	let storedRules = await storage.getItem(list);
	let parsedHosts = storedRules.split('\n');

	parsedHosts.forEach((filter, index) => {
		filter = filter.trim()
		if (filter[0] === '~') {
			// Update block type, supported are 'Block_Normal' and 'Block_All'
			blockType = filter.split(' ')[1];
		} else {
			// Remove newlines and comments from valid filters
			if (filter !== '' && filter[0] !== '#') {
				let resourceTypes = [
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

				// these aren't supported in firefox
				if (!is_firefox) {
					resourceTypes.push("webbundle");
					resourceTypes.push("webtransport");
				}

				let action = { type: "block" };

				if (blockType === "Block_All")
					resourceTypes.push("main_frame");

				rulesList.push({
					id: (index + 1),
					priority: 1,
					condition: {
						urlFilter: filter,
						resourceTypes: resourceTypes
					},
					action: action
				});
			}
		}
	});

	ext.declarativeNetRequest.getDynamicRules(oldRules => {
		const oldRuleIds = oldRules.map(rule => rule.id);

		ext.declarativeNetRequest.updateDynamicRules({
			removeRuleIds: oldRuleIds,
			addRules: rulesList
		});
	})
}

fetch(base + "vrCh.txt")
.then(r => r.text())
.then(async r => {
	if(r != await storage.getItem("v")) {
		updateRuleset();
		storage.setItem("v", r);
	} else {
		buildBrowserRules();
	}
});

ext.runtime.onInstalled.addListener(() => {
	if (!is_firefox) { // this isn't supported on firefox
		ext.declarativeNetRequest.setExtensionActionOptions({
			displayActionCountAsBadgeText: true
		});
	}
});
