import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def summarize_report(analysis):
    """Summarize competitor changes using GPT."""
    try:
        text = "\n".join(analysis["key_updates"])
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[{"role": "system", "content": "You are an AI market analyst."},
                      {"role": "user", "content": f"Summarize competitor updates:\n{text}"}]
        )
        return response["choices"][0]["message"]["content"]
    except Exception as e:
        return f"Error summarizing: {e}"
