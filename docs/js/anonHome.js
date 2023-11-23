userQuotes = [
	"An effective analytics tracking prevention tool!",
	"Google Analytics and doubleclick.net are 100% Gone!",
	"Efficient in blocking trackers.",
]
userQuoteIndex = 0

setInterval(userQuoteRotate, 3000)

function userQuoteRotate() {
	$("#urqote").fadeOut(200, () => {
		userQuoteIndex = userQuoteIndex + 1
		if(userQuoteIndex >= userQuotes.length) {
			userQuoteIndex = 0
		}
		$("#urqote").html(userQuotes[userQuoteIndex])
	})
	$("#urqote").fadeIn(200)
}

function onClickScroll(id) {
    document.getElementById(id).scrollIntoView({
		behavior: "smooth",
		block: "end"
	})
}
