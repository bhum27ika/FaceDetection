import os
from dotenv import load_dotenv
from groq import Groq

# Load environment variables from .env file
load_dotenv()

# Get API key
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_ai_recommendation(condition, severity):
    prompt = f"""
You are an Ayurvedic skincare expert.

Condition: {condition}
Severity: {severity}

Give:
1. Ayurvedic remedies
2. Product suggestions
3. Lifestyle tips

Keep it simple.
Add disclaimer: Not a medical diagnosis.
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        return response.choices[0].message.content

    except Exception as e:
        return f"AI Error: {str(e)}"