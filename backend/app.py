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
    competitors = request.json.get("competitors", [])
    results = []

    if not competitors:
        return jsonify({"error": "No competitors provided"}), 400

    try:
        for competitor in competitors:
            competitor_name = competitor.get("name", "Unknown")
            print("Processing competitor:", competitor_name)

            # Fetch raw data from scraper
            raw_data = fetch_competitor_data(competitor_name)
            if "error" in raw_data:
                results.append({
                    "name": competitor_name,
                    "summary": raw_data["error"],
                    "impact": "neutral",
                    "suggestion": "No suggestion",
                    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                })
                continue

            # Extract articles
            articles = raw_data.get("articles", [{"title": "No data found", "content": ""}])

            # Analyze changes
            analysis = analyze_changes(competitor_name, articles)

            # Summarize using OpenAI
            summary = summarize_report(analysis)

            # Prepare structured output
            results.append({
                "name": competitor_name,
                "summary": summary,
                "impact": "neutral",          # You can update this logic later
                "suggestion": "No suggestion", # You can generate suggestion dynamically later
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            })

        return jsonify(results)

    except Exception as e:
        print("[Critical Error] /track:", e)
        return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    print(f"🚀 Running Competitor Intelligence API on port {PORT}")
    app.run(host="0.0.0.0", port=PORT, debug=True)
