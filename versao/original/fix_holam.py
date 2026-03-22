import os

files_to_fix = [
    "e:/biblia/versao/original/juizes/1.json",
    "e:/biblia/versao/original/juizes/2.json",
    "e:/biblia/versao/original/juizes/9.json",
    "e:/biblia/versao/original/josue/12.json"
]

holam_double = "\u05B9\u05B9"
holam_single = "\u05B9"

for path in files_to_fix:
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
            
        if holam_double in content:
            new_content = content.replace(holam_double, holam_single)
            with open(path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Fixed {path}")
        else:
            print(f"No double holam found in {path}")
