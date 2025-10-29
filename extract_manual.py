#!/usr/bin/env python3
"""
Manually extract files from claude-artifact.js by reading the content
"""
import re
import os
from pathlib import Path

def extract_template_literal(lines, start_line_idx):
    """Extract content from a template literal starting at start_line_idx"""
    # Find the opening backtick
    content_parts = []
    i = start_line_idx
    
    # Find line with opening backtick
    while i < len(lines):
        if 'content:' in lines[i] and '`' in lines[i]:
            # Extract the part after the backtick
            line = lines[i]
            backtick_idx = line.find('`')
            if backtick_idx != -1:
                # Check if it's closed on same line
                if line.rfind('`') > backtick_idx:
                    # Single line template literal
                    content = line[backtick_idx+1:line.rfind('`')]
                    return content, i
                else:
                    # Multi-line, start collecting
                    content_parts.append(line[backtick_idx+1:])
                    i += 1
                    break
        i += 1
    
    # Collect multi-line content
    while i < len(lines):
        line = lines[i]
        if '`' in line:
            # Closing backtick found
            closing_idx = line.find('`')
            content_parts.append(line[:closing_idx])
            break
        else:
            content_parts.append(line)
        i += 1
    
    return '\n'.join(content_parts), i

def extract_all_files(artifact_path):
    """Extract all files from artifact"""
    with open(artifact_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    files = {}
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # Look for file path pattern: 'frontend/...' or 'backend/...' or 'docker-compose.yml'
        if ("'frontend/" in line or "'backend/" in line or "'docker-compose.yml" in line) and ':' in line:
            # Extract the path key
            match = re.search(r"'([^']+)':", line)
            if match:
                path_key = match.group(1)
                
                # Look for content and path fields
                j = i
                content_value = None
                path_value = None
                
                while j < min(i + 50, len(lines)):  # Look ahead up to 50 lines
                    if 'content:' in lines[j] and content_value is None:
                        # Extract template literal
                        content_value, j = extract_template_literal(lines, j)
                    elif 'path:' in lines[j] and path_value is None:
                        # Extract path value
                        match = re.search(r"path:\s*'([^']+)'", lines[j])
                        if match:
                            path_value = match.group(1)
                            break
                    j += 1
                
                if content_value is not None and path_value is not None:
                    files[path_value] = content_value
                    i = j
        
        i += 1
    
    return files

if __name__ == '__main__':
    files = extract_all_files('claude-artifact.js')
    print(f"Found {len(files)} files")
    for path in sorted(files.keys()):
        print(f"  {path}")

