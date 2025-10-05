import sqlite3

def init_db():
    conn = sqlite3.connect("data/storage.db")
    c = conn.cursor()
    c.execute("""CREATE TABLE IF NOT EXISTS reports (
                 id INTEGER PRIMARY KEY AUTOINCREMENT,
                 competitor TEXT,
                 report TEXT,
                 timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)""")
    conn.commit()
    conn.close()

def save_report(competitor, report):
    conn = sqlite3.connect("data/storage.db")
    c = conn.cursor()
    c.execute("INSERT INTO reports (competitor, report) VALUES (?, ?)", (competitor, report))
    conn.commit()
    conn.close()
