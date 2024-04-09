document.getElementById("updatePerms").addEventListener("click", () => {
    chrome.permissions.request({ origins: [ '<all_urls>' ] })
})
