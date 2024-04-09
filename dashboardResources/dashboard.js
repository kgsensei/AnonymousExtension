const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1

if(isFirefox) {
    document.getElementById("chromiumIsWorking").style.display = "none"
} else {
    document.getElementById("gekkoIsWorking").style.display = "none"
}

function checkPermissions() {
    chrome.permissions.contains({ origins: [ '<all_urls>' ] })
    .then(hasPermissions => {
        if(!hasPermissions) {
            document.getElementById("settings_tracking_protection_status").classList.remove("secondary")
            document.getElementById("settings_tracking_protection_status").classList.add("warning")

            if(isFirefox) {
                document.getElementById("settings_tracking_protection_status").setAttribute("target", "_blank")
                document.getElementById("settings_tracking_protection_status").setAttribute("href", "/missing_permissions.html")
            }

            document.getElementById("settings_tracking_protection_status").innerText = "__MSG_settings_tracking_protection_low__"

            // Rerun localization because we updated some of the content now
            localizeHtmlPage()
        }
    })
}

function localizeHtmlPage() {
    const objects = document.getElementsByTagName('html')

    for (let j = 0; j < objects.length; j++) {
        var obj = objects[j]
        var valStrH = obj.innerHTML.toString()
        var valNewH = valStrH.replace(/__MSG_(\w+)__/g, (match, v1) => {
            return v1 ? chrome.i18n.getMessage(v1) : ""
        })

        if(valNewH != valStrH) {
            obj.innerHTML = valNewH
        }
    }
}

checkPermissions()
localizeHtmlPage()
