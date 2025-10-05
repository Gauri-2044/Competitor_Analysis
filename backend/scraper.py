import requests
from bs4 import BeautifulSoup

def fetch_competitor_data(competitor):
    """
    Fetch detailed competitor-related data from Google News.
    Returns list of {title, link, source, snippet, full_text}
    """
    try:
        # If competitor is a dict from frontend
        query = competitor.get("name") if isinstance(competitor, dict) else str(competitor)
        url = f"https://news.google.com/search?q={query}"
        headers = {"User-Agent": "Mozilla/5.0"}
        resp = requests.get(url, headers=headers, timeout=10)

        soup = BeautifulSoup(resp.text, "html.parser")
        articles = []

        # Google News article cards
        for article in soup.select("article")[:5]:
            title_tag = article.select_one("h3 a, h4 a")
            if not title_tag:
                continue

            title = title_tag.text.strip()
            link = "https://news.google.com" + title_tag["href"][1:] if title_tag["href"].startswith(".") else title_tag["href"]

            # Optional metadata
            source = article.select_one(".SVJrMe")  # source name
            snippet = article.select_one(".HO8did")  # brief content

            # Try to fetch full content from the actual news link (optional)
            full_text = ""
            try:
                article_resp = requests.get(link, headers=headers, timeout=5)
                article_soup = BeautifulSoup(article_resp.text, "html.parser")
                paragraphs = article_soup.find_all("p")
                full_text = " ".join(p.get_text() for p in paragraphs[:5])  # first 5 paragraphs
            except Exception:
                pass  # skip if blocked or unavailable

            articles.append({
                "title": title,
                "link": link,
                "source": source.text if source else "",
                "snippet": snippet.text if snippet else "",
                "full_text": full_text,
            })

        return {"competitor": query, "articles": articles}

    except Exception as e:
        return {"competitor": str(competitor), "error": str(e)}
