import zipfile

print("[All] Started Building Extension")

files_global = [
    "./_locales/en/messages.json",
    "./_locales/es/messages.json",
    "./_locales/fr/messages.json",

    "./src/dashboard.js",
    "./src/dashboard.css",
    "./src/dashboard.html",
    "./src/custom.min.css",
    "./src/extension_image.png",

    "./icon_64x64.png",
    "./icon_128x128.png",
    "./icon-bg.png",
    "./icon.png"
]

files_chromium = [
    "./chromium/background.js",
    "./chromium/manifest.json"
]

files_gekko = [
    "./gekko/background.js",
    "./gekko/manifest.json"
]

print("[Chromium] Creating ZIP File")
chromium = zipfile.ZipFile('anonymousExtension_EdgeChrome.zip', 'w')
print("[FireFox] Creating ZIP File")
firefox = zipfile.ZipFile('anonymousExtension_FireFox.zip', 'w')
with chromium as container:
    for file in (files_global + files_chromium):
        print("[Chromium] Writing", file)
        container.write(file, arcname = file.replace("chromium/", ""))
print("[Chromium] Closing ZIP File")
chromium.close()
with firefox as container:
    for file in (files_global + files_gekko):
        print("[FireFox] Writing", file)
        container.write(file, arcname = file.replace("gekko/", ""))
print("[FireFox] Closing ZIP File")
firefox.close()

print("[All] Finished Building Extension")
