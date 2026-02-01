import json

print("[Blacklist Builder]", "Starting")
print("[Blacklist Builder]", "Reading blacklist_pretty.json")

with open("blacklist_pretty.json") as f_read:
	output = ""
	keywords_total = []
	data = json.load(f_read)
	keys = list(data.keys())[1:]

	print("[Blacklist Builder]", "Got Data and Keys")

	for key in keys:
		print("[Blacklist Builder]", "Writing Data for Key: " + key)

		output += f"# {key}\n"
		output += f"~ {"Block_All" if data[key]["block"] == "all" else "Block_Normal"}\n"

		for keyword in data[key]["keywords"]:
			if keyword in keywords_total:
				print("[Blacklist Builder]", "Duplicate Keyword: " + keyword)
			else:
				keywords_total.append(keyword)
			output += f"{keyword}\n"

	print("[Blacklist Builder]", "Writing blacklist.txt")

	with open("blacklist.txt", "w") as f_write:
		f_write.write(output[:-1])

	print("[Blacklist Builder]", "Finished")
