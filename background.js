f={
	getAllItems:()=>chrome.storage.local.get(),
	getItem:async(key)=>(await chrome.storage.local.get(key))[key],
	setItem:(key,val)=>chrome.storage.local.set({[key]:val}),
	removeItems:(keys)=>chrome.storage.local.remove(keys)}
h="https://raw.githubusercontent.com/kgsensei/AnonymousExtension/master/hosts/"
r=["a_list","i_list","t_list",".txt|"]
udl = async() => {
	var x=[r[0]+r[3]+r[0],r[1]+r[3]+r[1],r[2]+r[3]+r[2]]
	for(let i=0;i<x.length;i++){
		let y=x[i].split('|')
		await fetch(h+y[0])
		.then((r)=>r.text())
		.then(async(r)=>{f.setItem(y[1],r)})
	}brc()}
brc = async() => {
	var x=[r[0],r[1],r[2]]
	var j=[]
	for(let i=0;i<x.length;i++){
		var z=await f.getItem(x[i])
		var u=z.split('\n')
		u.forEach((d,k)=>{
			if(d!=''){
				j.push({
					"id":`${i+1}${k}`*1,
					"priority":1,
					"action":{"type":"block"},
					"condition":{
						"urlFilter":d,
						"resourceTypes":[
							"font","ping","other",
							"webbundle","websocket",
							"image","media","object",
							"csp_report","main_frame",
							"stylesheet","webtransport",
							"script","sub_frame","xmlhttprequest",							
						]}})}})}
	chrome.declarativeNetRequest.getDynamicRules(e=>{
		const p=e.map(rule=>rule.id)
		chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds:p,addRules:j})})}
fetch(h+"vrCh.txt")
.then((r)=>r.text())
.then(async(r)=>{
	if(r!=await f.getItem("v")){
		udl()
		f.setItem("v", r)
	}else{brc()}})
