from flask import Flask, request, jsonify
from flask_cors import CORS
from scraper import fetch_competitor_data
from analyzer import analyze_changes
from summarizer import summarize_report
from dotenv import load_dotenv
from datetime import datetime
import os

# Load environment variables
load_dotenv()
PORT = int(os.getenv("PORT", 5000))

app = Flask(__name__)
CORS(app)  # Allow all origins for development. For production, restrict to your domain.

@app.route("/", methods=["GET"])
def index():
    return "🧠 Competitor Intelligence API is running."

@app.route("/track", methods=["POST"])
def track_competitors():
    try:
        competitors = request.json.get("competitors", [])
        results = []

        for competitor in competitors:
            competitor_name = competitor.get("name", "Unknown")
            try:
                # Example: articles could come from scraper
                articles = [{"title": "No updates found"}]  # placeholder
                analysis = analyze_changes(competitor_name, articles)
                summary_text = summarize_report(analysis)
            except Exception as e:
                summary_text = f"No summary available: {str(e)}"
                analysis = {"impact": "neutral", "suggestion": "Monitor updates regularly"}

            result = {
                "name": competitor_name,
                "summary": summary_text,
                "impact": analysis.get("impact", "neutral"),
                "suggestion": analysis.get("suggestion", "Monitor updates regularly"),
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }
            print(result)
            results.append(result)

        return jsonify(results)

    except Exception as e:
        print("[Critical Error] /track:", e)
        return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    print(f"🚀 Running Competitor Intelligence API on port {PORT}")
    app.run(host="0.0.0.0", port=PORT, debug=True)
