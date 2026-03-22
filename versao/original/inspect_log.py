import os
import re

log_path = r"C:\Users\wagne\.gemini\antigravity\brain\5d64304a-ccef-4337-a0c3-e1be4bfda224\.system_generated\logs\overview.txt"

if not os.path.exists(log_path):
    print("Log not found")
else:
    with open(log_path, 'r', encoding='utf-8') as f:
        # Just search for the word 'juizes\\9.json' and print the lines around it
        lines = f.readlines()
        
    for i, line in enumerate(lines):
        if r'juizes\\9.json' in line or r'juizes/9.json' in line:
            print(f"Line {i}: {line[:150]}...")
