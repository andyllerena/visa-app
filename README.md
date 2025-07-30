# Gen VISA : prompt driven UI generator that speaks VPDS

Describe what you need, get the best Visa Product Design System components, copy a ready snippet.

## Approach and tech choices

- Next.js App Router and React 18 for rapid routing and Vercel zero config deploy
- Tailwind CSS for layout and focus rings, separate from the VPDS look
- Local JSON catalog of more than twenty Nova components, each with tags, synonyms, accessibility notes, and a snippet id
- TypeScript rule based scorer that adds points for exact name, tag, or synonym and returns the top nine matches
- json‑server mock API with a half‑second delay plus skeleton loaders so the app feels like it is calling a backend
- Real snippets import `@visa/nova‑react` primitives so output is always on brand

## Scoring in one glance

```
exact name   +20
tag match     +5 per tag
synonym       +3 per synonym
sort high to low, keep nine
```

Weights were tuned by hand after running a few test prompts until the order felt natural.

## Suggested starter phrases

```
responsive login form with remember me
search bar with filters
contact form with validation
data table with sorting
notification toast with actions
```

Each phrase maps to a hard coded pattern snippet that plays with a typewriter effect.

## Shortcuts and assumptions

- Patterns are stored as five hard coded snippets rather than built with live layout logic
- Favorites live only in localStorage
- Accessibility proof is an axe DevTools pass and a manual keyboard plus focus review
- Mock API ships with the app instead of a real backend

## What I would add with a full sprint

- Real natural language service that composes any prompt into a layout
- Live preview iframe so users see the snippet render instantly
- VS Code side panel that pastes the snippet at the cursor
- Supabase to sync favorites across devices

## How AI helped

- ChatGPT (this chat only) brainstormed the component catalog fields, suggested synonym lists, outlined the timeline, and surfaced VGAR test tips
- Copilot and other models were not used
- All final code, tuning, and design decisions are mine

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Live demo

[https://gen‑visa.vercel.app](https://gen‑visa.vercel.app)
