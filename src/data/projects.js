// Project copy comes from Liza's CV and her live portfolio.
// `demo` names the interactive plate rendered next to each project.
export const featured = Object.freeze([
  {
    id: 'tradecraft',
    name: 'TradeCraft',
    kicker: 'Real-time quant equity analytics',
    date: 'Jun 2026',
    demo: 'candles',
    summary:
      'A paper-trading desk that streams intraday prices for 20+ NSE blue chips, scores market news with FinBERT and turns RSI/MACD signals into simulated trades.',
    points: [
      'WebSocket ticker updates under 200ms from the Yahoo Finance feed.',
      'pandas-ta feature scripts for RSI and MACD, blended with FinBERT news sentiment for trade signals.',
      'Virtual ledger across ₹10 lakh+ of simulated capital, with 2-step auth.',
    ],
    metrics: [
      { k: '20+', v: 'NSE equities' },
      { k: '<200ms', v: 'stream latency' },
      { k: '+37.29%', v: 'simulated net P&L' },
    ],
    stack: ['Python', 'Pandas', 'TA-Lib', 'FinBERT', 'React', 'WebSockets'],
    github: 'https://github.com/lizarawat/TradeCraft',
    live: 'https://tradecraft-rho-seven.vercel.app/',
    shot: '/previews/tradecraft.jpg',
    frameable: true,
  },
  {
    id: 'debatemind',
    name: 'DebateMind',
    kicker: 'AI argument scoring engine',
    date: 'Apr 2026',
    demo: 'toulmin',
    summary:
      'A debate arena where Gemini 2.5 Flash judges arguments on a 0 to 100 scale using Toulmin structure: claim, data, warrant, backing, qualifier and rebuttal.',
    points: [
      'Serverless API proxying structured LLM outputs for judging and live rebuttals.',
      'Toulmin engine scoring logical clarity, evidence weight and fallacies.',
      'PostgreSQL with row-level security, 5 battle modes and 8 rank tiers.',
    ],
    metrics: [
      { k: '12+', v: 'debate topics' },
      { k: '0-100', v: 'Toulmin score' },
      { k: '8', v: 'rank tiers' },
    ],
    stack: ['Gemini 2.5 Flash', 'TypeScript', 'React', 'PostgreSQL', 'Tailwind'],
    github: 'https://github.com/lizarawat/DebateMind',
    live: 'https://debatemind.lovable.app/',
    shot: '/previews/debatemind.jpg',
    frameable: true,
  },
  {
    id: 'netroutex',
    name: 'NetRoutex',
    kicker: 'Network routing simulator',
    date: 'Jun 2026',
    demo: 'routes',
    summary:
      'A teaching simulator for graph routing. Build a network, run Dijkstra, Bellman-Ford, BFS or DFS, then cut links and watch packets find another way.',
    points: [
      'C++ algorithm core compiled to WebAssembly for in-browser speed.',
      'Step-by-step inspection of the priority queue, visited set and packet.',
      'Live topology edits and link-failure scenarios. Built with a team at LPU.',
    ],
    metrics: [
      { k: '4', v: 'routing algorithms' },
      { k: 'C++', v: 'to WebAssembly' },
      { k: 'Live', v: 'link failure' },
    ],
    stack: ['C++', 'WebAssembly', 'React', 'TypeScript'],
    github: 'https://github.com/lizarawat/NetRoutex',
    live: 'https://net-routex.vercel.app/',
    shot: '/previews/netroutex.jpg',
    frameable: true,
  },
  {
    id: 'census',
    name: 'Census 2011',
    kicker: 'Demographic EDA & dashboard',
    date: 'Apr 2026',
    demo: 'census',
    summary:
      'Exploratory analysis of India’s 2011 census: 1.21 billion people across 35 states and UTs and 1,344 districts, looking at literacy, workforce and disparity.',
    points: [
      'Pandas and NumPy pipeline over the full national census tables.',
      'Seaborn heatmaps and statistical models for socio-economic correlations.',
      'Streamlit and Plotly dashboard with dynamic top-N filters over 10+ metrics.',
    ],
    metrics: [
      { k: '1.21B+', v: 'people covered' },
      { k: '1,344', v: 'districts' },
      { k: '10+', v: 'filterable metrics' },
    ],
    stack: ['Python', 'Pandas', 'NumPy', 'Seaborn', 'Streamlit', 'Plotly'],
    github: 'https://github.com/lizarawat/Indian-Census-2011-EDA',
    live: 'https://lnkd.in/p/dVp-qKZU',
    liveLabel: 'Walkthrough',
    shot: null,
    frameable: false,
  },
])

export const more = Object.freeze([
  {
    id: 'deadlockx',
    name: 'DeadlockX',
    kicker: 'Deadlock detection tool',
    date: '2025',
    demo: 'deadlock',
    summary:
      'Builds resource-allocation and wait-for graphs from process state, finds the cycles that mean deadlock and suggests how to break them.',
    stack: ['C++', 'OS algorithms', 'Graphs'],
    github: 'https://github.com/lizarawat/DeadlockX',
    live: 'https://www.linkedin.com/posts/aman79_operatingsystems-deadlockdetection-bankersalgorithm-ugcPost-7454559054561009664-VuEo',
    liveLabel: 'Demo post',
  },
  {
    id: 'physics',
    name: '2D Physics Engine',
    kicker: 'Written from scratch in C#',
    date: '2025',
    demo: 'physics',
    summary:
      'Zero-allocation rigid-body engine: spatial-hash broad phase, SAT narrow phase and a sequential impulse solver. The footer of this page runs a tiny cousin of it.',
    stack: ['C#', 'Unity', 'Physics math'],
    github: 'https://github.com/lizarawat/Custom-2D-Physics-Engine',
    live: null,
  },
])
