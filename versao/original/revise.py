import json
import os
import re

FILES = []
# Josue 6 to 24
for i in range(6, 25):
    FILES.append((f"e:/biblia/versao/original/josue/{i}.json", "Josué - יְהֹושֻׁ֫עַ - Yehoshua", i))
# Juizes 1 to 10
for i in range(1, 11):
    FILES.append((f"e:/biblia/versao/original/juizes/{i}.json", "Juízes - שֹׁפְטִים - Shoftim", i))

ARABIC_TO_HEBREW = {
    'ف': 'פ',
    'ي': 'י',
    'ك': 'כ',
    'ب': 'ב',
    'و': 'ו',
    'م': 'מ',
    'ن': 'נ',
    'ر': 'ר',
    'ل': 'ל',
    'س': 'ס',
    'ش': 'שׁ',
    'ص': 'צ',
    'ط': 'ט',
    'ع': 'ע',
    'ق': 'ק',
    'د': 'ד',
    'ت': 'ת',
    'ث': 'ת',
    'ذ': 'ז',
    'ز': 'ז',
    'ض': 'צ',
    'ظ': 'ט',
    'غ': 'ע',
    'ه': 'ה',
    'ا': 'א',
    'أ': 'א',
    'إ': 'א',
    'آ': 'א',
    'ء': 'א',
}

def fix_yhwh(text):
    if not isinstance(text, str):
        return text
    # Replace cases of "SENHOR" or "Senhor" referring to YHWH, but be careful not to replace Adonai unless it's YHWH.
    # We will mainly fix the word-level translation and literal.
    text = re.sub(r'\bSENHOR\b', 'YHWH', text)
    text = re.sub(r'\bSenhor\b', 'YHWH', text)
    return text

changes_made = {}

for path, book_name, chapter in FILES:
    if not os.path.exists(path):
        print(f"File not found: {path}")
        continue
        
    with open(path, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError as e:
            print(f"Error parsing {path}: {e}")
            continue
            
    original_data = json.dumps(data, ensure_ascii=False)
    
    # 1. Check and add livro, capitulo, titulos
    new_data = {}
    new_data["livro"] = book_name
    new_data["capitulo"] = chapter
    new_data["titulos"] = data.get("titulos", {})
    new_data["versiculos"] = data.get("versiculos", {})
    
    # Process versiculos
    for v_num, v_data in new_data["versiculos"].items():
        if "traducao_completa" in v_data:
            v_data["traducao_completa"] = fix_yhwh(v_data["traducao_completa"])
            
        for palavra in v_data.get("palavras", []):
            heb = palavra.get("hebraico", "")
            trn = palavra.get("transliteral", "")
            trd = palavra.get("traducao_palavra", "")
            
            # Replace Arabic chars
            for arab, heb_char in ARABIC_TO_HEBREW.items():
                if arab in heb:
                    heb = heb.replace(arab, heb_char)
                    
            # Fix YHWH block
            # Sometimes YHWH is written with prefixes like בַּיהוָ֣ה
            if 'יהוה' in heb.replace('\u05b0', '').replace('\u05b1', '').replace('\u05b2', '').replace('\u05b3', '').replace('\u05b4', '').replace('\u05b5', '').replace('\u05b6', '').replace('\u05b7', '').replace('\u05b8', '').replace('\u05b9', '').replace('\u05ba', '').replace('\u05bb', '').replace('\u05bc', '').replace('\u05bd', '').replace('\u05be', '').replace('\u05bf', '').replace('\u05c1', '').replace('\u05c2', '').replace('\u05c4', '').replace('\u05c5', '').replace('\u0591', '').replace('\u0592', '').replace('\u0593', '').replace('\u0594', '').replace('\u0595', '').replace('\u0596', '').replace('\u0597', '').replace('\u0598', '').replace('\u0599', '').replace('\u059a', '').replace('\u059b', '').replace('\u059c', '').replace('\u059d', '').replace('\u059e', '').replace('\u059f', '').replace('\u05a0', '').replace('\u05a1', '').replace('\u05a2', '').replace('\u05a3', '').replace('\u05a4', '').replace('\u05a5', '').replace('\u05a6', '').replace('\u05a7', '').replace('\u05a8', '').replace('\u05a9', '').replace('\u05aa', '').replace('\u05ab', '').replace('\u05ac', '').replace('\u05ad', '').replace('\u05ae', '').replace('\u05af', ''):
                if trn.upper() != "YHWH" and not any(prefix in trn.lower() for prefix in ['wa-', 'ba-', 'la-', 'ha-', 'ka-', 'mē-']):
                    pass # We will do a regex to replace the inner YHWH
                # Actually, standardizing YHWH in transliteral:
                trn = re.sub(r'(?i)\byhwh\b', 'YHWH', trn)
                if 'YHWH' not in trn:
                    # just a fallback
                    pass
                trd = fix_yhwh(trd)
                
            # Mappiq rule
            if heb.endswith('\u05d4\u05bc'): # He + Dagesh (Mappiq)
                if not trn.endswith('h') and not trn.endswith('h-'):
                    if '-' in trn and trn.endswith(('-kā', '-ḵā', '-nū')):
                        pass # probably not the last word part
                    else:
                        if trn.endswith('ā'):
                            trn = trn[:-1] + 'āh'
                        elif trn.endswith('a'):
                            trn = trn[:-1] + 'ah'
                        elif trn.endswith('ō'):
                            trn = trn[:-1] + 'ōh'
                        elif trn.endswith('o'):
                            trn = trn[:-1] + 'oh'
                        elif trn.endswith('ē'):
                            trn = trn[:-1] + 'ēh'
                        elif trn.endswith('e'):
                            trn = trn[:-1] + 'eh'
                        elif trn.endswith('î'):
                            trn = trn[:-1] + 'îh'
                        elif trn.endswith('i'):
                            trn = trn[:-1] + 'ih'
                        elif trn.endswith('ū'):
                            trn = trn[:-1] + 'ūh'
                        elif trn.endswith('u'):
                            trn = trn[:-1] + 'uh'
                        else:
                            trn = trn + 'h'
                            
            # Check script mixing in hebrew field (latin letters)
            heb = re.sub(r'[a-zA-Z]', '', heb)

            palavra["hebraico"] = heb
            palavra["transliteral"] = trn
            palavra["traducao_palavra"] = trd
            
    final_data = json.dumps(new_data, ensure_ascii=False, indent=2)
    
    if final_data != original_data:
        # Write back
        with open(path, 'w', encoding='utf-8') as f:
            f.write(final_data)
        changes_made[path] = True
        
print(f"Processed {len(FILES)} files. Modified {len(changes_made)} files.")
