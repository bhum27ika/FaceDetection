# DermaAI - Clean Project Structure

## Web Version (Next.js)
```
/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── providers.tsx
│   ├── globals.css
│   ├── auth/page.tsx
│   ├── analyze/page.tsx
│   ├── questionnaire/page.tsx
│   ├── recommendations/page.tsx
│   └── dermatologists/page.tsx
├── components/
│   ├── ui/ (shadcn components)
│   ├── navigation.tsx
│   ├── hero.tsx
│   ├── features.tsx
│   ├── footer.tsx
│   ├── auth-form.tsx
│   ├── questionnaire-form.tsx
│   ├── skin-analyzer.tsx
│   ├── analysis-result.tsx
│   ├── chemical-ingredients.tsx
│   ├── product-routine.tsx
│   ├── ayurvedic-treatments.tsx
│   ├── severity-tracker.tsx
│   ├── dermatologist-locator.tsx
│   ├── recommendation-engine.tsx
│   └── user-dashboard.tsx
├── lib/
│   ├── auth-context.tsx
│   ├── user-storage.ts
│   ├── ingredients.ts
│   ├── ayurvedic-treatments.ts
│   ├── recommendation-engine.ts
│   └── utils.ts
├── package.json
├── tsconfig.json
├── next.config.mjs
└── README.md
```

## React Native Version (Expo)
```
/DermaAI-Minimal/
├── App.tsx
├── src/
│   ├── context.tsx (Auth + App contexts)
│   ├── Navigation.tsx (All navigation logic)
│   ├── utils.ts (All utilities & data)
│   └── screens/
│       ├── OnboardingScreen.tsx
│       ├── LoginScreen.tsx
│       ├── SignUpScreen.tsx
│       ├── QuestionnaireScreen.tsx
│       ├── HomeScreen.tsx
│       ├── AnalyzeScreen.tsx
│       ├── DermatologistsScreen.tsx
│       └── ProfileScreen.tsx
├── package.json
├── tsconfig.json
├── app.json
├── babel.config.js
└── README.md
```

## Key Features

✓ **Only DermaAI** - No mixing with other projects
✓ **Minimal File Count** - Web: 40+ files | Mobile: 12 files
✓ **Clean Separation** - Web (Next.js) and Mobile (React Native) in separate folders
✓ **Full Functionality**:
  - User Authentication
  - Skin Profile Questionnaire
  - AI Skin Analysis
  - Chemical Ingredients Database
  - Personalized Recommendations
  - Ayurvedic Treatments
  - Dermatologist Finder
  - User History & Tracking

## Install & Run

### Web Version
```bash
npm install
npm run dev
```

### Mobile Version
```bash
cd DermaAI-Minimal
npm install
npm start
```

## Deleted Files
- All teacher-related files and folders have been removed
- DermaAI-Mobile (heavier version) can be deleted
- Only keeping DermaAI-Minimal for React Native
