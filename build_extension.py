import zipfile, os

print("[All] Started Building Extension")

chrome_zip_name = "AE_Chrome.zip"
gekko_zip_name = "AE_Gekko.zip"

print("[All] Removing Previous ZIP Files")
if os.path.exists(chrome_zip_name):
	os.remove(chrome_zip_name)
if os.path.exists(gekko_zip_name):
	os.remove(gekko_zip_name)

files_global = [
	"_locales/en/messages.json",
	"_locales/es/messages.json",
	"_locales/fr/messages.json",

	"src/dash/custom.min.css",
	"src/dash/dashboard.css",
	"src/dash/dashboard.html",
	"src/dash/dashboard.js",

	"src/background.js",

	"src/icon_64x64.png",
	"src/icon_128x128.png",
	"src/icon.png"
]

files_chromium = [ "manifest_chrome.json" ]
files_gekko = [ "manifest_gekko.json" ]

print("[Chromium] Creating ZIP File")
chromium = zipfile.ZipFile(chrome_zip_name, 'w')

with chromium as container:
	for file in (files_global + files_chromium):
		print("[Chromium] Writing", file)
		container.write(
			"./extension/" + file,
			arcname = file.replace("_chrome", "")
		)

print("[Chromium] Closing ZIP File")
chromium.close()

print("[FireFox]  Creating ZIP File")
firefox = zipfile.ZipFile(gekko_zip_name, 'w')

with firefox as container:
	for file in (files_global + files_gekko):
		print("[FireFox]  Writing", file)
		container.write(
			"./extension/" + file,
			arcname = file.replace("_gekko", "")
		)

print("[FireFox]  Closing ZIP File")
firefox.close()

print("[All] Finished Building Extension")
