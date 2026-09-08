export const personalInfo = {
  name: "Liza Rawat",
  title: "Data Engineering & AI / Machine Learning Engineer",
  tagline: "B.Tech Computer Science student specializing in building scalable AI platforms, quantitative analytics engines, and high-throughput data processing systems.",
  location: "Jalandhar / Phagwara, Punjab, India",
  email: "rawatliza36@gmail.com",
  phone: "+91-7678628143",
  linkedin: "https://linkedin.com/in/liza-rawat-912975352/",
  github: "https://github.com/lizarawat",
  resumeUrl: "#contact",
  objective: "To start my career in Data Engineering and Artificial Intelligence, where I can apply my technical skills to real-world problems, build scalable solutions, and continuously grow as an engineer."
};

export const keyMetrics = [
  { label: "DSA Problems Solved", value: "350+", subtext: "LeetCode & GeeksforGeeks", icon: "Code2" },
  { label: "Data Records Processed", value: "1.21B+", subtext: "Demographic Census Analytics", icon: "Database" },
  { label: "Streaming Latency", value: "<200ms", subtext: "Quant Equity Ticker Updates", icon: "Zap" },
  { label: "Academic Distinction", value: "8.85", subtext: "B.Tech CSE CGPA @ LPU", icon: "GraduationCap" },
];

export const skillCategories = [
  {
    category: "Data Engineering & Analytics",
    skills: [
      { name: "Python", level: "Advanced", icon: "FileCode" },
      { name: "Pandas & NumPy", level: "Advanced", icon: "Table" },
      { name: "SQL (PostgreSQL, MySQL)", level: "Advanced", icon: "Database" },
      { name: "Exploratory Data Analysis (EDA)", level: "Advanced", icon: "BarChart3" },
      { name: "Data Visualization (Seaborn, Matplotlib, Plotly)", level: "Advanced", icon: "PieChart" },
      { name: "Power BI", level: "Intermediate", icon: "LayoutGrid" },
      { name: "Hadoop", level: "Foundational", icon: "Server" },
      { name: "MongoDB", level: "Intermediate", icon: "HardDrive" },
    ]
  },
  {
    category: "AI & Machine Learning",
    skills: [
      { name: "Regression & Classification", level: "Advanced", icon: "Cpu" },
      { name: "Feature Engineering & Outlier Detection", level: "Advanced", icon: "Sliders" },
      { name: "Scikit-learn & SciPy", level: "Advanced", icon: "Binary" },
      { name: "FinBERT (NLP Sentiment)", level: "Intermediate", icon: "BrainCircuit" },
      { name: "Gemini 2.5 Flash LLM Tooling", level: "Advanced", icon: "Sparkles" },
      { name: "Structured NLP Scoring & Toulmin Logic", level: "Advanced", icon: "FileText" },
    ]
  },
  {
    category: "Software & Web Engineering",
    skills: [
      { name: "C & C++", level: "Advanced", icon: "Code" },
      { name: "Java", level: "Intermediate", icon: "Coffee" },
      { name: "TypeScript & JavaScript", level: "Advanced", icon: "Braces" },
      { name: "React.js & Tailwind CSS", level: "Advanced", icon: "Layers" },
      { name: "FastAPI & Flask", level: "Intermediate", icon: "Globe" },
      { name: "WebSockets & WebAssembly (Wasm)", level: "Intermediate", icon: "Network" },
    ]
  },
  {
    category: "Developer Tools & Platforms",
    skills: [
      { name: "Git & GitHub", level: "Advanced", icon: "GitBranch" },
      { name: "Linux Administration", level: "Intermediate", icon: "Terminal" },
      { name: "VS Code", level: "Advanced", icon: "Laptop" },
      { name: "Figma & Canva", level: "Intermediate", icon: "Figma" },
      { name: "AutoCAD", level: "Foundational", icon: "Compass" },
    ]
  }
];

export const projects = [
  {
    id: "debatemind-nlp",
    title: "DebateMind — AI Argument Scoring & NLP Evaluation Engine",
    date: "Apr 2026",
    category: "AI / ML & Web Platform",
    shortDesc: "Serverless AI debate platform scoring argument logic (0-100) using Gemini 2.5 Flash and Toulmin NLP structure.",
    fullDesc: "Engineered an AI-powered web platform enabling multilingual debates, quizzes, and Toulmin argument building with AI, human, or random opponents across 12+ debate topics with automated scoring.",
    metrics: [
      { label: "Debate Topics", val: "12+ Live Topics" },
      { label: "Competitive Tiers", val: "8 Rank Tiers" },
      { label: "Scoring Engine", val: "Toulmin 0-100" },
      { label: "Security", val: "PostgreSQL RLS & 2-Step Auth" }
    ],
    highlights: [
      "Designed serverless backend proxying Gemini 2.5 Flash structured outputs for automated AI judging and dynamic rebuttals.",
      "Implemented Toulmin argument structure engine to score logic clarity, evidence weight, and fallacy presence.",
      "Built interactive frontend with Tailwind CSS, supporting 5 battle modes and 8 competitive user tiers."
    ],
    techStack: ["Gemini 2.5 Flash", "React.js", "TypeScript", "PostgreSQL", "Structured Outputs", "Tailwind CSS", "Wasm"],
    github: "https://github.com/lizarawat/DebateMind",
    demo: "https://debatemind.lovable.app/"
  },
  {
    id: "tradecraft-quant",
    title: "TradeCraft — Real-Time Quantitative Equity Analytics & Paper Trading Platform",
    date: "Jun 2026",
    category: "Quant & Full Stack",
    shortDesc: "Real-time algorithmic trading & quantitative analytics platform tracking 20+ NSE bluechip equities with intraday FinBERT sentiment scoring and risk-free paper trading.",
    fullDesc: "Architected a high-throughput quantitative paper trading platform streaming intraday OHLC prices for 20+ NSE bluechip equities. Formulated pandas-ta feature engineering scripts for RSI/MACD signals, integrated a FinBERT NLP model for market news sentiment scoring, and built a secure paper trading environment with 2-step authorization.",
    metrics: [
      { label: "Equity Coverage", val: "20+ NSE Bluechips" },
      { label: "Margin Simulated", val: "₹10 Lakhs+" },
      { label: "Streaming Latency", val: "<200ms" },
      { label: "Portfolio Yield", val: "+37.29% P&L" }
    ],
    highlights: [
      "Streamed live ticker data via WebSockets and Yahoo Finance API with sub-200ms latency.",
      "Engineered automated trade signal generation combining quantitative TA-Lib indicators with FinBERT market news sentiment.",
      "Built beginner-friendly paper trading dashboard with virtual account ledger and secure 2-step authorization."
    ],
    techStack: ["Python", "Pandas", "TA-Lib", "FinBERT (NLP)", "React.js", "WebSockets", "Yahoo Finance API"],
    github: "https://github.com/lizarawat/TradeCraft",
    demo: "https://tradecraft-rho-seven.vercel.app/"
  },
  {
    id: "netroutex-simulator",
    title: "NetRoutex — Network Routing & Algorithm Simulator",
    date: "Jun 2026",
    category: "Algorithms & WebAssembly",
    shortDesc: "Interactive graph algorithm simulator visualizing Dijkstra, Bellman-Ford, BFS, and DFS with real-time packet routing.",
    fullDesc: "Web-based network simulator demonstrating core graph theory and computer network routing algorithms compiled with WebAssembly for low-latency client-side simulation.",
    metrics: [
      { label: "Algorithms", val: "Dijkstra, Bellman-Ford, BFS, DFS" },
      { label: "Core Execution", val: "C++ compiled to WebAssembly" },
      { label: "Simulation Features", val: "Packet routing & link failure" },
      { label: "Topology", val: "Interactive Custom Node Editing" }
    ],
    highlights: [
      "Implemented high-performance C++ algorithm backend compiled to WebAssembly (Wasm) for real-time browser execution.",
      "Visualized graph pathfinding algorithms with step-by-step state inspection and packet animation.",
      "Supports dynamic topology modification, node addition, and live link failure scenario testing."
    ],
    techStack: ["React.js", "TypeScript", "C++", "WebAssembly", "JSON"],
    github: "https://github.com/lizarawat/NetRoutex",
    demo: "https://net-routex.vercel.app/"
  },
  {
    id: "demographic-eda",
    title: "Demographic EDA & National Census Analytics Dashboard",
    date: "Apr 2026",
    category: "Data Analytics & Engineering",
    shortDesc: "Large-scale exploratory data analysis analyzing 1.21B+ population records across 35 states and 1,344 districts.",
    fullDesc: "Comprehensive data engineering project extracting socio-economic trends, literacy disparities, and workforce distribution patterns from 1.21 Billion+ national census data points.",
    metrics: [
      { label: "Records Analyzed", val: "1.21 Billion+" },
      { label: "Geographic Scope", val: "35 States & 1,344 Districts" },
      { label: "Key National Metric", val: "67.8% Avg Literacy Rate" },
      { label: "Interactivity", val: "Dynamic Top-N Metric Filter" }
    ],
    highlights: [
      "Optimized Pandas data processing pipeline to handle over 1.21 Billion records cleanly.",
      "Quantified socio-economic correlations using Seaborn heatmaps and statistical distribution models.",
      "Deployed interactive analytical web dashboard using Streamlit and Plotly for multi-dimensional demographic exploration."
    ],
    techStack: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Streamlit", "Plotly"],
    github: "https://github.com/lizarawat/Indian-Census-2011-EDA",
    demo: "https://lnkd.in/p/dVp-qKZU"
  },
  {
    id: "deadlockx",
    title: "DeadlockX — Automated Deadlock Detection Tool",
    date: "2025",
    category: "Operating Systems",
    shortDesc: "OS diagnostic tool visualizing Resource Allocation Graphs and detecting process dependency cycles.",
    fullDesc: "Systems tool built to analyze resource allocation, detect deadlocks in multi-threaded environments using Resource Allocation Graphs (RAG) and Wait-for Graphs (WFG), and suggest automated resolution strategies.",
    metrics: [
      { label: "Graph Types", val: "RAG & Wait-for Graphs" },
      { label: "Algorithm", val: "Cycle Detection & Allocation Check" },
      { label: "Output", val: "Visual Graph & Resolution Report" }
    ],
    highlights: [
      "Constructed graph cycle detection logic to pinpoint deadlocked process nodes in real time.",
      "Visualized process-resource dependencies with actionable deadlock resolution recommendations."
    ],
    techStack: ["C++", "OS Algorithms", "Resource Allocation Graphs", "Cycle Detection"],
    github: "https://github.com/lizarawat/DeadlockX",
    demo: "https://www.linkedin.com/posts/aman79_operatingsystems-deadlockdetection-bankersalgorithm-ugcPost-7454559054561009664-VuEo?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFHfTqwB-MGF3brlqgZi7BMoIF1bkAZfnwI"
  },
  {
    id: "physics-engine",
    title: "Custom 2D Physics Engine from Scratch",
    date: "2025",
    category: "Game Dev & Physics",
    shortDesc: "High-performance, zero-allocation 2D physics engine in C# with spatial hash grid pruning and SAT collision.",
    fullDesc: "Built a zero-allocation 2D physics engine in C# featuring spatial hash grid broad-phase pruning, Separating Axis Theorem (SAT) narrow-phase collision detection, and sequential impulse constraint solving.",
    metrics: [
      { label: "Allocation", val: "Zero Garbage Collection Overhead" },
      { label: "Collision Method", val: "SAT & Spatial Hash Pruning" },
      { label: "Solver", val: "Iterative Sequential Impulse" }
    ],
    highlights: [
      "Implemented spatial hash grid pruning to drastically reduce collision check complexity from O(N²) to O(N).",
      "Calculated exact contact manifolds using SAT for concave and convex 2D bodies."
    ],
    techStack: ["C#", "Unity Engine", "VS Code", "Physics Math"],
    github: "https://github.com/lizarawat/Custom-2D-Physics-Engine",
    demo: null
  }
];

export const certifications = [
  {
    title: "MongoDB Certified Database Administrator Path",
    issuer: "MongoDB",
    date: "Sep 2026",
    credentialId: "MongoDB-DBA-2026",
    tags: ["Databases", "NoSQL", "Indexing", "DBA"],
    link: "https://www.credly.com/"
  },
  {
    title: "Oracle Cloud Infrastructure AI Foundations Associate",
    issuer: "Oracle University",
    date: "Jul 2026",
    credentialId: "Oracle-OCI-AI-2026",
    tags: ["Cloud AI", "Oracle Cloud", "Machine Learning"],
    link: "https://mylearn.oracle.com/"
  },
  {
    title: "Oracle Data Platform 2025 Certified Foundations Associate",
    issuer: "Oracle University",
    date: "May 2026",
    credentialId: "Oracle-Data-2025",
    tags: ["Data Engineering", "SQL", "Enterprise Data"],
    link: "https://mylearn.oracle.com/"
  },
  {
    title: "Complete Data Science, ML, DL & NLP Bootcamp (99 Hours)",
    issuer: "Udemy",
    date: "May 2026",
    credentialId: "UC-DataScience-99H",
    tags: ["Machine Learning", "Deep Learning", "NLP", "Python"],
    link: "https://www.udemy.com/"
  },
  {
    title: "GEN AI NASSCOM - SFJ Skill Development Program",
    issuer: "NASSCOM",
    date: "Feb 2026",
    credentialId: "NASSCOM-GENAI-2026",
    tags: ["Generative AI", "LLMs", "AI Applications"],
    link: "https://futureskillsprime.in/"
  },
  {
    title: "Artificial Intelligence Foundations: Machine Learning",
    issuer: "LinkedIn Learning",
    date: "Jul 2025",
    credentialId: "LIL-AI-ML-2025",
    tags: ["AI Fundamentals", "ML Concepts"],
    link: "https://www.linkedin.com/learning/"
  },
  {
    title: "Career Skills in Data Analytics",
    issuer: "LinkedIn Learning",
    date: "2025",
    credentialId: "LIL-DataAnalytics-2025",
    tags: ["Analytics", "Business Intelligence"],
    link: "https://www.linkedin.com/learning/"
  },
  {
    title: "HackerRank Certified: Python & C#",
    issuer: "HackerRank",
    date: "2024 - 2025",
    credentialId: "HackerRank-Python-CSharp",
    tags: ["Python", "C#", "Algorithms"],
    link: "https://www.hackerrank.com/certificates/"
  }
];

export const education = [
  {
    degree: "Bachelor of Technology - Computer Science & Engineering",
    institution: "Lovely Professional University (LPU)",
    location: "Phagwara, Punjab",
    period: "Aug 2024 – Present",
    score: "CGPA: 8.85 / 10.0 (V Sem)",
    details: "Focusing on Data Engineering, Machine Learning, Graph Data Structures, and Systems Software."
  },
  {
    degree: "Intermediate / SSC (Senior Secondary)",
    institution: "Delhi Public School Ranipur",
    location: "Haridwar, Uttarakhand",
    period: "Apr 2023 – May 2024",
    score: "91.6%",
    details: "Science & Mathematics concentration with top academic performance."
  },
  {
    degree: "Matriculation / HSC (High School)",
    institution: "Glocal School Saharanpur",
    location: "Saharanpur, Uttar Pradesh",
    period: "Apr 2021 – May 2022",
    score: "93.6%",
    details: "Distinction in Science, Mathematics, and Technology."
  }
];

export const achievements = [
  {
    title: "350+ DSA Problems Solved",
    organization: "LeetCode & GeeksforGeeks",
    period: "Present",
    desc: "Strengthened core computer science fundamentals across arrays, trees, graph algorithms, dynamic programming, and Big-O efficiency."
  },
  {
    title: "Pre-Finalist @ AlgoArena Hackathon",
    organization: "TheEduCode by Eduniketan Private Limited",
    period: "Apr 2026",
    desc: "Qualified for Pre-Finals in competitive coding hackathon evaluating algorithmic speed and data structure optimization."
  },
  {
    title: "Organizing Member - Ensemble 2025",
    organization: "Untangle & Arts/Event Management Committee",
    period: "Feb 2025",
    desc: "Led event operations, logistics coordination, and student engagement for university-wide campus cultural festival."
  },
  {
    title: "CyberSmart Certification",
    organization: "WNS Cares Foundation CDP",
    period: "Aug 2025",
    desc: "Certified in cybersecurity awareness and safe digital infrastructure practices."
  }
];
