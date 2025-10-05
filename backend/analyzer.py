def analyze_changes(raw_data):
    """Very simple placeholder analysis for now."""
    if "headlines" in raw_data:
        return {"key_updates": raw_data["headlines"]}
    return {"key_updates": ["No data found"]}
