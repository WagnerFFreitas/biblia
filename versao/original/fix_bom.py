import json
import os

path = "e:/biblia/versao/original/josue/13.json"
try:
    with open(path, 'r', encoding='utf-8-sig') as f:
        data = json.load(f)
    print("Loaded with utf-8-sig successfully.")
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Saved as utf-8 successfully.")
except Exception as e:
    print(f"Error: {e}")
