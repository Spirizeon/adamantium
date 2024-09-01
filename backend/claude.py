import requests
import os
import json
# import google.generativeai as genai


ANTHROPIC_API_KEY = os.environ['ANTHROPIC_API_KEY']
ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages"

def send_to_anthropic(prompt):
    # api_key=ANTHROPIC_API_KEY
    # model_name=
    # genai.configure(api_key=api_key)
    # response = self.model.generate_content([prompt])
    # if response is None:
                # raise Exception("Failed to get a response from the model.")
    #  return response.text            
    headers = {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
    }
    
    payload = {
        "model": "claude-3-opus-20240229",
        "max_tokens": 1000,
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ],
        "stream": False
    }
    
    try:
        print("Sending request to Anthropic API...")
        response = requests.post(ANTHROPIC_API_URL, json=payload, headers=headers)
        print(f"Response status code: {response.status_code}")
        
        response.raise_for_status()
        
        json_response = response.json()
        
        return json_response['content'][0]['text']
    except requests.RequestException as e:
        print(f"Error communicating with Anthropic API: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Error response content: {e.response.text}")
        return None
