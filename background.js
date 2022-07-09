chrome.webNavigation.onCommitted.addListener(function(details) {
	if(details.tabId != -1 && details.frameId == 0 && details.url.indexOf('devtools') == -1) {
		localStorage.setItem('tb-'+details.tabId,'0')
	}
})

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tabInfo) {
	if(tabInfo.url.indexOf('devtools') == -1) {
		localStorage.setItem('lastTabID', tabID)
		localStorage.setItem('lastTabUR', tabInfo.url)
	}
})

chrome.tabs.onSelectionChanged.addListener(function(tabID) {
	chrome.tabs.query(
		{
			currentWindow: true,
			active: true
		}, function(tabs) {
			if(tabs[0].url.indexOf('devtools') == -1) {
				localStorage.setItem('lastTabID', tabs[0].id)
				localStorage.setItem('lastTabUR', tabs[0].url)
			}
		}
	)
})

chrome.webRequest.onBeforeRequest.addListener(function(details) {
	enabled = localStorage.getItem('enabled')
	if(enabled == null || enabled == undefined) {
		localStorage.setItem('enabled', 'yes')
		enabled = 'yes'
	}
	if(enabled == 'yes') {
		if(details.tabId != -1) {
			cnumbertb = localStorage.getItem('tb-' + details.tabId)
			localStorage.setItem('tb-' + details.tabId,cnumbertb * 1 + 1)
		} return {
			cancel: true
		}
	}
},{urls:[
	"*://*.optimizely.com/*",
	"*://*.px-cloud.net/*",
	"*://*.change.org/api-proxy/-/event*",
	"*://*.withgoogle.com/csp*",
	"*://*.raygun.io/*",
	"*://*.google-analytics.com/*",
	"*://*.grabify.link/*",
	"*://*.lovebird.guru/*",
	"*://*.trulove.guru/*",
	"*://*.dateing.club/*",
	"*://*.shrekis.life/*",
	"*://*.headshot.monster/*",
	"*://*.gaming-at-my.best/*",
	"*://*.progaming.monster/*",
	"*://*.yourmy.monster/*",
	"*://*.imageshare.best/*",
	"*://*.screenshot.best/*",
	"*://*.gamingfun.me/*",
	"*://*.catsnthing.com/*",
	"*://*.catsnthings.fun/*",
	"*://*.curiouscat.club/*",
	"*://*.joinmy.site/*",
	"*://*.fortnitechat.site/*",
	"*://*.byrriet.cyou/*",
	"*://*.fright12ening-cr34eep.xyz/*",
	"*://*.fortnight.space/*",
	"*://*.freegiftcards.co/*",
	"*://*.stopify.co/*",
	"*://*.leancoding.co/*",
	"*://*.spyware.com/*",
	"*://*.creator-partners.com/*",
	"*://*.activation-cloud.com/*",
	"*://*.spamrl.com/*",
	"*://*.iplogger.org/*",
	"*://*.ps3cfw.com/*",
	"*://*.linkify.me/*",
	"*://*.sinister.ly/*",
	"*://*.blasze.com/*",
	"*://*.geoad.org/*",
	"*://*.pngline.com/*",
	"*://*.xbox-booter.com/*",
	"*://*.xbonline.live/*",
	"*://*.infected-zone.com/*",
	"*://ipgrabber.dalenryder.com/*",
	"*://discordresolver.c99.nl/*",
	"*://*.xbonline.live/*",
	"*://*.or-action.com/*",
	"*://*.cutt.ly/*",
	"*://*.shadyurl.com/*",
	"*://*.iptracking.com/*",
	"*://*.ctrlhub.co/*",
	"*://*.rumchiamami.com/*",
	"*://*.grabify.icu/*",
	"*://*.googletagmanager.com/*",
	"*://*.ably.io/*",
	"*://graph.instagram.com/*",
	"*://*.instagram.com/logging*",
	"*://*.instagram.com/ajax/bz",
	"*://*.fburl.com/*",
	"*://*.google.com/log*",
	"*://adservice.google.com/*",
	"*://*.google.com/gen_204?*",
	"*://*.bing.com/web/xls.aspx",
	"*://*.bing.com/fd/ls/lsp.aspx?*",
	"*://*.yahoo.com/*",
	"*://*.ebayadservices.com/*",
	"*://*.doubleclick.net/*",
	"*://*.demdex.net/*",
	"*://*.pubmatic.com/*",
	"*://*.ns1p.net/*",
	"*://accounts.google.com/gsi/status?*",
	"*://*.ebay.com/identity/*",
	"*://rover.ebay.com/*",
	"*://*.googlesyndication.com/*",
	"*://*.online-metrix.net/*",
	"*://*.ebay.com/nap/napkinapi/v1/*",
	"*://pulsar.ebay.com/*",
	"*://*.ebay.com/rec/plmt/*",
	"*://*.ebay.com/gh/*",
	"*://*.securedtouch.com/*",
	"*://*.ads.linkedin.com/*",
	"*://*.facebook.net/*",
	"*://*.wish.com/api/analytics/*",
	"*://bat.bing.com/*",
	"*://*.braintreegateway.com/*",
	"*://*.dcmn.io/*",
	"*://*.tvsquared.com/*",
	"*://*.w55c.net/*",
	"*://*.pxf.io/*",
	"*://*.hexagon-analytics.com/*",
	"*://*.criteo.net/*",
	"*://*.criteo.com/*",
	"*://*.wish.com/api/log/*",
	"*://*.dnacdn.net/*",
	"*://*.wish.com/api/mobile/*",
	"*://fls-na.amazon.com/*",
	"*://*.amazon.com/rd/uedata?*",
	"*://unagi.amazon.com/*",
	"*://*.amazon.com/ah/ajax/counter?*",
	"*://*.amazon.com/cross_border_interstitial/*",
	"*://*.amazon.com/cem",
	"*://*.flashtalking.com/*",
	"*://aax-us-iad.amazon.com/*",
	"*://aax-us-east-retail-direct.amazon.com/*",
	"*://aax-us-west-retail-direct.amazon.com/*",
	"*://aax-us-central-retail-direct.amazon.com/*",
	"*://aax-us-iad.amazon.com/*",
	"*://*.doubleverify.com/*",
	"*://unagi-na.amazon.com/*",
	"*://*.truste.com/*",
	"*://*.trustarc.com/*",
	"*://*.adform.net/*",
	"*://*.spotxchange.com/*",
	"*://*.serving-sys.com/*",
	"*://*.amazon-adsystem.com/*",
	"*://*.bidswitch.net/*",
	"*://*.casalemedia.com/*",
	"*://*.semasio.net/*",
	"*://*.advertising.com/*",
	"*://*.zeotap.com/*",
	"*://*.exelator.com/*",
	"*://*.samplicio.us/*",
	"*://analytics.twitter.com/*",
	"*://*.rubiconproject.com/*",
	"*://*.amazon.com/gp/sponsored-products/logging*",
	"*://*.onetrust.com/*",
	"*://*.discord.com/assets/oneTrust/*",
	"*://*.discord.com/api/v9/science",
	"*://*.discord.com/api/v9/auth/location-metadata",
	"*://*.sentry.io/*",
	"*://*.spotify.com/api/growth-events/*",
	"*://*.scorecardresearch.com/*",
	"*://*.krxd.net/*",
	"*://*.branch.io/*",
	"*://stats.pandora.com/*",
	"*://*.clicktale.net/*",
	"*://*.tiktok.com/*",
	"*://*.ibytedtos.com/*",
	"*://*.tiktokcdn.com/*",
	"*://*.byteoversea.com/*",
	"*://*.pinterest.com/resource/StatsLogResource/*",
	"*://*.pinterest.com/resource/UserRegisterTrackActionResource/*",
	"*://*.pinterest.com/resource/ActivateExperimentResource/*",
	"*://*.pinterest.com/resource/ContextLogResource/*",
	"*://*.pinterest.com/v3/spam/fingerprints/*",
	"*://*.pinterest.com/resource/ApiResource/*",
	"*://*.tvpixel.com/*",
	"*://*.pinterest.com/_/_/*",
	"*://*.pinterest.com/resource/UserExperienceResource/*",
	"*://*.pinterest.com/resource/UnauthUserDataResource/*",
	"*://*.pinimg.com/webapp/facebook*",
	"*://*.pinimg.com/webapp/fb*",
	"*://web.vortex.data.microsoft.com/collect/*",
	"*://*.visualstudio.com/v2/track/*",
	"*://browser.events.data.microsoft.com/OneCollector/*",
	"*://browser.pipe.aria.microsoft.com/Collector/*",
	"*://*.monitor.azure.com/*",
	"*://metrics.roblox.com/*",
	"*://*.evidon.com/*",
	"*://*.veriff.me/*",
	"*://ecsv2.roblox.com/*",
	"*://abtesting.roblox.com/*",
	"*://*.roblox.com/user-sponsorship/*",
	"*://ads.roblox.com/*",
	"*://presence.roblox.com/*",
	"*://*.github.com/Endermanch/MalwareDatabase",
	"*://*.youareanidiot.com/*",
	"*://*.foranalysticsonly.com/*",
	"*://*.xbonline.live/*",
	"*://*.xbox-booter.com/*",
	"*://*.infected-zone.com/*",
	"*://*.cxkes.me/*",
	"*://*.pngline.com/*",
	"*://*.geoad.org/*",
	"*://*.ps3cfw.com/*",
	"*://*.iplogger.org/*",
	"*://*.onion/*",
	"*://*.activation-cloud.com/*",
	"*://*.life360.com/*",
	"*://*.creator-partners.com/*",
	"*://*.spyware.com/*",
	"*://*.leancoding.co/*",
	"*://*.fright12ening-cr34eep.xyz/*",
	"*://*.byrriet.cyou/*",
	"*://*.xchat.org/*",
	"*://*.aqrmailadvert15dx.xyz/*",
	"*://*.politgroup.top/*",
	"*://*.promosedu.com/*",
	"*://*.runmureed.com/*",
	"*://*.sgflp.com/*",
	"*://*.tech-might.com/*",
	"*://*.techhunder.com/*",
	"*://*.cacsite.com/*",
	"*://*.growyourownteacher.co.uk/*",
	"*://*.villamariana.com.br/*",
	"*://*.oksagroupinc.ru/*",
	"*://*.audigier-sautel.com/*",
	"*://*.aspmailcenter2.com/*",
	"*://*.ddns.net/*",
	"*://*.maxidoms.com/*",
	"*://*.nsdic.pp.ru/*",
	"*://*.vbvnfbaloobazabncdo.com/*",
	"*://*.servicescrypta.ru/*",
	"*://*.myssfgfgfvfghkfghjlkdd.info/*",
	"*://*.slivka.trade/*",
	"*://*.basuka.dp.ua/*",
	"*://*.medisonsteeltech.com/*",
	"*://*.regruhosting.ru/*",
	"*://*.laconicbeats.com/*",
	"*://*.zainjam.ru/*",
	"*://*.zapto.org/*",
	"*://*.ninetyman.org.in/*",
	"*://*.pandyi.com/*",
	"*://*.vipzeus.com/*",
	"*://*.liquidmetalfuniture.in/*",
	"*://*.adv.br/*",
	"*://*.planisapres.cl/*",
	"*://*.minerasdasdne.ru/*",
	"*://*.yellow4kiss.org/*",
	"*://*.mineronline.ru/*",
	"*://*.aldierifs.com/*",
	"*://*.gickshop.ru/*",
	"*://*.forbesols.co.ke/*",
	"*://*.laboosti.com/*",
	"*://*.hosting2balooonba.com/*",
	"*://*.resvnew.ru/*",
	"*://*.xstra.com/*",
	"*://*.hosting2balonbhgytdd.com/*",
	"*://*.kozow.com/*",
	"*://*.s33k3r.top/*",
	"*://*.bitdefenderesupdate.ru/*",
	"*://*.junmayisstillon.top/*",
	"*://*.stroiclimat.ru/*",
	"*://*.000webhostapp.com/*",
	"*://*.coilprofil.ro/*",
	"*://*.kiwi123kiwi.work/*",
	"*://*.bplaced.net/*",
	"*://*.coredcompany.com.ng/*",
	"*://*.gmailsecurityteam.com/*",
	"*://*.scf4ozqndm5szivb.onion/*",
	"*://*.safe110413.com/*",
	"*://*.prorustia.com/*",
	"*://*.packzang.com/*",
	"*://*.battsonex.xyz/*",
	"*://*.saleszubir.com/*",
	"*://*.econo-fitness.com/*",
	"*://*.experienceeartth.org/*",
	"*://*.livehost.fr/*",
	"*://*.civilner.top/*",
	"*://*.ddnsking.com/*",
	"*://*.agenteinformaticos.ru/*",
	"*://*.hopto.org/*",
	"*://*.helpasia.ga/*",
	"*://*.lolx.gq/*",
	"*://*.tokimecltd.ru/*",
	"*://*.qwerty1x.tk/*",
	"*://*.financeetech.com/*",
	"*://*.fmarchzeetequwxtw.wang/*",
	"*://*.xtreme.ml/*",
	"*://*.jivani.pw/*",
	"*://*.yeezydiscounts.co.uk/*",
	"*://*.unix.gamehoster.biz/*",
	"*://*.obi-stuffs.ga/*",
	"*://*.liverslove.info/*",
	"*://*.medikool.co.il/*",
	"*://*.thewindsorclinic.co.uk/*",
	"*://*.bplaced.net/*",
	"*://*.central-hispano.eu/*",
	"*://*.aryanstour.com/*",
	"*://*.avindustiralproducts.co.uk/*",
	"*://*.basekingsmentop.top/*",
	"*://*.paialowereasterncherokeenationsc.com/*",
	"*://*.chinamulty.com/*",
	"*://*.wh-designs.com/*",
	"*://*.fuledotam.fr/*",
	"*://*.r0b3nindy.pw/*",
	"*://*.apareca.com.br/*",
	"*://*.pregnancy.ae/*",
	"*://*.budget2017.info/*",
	"*://*.hdfc.pp.ru/*",
	"*://*.aceo.com.pl/*",
	"*://*.fixs-web.com/*",
	"*://*.permewick.com/*",
	"*://*.hellasickclothing.com/*",
	"*://*.avakfi.ml/*",
	"*://*.farterhotelshost.net/*",
	"*://*.bocaleader.com/*",
	"*://*.microsoft-error-reporting.xyz/*",
	"*://*.lvmgc.com/*",
	"*://*.matexx-japan.com/*",
	"*://*.yatsane.com/*",
	"*://*.abbasholland.tk/*",
	"*://*.neobankdoor.net/*",
	"*://*.zangmo.co.jp/*",
	"*://*.cytruscompany.pw/*",
	"*://*.indianshippingservices.com/*",
	"*://*.430development.com/*",
	"*://*.atmtest.ezar.ru/*",
	"*://*.webspace.ph/*",
	"*://*.donisaurus.id/*",
	"*://*.examgist.net/*",
	"*://*.aymaraviajes.com.ar/*",
	"*://*.cankardeslerklima.com/*",
	"*://*.reedtradeinc.in/*",
	"*://*.adobedownloadupdate.com/*",
	"*://*.goodkat.pw/*",
	"*://*.daniellucky.com/*",
	"*://*.ciceidr.top/*",
	"*://*.wegas.info/*",
	"*://*.exploit0day.top/*",
	"*://*.tiger-atmosfera.ga/*",
	"*://*.intcomsync.com/*",
	"*://*.ruhatlyagroup.com/*",
	"*://*.ifindit.xyz/*",
	"*://*.barleyxghb.com/*",
	"*://*.samb0a.com/*",
	"*://*.faublimited.top/*",
	"*://*.tumbosco.com/*",
	"*://*.bsmax.fr/*",
	"*://*.frenditre.top/*",
	"*://*.exploitsauce.com/*",
	"*://*.clinique-sainte-marie.top/*",
	"*://*.neevavantgarde.com/*",
	"*://*.planisapres.cl/*",
	"*://*.temp.swtest.ru/*",
	"*://*.kycxinternetsolution.com/*",
	"*://*.autorembisz.pl/*",
	"*://*.f0xc0n.biz/*",
	"*://*.wowyy.ga/*",
	"*://*.shaddyfiles.ru/*",
	"*://*.fuledotam.fr/*",
	"*://*.goodgirlsnow.in/*",
	"*://*.stanleyxcxd.com/*",
	"*://*.sample.com/*",
	"*://*.robertsplacements.ru/*",
	"*://*.pptpp.ru/*",
	"*://*.emzmnQXLRM3tnwCF.ga/*",
	"*://*.przemyslawszymanowski.pl/*",
	"*://*.win10.host/*",
	"*://*.bget.ru/*",
	"*://*.castro4sucess.biz/*",
	"*://*.shopbaite.ru/*",
	"*://*.moneygnom.com/*",
	"*://*.krungonline.top/*",
	"*://*.asdlkashdkahsda.ru/*",
	"*://*.opahdiqwklnasd.com/*",
	"*://*.aconnectgateway.com/*",
	"*://*.sofyan-kecita.tk/*",
	"*://*.sjkdhfjkdsf.ru/*",
	"*://*.fbicybertaskforce.ru/*",
	"*://*.j0k3rj0k3r.tk/*",
	"*://*.onlyckan.top/*",
	"*://*.brausincsystem.pro/*",
	"*://*.derekz.xyz/*",
	"*://*.bget.ru/*",
	"*://*.sentembertolls.ru/*",
	"*://*.352andro.ru/*",
	"*://*.paypal.com/tagmanager/*",
	"*://*.cookiepro.com/*",
	"*://platform.twitter.com/widgets/*",
	"*://*.adinplay.com/*",
	"*://*.ad-delivery.net/*",
	"*://*.ads.google.com/*",
	"*://*.linkedin.com/litms/api/metadata/user",
	"*://*.linkedin.com/li/track",
	"*://*.trkn.us/*",
	"*://*.facebook.com/tr?*",
	"*://*.linkedin.com/homepage-guest/api/ingraphs/*",
	"*://*.linkedin.com/litms/vendor/google/*",
	"*://*.2mdn.net/*",
	"*://*.proofapi.com/*",
	"*://distillery.wistia.com/*",
	"*://pipedream.wistia.com/*",
	"*://*.useproof.com/*",
	"*://app.clickfunnels.com/*",
	"*://*.attributionapp.com/*",
	"*://goto.clickfunnels.com/*",
	"*://*.pingdom.net/*",
	"*://*.intercom.io/messenger/web/metrics",
	"*://fresnel-events.vimeocdn.com/*",
	"*://*.vimeo.com/ablincoln/*",
	"*://*.nr-data.net/*",
	"*://*.wickedreports.com/*",
	"*://*.convertbox.com/*",
	"*://*.getresponse.com/*",
	"*://*.paypal.com/xoplatform/logger/api/*",
	"*://*.leadpages.io/*",
	"*://*.hotjar.io/*",
	"*://*.hotjar.com/*",
	"*://*.instapagemetrics.com/*",
	"*://*.tawk.to/*",
	"*://*.youtube.com/api/stats/*",
	"*://*.youtube.com/youtubei/v1/log_event?*",
	"*://*.youtube.com/ptracking?*",
	"*://*.hellobar.com/*",
	"*://*.instapage.com/*",
	"*://*.ads90.com/*",
	"*://*.google.com/afs/gen_204?*",
	"*://*.google.com/afs/ads?*",
	"*://*.googleadservices.com/*",
	"*://*.opportunity-advisor.com/*",
	"*://*.ivanrendulic.com/*",
	"*://*.thesolosquad.com/*",
	"*://*.ecomm.events/*",
	"*://*.ecwid.com/*",
	"*://*/generate_204*",
	"*://*.matijasoloads.com/*",
	"*://*.massiveactionblog.com/*",
	"*://*.evansoloads.com/*",
	"*://*.solospreneur.com/*",
	"*://*.dotcommoney.net/*",
	"*://*.squarespace.com/api/1/location/*",
	"*://location.squarespace.com/*",
	"*://*.squarespace.com/api/track/*",
	"*://*.squarespace.com/api/1/performance/*",
	"*://events.squarespace.com/*",
	"*://*.wix.com/_api/wix-laboratory-server/*",
	"*://*.wix.com/_api/wix-html-login-webapp/user/getUserDetails",
	"*://*.brandfolder.com/*",
	"*://*.ngpvan.com/*",
	"*://*/cdn-cgi/rum?*",
	"*://*.openx.net/*",
	"*://*.adnxs.com/*",
	"*://*.media.net/*",
	"*://*.omnitagjs.com/*",
	"*://*.a-mo.net/*",
	"*://*.lijit.com/*",
	"*://*.sharethrough.com/*",
	"*://*.1rx.io/*",
	"*://*.onetag-sys.com/*",
	"*://*/wp-content/plugins/google-analytics*",
	"*://*.stressthem.to/*",
	"*://*.cloudflareinsights.com/*",
	"*://*/google-analytics*",
	"*://*.arlo.com/hmsweb/devicesupport/v3?eventId=*",
	"*://*.arlo.com/hmsweb/devicesupport/v2?eventId=*",
	"*://*.googleapis.com/v1/firelog/legacy/log?key=*",
	"*://*.statuspage.io/*",
	"*://*.ravenjs.com/*",
	"*://*.fastly-insights.com/*",
	"*://*.ethicalads.io/*",
	"*://analytics.ahrefs.com/*",
	"*://*.trackerads.com/*",
	"*://*.intentiq.com/*",
	"*://*.primis.tech/*",
	"*://*.stickyadstv.com/*",
	"*://*.rlcdn.com/*",
	"*://*/scripts/ads.js",
	"*://*.googletagservices.com/*",
	"*://*.cpmstar.com/*",
	"*://*.adsafeprotected.com/*",
	"*://*.bugsnag.com/*",
	"*://*.mixpanel.com/*",
	"*://*.media-lab.ai/*",
	"*://*.taboola.com/*",
	"*://*.vntsm.com/*",
	"*://*.upapi.net/*",
	"*://*.4dex.io/*",
	"*://*.aniview.com/*",
	"*://*.cpdp.co/api/v2/tracking/",
	"*://*.getclicky.com/*",
	"*://cat.pexels.com/*",
	"*://*.braze.com/*",
	"*://*.pexels.com/me/user-info/",
	"*://*.ml-static.com/global/js/facebook-connect*",
	"*://*.quantserve.com/*",
	"*://*/_/SearchConsoleAggReportUi/browserinfo?*",
	"*://*.live.com/log",
	"*://*.ezoic.net/*",
	"*://*.disqus.com/*",
	"*://*.disquscdn.com/*",
	"*://*/_/user/js/analytics*",
	"*://*.hsforms.net/*",
	"*://*.hs-scripts.com/*",
	"*://*.mxpnl.com/*",
	"*://*.eloqua.com/*",
	"*://*.en25.com/*",
	"*://*.ezodn.com/*",
	"*://*/*/greenoaks.gif*",
	"*://*/*/imp.gif*",
	"*://*.visualwebsiteoptimizer.com/*",
	"*://*.vwo.com/*",
	"*://*.adsrvr.org/*",
	"*://*.3lift.com/*",
	"*://*.triplelift.com/*",
	"*://*.lngtd.com/*",
	"*://*.btloader.com/*",
	"*://*.s-onetag.com/*",
	"*://*.bounceads.net/*",
	"*://*.gritbravedownload.com/*",
	"*://*.instagram.com/ajax/bz?__d=dis",
	"*://*.privacymanager.io/*",
	"*://*.tm-awx.com/*",
	"*://*.viafoura.co/*",
	"*://*.outbrain.com/*",
	"*://*.smartadserver.com/*",
	"*://*.richaudience.com/*",
	"*://*.justpremium.com/*",
	"*://*.notix.io/*",
	"*://*/statics/ads.min.js",
	"*://*.hetaruvg.com/*",
	"*://*.dibsemey.com/*",
	"*://*.rtmark.net/*",
	"*://*.betgorebysson.club/*",
	"*://*.rastconvy.xyz/*",
	"*://*.rationpecial.xyz/*",
	"*://*.lagged.com/*",
	"*://*.play-games.com/*",
	"*://*.adlightning.com/*",
	"*://*.microsoft.com/*collect",
	"*://*.mktoresp.com/*",
	"*://*.contentsquare.net/*",
	"*://*.instagram.com/*seen",
	"*://*.google.com/chat/v1/presence/setpresence",
	"*://*.google.com/u/0/webchannel/events?*",
	"*://*.bitly.com/*",
	"*://*.bit.ly/*"
]},["blocking"])
