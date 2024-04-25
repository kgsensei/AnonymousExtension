terms = []

with open('blacklist.txt') as f:
    terms += f.read().split('\n')

dup = [i for i, x in enumerate(terms) if terms.count(x) > 1]

for i in dup:
    if terms[i] != "" and terms[i][0] != "~":
        print("DOUBLE:", terms[i])
