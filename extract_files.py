#!/usr/bin/env python3
"""
Extract files from claude-artifact.js
"""
import re
import os
from pathlib import Path

def extract_files(artifact_content):
    """Extract file definitions from the JavaScript files object"""
    files = {}
    
    # Pattern to match file entries: 'path': { content: `...`, path: '...' }
    # Need to handle multi-line template literals
    pattern = r"'([^']+)':\s*\{\s*content:\s*`([^`]*)`,\s*path:\s*'([^']+)'\s*\}"
    
    # Find all matches
    matches = re.finditer(pattern, artifact_content, re.DOTALL)
    
    for match in matches:
        key = match.group(1)
        content = match.group(2)
        path = match.group(3)
        files[path] = content
    
    return files

def main():
    artifact_path = Path('claude-artifact.js')
    
    with open(artifact_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the files object section
    # Look for const files = { ... };
    start_idx = content.find("const files = {")
    if start_idx == -1:
        print("Could not find 'const files = {'")
        return
    
    # Find the matching closing brace
    brace_count = 0
    end_idx = start_idx
    for i in range(start_idx + len("const files = {"), len(content)):
        if content[i] == '{':
            brace_count += 1
        elif content[i] == '}':
            if brace_count == 0:
                end_idx = i + 1
                break
            brace_count -= 1
    
    files_section = content[start_idx:end_idx]
    
    # Extract files using regex
    files = extract_files(files_section)
    
    print(f"Found {len(files)} files")
    return files

if __name__ == '__main__':
    files = main()
    if files:
        for path in sorted(files.keys()):
            print(f"  {path}")

