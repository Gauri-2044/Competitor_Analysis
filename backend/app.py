from flask import Flask, request, jsonify
from scraper import fetch_competitor_data
from analyzer import analyze_changes
from summarizer import summarize_report
from dotenv import load_dotenv
import os

load_dotenv()
PORT = os.getenv("PORT")

app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    return "Competitor Intelligence API is running."

@app.route("/track", methods=["POST"])
def track_competitors():
    competitors = request.json.get("competitors", [])
    results = []
    for competitor in competitors:
        raw_data = fetch_competitor_data(competitor)
        analysis = analyze_changes(raw_data)
        summary = summarize_report(analysis)
        results.append({"competitor": competitor, "summary": summary})
    return jsonify(results)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=True)
