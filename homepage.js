fadeAnimationTime=1000
checkedvar=localStorage.getItem('enabled')
if(checkedvar==null||checkedvar==undefined){
	localStorage.setItem('enabled','yes')
	document.getElementById("enabled_checkbox").checked=1
}else{
	if(checkedvar=='yes'){document.getElementById("enabled_checkbox").checked=1}
	if(checkedvar=='no'){document.getElementById("enabled_checkbox").checked=0}
}

$("#enabled_checkbox").click(function(){
	element=document.getElementById("enabled_checkbox")
	if(element.checked){
		localStorage.setItem('enabled','yes')
		$('#fs_0').fadeIn(fadeAnimationTime)
		document.getElementById('fs_0').innerHTML='Enabled'
		$('#fs_0').fadeOut(fadeAnimationTime)
	}else{
		localStorage.setItem('enabled','no')
		$('#fs_0').fadeIn(fadeAnimationTime)
		document.getElementById('fs_0').innerHTML='Disabled'
		$('#fs_0').fadeOut(fadeAnimationTime)
	}
})

$("#clear_data_now_btn").click(function(){
    var archive=[],keys=Object.keys(localStorage),i=0,key
    for(;key=keys[i];i++){if(key.substr(0,3)=='tb-'){
		archive.push(key)
		localStorage.removeItem(key)
	}}
	$('#fs_1').fadeIn(fadeAnimationTime)
	document.getElementById('fs_1').innerHTML='Removed '+archive.length+' Items'
	$('#fs_1').fadeOut(fadeAnimationTime)
})

String.prototype.toLocation=function(){
    var a=document.createElement('a')
	a.href=this
	return a.hostname
}

function checkTrackersBlocked(){
	trackers=localStorage.getItem('tb-'+localStorage.getItem('lastTabID'))
	targturl=localStorage.getItem('lastTabUR').toLocation()
	document.getElementById('url_place').innerHTML=targturl
	if(trackers!=''){document.getElementById('trackers_place').innerHTML=trackers}
	else{document.getElementById('trackers_place').innerHTML='?'}
	setTimeout(function(){checkTrackersBlocked()},500)
}

function localizeHtmlPage(){
    var objects=document.getElementsByTagName('html')
    for(var j=0;j<objects.length;j++){
        var obj=objects[j]
        var valStrH=obj.innerHTML.toString()
        var valNewH=valStrH.replace(/__MSG_(\w+)__/g,function(match,v1){
            return v1?chrome.i18n.getMessage(v1):""
        })
        if(valNewH!=valStrH){obj.innerHTML=valNewH}
    }
}

localizeHtmlPage()
checkTrackersBlocked()
