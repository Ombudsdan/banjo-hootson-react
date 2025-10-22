# banjo-hootson-react

A minimal React 19 + Webpack 5 + TypeScript app to live alongside the Angular 20 app. This keeps both apps separate so you can migrate features gradually.

## Quick start (PowerShell)

```powershell
cd C:\Users\Dangr\Git\banjo-hootson\banjo-hootson-react
npm install
npm run dev
```

- Dev server: http://localhost:5173 (Webpack devServer)
- Build:

```powershell
npm run build
```

## Notes

- React: ^19.x (latest via Vite template)
- Bundler: Vite 7 (fast, modern alternative to Webpack)
- TypeScript: 5.8

If you’d prefer Webpack instead of Vite, I can scaffold Webpack 5 + SWC/TS config to match your past workflow.
