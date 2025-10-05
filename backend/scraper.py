import requests
from bs4 import BeautifulSoup

def fetch_competitor_data(competitor):
    """Fetch competitor website data (placeholder for now)."""
    try:
        url = f"https://news.google.com/search?q={competitor}"
        resp = requests.get(url, timeout=10)
        soup = BeautifulSoup(resp.text, "html.parser")
        headlines = [h.text for h in soup.find_all("a")[:5]]
        return {"headlines": headlines}
    except Exception as e:
        return {"error": str(e)}
