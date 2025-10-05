# 🧠 Competitor Intelligence Tracker  
**Where Artificial Intelligence meets Business Intelligence**

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-38B2AC?logo=tailwindcss)
![Python](https://img.shields.io/badge/Backend-Python-yellow?logo=python)
![Flask](https://img.shields.io/badge/API-Flask-lightgrey?logo=flask)
![LangChain](https://img.shields.io/badge/AI-LangChain-blueviolet)
![OpenAI](https://img.shields.io/badge/AI-OpenAI-412991?logo=openai)
![Firebase](https://img.shields.io/badge/Database-Firebase-orange?logo=firebase)
![Docker](https://img.shields.io/badge/Containerization-Docker-0db7ed?logo=docker)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)

## 📌 Description  

**Competitor Intelligence Tracker** is an AI-powered platform designed to help startups and enterprises monitor, analyze, and act on competitor activities in real-time.  

The system automatically tracks competitor websites, social media updates, and market news — then uses AI to **summarize key insights, highlight strategic movements,** and **suggest actionable business decisions.**  

It transforms raw data into daily, weekly, or monthly intelligence reports, helping organizations stay one step ahead in the market.


## 💡 Key Features  

- 🔍 **Track** competitors’ websites, product launches, and social updates  
- 🧩 **Generate AI-driven summaries** and strategic conclusions  
- 🚨 **Review results** with actionable insights and urgency flags  
- 🕹 **Manage competitor reviews** and mark completed tasks  
- 📈 **Automated business intelligence reports** (weekly/monthly)  
- 🔔 **Smart notifications** for high-impact or urgent updates  


## ⚙ Tech Stack  

| Layer | Technology |
|:------|:------------|
| **Frontend** | React + TailwindCSS (Responsive Dashboard UI) |
| **Backend** | Python (Flask / FastAPI) |
| **AI Intelligence** | LangChain + OpenAI / Gemini APIs |
| **Web Scraping** | BeautifulSoup / Scrapy |
| **Database** | Firebase Firestore / MongoDB |
| **Hosting & Auth** | Firebase |
| **Automation & Orchestration** | LangChain Agents |
| **Containerization** | Docker |

---

## 🚀 Workflow  

1. ➕ Add competitors (name, website, and public accounts)  
2. 🔎 The system fetches and tracks all public changes  
3. 🧠 AI analyzes updates and generates summary reports  
4. 📊 Reports are stored in the dashboard & review tab  
5. 💡 Company receives suggestions and alerts for decision-making  


## 🧩 Future Enhancements  

- 🤖 Personalized insights based on business goals and KPIs  
- 🔮 Predictive competitor behavior analysis  
- 🔗 Integration with more public APIs and employee signals  
- 🧭 Real-time AI-driven strategy recommendations  


## ⚙ Setup & Installation  

Follow these steps to run the **Competitor Intelligence Tracker** locally or in a containerized environment.



### 1️⃣ Clone the Repository  

```bash
git clone https://github.com/yourusername/Competitor_Analysis.git
cd Competitor_Analysis
```

### 2️⃣ Create a Virtual Environment
```bash
python -m venv venv
source venv/bin/activate      # For Linux/Mac
venv\Scripts\activate         # For Windows
```

### 3️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```

### 4️⃣ Configure Firebase

1. Go to Firebase Console
2. Create a new project → Add Firestore Database & Authentication
3. Download your Service Account Key (JSON)
4. Place it in your backend folder as:
```bash
backend/serviceAccountKey.json
```
5. Update your Firebase credentials in config.py or environment variables

### 5️⃣ Set Environment Variables

Create a .env file in your project root:

```bash
OPENAI_API_KEY=your_openai_api_key
FIREBASE_CREDENTIALS=backend/serviceAccountKey.json
MONGO_URI=your_mongodb_connection_string  # Optional if using MongoDB
PORT=5000  # Optional, default is 5000
```

6️⃣ Run the Backend Server
```bash
python app.py
```

Or for production:
```bash
gunicorn app:app
```

Default backend: http://localhost:5000

### 7️⃣ Run the Frontend (React + Tailwind)
```bash
cd frontend
npm install
npm start
```

Frontend runs on http://localhost:3000

### 🐳 8️⃣ (Optional) Run with Docker

If you prefer containerization:
```bash
docker build -t competitor-tracker .
docker run -p 5000:5000 competitor-tracker
```
### 9️⃣ Verify the Setup

✅ Open your browser and go to:
http://localhost:3000
 → Add competitors, generate reports, and explore review results.

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

## 🧑‍💻 Team & Vision

### Team Name: NexSight

Innovating for good — where technology meets strategic intelligence.