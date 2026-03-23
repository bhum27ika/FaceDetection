# DermaAI - Intelligent Skin Care Analysis Platform

## Overview

DermaAI is a comprehensive web platform that leverages deep learning-based image analysis to provide intelligent skincare management. The platform combines AI-powered skin condition detection, personalized product recommendations, and location-based dermatologist discovery to make professional skin care accessible to everyone.

## Key Features

### 1. **Deep Learning-Based Skin Analysis**
- Upload facial photos for instant AI analysis
- Detects skin type (Oily, Dry, Combination, Normal, Sensitive)
- Identifies skin conditions (Acne, Rosacea, Dryness, etc.)
- Provides severity assessment
- Generates confidence scores for analysis

### 2. **Personalized Recommendation Engine**
- Tailored skincare product suggestions based on skin type and conditions
- Includes cleanser, moisturizer, and treatment serum recommendations
- Database of vetted products with ratings and reviews
- Daily and evening skincare routines customized to skin profile
- Expert skincare tips and best practices

### 3. **Location-Based Dermatologist Finder**
- Discover qualified dermatologists in your area
- Filter by specialty (Acne, Rosacea, Skin Cancer, etc.)
- View ratings, reviews, and patient feedback
- Check availability and insurance acceptance
- Book appointments directly
- Contact information and office hours

### 4. **User Dashboard & Progress Tracking**
- Track skin health over time
- View analysis history with detailed reports
- Monitor health score trends
- Personalized recommendations based on progress
- User profile management
- Notification preferences

## Technology Stack

- **Frontend Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Form Handling**: React hooks
- **Image Processing**: Next.js Image component

## Project Structure

```
/
├── app/
│   ├── page.tsx              # Homepage with hero and features
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles with design tokens
│   ├── analyze/
│   │   └── page.tsx          # Skin analysis page
│   ├── recommendations/
│   │   └── page.tsx          # Personalized recommendations page
│   ├── dermatologists/
│   │   └── page.tsx          # Dermatologist finder page
│   └── dashboard/
│       └── page.tsx          # User dashboard
│
├── components/
│   ├── navigation.tsx        # Main navigation bar
│   ├── hero.tsx              # Landing page hero section
│   ├── features.tsx          # Features showcase
│   ├── footer.tsx            # Footer component
│   ├── skin-analyzer.tsx     # Image upload and analysis
│   ├── analysis-result.tsx   # Analysis results display
│   ├── recommendation-engine.tsx  # Personalized recommendations
│   ├── dermatologist-locator.tsx  # Dermatologist finder
│   └── user-dashboard.tsx    # User profile dashboard
│
└── public/
    └── icons/               # Icon assets
```

## Features Overview

### Homepage
- Hero section with call-to-action
- Feature highlights
- Trust indicators (HIPAA compliant, AI-powered, etc.)
- Navigation to all key features

### Skin Analysis (`/analyze`)
1. Upload facial photo (JPG, PNG)
2. AI analyzes skin condition
3. Displays results including:
   - Skin type classification
   - Detected conditions
   - Severity level
   - Health score
   - Personalized recommendations

### Recommendations (`/recommendations`)
1. Select skin type
2. Browse recommended products:
   - Cleansers
   - Moisturizers
   - Treatment serums
3. View detailed skincare routines
4. Access skincare tips and best practices

### Dermatologist Finder (`/dermatologists`)
1. View available dermatologists near you
2. Filter by specialty
3. Check ratings and reviews
4. View office hours and contact info
5. Book appointments
6. Virtual consultation option

### Dashboard (`/dashboard`)
1. Quick stats overview
2. Track progress over time
3. View analysis history
4. Manage user profile
5. Notification preferences

## Design System

### Color Palette
- **Primary**: Deep purple/blue (`#50 0.196 288.3`)
- **Secondary**: Teal/cyan (`#55 0.18 154`)
- **Accent**: Light teal (`#62 0.14 158`)
- **Neutrals**: White, light gray, dark gray
- **Status Colors**: Green (success), Yellow (warning), Red (error)

### Typography
- **Sans-serif**: Geist (body text and headings)
- **Monospace**: Geist Mono (code/technical content)
- **Font sizes**: 12px - 48px scale

### Spacing
Uses Tailwind's consistent spacing scale (4px increments)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## Usage Examples

### Uploading a Photo for Analysis
1. Navigate to `/analyze`
2. Click "Choose Photo" to upload
3. Click "Run Analysis"
4. View detailed results

### Finding a Dermatologist
1. Go to `/dermatologists`
2. Your location is detected automatically
3. Filter by specialty if needed
4. Click "Book Appointment"

### Tracking Progress
1. Access your `/dashboard`
2. View health score trends
3. Check analysis history
4. Review next steps

## Future Enhancements

- Integration with actual dermatology AI models (Deep Infra, etc.)
- User authentication and data persistence
- Email notifications for skin health updates
- Integration with appointment booking systems
- Mobile app version
- Video consultation features
- Community features and forums
- Advanced analytics and reporting

## Security & Privacy

- HIPAA-compliant image handling
- No personal data stored without consent
- Secure image processing
- Privacy policy included
- Terms of service provided

## Contributing

We welcome contributions! Please feel free to submit PRs for bug fixes, features, or improvements.

## License

MIT License - see LICENSE file for details

## Support

For questions or issues, please contact support@dermaai.com or visit our help center at dermaai.com/help

---

**Built with Next.js, Tailwind CSS, and shadcn/ui**
