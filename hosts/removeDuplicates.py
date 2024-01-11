terms = []
with open('a_list.txt') as f:
    terms += f.read().split('\n')
with open('i_list.txt') as f:
    terms += f.read().split('\n')
with open('t_list.txt') as f:
    terms += f.read().split('\n')
dup = [i for i, x in enumerate(terms) if terms.count(x) > 1]
for i in dup:
    print("DOUBLE:", terms[i])
