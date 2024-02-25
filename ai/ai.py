from transformers import ViTImageProcessor, ViTForImageClassification
from PIL import Image
import torch
import tkinter as tk
import io
from tkinter import filedialog

class Ai():
    def __init__(self, num_predictions=5):
        self.processor = ViTImageProcessor.from_pretrained('google/vit-base-patch16-224')
        self.model = ViTForImageClassification.from_pretrained('google/vit-base-patch16-224')
        self.num_predictions = num_predictions
    
    def classify_image(self, image_blob):
        image = Image.open(image_blob)
        inputs = self.processor(images=image, return_tensors="pt")
        outputs = self.model(**inputs)
        logits = outputs.logits
        probs = torch.nn.functional.softmax(logits, dim=-1)
        top_probs, top_idxs = probs.topk(self.num_predictions)
        predictions = [[self.model.config.id2label[top_idxs[0, i].item()], round(top_probs[0, i].item(), 3)] for i in range(self.num_predictions)]
        return predictions
    
    def test_classify_image(self):
        # image_file_path = filedialog.askopenfilename()
        image_file_path = "./bottles.jpg"
        with open(image_file_path, 'rb') as f:
            image_bytes = f.read()
        image_blob = io.BytesIO(image_bytes)
        image = Image.open(image_blob)

        inputs = self.processor(images=image, return_tensors="pt")
        outputs = self.model(**inputs)
        logits = outputs.logits

        probs = torch.nn.functional.softmax(logits, dim=-1)
        top_probs, top_idxs = probs.topk(self.num_predictions)
        predictions = [(self.model.config.id2label[top_idxs[0, i].item()], round(top_probs[0, i].item(), 3)) for i in range(self.num_predictions)]
        print(predictions)

if __name__ == "__main__":
    a = Ai(3)
    a.test_classify_image()