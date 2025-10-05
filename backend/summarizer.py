import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def summarize_report(analyzed_data):
    """
    Summarize competitor updates into a concise summary using GPT.
    Input: analyzed_data = output from analyzer.py (dict)
    """
    try:
        updates_text = "\n".join(analyzed_data["key_updates"])
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an AI market analyst."},
                {"role": "user", "content": f"Summarize competitor updates in one sentence:\n{updates_text}"}
            ],
            temperature=0.5,
            max_tokens=100
        )
        summary = response["choices"][0]["message"]["content"].strip()
        analyzed_data["summary"] = summary
        return analyzed_data
    except Exception as e:
        analyzed_data["summary"] = f"Error summarizing: {e}"
        return analyzed_data
