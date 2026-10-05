// Single source of truth for personal details.
// To show a real portrait in the hero, drop a square-ish photo at
// public/liza.jpg and set `photo: '/liza.jpg'`. Until then the hero
// prints a halftone monogram in its place.
export const profile = Object.freeze({
  name: 'Liza Rawat',
  first: 'Liza',
  last: 'Rawat',
  initials: 'LR',
  role: 'Data engineering & AI/ML',
  lede: 'I turn very large, very messy datasets into pipelines, models and dashboards that people actually use.',
  objective:
    'To start my career in Data Engineering and Artificial Intelligence, applying my skills to real problems, building scalable systems and growing as an engineer.',
  photo: '/liza.jpg',
  location: 'Phagwara, Punjab, India',
  email: 'rawatliza36@gmail.com',
  phone: '+91 76786 28143',
  phoneHref: 'tel:+917678628143',
  linkedin: 'https://linkedin.com/in/liza-rawat-912975352/',
  github: 'https://github.com/lizarawat',
  cv: '/Liza_Rawat_CV.pdf',
  status: 'Open to data engineering & AI roles',
})

export const stats = Object.freeze([
  { value: 400, suffix: '+', label: 'DSA problems solved', note: 'LeetCode and GeeksforGeeks' },
  { value: 1.21, suffix: 'B+', decimals: 2, label: 'census records processed', note: 'Census 2011 EDA' },
  { value: 200, prefix: '<', suffix: 'ms', label: 'ticker streaming latency', note: 'TradeCraft WebSockets' },
  { value: 8.85, decimals: 2, label: 'CGPA, B.Tech CSE', note: 'Lovely Professional University' },
])

export const ticker = Object.freeze([
  'Python', 'Pandas', 'NumPy', 'Scikit-learn', 'SQL', 'PostgreSQL', 'MongoDB', 'FastAPI', 'Flask',
  'FinBERT', 'Gemini 2.5 Flash', 'React', 'TypeScript', 'WebSockets', 'C++', 'WebAssembly', 'Streamlit', 'Plotly',
])
