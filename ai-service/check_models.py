import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

print("\nAVAILABLE GEMINI MODELS:\n")

for model in client.models.list():
    if "generateContent" in (model.supported_actions or []):
        print(model.name)