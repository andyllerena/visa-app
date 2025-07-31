# Gen VISA

A prompt-driven UI generator that speaks Visa Product Design System (VPDS). Simply describe what you need and get the best VPDS components with ready-to-use code snippets.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

**Live Demo:** [https://gen-visa.vercel.app](https://gen-visa.vercel.app)

## ✨ Features

- **Smart Component Matching**: Scoring algorithm finds the most relevant VPDS components based on your description
- **Ready-to-Use Snippets**: All code snippets use `@visa/nova-react` primitives for consistent branding
- **Accessibility First**: Components include accessibility notes and have been tested with axe DevTools
- **Pattern Suggestions**: Pre-built patterns with typewriter animations for common use cases
- **Favorites System**: Save your most-used components (stored locally)

## 🛠 Tech Stack

- **Next.js App Router** with React 18 for optimized routing and zero-config Vercel deployment
- **Tailwind CSS** for layout and focus management (separate from VPDS styling)
- **TypeScript** for type safety and intelligent component scoring
- **json-server** mock API with realistic loading delays and skeleton states

## 🎯 How It Works

### Component Scoring Algorithm

The app uses a rule-based scoring system to find the most relevant components:

```
Exact name match:    +20 points
Tag match:           +5 points per tag
Synonym match:       +3 points per synonym

Results are sorted high to low, showing top 9 matches
```

_Scoring weights were hand-tuned through testing to ensure natural result ordering._

### Component Catalog

- **20+ Nova components** with comprehensive metadata
- Each component includes description, tags, synonyms, accessibility notes, and snippet IDs
- Stored as local JSON for fast searching and filtering

## 💡 Try These Starter Phrases

```
responsive login form with remember me
search bar with filters
contact form with validation
data table with sorting
notification toast with actions
```

Each phrase triggers a pre-built pattern snippet with smooth typewriter animation.

## ♿ Accessibility

- All components pass axe DevTools accessibility audits
- Manual keyboard navigation and focus management testing completed
- Accessibility notes included for each component
- Proper labels and contrast ratios implemented

## 🤖 AI Assistance

ChatGPT was used to assist with:

- Bug fixes and debugging
- Generating component catalog data and code snippets
- Refining accessibility notes and best practices
- Brainstorming component metadata structure

⚡ Development Shortcuts
To deliver this project efficiently, several pragmatic shortcuts were taken:

Hardcoded Pattern Generation: Instead of building complex layout logic, the five starter phrases map to pre-built snippet patterns with typewriter effects
localStorage for Favorites: User preferences are stored locally rather than implementing a full user system with cloud sync
Mock API Integration: Uses json-server with artificial delays to simulate real backend calls instead of building actual API infrastructure
Simplified Component Scoring: Implements basic keyword matching rather than advanced natural language processing
Curated Component Set: Includes only the most essential and commonly-used components rather than the complete VPDS library
Static Data Architecture: Component catalog ships with the app rather than being dynamically loaded from a content management system

These shortcuts enabled rapid development while maintaining core functionality and user experience quality

## 🏗 Current Limitations

- **Hardcoded Patterns**: Generated snippets are pre-built rather than dynamically composed
- **Local Storage Only**: Favorites aren't synced across devices
- **Mock API**: Ships with static data instead of real backend
- **Limited Catalog**: Includes only the most essential components
- **Simple Scoring**: Basic keyword matching without natural language processing

## 🔮 Future Enhancements

With additional development time, the following features would be prioritized:

### Core Features

- **Natural Language Processing**: AI service to compose any prompt into proper layouts
- **Live Preview**: Iframe rendering of snippets for instant visual feedback
- **VS Code Integration**: Side panel extension for direct code insertion
- **Real Database**: Backend service to house all components and user data

### User Experience

- **Authentication System**: User accounts and profile management
- **Cloud Sync**: Favorites and preferences across devices
- **Pattern Library**: Save and share custom generated patterns
- **VPDS Integration**: Rebuild the app itself using VPDS components

### Technical Improvements

- **Advanced AI Model**: Custom NLP for generating user-inputted patterns
- **Component Builder**: Visual editor for creating new component patterns
- **Analytics**: Usage tracking to improve component recommendations
- **API Integration**: Real-time component updates from VPDS releases
