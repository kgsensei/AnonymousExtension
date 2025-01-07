# Anonymous Extension

AnonymousExtension is a kgsensei project and is Copyright &copy; of kgsensei. All rights reserved.

## Overview / Background

AnonymousExtension is a browser extension designed to make the internet a safer place for you. I was browsing the internet a while ago and looking at the crazy amount of trackers in some websites, there are like 60 in some websites alone... Like why? So I decided to build this web extension to block trackers, ip grabbers, and some other dangerous websites/resources.

It's really simple and easy to use, a true plug and play extension! Just install it to get started being safer online!

Get AnonymousExtension At:
- [Chrome Webstore](https://chrome.google.com/webstore/detail/dpobhogjdfjlgiejbbojhablmlighflg)
- [Edge Addons](https://microsoftedge.microsoft.com/addons/detail/anonymous-extension/cdiiogmchafjebbdjgbchpdeoghfbocp)
- [Firefox Addons](https://addons.mozilla.org/en-US/firefox/addon/anonymous-extension/)

Also See:
- [Website](https://anon.kgsensei.dev)
- [Discord](https://link.kgsensei.dev/discord)

## Contributing

### To Block List
The block list is in `/hosts/blacklist.txt`. Feel free to make a PR with new websites/keywords to block.

The `#` symbol is used for comments and the `~` symbol is used for classifying what type of block strategy to use (documented below).

| Block_All | Block_Normal (Default Behavior) |
| ------------- | ------------- |
| Prevent top frame from loading at all. | Allow top frame loading but block any flagged resources, including in sub-frames. |

---

### To Website
All the website code can be found in `/docs/`.

---

### To Extension
Parts of the extension itself are all over the place.  
`/src/` includes UI components.  
`/_locales/` includes translation information for the UI components.  
`/gekko/` includes the background and manifest scripts for Firefox.  
`/chromium/` includes the background and manifest scripts for Chromium based browsers (Edge, Chrome, Etc.)

Using `buildExtension.py` you can essentially "compile" the code into two zip files, one for Firefox and the other for Chromium based browsers. The `buildExtension.py` file will automatically sort everything into the correct zip file.

## Legal

Copyright &copy; kgsensei. All rights reserved.
