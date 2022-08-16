const urls = [
	"optimizely.com",
	"px-cloud.net",
	"/api-proxy/-/event",
	"withgoogle.com/csp",
	"raygun.io",
	"grabify.link",
	"lovebird.guru",
	"trulove.guru",
	"dateing.club",
	"shrekis.life",
	"headshot.monster",
	"gaming-at-my.best",
	"progaming.monster",
	"yourmy.monster",
	"imageshare.best",
	"screenshot.best",
	"gamingfun.me",
	"catsnthing.com",
	"catsnthings.fun",
	"curiouscat.club",
	"joinmy.site",
	"fortnitechat.site",
	"byrriet.cyou",
	"fright12ening-cr34eep.xyz",
	"fortnight.space",
	"freegiftcards.co",
	"stopify.co",
	"leancoding.co",
	"spyware.com",
	"creator-partners.com",
	"activation-cloud.com",
	"spamrl.com",
	"iplogger.org",
	"ps3cfw.com",
	"linkify.me",
	"sinister.ly",
	"blasze.com",
	"geoad.org",
	"pngline.com",
	"xbox-booter.com",
	"infected-zone.com",
	"ipgrabber.dalenryder.com",
	"discordresolver.c99.nl",
	"xbonline.live",
	"or-action.com",
	"cutt.ly",
	"shadyurl.com",
	"iptracking.com",
	"ctrlhub.co",
	"rumchiamami.com",
	"grabify.icu",
	"googletagmanager.com",
	"ably.io",
	"graph.instagram.com",
	"/logging",
	"/ajax/bz",
	"fburl.com",
	"google.com/log",
	"/web/xls.aspx",
	"/fd/ls/lsp.aspx",
	"adservice",
	"doubleclick.net",
	"demdex.net",
	"pubmatic.com",
	"ns1p",
	"/gsi/status",
	"ebay.com/identity/",
	"rover.ebay.com",
	"googlesyndication.com",
	"online-metrix.net",
	"/nap/napkinapi/v1/",
	"pulsar.ebay.com",
	"ebay.com/rec/plmt/",
	"ebay.com/gh/",
	"securedtouch.com",
	"ads.linkedin.com",
	"facebook.net",
	"analytics",
	"bat.bing.com",
	"braintreegateway.com",
	"dcmn.io",
	"tvsquared.com",
	"w55c.net",
	"pxf.io",
	"hexagon-analytics.com",
	"criteo.net",
	"criteo.com",
	"api/log",
	"dnacdn.net",
	"/1/batch/1/OP/",
	"amazon.com/rd/uedata",
	"unagi.amazon.com",
	"amazon.com/ah/ajax/counter",
	"amazon.com/cross_border_interstitial/",
	"amazon.com/cem",
	"flashtalking.com",
	"aax-us-iad.amazon.com",
	"aax-us-east-retail-direct.amazon.com",
	"aax-us-west-retail-direct.amazon.com",
	"aax-us-central-retail-direct.amazon.com",
	"aax-us-iad.amazon.com",
	"doubleverify.com",
	"unagi-na.amazon.com",
	"truste.com",
	"trustarc.com",
	"adform.net",
	"spotxchange.com",
	"serving-sys.com",
	"amazon-adsystem.com",
	"bidswitch.net",
	"casalemedia.com",
	"semasio.net",
	"advertising.com",
	"zeotap.com",
	"exelator.com",
	"samplicio.us",
	"analytics.twitter.com",
	"rubiconproject.com",
	"/gp/sponsored-products/logging",
	"onetrust.com",
	"/assets/oneTrust/",
	"/api/v9/science",
	"/v9/auth/location-metadata",
	"sentry.io",
	"/api/growth-events",
	"scorecardresearch.com",
	"krxd.net",
	"branch.io",
	"stats.pandora.com",
	"clicktale.net",
	"tiktok",
	"ibytedtos.com",
	"byteoversea.com",
	"/resource/StatsLogResource",
	"/resource/UserRegisterTrackActionResource",
	"/resource/ActivateExperimentResource",
	"/resource/ContextLogResource",
	"/v3/spam/fingerprints",
	"/resource/ApiResource",
	"tvpixel.com",
	"/_/_/",
	"/resource/UserExperienceResource",
	"/resource/UnauthUserDataResource",
	"/webapp/facebook",
	"/webapp/fb",
	"web.vortex.data.microsoft.com/collect",
	"visualstudio.com/v2/track",
	"browser.events.data.microsoft.com/OneCollector",
	"browser.pipe.aria.microsoft.com/Collector",
	"monitor.azure.com",
	"metrics.roblox.com",
	"evidon.com",
	"veriff.me",
	"ecsv2.roblox.com",
	"abtesting.roblox.com",
	"/user-sponsorship",
	"ads.roblox.com",
	"presence.roblox.com",
	"github.com/Endermanch/MalwareDatabase",
	"youareanidiot.com",
	"foranalysticsonly.com",
	"xbonline.live",
	"xbox-booter.com",
	"infected-zone.com",
	"cxkes.me",
	"pngline.com",
	"geoad.org",
	"ps3cfw.com",
	"iplogger.org",
	"activation-cloud.com",
	"life360.com",
	"creator-partners.com",
	"spyware.com",
	"leancoding.co",
	"fright12ening-cr34eep.xyz",
	"byrriet.cyou",
	"xchat.org",
	"aqrmailadvert15dx.xyz",
	"politgroup.top",
	"promosedu.com",
	"runmureed.com",
	"sgflp.com",
	"tech-might.com",
	"techhunder.com",
	"cacsite.com",
	"growyourownteacher.co.uk",
	"villamariana.com.br",
	"oksagroupinc.ru",
	"audigier-sautel.com",
	"aspmailcenter2.com",
	"ddns.net",
	"maxidoms.com",
	"nsdic.pp.ru",
	"vbvnfbaloobazabncdo.com",
	"servicescrypta.ru",
	"myssfgfgfvfghkfghjlkdd.info",
	"slivka.trade",
	"basuka.dp.ua",
	"medisonsteeltech.com",
	"regruhosting.ru",
	"laconicbeats.com",
	"zainjam.ru",
	"zapto.org",
	"ninetyman.org.in",
	"pandyi.com",
	"vipzeus.com",
	"liquidmetalfuniture.in",
	"adv.br",
	"planisapres.cl",
	"minerasdasdne.ru",
	"yellow4kiss.org",
	"mineronline.ru",
	"aldierifs.com",
	"gickshop.ru",
	"forbesols.co.ke",
	"laboosti.com",
	"hosting2balooonba.com",
	"resvnew.ru",
	"xstra.com",
	"hosting2balonbhgytdd.com",
	"kozow.com",
	"s33k3r.top",
	"bitdefenderesupdate.ru",
	"junmayisstillon.top",
	"stroiclimat.ru",
	"000webhostapp.com",
	"coilprofil.ro",
	"kiwi123kiwi.work",
	"bplaced.net",
	"coredcompany.com.ng",
	"gmailsecurityteam.com",
	"safe110413.com",
	"prorustia.com",
	"packzang.com",
	"battsonex.xyz",
	"saleszubir.com",
	"econo-fitness.com",
	"experienceeartth.org",
	"livehost.fr",
	"civilner.top",
	"ddnsking.com",
	"agenteinformaticos.ru",
	"hopto.org",
	"helpasia.ga",
	"lolx.gq",
	"tokimecltd.ru",
	"qwerty1x.tk",
	"financeetech.com",
	"fmarchzeetequwxtw.wang",
	"xtreme.ml",
	"jivani.pw",
	"yeezydiscounts.co.uk",
	"unix.gamehoster.biz",
	"obi-stuffs.ga",
	"liverslove.info",
	"medikool.co.il",
	"thewindsorclinic.co.uk",
	"bplaced.net",
	"central-hispano.eu",
	"aryanstour.com",
	"avindustiralproducts.co.uk",
	"basekingsmentop.top",
	"paialowereasterncherokeenationsc.com",
	"chinamulty.com",
	"wh-designs.com",
	"fuledotam.fr",
	"r0b3nindy.pw",
	"apareca.com.br",
	"pregnancy.ae",
	"budget2017.info",
	"hdfc.pp.ru",
	"aceo.com.pl",
	"fixs-web.com",
	"permewick.com",
	"hellasickclothing.com",
	"avakfi.ml",
	"farterhotelshost.net",
	"bocaleader.com",
	"microsoft-error-reporting.xyz",
	"lvmgc.com",
	"matexx-japan.com",
	"yatsane.com",
	"abbasholland.tk",
	"neobankdoor.net",
	"zangmo.co.jp",
	"cytruscompany.pw",
	"indianshippingservices.com",
	"430development.com",
	"atmtest.ezar.ru",
	"webspace.ph",
	"donisaurus.id",
	"examgist.net",
	"aymaraviajes.com.ar",
	"cankardeslerklima.com",
	"reedtradeinc.in",
	"adobedownloadupdate.com",
	"goodkat.pw",
	"daniellucky.com",
	"ciceidr.top",
	"wegas.info",
	"exploit0day.top",
	"tiger-atmosfera.ga",
	"intcomsync.com",
	"ruhatlyagroup.com",
	"ifindit.xyz",
	"barleyxghb.com",
	"samb0a.com",
	"faublimited.top",
	"tumbosco.com",
	"bsmax.fr",
	"frenditre.top",
	"exploitsauce.com",
	"clinique-sainte-marie.top",
	"neevavantgarde.com",
	"planisapres.cl",
	"temp.swtest.ru",
	"kycxinternetsolution.com",
	"autorembisz.pl",
	"f0xc0n.biz",
	"wowyy.ga",
	"shaddyfiles.ru",
	"fuledotam.fr",
	"goodgirlsnow.in",
	"stanleyxcxd.com",
	"sample.com",
	"robertsplacements.ru",
	"pptpp.ru",
	"emzmnQXLRM3tnwCF.ga",
	"przemyslawszymanowski.pl",
	"win10.host",
	"bget.ru",
	"castro4sucess.biz",
	"shopbaite.ru",
	"moneygnom.com",
	"krungonline.top",
	"asdlkashdkahsda.ru",
	"opahdiqwklnasd.com",
	"aconnectgateway.com",
	"sofyan-kecita.tk",
	"sjkdhfjkdsf.ru",
	"fbicybertaskforce.ru",
	"j0k3rj0k3r.tk",
	"onlyckan.top",
	"brausincsystem.pro",
	"derekz.xyz",
	"bget.ru",
	"sentembertolls.ru",
	"352andro.ru",
	"paypal.com/tagmanager",
	"cookiepro.com",
	"platform.twitter.com/widgets",
	"adinplay.com",
	"ad-delivery.net",
	"ads.google.com",
	"/litms/api/metadata/user",
	"/li/track",
	"trkn.us",
	"/api/graphql/",
	"/ajax/webstorage/process_keys/",
	"/ajax/bulk-route-definitions/",
	"/homepage-guest/api/ingraphs/",,
	"/ajax/bnzai",
	"/litms/vendor/google/",
	"2mdn.net",
	"proofapi.com",
	"distillery.wistia.com",
	"pipedream.wistia.com",
	"useproof.com",
	"app.clickfunnels.com",
	"attributionapp.com",
	"goto.clickfunnels.com",
	"pingdom.net",
	"/messenger/web/metrics",
	"fresnel-events.vimeocdn.com",
	"/ablincoln/",
	"nr-data.net",
	"wickedreports.com",
	"convertbox.com",
	"getresponse.com",
	"/xoplatform/logger/api",
	"leadpages.io",
	"hotjar.io",
	"hotjar.com",
	"instapagemetrics.com",
	"tawk.to",
	"/api/stats",
	"/youtubei/v1/log_event",
	"/ptracking",
	"hellobar.com",
	"instapage.com",
	"ads90.com",
	"/gen_204",
	"opportunity-advisor.com",
	"ivanrendulic.com",
	"thesolosquad.com",
	"ecomm.events",
	"ecwid.com",
	"generate_204",
	"matijasoloads.com",
	"massiveactionblog.com",
	"evansoloads.com",
	"solospreneur.com",
	"dotcommoney.net",
	"/api/1/location",
	"location.squarespace.com",
	"/api/track",
	"/api/1/performance",
	"events.squarespace.com",
	"/_api/wix-laboratory-server",
	"/_api/wix-html-login-webapp/user/getUserDetails",
	"brandfolder.com",
	"ngpvan.com",
	"cdn-cgi/rum",
	"openx.net",
	"adnxs.com",
	"media.net",
	"omnitagjs.com",
	"a-mo.net",
	"lijit.com",
	"sharethrough.com",
	"1rx.io",
	"onetag-sys.com",
	"stressthem.to",
	"cloudflareinsights.com",
	"google-analytics",
	"/hmsweb/devicesupport/v3",
	"/hmsweb/devicesupport/v2",
	"googleapis.com/v1/firelog/legacy/log",
	"statuspage.io",
	"ravenjs.com",
	"fastly-insights.com",
	"ethicalads.io",
	"analytics.ahrefs.com",
	"trackerads.com",
	"intentiq.com",
	"primis.tech",
	"stickyadstv.com",
	"rlcdn.com",
	"ads.js",
	"googletagservices.com",
	"cpmstar.com",
	"adsafeprotected.com",
	"bugsnag.com",
	"mixpanel.com",
	"media-lab.ai",
	"taboola.com",
	"vntsm.com",
	"upapi.net",
	"4dex.io",
	"aniview.com",
	"tracking",
	"getclicky.com",
	"cat.pexels.com",
	"braze.com",
	"me/user-info",
	"/global/js/facebook-connect",
	"quantserve.com",
	"/SearchConsoleAggReportUi/browserinfo",
	"ezoic.net",
	"disqus.com",
	"disquscdn.com",
	"hsforms.net",
	"hs-scripts.com",
	"mxpnl.com",
	"eloqua.com",
	"en25.com",
	"ezodn.com",
	"visualwebsiteoptimizer.com",
	"vwo.com",
	"adsrvr.org",
	"3lift.com",
	"triplelift.com",
	"lngtd.com",
	"btloader.com",
	"s-onetag.com",
	"bounceads.net",
	"gritbravedownload.com",
	"privacymanager.io",
	"tm-awx.com",
	"viafoura.co",
	"outbrain.com",
	"smartadserver.com",
	"richaudience.com",
	"justpremium.com",
	"notix.io",
	"ads.min.js",
	"hetaruvg.com",
	"dibsemey.com",
	"rtmark.net",
	"betgorebysson.club",
	"rastconvy.xyz",
	"rationpecial.xyz",
	"lagged.com",
	"play-games.com",
	"adlightning.com",
	"microsoft.com/*collect",
	"mktoresp.com",
	"contentsquare.net",
	"instagram.com/*seen",
	"/chat/v1/presence/setpresence",
	"/u/0/webchannel/events",
	"bitly.com",
	"bit.ly",
	"*://*.instagram.com/*/seen/",
	"clicktale.com",
	"everesttech.net",
	"impactradius-event.com",
	"impactradius.com",
	"impact.com",
	"affiliated.io",
	"client_204",
	"/v1/ads/identity/pixelUrls",
	"bluekai.com",
	"edgetrksvc.ebay.com",
	"/customer/v1/",
	"metrics.nexus",
	"tiqcdn.com",
	"/ads/pixel.js",
	"uwt.js",
	"scevent.min.js",
	"/sensorCollect/",
	"collector.github.com",
	"/_private/browser/stats",
	"/api/user_location",
	"/web/metrics",
	"client-log",
	"/fb.js",
	"marketo.net",
	"growsumo.com",
	"intellimize.co",
	"clientlogger",
	"client_event",
	"/attribution/event",
	"mouselog",
	"chartbeat.com",
	"bounceexchange.com",
	"ipapi.co/json",
	"ads.com"
]

const LS = {
	getAllItems: () => chrome.storage.local.get(),
	getItem: async key => (await chrome.storage.local.get(key))[key],
	setItem: (key, val) => chrome.storage.local.set({[key]: val}),
	removeItems: keys => chrome.storage.local.remove(keys),
}
const h = "https://raw.githubusercontent.com/kgsensei/AnonymousExtension/master/hosts/"

function updateDomainLists() {
	var x = ["a_list.txt|ad_list", "i_list.txt|ip_list", "t_list.txt|tracker_list"]
	for(let i = 0; i < x.length; i++) {
		let y = x[i].split('|')
		fetch(h + y[0])
		.then((r) => r.text())
		.then(async (r) => {
			console.log(r)
			LS.setItem(y[1], r)
		})
	}
	buildRuleConditions()
}

fetch(h + "version_tracker.txt")
.then((r) => r.text())
.then(async(r) => {
	if(r != await LS.getItem("v")) {
		console.log("NEW UPDATE")
		updateDomainLists()
		LS.setItem("v", r)
	} else {
		console.log("CURRENT VER")
		buildRuleConditions()
	}
})

async function buildRuleConditions() {
	var x = ["ad_list", "ip_list", "tracker_list"]
	for(let i = 0; i < x.length; i++) {
		var r = []
		var z = await LS.getItem(x[i])
		var u = z.split('\n')
		u.forEach((d, j) => {
			console.log(d)
			console.log(j)
			r.push({
				"id": j + i,
				"priority": 1,
				"action": {
					"type": "block"
				},
				"condition": {
					"urlFilter": d,
					"resourceTypes": [
						"csp_report", "font", "image", "main_frame", "media", "object", "other", "ping", "script",
						"stylesheet", "sub_frame", "webbundle", "websocket", "webtransport", "xmlhttprequest"
					]
				}
			})
		})
		chrome.declarativeNetRequest.getDynamicRules(previousRules => {
			const p = previousRules.map(rule => rule.id)
			chrome.declarativeNetRequest.updateDynamicRules(
				{
					removeRuleIds: p,
					addRules: r
				}
			)
		})
	}
}

/*
chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(function (o) {
	console.log('rule matched:', o)
})
*/
