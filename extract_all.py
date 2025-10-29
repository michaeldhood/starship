#!/usr/bin/env python3
"""
Extract all files from claude-artifact.js with proper handling of multi-line template literals
"""
import re
from pathlib import Path

def extract_files(artifact_path):
    """Extract all file definitions"""
    with open(artifact_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    files = {}
    
    # Find the files object start
    start_idx = content.find("const files = {")
    if start_idx == -1:
        print("Could not find files object")
        return files
    
    # Use a state machine to parse
    # Find each 'path': { content: `...`, path: '...' } pattern
    i = start_idx
    content_len = len(content)
    
    while i < content_len:
        # Look for the next file entry start: 'path':
        entry_start = content.find("': {", i)
        if entry_start == -1:
            break
        
        # Find the opening quote of the path
        path_start = content.rfind("'", 0, entry_start)
        if path_start == -1:
            i = entry_start + 4
            continue
        
        path_key = content[path_start + 1:entry_start]
        
        # Find content: `...`
        content_marker = content.find("content: `", entry_start)
        if content_marker == -1:
            i = entry_start + 4
            continue
        
        # Extract template literal (handles escaped backticks)
        template_start = content_marker + len("content: `")
        template_content = []
        j = template_start
        backtick_count = 0
        
        while j < content_len:
            char = content[j]
            if char == '`' and (j == 0 or content[j-1] != '\\'):
                # Found closing backtick
                break
            template_content.append(char)
            j += 1
        
        file_content = ''.join(template_content)
        
        # Find path: '...'
        path_marker = content.find("path: '", j)
        if path_marker == -1:
            i = j + 1
            continue
        
        path_start_idx = path_marker + len("path: '")
        path_end_idx = content.find("'", path_start_idx)
        if path_end_idx == -1:
            i = j + 1
            continue
        
        path_value = content[path_start_idx:path_end_idx]
        
        files[path_value] = file_content
        i = path_end_idx + 1
    
    return files

if __name__ == '__main__':
    files = extract_files('claude-artifact.js')
    print(f"Found {len(files)} files")
    for path in sorted(files.keys()):
        print(f"  {path}")

