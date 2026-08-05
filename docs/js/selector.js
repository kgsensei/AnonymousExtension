import Bowser from "./bowser.js";

(() => {
	function meta(title, url) {
		document.getElementById("get_browser_name").innerText = title;
		document.getElementById("get_browser_link").setAttribute("href", url);
	}

	const browser = Bowser.getParser(window.navigator.userAgent);
	const name = browser.getBrowserName().toLowerCase();
	console.log(name);

	if (name === "firefox")
		return meta("Get for Firefox", "https://addons.mozilla.org/addon/anonymous-extension/");

	if (name === "brave")
		return meta("Get for Brave", "https://chromewebstore.google.com/detail/anonymous-extension/dpobhogjdfjlgiejbbojhablmlighflg");

	if (name === "chrome")
		return meta("Get for Chrome", "https://chromewebstore.google.com/detail/anonymous-extension/dpobhogjdfjlgiejbbojhablmlighflg");

	if (name === "edge" || name === "microsoft edge")
		return meta("Get for Edge", "https://microsoftedge.microsoft.com/addons/detail/anonymous-extension/cdiiogmchafjebbdjgbchpdeoghfbocp");

	if (name === "opera")
		return meta("Get for Opera", "https://chromewebstore.google.com/detail/anonymous-extension/dpobhogjdfjlgiejbbojhablmlighflg");
})();
