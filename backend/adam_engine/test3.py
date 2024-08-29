import r2pipe

from claude import send_to_anthropic
import sys
import os
import requests
import json

# Use environment variables for API key and endpoint
ANTHROPIC_API_KEY = os.environ['ANTHROPIC_API_KEY']
ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages"

"""
def send_to_anthropic(prompt):
    headers = {
        "Content-Type": "application/json",
        "X-API-Key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
    }
    
    payload = {
        "model": "claude-3-opus-20240229",
        "max_tokens": 1000,
        "messages": [
            {
                "role": "adamantium",
                "content": f"{prompt} explain the high level logic of this code in non-technical terms, with reference to strings found. also provide a predictive analysis on what can this binary do when executed"
            }
        ]
    }
    
    try:
        response = requests.post(ANTHROPIC_API_URL, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()['content'][0]['text']
    except requests.RequestException as e:
        print(f"Error communicating with Anthropic API: {e}")
        return None
"""
def decompile_binary(binary_path):
    r2 = r2pipe.open(binary_path)
    r2.cmd('aa')
    functions = r2.cmdj('aflj')

    with open('decompilation', 'w') as decompile_file, open('analysis', 'w') as analysis_file:
        decompile_file.write("=== Strings ===\n")
        strings = r2.cmdj('izj')
        for s in strings:
            decompile_file.write(f"{s['vaddr']}: {s['string']}\n")
        decompile_file.write("\n")

        for func in functions:
            func_name = func['name']
            decompile_file.write(f"=== Function: {func_name} ===\n")
            decompile_file.write(f"Address: {func['offset']}\n")
            
            decompiled = r2.cmd(f"pdc @ {func['offset']}")
            decompile_file.write(decompiled)
            decompile_file.write("\n\n")
            
            # Send decompiled function to Anthropic for analysis
            prompt = f"Analyze this decompiled function and provide insights:\n\nFunction Name: {func_name}\n\n{decompiled}"
            analysis = send_to_anthropic(prompt)
            if analysis:
                analysis_file.write(f"=== Analysis for Function: {func_name} ===\n")
                analysis_file.write(analysis)
                analysis_file.write("\n\n")

    r2.quit()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <binary_path>")
        sys.exit(1)

    binary_path = sys.argv[1]
    if not os.path.exists(binary_path):
        print(f"Error: The file {binary_path} does not exist.")
        sys.exit(1)

    if 'ANTHROPIC_API_KEY' not in os.environ:
        print("Error: ANTHROPIC_API_KEY environment variable is not set.")
        sys.exit(1)

    decompile_binary(binary_path)
    print(f"Decompilation complete. Results written to 'decompilation' file.")
    with open("decompilation","r") as g:
        content = g.read()
        send_to_anthropic(f"{content} comment on this")
        g.close()
    with open("analysis","r") as final:
        analysis = final.read();
        print(analysis)
        final.close()
