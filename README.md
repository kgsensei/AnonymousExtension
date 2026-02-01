<div>
	<picture>
		<source srcset="./branding/GithubLogoWName.svg">
		<img
			alt="AnonymousExtension; An Internet Privacy Tool"
			src="./branding/GithubLogoWName.svg"
			width="65%">
	</picture>
</div>

[![Chrome Web Store](https://img.shields.io/badge/Chrome-Webstore-219753?style=for-the-badge&logo=googlechrome)](https://chrome.google.com/webstore/detail/dpobhogjdfjlgiejbbojhablmlighflg)
[![Edge Add-ons](https://img.shields.io/badge/Edge-Addons-0e4f94?style=for-the-badge&logo=microsoftedge)](https://microsoftedge.microsoft.com/addons/detail/anonymous-extension/cdiiogmchafjebbdjgbchpdeoghfbocp)
[![Firefox Add-ons](https://img.shields.io/badge/Firefox-Addons-6d5bc3?style=for-the-badge&logo=firefoxbrowser)](https://addons.mozilla.org/en-US/firefox/addon/anonymous-extension)
[![From Source](https://img.shields.io/badge/From-Source-6d7681?style=for-the-badge&logo=github)](https://github.com/kgsensei/AnonymousExtension/releases/latest)

## Overview

**AnonymousExtension** is a privacy-focused browser extension designed to give
you more control over your digital footprint. With the explosion of trackers,
fingerprinting scripts, and IP grabbers on modern websites, your personal data
is constantly at risk. Some websites load dozens of tracking scripts per page,
and most users never even know.

AnonymousExtension makes it easy to take back at least a little of your privacy:

- Blocks trackers, ads, fingerprinting scripts, and other malicious resources.

- Works across Chrome, Edge, and Firefox.

- Lightweight & plug-and-play, just install and go.

- Additionally: completely open source, which means you know what happens behind
  the scenes at every step.

**Disclaimer:** AnonymousExtension is *very* aggressive in blocking potential
threats. This means some websites may break or not function as intended.

## Getting Started

Install AnonymousExtension on your preferred browser:

- [Chrome Webstore](https://chrome.google.com/webstore/detail/dpobhogjdfjlgiejbbojhablmlighflg)

- [Edge Webstore](https://microsoftedge.microsoft.com/addons/detail/anonymous-extension/cdiiogmchafjebbdjgbchpdeoghfbocp)

- [Firefox Addons](https://addons.mozilla.org/en-US/firefox/addon/anonymous-extension)

- or [Directly From Source](https://github.com/kgsensei/AnonymousExtension/releases/latest)

Also See:

- [Official Website](https://anon.kgsensei.dev)

- [Community Discord](https://link.kgsensei.dev/discord)

## Features

- Comprehensive Tracker Blocking: Blocks third-party trackers, ads,
  fingerprinting scripts, and more. The block list is constantly being updated
  in the background, you never have to do anything!
- Cross-Browser Support: Works in Chrome, Edge, and Firefox. It's an out-of-box
  experience by design.
- Aggressive Privacy Protections: Stops scripts at the network level, reducing
  CPU usage and improving security. This also means AnonymousExtension doesn't
  have to use invasive permissions, like page modification.

## Contributing

### Contributing to the Blacklist

Contributions are very welcome and help everyone stay safer online.  
The user-friendly block list is located at `/hosts/blacklist_pretty.json`.

It's broken up into sections based on the category of the blocking keyword/regex
pattern. It also has a "block level" field where you can define the behavior for
all keywords/regex patterns in that specific category, block levels detailed
below.

| Block Type | Description |
|------------|-------------|
| `Block_All` | Prevents the top frame from loading entirely. Use for highly malicious or dangerous domains. |
| `Block_Normal` | Default behavior. Allows the top frame but blocks flagged resources (sub-frames, scripts, images, etc.) |

Example:

```json
{
	"Malicious Websites": {
		"block": "all",
		"keywords": [
			"badwebsite.com",
			"creepymalware.net"
		]
	}
}
```

Once you've made your changes to `blacklist_pretty.json` you can run the
`build_blacklist_from_formatted.py` script, which will rebuild the
`blacklist.txt` file. You can always modify the `blacklist.txt` file directly,
but it's hard to keep track of everything that way.

### Contributing to the Website

All website code is stored in `/docs/`. It's nothing special, just normal HTML,
CSS, and JS. PRs for improvements, documentation, bug fixes, or design changes
are all welcome!

### Reporting an Issue

If you notice a broken site or a missed tracker then you should open a GitHub
issue! Include details like the URL, browser, and what happened.

## Legal

AnonymousExtension is a kgsensei project.
Copyright &copy; of kgsensei.

Use responsibly. AnonymousExtension does not guarantee anonymity. It reduces
tracking, but it will unfortunately never be able to block everything.
