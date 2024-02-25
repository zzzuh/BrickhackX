from openai import OpenAI
from dotenv import load_dotenv
import os
import json
import base64
import requests

class Ai():
    def __init__(self, openai_model_description="gpt-3.5-turbo", openai_model_classify="gpt-4-vision-preview"):
        load_dotenv()
        self.openai_client = OpenAI()
        self.openai_token = os.environ.get("OPENAI_API_KEY")
        self.openai_model_classify = openai_model_classify
        self.openai_model_description = openai_model_description

    def generate_description_gpt(self, item, location=""):
        content = f"You are a recycling specialist at {location}. Limit all response to 2 sentences. How can I recycle a {item}. Please respond in the format of JSON: Item: {item} Recycle: (how to recycle {item}) Description: (how {item} affect the environment)"
        print(content)
        gpt_response = self.openai_client.chat.completions.create(
            model=self.openai_model_description,
            response_format={ "type": "json_object" },
            messages=[
                {"role": "user", "content": content}            
            ]
        )
        response_json = json.loads(gpt_response.choices[0].message.content)
        return response_json
    
    def classify_image_gpt(self, image_bytes):
        base64_image = base64.b64encode(image_bytes).decode('utf-8')
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.openai_token}"
        }
        payload = {
        "model": self.openai_model_classify,
        "messages": [
            {
            "role": "user",
            "content": [
                {
                "type": "text",
                "text": "What is this image in 1 to 2 words?"
                },
                {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{base64_image}"
                }
                }
            ]
            }
        ],
        "max_tokens": 300
        }
        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
        return response.json()["choices"][0]["message"]["content"]