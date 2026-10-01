# Liza Rawat, portfolio

A two-ink risograph "data zine". Pink and blue inks overprint on newsprint in light mode and glow on black stock in dark mode. Every featured project comes with a working plate built from the same logic as the project.

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # logic tests (market/RSI, Dijkstra, cycle detection, halftone, physics, form validation)
npm run build
```

## Add the profile photo

1. Put a portrait at `public/liza.jpg`. Square or 4:5 works best, with the face in the upper half.
2. In `src/data/profile.js`, set `photo: '/liza.jpg'`.

The hero separates the photo into a blue plate (shadows) and a pink plate (warm midtones) and prints it as a halftone. Hovering acts as a printer's loupe. Until a photo is set, the hero prints her monogram instead.

## Where things live

| What | File |
| --- | --- |
| Name, links, stats, ticker words | `src/data/profile.js` |
| Projects and their copy | `src/data/projects.js` |
| Toolkit (type case) | `src/data/skills.js` |
| Achievements, training, education | `src/data/record.js` |
| Certificates | `src/data/credentials.js` |
| Census literacy figures | `src/data/census.js` |
| Colours, fonts, radii | `src/styles/tokens.css` |
| Live preview screenshots | `public/previews/*.jpg` |

## Notes

- The contact form posts to FormSubmit (`formsubmit.co/ajax/<email>`), the same service the previous site used. FormSubmit asks the inbox owner to confirm once on first use.
- The live-preview window iframes the deployed demos. If a demo later starts sending `X-Frame-Options: DENY`, set `frameable: false` for it in `projects.js`.
- All motion respects `prefers-reduced-motion`.
