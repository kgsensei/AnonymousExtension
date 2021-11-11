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
	}else{
		localStorage.setItem('enabled','no')
	}
})
