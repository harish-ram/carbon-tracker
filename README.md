# Smart Carbon Footprint & Sustainability Tracker

A modern React-based web application to help businesses and individuals measure, monitor, and reduce their carbon emissions with advanced analytics, real-time dashboards, and actionable recommendations.

## 🌐 Live Demo

**[View Live Application](https://harish-ram.github.io/carbon-tracker/)**

## 🎯 Features

- **User Authentication**: Secure sign-up/login with Firebase Authentication
- **Dashboard**: Real-time analytics with KPI cards, trend charts, and scope breakdowns
- **Data Entry**: Multi-tab form for entering electricity, fuel, water, waste, and travel data
- **Carbon Calculator**: Convert activities into CO₂ equivalents using automated calculations
- **Benchmarking**: Compare emissions with industry standards and regional averages
- **Recommendations**: AI-powered sustainability improvement suggestions
- **Reports**: Generate and export emissions reports in CSV/PDF formats
- **Learn**: Interactive educational content about carbon emissions, credits, and reduction strategies
- **Settings**: Manage company profile, preferences, and dark/light theme
- **Edit/Delete Records**: Full CRUD operations for emission records
- **User-Specific Data**: Each user's data is stored securely and separately

## 🛠️ Tech Stack

### Frontend (React.js)
- **React 18** with TypeScript - Modern UI library for building interactive interfaces
- **Vite** - Lightning-fast development server and optimized production builds
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **React Router** - Client-side routing with HashRouter for GitHub Pages compatibility
- **Recharts** - Composable charting library for interactive data visualization
- **Zustand** - Lightweight state management with localStorage persistence
- **Axios** - Promise-based HTTP client for API integration

### Build & Development Tools
- **Node.js** - JavaScript runtime (development only, not in production)
- **npm** - Package manager
- **TypeScript** - Type-safe JavaScript
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing with Autoprefixer

### Deployment
- **GitHub Pages** - Free static site hosting
- **gh-pages** - Automated deployment tool
- **Firebase** - Authentication and Firestore database (Backend-as-a-Service)

## 🔐 Authentication & Database

This app uses **Firebase** for:
- ✅ User authentication (email/password)
- ✅ Firestore database (user-specific data storage)
- ✅ Works seamlessly with GitHub Pages (no backend needed!)

**Setup Guide**: See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for complete instructions.

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm
- Git

### Setup Instructions

```bash
# Clone the repository
git clone https://github.com/harish-ram/carbon-tracker.git
cd carbon-tracker

# Install dependencies
npm install

# Install Firebase
npm install firebase

# Configure environment variables
cp .env.example .env
# Edit .env and add your Firebase config (see FIREBASE_SETUP.md)

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

Visit `http://localhost:5173` in your browser.

## 🏗️ Project Structure

```
smart-carbon-tracker/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── KPICard.tsx
│   │   ├── FormInput.tsx
│   │   ├── ToggleSwitch.tsx
│   │   ├── Loader.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── pages/               # Route pages
│   │   ├── Dashboard.tsx
│   │   ├── DataEntry.tsx
│   │   ├── CarbonCalculator.tsx
│   │   ├── Benchmarks.tsx
│   │   ├── Recommendations.tsx
│   │   ├── Reports.tsx
│   │   ├── Learn.tsx
│   │   └── Settings.tsx
│   ├── services/            # API integration (optional)
│   │   ├── carbonAPI.ts
│   │   ├── electricityMapAPI.ts
│   │   └── benchmarkAPI.ts
│   ├── store/               # Global state (Zustand)
│   │   └── appStore.ts
│   ├── utils/               # Helper functions
│   │   ├── helpers.ts
│   │   └── emissions.ts
│   ├── types/               # TypeScript interfaces
│   │   └── index.ts
│   ├── styles/              # Global styles
│   │   └── globals.css
│   ├── App.tsx              # Root component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── index.html
```

## 🎨 Design System

### Color Palette
- **Primary Green**: #00A86B
- **Dark Green**: #006644
- **Charcoal**: #1F2933
- **Accent Blue**: #0095FF
- **Neutral**: Grays from #F5F7FA to #1E1E1E

### Typography
- **Headings**: Montserrat, bold
- **Body**: Inter/Roboto, regular

### Animations
- Smooth transitions (0.2-0.35s)
- Fade-in on scroll
- Card hover effects (scale 1.02)
- Chart reveal animations

## 📊 Key Components

### KPICard
Displays key metrics with trend indicators and hover animations.

```tsx
<KPICard
  title="Total Emissions"
  value={12500}
  unit="kg CO₂e"
  trend={5.2}
  trendDirection="down"
/>
```

### FormInput
Reusable form input with validation and error handling.

```tsx
<FormInput
  label="Electricity (kWh)"
  type="number"
  value={value}
  onChange={handleChange}
  error={error}
/>
```

## 🔧 State Management

Uses Zustand for global state including:
- Theme (light/dark)
- Company profile
- Emission records
- Recommendations
- UI state (loading, error, success)

```tsx
const { records, addRecord, theme, setTheme } = useAppStore();
```

## 🔗 API Integration

### Carbon Calculations
```tsx
const result = await carbonAPI.calculateElectricity(200, "IN");
// Returns: { co2e: 136, unit: "kg" }
```

### Benchmarking
```tsx
const benchmark = await benchmarkAPI.getIndustryBenchmark("manufacturing", "IN");
```

## 📱 Responsive Design

- **Mobile**: Single column, optimized touch interactions
- **Tablet**: 2-column layouts
- **Desktop**: 3-4 column grids

Uses Tailwind CSS breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 🎯 Features Implementation

### Data Entry & Validation
- Multi-step form with progress tracking
- Real-time validation
- Auto-calculation via Carbon API
- Stored in Zustand store with localStorage persistence

### Charts & Visualizations
- Line charts for trends
- Bar charts for categories
- Real-time data updates
- Responsive container sizing

### Accessibility
- Semantic HTML (`<form>`, `<fieldset>`, `<table>`)
- Proper ARIA labels
- Keyboard navigation support
- Color contrast compliance

## 🚀 Deployment

### Deployed on GitHub Pages

This application is deployed using GitHub Pages with the following configuration:

1. **Repository**: https://github.com/harish-ram/carbon-tracker
2. **Live URL**: https://harish-ram.github.io/carbon-tracker/
3. **Deployment**: Automated via `gh-pages` package

### Deploy Your Own Instance

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

### Configuration for GitHub Pages

The app uses:
- **HashRouter** instead of BrowserRouter for proper routing on GitHub Pages
- **Base path** configured in `vite.config.ts` as `/carbon-tracker/`
- **gh-pages branch** for automated deployment

### How It Works

1. `npm run deploy` triggers `predeploy` script which runs `npm run build`
2. Vite builds the React app into static files in the `dist/` directory
3. `gh-pages` package pushes the `dist/` folder to the `gh-pages` branch
4. GitHub Pages serves the static files from the `gh-pages` branch
5. No Node.js runtime required in production - pure client-side React app

## 🎨 Design System

### Color Palette
- **Primary Green**: #00A86B
- **Dark Green**: #006644
- **Charcoal**: #1F2933
- **Accent Blue**: #0095FF
- **Neutral**: Grays from #F5F7FA to #1E1E1E

### Typography
- **Headings**: Montserrat, bold
- **Body**: Inter/Roboto, regular

### Animations
- Smooth transitions (0.2-0.35s)
- Fade-in on scroll
- Card hover effects (scale 1.02)
- Chart reveal animations
- Rotating globe animation on Learn page

## 📈 Future Enhancements

- [ ] AI-powered insights dashboard
- [ ] Real-time grid carbon intensity updates
- [ ] Mobile app (React Native)
- [ ] Advanced predictive analytics
- [ ] Carbon offset marketplace integration
- [ ] Team collaboration features
- [ ] Backend API integration for multi-user support
- [ ] Database persistence (PostgreSQL/MongoDB)
- [ ] API webhooks for external integrations

## 🎓 What You'll Learn

This project demonstrates:
- Modern React development with TypeScript
- State management with Zustand
- Responsive design with Tailwind CSS
- Data visualization with Recharts
- Client-side routing with React Router
- Local storage for data persistence
- Building and deploying to GitHub Pages
- Dark mode implementation
- Form handling and validation
- Component-based architecture

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋 Support

For support, email support@carbonfootprint-tracker.com or open an issue in the repository.

## 🌱 Sustainability

By using this application, you're taking a crucial step towards understanding and reducing your organization's environmental impact. Together, we can build a more sustainable future.

---

**Built with ❤️ for the environment**
