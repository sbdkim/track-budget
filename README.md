# Budget Tracker App

A beginner-friendly React web app for tracking income and expenses with simple charts and local browser storage.

## Live Demo
Ready for GitHub Pages deployment from this repository using the included workflow in `.github/workflows/deploy-pages.yml`.

## Key Features
- Add, edit, and delete income or expense entries
- Filter transactions by type, category, and month
- Review total income, expenses, net balance, and top spending category
- Visualize category spending and monthly income-versus-expense trends
- Keep all data local in the browser with no backend required

## Tech Stack
- React 19
- Vite
- JavaScript
- CSS
- Recharts
- GitHub Pages

## Setup / Run Locally
```powershell
cd D:\Projects\github-projects\budget-tracker-app
npm install
npm run dev
```

## Tests
```powershell
cd D:\Projects\github-projects\budget-tracker-app
npm run test:run
```

## Deployment Notes
- The Vite base path is configured for a GitHub Pages repo named `budget-tracker-app`.
- The GitHub Actions workflow builds `dist/` and deploys it to GitHub Pages on pushes to `main`.
- If the repository name changes, update the `base` value in `vite.config.js` and the favicon path in `index.html`.

## Architecture
The app uses a single `transactions` state as its source of truth, derives summaries and charts from filtered data, and persists changes to `localStorage` under `budget-tracker:v1`.

## Privacy / Notes
This app does not send data to a server. Transactions stay in the current browser unless the user manually clears site storage.
