const storage = {
    getAllItems: () => browser.storage.local.get(),
    getItem: async (key) => (await browser.storage.local.get(key))[key],
    setItem: (key, val) => browser.storage.local.set({ [key]: val }),
    removeItems: (keys) => browser.storage.local.remove(keys)
}

const base = "https://raw.githubusercontent.com/kgsensei/AnonymousExtension/master/hosts/"
const r = ["a_list", "i_list", "t_list", ".txt|"]

const udl = async () => {
    let x = [
        r[0] + r[3] + r[0],
        r[1] + r[3] + r[1],
        r[2] + r[3] + r[2]
    ]

    for (let i = 0; i < x.length; i++) {
        let y = x[i].split('|')
        await fetch(base + y[0])
        .then(r => r.text())
        .then(async r => {
            storage.setItem(y[1], r)
        })
    }

    brc()
}

const brc = async () => {
    let x = [r[0], r[1], r[2]],
        j = []

    for (let i = 0; i < x.length; i++) {
        let z = await storage.getItem(x[i]),
            u = z.split('\n')

        u.forEach((d, k) => {
            if (d != '') {
                j.push({
                    "id": `${i + 1}${k}` * 1,
                    "priority": 1,
                    "action": { "type": "block" },
                    "condition": {
                        "urlFilter": d,
                        "resourceTypes": [
                            "font", "ping", "other",
                            "websocket",
                            "image", "media", "object",
                            "csp_report", "xmlhttprequest",
                            "stylesheet",
                            "script", "sub_frame"
                        ]
                    }
                })
            }
        })
    }

    browser.declarativeNetRequest.getDynamicRules(e => {
        const p = e.map(rule => rule.id)
        browser.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: p,
            addRules: j
        })
    })
}

fetch(base + "vrCh.txt")
.then(r => r.text())
.then(async r => {
    if (r != await storage.getItem("v")) {
        udl()
        storage.setItem("v", r)
    } else {
        brc()
    }
})
