const LS = {
	getAllItems: () => chrome.storage.local.get(),
	getItem: async key => (await chrome.storage.local.get(key))[key],
	setItem: (key, val) => chrome.storage.local.set({[key]: val}),
	removeItems: keys => chrome.storage.local.remove(keys),
}

const h = "https://raw.githubusercontent.com/kgsensei/AnonymousExtension/master/hosts/"

async function updateDomainLists() {
	var x = ["a_list.txt|a_list", "i_list.txt|i_list", "t_list.txt|t_list"]
	for(let i = 0; i < x.length; i++) {
		let y = x[i].split('|')
		await fetch(h + y[0])
		.then((r) => r.text())
		.then(async (r) => {
			LS.setItem(y[1], r)
		})
	}
	buildRuleConditions()
}

fetch(h + "vrCh.txt")
.then((r) => r.text())
.then(async(r) => {
	if(r != await LS.getItem("v")) {
		updateDomainLists()
		LS.setItem("v", r)
	} else {
		buildRuleConditions()
	}
})

async function buildRuleConditions() {
	var x = ["a_list", "i_list", "t_list"]
	var r = []
	for(let i = 0; i < x.length; i++) {
		var z = await LS.getItem(x[i])
		var u = z.split('\n')
		u.forEach((d, j) => {
			if(!d) {
				r.push({
					"id": `${i+1}${j}`*1,
					"priority": 1,
					"action": {
						"type": "block"
					},
					"condition": {
						"urlFilter": d,
						"resourceTypes": [
							"font",
							"ping",
							"other",
							"image",
							"media",
							"object",
							"script",
							"sub_frame",
							"webbundle",
							"websocket",
							"csp_report",
							"main_frame",
							"stylesheet",
							"webtransport",
							"xmlhttprequest"
						]
					}
				})
			}
		})
		
	}
	chrome.declarativeNetRequest.getDynamicRules(e => {
		const p = e.map(rule => rule.id)
		chrome.declarativeNetRequest.updateDynamicRules(
			{
				removeRuleIds: p,
				addRules: r
			}
		)
	})
}
