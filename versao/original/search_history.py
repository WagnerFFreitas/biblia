import os
import re
import shutil

history_dir = r"C:\Users\wagne\AppData\Roaming\Code\User\History"

files_to_find = {
    "jos_sucedeu": {"text": "E sucedeu, depois da morte de Josué", "out": "e:/biblia/versao/original/juizes/1.json"},
    "o_anjo_subiu": {"text": "E subiu o anjo do YHWH", "out": "e:/biblia/versao/original/juizes/2.json"},
    "abimeleque_foi": {"text": "E foi Abimeleque, filho de Jerubaal, a Siquém", "out": "e:/biblia/versao/original/juizes/9.json"},
    "estes_sao_reis": {"text": "E estes são os reis da terra", "out": "e:/biblia/versao/original/josue/12.json"}
}

found = {k: None for k in files_to_find}

if not os.path.exists(history_dir):
    print("No VS Code history dir found at " + history_dir)
else:
    for root, dirs, files in os.walk(history_dir):
        for file in files:
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                for k, v in files_to_find.items():
                    if v['text'] in content and '"hebraico":' in content:
                        # Find the largest/latest file maybe? Just grab the first matching for now.
                        if found[k] is None or len(content) > len(found[k][1]):
                            found[k] = (path, content)
            except:
                pass

for k, val in found.items():
    if val:
        print(f"Found match for {k} at {val[0]}, length {len(val[1])}")
        with open(files_to_find[k]['out'], 'w', encoding='utf-8') as f:
            f.write(val[1])
    else:
        print(f"Could not find match for {k}")

