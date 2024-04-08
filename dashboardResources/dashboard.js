const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;

if(isFirefox) {
    document.getElementById("chromiumIsWorking").style.display = "none";
} else {
    document.getElementById("gekkoIsWorking").style.display = "none";
}

function localizeHtmlPage() {
    const objects = document.getElementsByTagName('html');
    for (let j = 0; j < objects.length; j++) {
        var obj = objects[j];
        var valStrH = obj.innerHTML.toString();
        var valNewH = valStrH.replace(/__MSG_(\w+)__/g, (match, v1) => {
            return v1 ? chrome.i18n.getMessage(v1) : "";
        })
        if(valNewH != valStrH) {
            obj.innerHTML = valNewH;
        }
    }
}

localizeHtmlPage();
