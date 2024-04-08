const storage = {
    getAllItems: () => browser.storage.local.get(),
    getItem: async (key) => (await browser.storage.local.get(key))[key],
    setItem: (key, val) => browser.storage.local.set({ [key]: val }),
    removeItems: (keys) => browser.storage.local.remove(keys)
}

const base = "https://raw.githubusercontent.com/kgsensei/AnonymousExtension/master/hosts/"
const list = "blacklist.txt"

const updateRuleset = async () => {
    await fetch(base + list)
    .then(r => r.text())
    .then(async r => {
        storage.setItem(list, r)

        buildBrowserRules()
    })
}

const buildBrowserRules = async () => {
    let blockType = "Block_Normal"

    let rulesList = []

    let storedRules = await storage.getItem(list)

    let parsedHosts = storedRules.split('\n')

    parsedHosts.forEach((filter, index) => {
        filter = filter.trim()
        if(filter[0] === '~') {
            // Update block type, supported are 'Block_Normal' and 'Block_All'
            blockType = filter.split(' ')[1]
        } else {
            // Remove newlines and comments from valid filters
            if(filter !== '' && filter[0] !== '#') {
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
                ]

                var action = { type: "block" }

                if(blockType === "Block_All") {
                    resourceTypes = [ "main_frame" ]

                    action = {
                        type: "redirect",
                        redirect: {
                            url: "https://rainydais.com/"
                        }
                    }
                }

                rulesList.push({
                    id: (index + 1),
                    priority: (blockType === "Block_All" ? 2 : 1),
                    condition: {
                        urlFilter: filter,
                        resourceTypes: resourceTypes
                    },
                    action: action
                })
            }
        }
    })

    browser.declarativeNetRequest.getDynamicRules(oldRules => {
        const oldRuleIds = oldRules.map(rule => rule.id)

        browser.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: oldRuleIds,
            addRules: rulesList
        })
    })
}

fetch(base + "vrCh.txt")
.then(r => r.text())
.then(async r => {
    if(r != await storage.getItem("v")) {
        // If blacklist version mismatch then update
        updateRuleset()
        storage.setItem("v", r)
    } else {
        // Else, build ruleset
        buildBrowserRules()
    }
})
