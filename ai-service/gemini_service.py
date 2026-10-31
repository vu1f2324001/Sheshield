import os
import time
import httpx
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Load environment variables
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-3.8-flash")

if not API_KEY:
    raise ValueError("GEMINI_API_KEY missing in .env file")

# Gemini client with 60-second timeout
client = genai.Client(
    api_key=API_KEY,
    http_options=types.HttpOptions(
        timeout=60000
    )
)


def generate_scheme_answer(user_query, schemes):

    # Prepare scheme context
    context = ""

    for i, scheme in enumerate(schemes, 1):
        context += f"""
Scheme {i}:
Name: {scheme.get('Scheme Name', '')}
Description: {scheme.get('Description', '')}
Eligibility: {scheme.get('Eligibility Criteria', '')}
General Eligibility: {scheme.get('Eligibility (General)', '')}
Benefits: {scheme.get('Benefits', '')}
Application Process: {scheme.get('Application Process', '')}
Documents: {scheme.get('Documents Required', '')}
Official Link: {scheme.get('Official Link', '')}
"""

    prompt = f"""
You are Sheshield, an AI Government Scheme Discovery Assistant.

User Query:
{user_query}

Retrieved Scheme Information:
{context}

Instructions:
1. Answer in simple language.
2. Recommend only the provided schemes.
3. Explain eligibility and benefits separately.
4. Mention documents and application process when available.
5. Never guarantee eligibility.
6. Never invent scheme rules or deadlines.
7. Clearly mention missing information.
8. Advise verification through official websites.
9. If information is missing, clearly say so.
10. Keep the response concise and structured.

Provide a structured answer.
"""

    # Maximum 2 attempts
    for attempt in range(2):

        try:
            print(
                f"Connecting to Gemini... "
                f"Attempt {attempt + 1}/2"
            )

            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=prompt
            )

            if response and response.text:
                print("Gemini response generated successfully.")
                return response.text

            print("Gemini returned an empty response.")

        except (httpx.HTTPError, OSError, TimeoutError) as e:

            print("Network/Timeout error:", str(e))

        except Exception as e:

            error = str(e)
            print("Gemini API error:", error)

            if "503" in error or "UNAVAILABLE" in error:
                print("Gemini server is temporarily busy.")

            elif "429" in error or "RESOURCE_EXHAUSTED" in error:
                print("Gemini API rate limit reached.")
                return "Gemini API rate limit reached. Please try again later."

            else:
                return "Gemini AI could not generate a response. Please check the API configuration."

        if attempt == 0:
            print("Retrying after 5 seconds...")
            time.sleep(5)

    return "Gemini AI is temporarily unavailable. Please try again later."