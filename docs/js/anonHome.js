userQuotes = [
	"An effective analytics tracking prevention tool!",
	"Google Analytics and doubleclick.net are 100% Gone!",
	"Efficient in blocking trackers.",
]
userQuoteIndex = 0

function animateWaypoint(elem, delay, animationAction, animTime){
	$(elem).waypoint({
		handler: (direction) => {
			$(elem).delay(delay).animate(animationAction, animTime)
		},
		offset: '85%'
	})
}

for(let i = 0; i < 4; i++) {
	animateWaypoint('#promo' + i, 100 * i, {"opacity": "1"}, 500)
}
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
