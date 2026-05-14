# HavrePlacide — Complete Website

A luxury fashion brand website built with React + TypeScript + Vite, with an Express API backend powered by Claude AI.

## What's included

- **Hero** — Full-screen landing with brand identity
- **About** — Brand story and stats
- **Shop** — Product grid with hover effects
- **Lookbook** — Editorial photo grid
- **Measurements** — AI photo analysis + size calculator + size guide
- **Contact** — Contact form wired to backend
- **Footer** — Full links and brand info

---

## Setup Instructions

### 1. Install dependencies
```bash
npm install
cd api-server && npm install && cd ..
```

### 2. Add your Anthropic API key
Create a `.env` file in the root folder:
```
ANTHROPIC_API_KEY=your_key_here
```
Get your key at: https://console.anthropic.com

### 3. Run the project
```bash
npm run dev
```
This starts both:
- Frontend (Vite) at http://localhost:5173
- API server at http://localhost:3001

### 4. Build for production
```bash
npm run build
```

---

## Deploy to Replit
1. Upload all files to your Replit project
2. Add `ANTHROPIC_API_KEY` in Replit Secrets (🔒 icon)
3. Run `npm install` then `npm run dev`

## Deploy to Vercel / Netlify
1. Push to GitHub
2. Connect repo to Vercel/Netlify
3. Add `ANTHROPIC_API_KEY` as an environment variable
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. Deploy the api-server separately (Railway, Render, or Vercel serverless)

---

## File Structure
```
havreplacide/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx        ← Navigation (all 6 links)
│   │   ├── Hero.tsx          ← Landing section
│   │   ├── About.tsx         ← Brand story
│   │   ├── Shop.tsx          ← Product grid
│   │   ├── Lookbook.tsx      ← Editorial grid
│   │   ├── Measurements.tsx  ← AI analysis + size calculator
│   │   ├── Contact.tsx       ← Contact form
│   │   └── Footer.tsx        ← Footer
│   ├── pages/
│   │   └── Home.tsx          ← Assembles all sections
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── api-server/
│   ├── index.js              ← Express backend
│   └── package.json
├── package.json
├── vite.config.ts
├── tsconfig.json
└── index.html
```
