$(document).ready(() => {
	animTime = 275
	checkedvar = localStorage.getItem('enabled')

	if(checkedvar == null || checkedvar == undefined){
		localStorage.setItem('enabled', 'yes')
		document.getElementById("enabled_checkbox").checked = 1
	}

	if(checkedvar == 'yes') {document.getElementById("enabled_checkbox").checked = 1}
	if(checkedvar == 'no') {document.getElementById("enabled_checkbox").checked = 0}

	$("#enabled_checkbox").click(() => {
		element=document.getElementById("enabled_checkbox")
		if(element.checked) {
			localStorage.setItem('enabled', 'yes')
			$('#fs_0').fadeIn(animTime)
			document.getElementById('fs_0').innerHTML = 'Enabled'
			$('#fs_0').fadeOut(animTime)
		} else {
			localStorage.setItem('enabled','no')
			$('#fs_0').fadeIn(animTime)
			document.getElementById('fs_0').innerHTML = 'Disabled'
			$('#fs_0').fadeOut(animTime)
		}
	})
})

function localizeHtmlPage() {
    var objects = document.getElementsByTagName('html')
    for(var j = 0; j < objects.length; j++) {
        var obj = objects[j]
        var valStrH = obj.innerHTML.toString()
        var valNewH = valStrH.replace(/__MSG_(\w+)__/g, (match, v1) => {
            return v1 ? chrome.i18n.getMessage(v1) : ""
        })
        if(valNewH != valStrH) {obj.innerHTML = valNewH}
    }
}

localizeHtmlPage()
