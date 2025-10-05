from datetime import datetime

def analyze_changes(competitor_name, articles):
    """
    Analyze competitor articles and return structured data.
    For now, a simple keyword-based placeholder.
    """
    key_updates = []

    if not articles:
        key_updates.append("No updates found")
    else:
        for article in articles:
            key_updates.append(article.get("title", "No title"))

    # Simple logic for impact and suggestion
    impact = "neutral"
    suggestion = "Monitor updates regularly"

    for update in key_updates:
        lower_update = update.lower()
        if any(word in lower_update for word in ["launch", "release", "innovation", "expansion", "funding"]):
            impact = "improvement"
            suggestion = "Consider similar innovation or expansion"
        elif any(word in lower_update for word in ["loss", "drop", "layoff", "decline"]):
            impact = "loss"
            suggestion = "Investigate risks and adapt strategy"

    return {
        "name": competitor_name,
        "key_updates": key_updates,
        "impact": impact,
        "suggestion": suggestion,
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
