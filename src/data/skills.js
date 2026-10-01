// Laid out as a printer's type case. `size` picks the compartment shape:
// 'xl' 2x2, 'w' 2x1, 't' 1x2, 's' 1x1. `depth` (1-3) sets how dense the ink is.
// `marks` are Simple Icons keys (see data/marks.js) drawn as a faint watermark;
// `glyph` is a Phosphor icon used where no brand logo exists.
export const typeCase = Object.freeze([
  {
    drawer: 'Data',
    ink: 'blue',
    items: [
      { name: 'Python', size: 'xl', depth: 3, marks: ['python'] },
      { name: 'Pandas & NumPy', size: 'w', depth: 3, marks: ['pandas', 'numpy'] },
      { name: 'SQL', note: 'PostgreSQL, MySQL', size: 's', depth: 3, marks: ['postgres'] },
      { name: 'EDA', size: 's', depth: 3, marks: ['jupyter'] },
      { name: 'Seaborn, Matplotlib, Plotly', size: 'w', depth: 3, marks: ['plotly'] },
      { name: 'MongoDB', size: 's', depth: 2, marks: ['mongodb'] },
      { name: 'Power BI', size: 's', depth: 2, glyph: 'ChartBar' },
      { name: 'Hadoop', size: 's', depth: 1, marks: ['hadoop'] },
    ],
  },
  {
    drawer: 'ML & NLP',
    ink: 'pink',
    items: [
      { name: 'Regression & classification', size: 'w', depth: 3, glyph: 'ChartScatter' },
      { name: 'Feature engineering', size: 't', depth: 3, glyph: 'FunnelSimple' },
      { name: 'Scikit-learn & SciPy', size: 's', depth: 3, marks: ['sklearn', 'scipy'] },
      { name: 'LLM tooling', note: 'Gemini 2.5 Flash', size: 's', depth: 3, marks: ['gemini'] },
      { name: 'FinBERT', note: 'NLP sentiment', size: 'w', depth: 2, marks: ['huggingface'] },
      { name: 'Outlier detection', size: 's', depth: 3, glyph: 'Crosshair' },
    ],
  },
  {
    drawer: 'Software',
    ink: 'both',
    items: [
      { name: 'C & C++', size: 'w', depth: 3, marks: ['c', 'cpp'] },
      { name: 'TypeScript', size: 's', depth: 3, marks: ['typescript'] },
      { name: 'React', size: 's', depth: 3, marks: ['react'] },
      { name: 'Java', size: 's', depth: 2, marks: ['java'] },
      { name: 'FastAPI & Flask', size: 's', depth: 2, marks: ['fastapi', 'flask'] },
      { name: 'WebSockets & Wasm', size: 'w', depth: 2, marks: ['wasm', 'socketio'] },
      { name: 'Git & Linux', size: 'w', depth: 3, marks: ['git', 'linux'] },
    ],
  },
])
