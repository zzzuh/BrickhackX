from transformers import ViTImageProcessor, ViTForImageClassification
from openai import OpenAI
from dotenv import load_dotenv
from PIL import Image
import torch
import tkinter as tk
import io
import os
import json
from tkinter import filedialog

class Ai():
    def __init__(self, num_predictions=5, openai_model="gpt-3.5-turbo", huggingface_model="google/vit-base-patch16-224"):
        load_dotenv()
        self.openai_client = OpenAI()
        self.openai_model = openai_model
        self.processor = ViTImageProcessor.from_pretrained(huggingface_model)
        self.huggingface_model = ViTForImageClassification.from_pretrained(huggingface_model)
        self.num_predictions = num_predictions

    def generate_description(self, item):
        content = f"You are a recycling specialist. Limit all response to 2 sentences. How can I recycle a {item}. Please respond in the format of JSON: Item: {item} Recycle: (how to recycle {item}) Description: (how {item} affect the environment)"
        print(content)
        gpt_response = self.openai_client.chat.completions.create(
            model=self.openai_model,
            response_format={ "type": "json_object" },
            messages=[
                {"role": "user", "content": content}            
            ]
        )
        response_json = json.loads(gpt_response.choices[0].message.content)
        return response_json
    
    def classify_image(self, image_bytes):
        image_blob = io.BytesIO(image_bytes)
        image = Image.open(image_blob)
        inputs = self.processor(images=image, return_tensors="pt")
        outputs = self.huggingface_model(**inputs)
        logits = outputs.logits
        probs = torch.nn.functional.softmax(logits, dim=-1)
        top_probs, top_idxs = probs.topk(self.num_predictions)
        predictions = [[self.huggingface_model.config.id2label[top_idxs[0, i].item()], round(top_probs[0, i].item(), 3)] for i in range(self.num_predictions)]
        return predictions
    
    def test_classify_image(self):
        # image_file_path = filedialog.askopenfilename()
        image_file_path = "./bottles.jpg"
        with open(image_file_path, 'rb') as f:
            image_bytes = f.read()
        image_blob = io.BytesIO(image_bytes)
        image = Image.open(image_blob)

        inputs = self.processor(images=image, return_tensors="pt")
        outputs = self.huggingface_model(**inputs)
        logits = outputs.logits

        probs = torch.nn.functional.softmax(logits, dim=-1)
        top_probs, top_idxs = probs.topk(self.num_predictions)
        predictions = [(self.huggingface_model.config.id2label[top_idxs[0, i].item()], round(top_probs[0, i].item(), 3)) for i in range(self.num_predictions)]
        print(predictions)
        return predictions

if __name__ == "__main__":
        a = Ai(3)
        item = a.test_classify_image()
        print(item)
        print(a.generate_description(item=item[0][0]))