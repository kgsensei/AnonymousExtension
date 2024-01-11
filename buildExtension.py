import zipfile

print("[All] Started Building Extension")

files_global = [
    "./_locales/en/messages.json",
    "./_locales/es/messages.json",

    "./dashboardResources/dashboard.css",
    "./dashboardResources/extension_image.png",

    "./base_anon_home.html",

    "./icon_64x64.png",
    "./icon_128x128.png",
    "./icon-bg.png",
    "./icon.png"
]

files_chromium = [
    "./background.js",
    "./manifest.json"
]

files_gekko = [
    "./firefox_only/background.js",
    "./firefox_only/manifest.json"
]

print("[Chromium] Creating ZIP File")
chromium = zipfile.ZipFile('anonymousExtension_EdgeChrome.zip', 'w')
print("[FireFox] Creating ZIP File")
firefox = zipfile.ZipFile('anonymousExtension_FireFox.zip', 'w')
with chromium as container:
    for file in (files_global + files_chromium):
        print("[Chromium] Writing", file)
        container.write(file)
print("[Chromium] Closing ZIP File")
chromium.close()
with firefox as container:
    for file in (files_global + files_gekko):
        print("[FireFox] Writing", file)
        container.write(file, arcname = file.replace("firefox_only/", ""))
print("[FireFox] Closing ZIP File")
firefox.close()

print("[All] Finished Building Extension")
