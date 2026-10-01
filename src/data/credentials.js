// Ordered newest first.
// `link`: public verification URL, or null if none exists.
// `preview`: captured image of the real certificate (public/certs), or null.
// `mark`: Simple Icons key for the issuer; `mono` is the stamp text when no logo exists.
// `cat`: 'data' | 'ai' | 'code', used by the filter.
export const CATEGORIES = Object.freeze([
  { id: 'all', label: 'All' },
  { id: 'data', label: 'Data & cloud' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'code', label: 'Programming' },
])

export const credentials = Object.freeze([
  { id: 'mongodb-dba', title: 'MongoDB Certified Database Administrator Path', issuer: 'MongoDB', date: 'Sep 2026', cat: 'data', mark: 'mongodb', preview: '/certs/mongodb.jpg', link: 'https://drive.google.com/drive/folders/1MlaPGk2NMorip76oQz_WLABApUA7Bvv_?usp=sharing', major: true },
  { id: 'oci-ai', title: 'OCI AI Foundations Associate', issuer: 'Oracle', date: 'Jul 2026', cat: 'ai', mono: 'O', preview: '/certs/oracle-oci-ai.jpg', link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=1C069C2129BD5E70E038E23F0BC0201C13D0ADD5BCF67E56D99B14E0E11BC0BE', major: true },
  { id: 'oracle-data', title: 'Oracle Data Platform 2025 Foundations Associate', issuer: 'Oracle', date: 'May 2026', cat: 'data', mono: 'O', preview: '/certs/oracle-data.jpg', link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=F8FECD775404A7E4D58F5BB4A943B22BAF50A6E4B14C056777A1628258186818', major: true },
  { id: 'udemy-ds', title: 'Complete Data Science, ML, DL & NLP Bootcamp', issuer: 'Udemy', date: 'May 2026', cat: 'ai', mark: 'udemy', preview: '/certs/udemy.jpg', link: 'https://udemy-certificate.s3.amazonaws.com/image/UC-68919ddf-4ca4-4f28-af9b-6eaae46f2f53.jpg', major: true },
  { id: 'java', title: 'Programming in Java', issuer: 'iamneo', date: 'May 2026', cat: 'code', mono: 'neo', preview: '/certs/java.jpg', link: 'https://lpucolab438.examly.io/certificate/U2FsdGVkX19vNpoTWvo155A2Q4UMoZeAcYJqF4a9Dsg%3D' },
  { id: 'nasscom', title: 'Gen AI, SFJ Skill Development Program', issuer: 'NASSCOM', date: 'Feb 2026', cat: 'ai', mono: 'N', preview: '/certs/nasscom.jpg', link: 'https://drive.google.com/drive/folders/15qb-dltrK-d9B556pu3CBftItTjJEg9x', major: true },
  { id: 'cpp', title: 'Programming Using C++', issuer: 'Infosys Springboard', date: 'Aug 2025', cat: 'code', mark: 'infosys', preview: null, link: null },
  { id: 'li-ml', title: 'AI Foundations: Machine Learning', issuer: 'LinkedIn Learning', date: 'Jul 2025', cat: 'ai', mono: 'in', preview: '/certs/linkedin-ml.jpg', link: 'https://www.linkedin.com/learning/certificates/9065a8a04872e04f7086ad92c2c97f47921d7f2cc9bbbde05557f5556e6edd11' },
  { id: 'li-genai', title: 'What Is Generative AI?', issuer: 'LinkedIn Learning', date: 'Jul 2025', cat: 'ai', mono: 'in', preview: null, link: null },
  { id: 'c72', title: 'C Programming, 72 hours', issuer: 'iamneo', date: 'May 2025', cat: 'code', mono: 'neo', preview: null, link: 'https://lpucolab438.examly.io/certificate/U2FsdGVkX19tpgsnvdSvcnh7LV6%2F12QcXOw4w7sexZ8%3D' },
  { id: 'skillera', title: 'Introduction to AI/ML', issuer: 'Skillera', date: 'Mar 2025', cat: 'ai', mono: 'S', preview: null, link: 'https://www.linkedin.com/posts/liza-rawat-912975352_ai-machinelearning-lifelonglearning-activity-7312874682704166912-Ye6f' },
  { id: 'coursera', title: 'Introduction to AI/ML', issuer: 'Coursera', date: '2025', cat: 'ai', mark: 'coursera', preview: null, link: null },
  { id: 'li-analytics', title: 'Career Skills in Data Analytics', issuer: 'LinkedIn Learning', date: '2025', cat: 'data', mono: 'in', preview: null, link: null },
  { id: 'python', title: 'Basic to Beyond: Python', issuer: 'CSE Pathshala', date: 'Jan 2025', cat: 'code', mono: 'CP', preview: null, link: null },
  { id: 'c-basics', title: 'C for Beginners', issuer: 'Great Learning', date: 'Dec 2024', cat: 'code', mono: 'GL', preview: null, link: null },
  { id: 'hackerrank', title: 'Python & C#', issuer: 'HackerRank', date: '2024 - 2025', cat: 'code', mark: 'hackerrank', preview: null, link: 'https://www.hackerrank.com/certificates/73ddae2b7994' },
])
