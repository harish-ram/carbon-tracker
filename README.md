# Smart Carbon Footprint & Sustainability Tracker

A modern, full-stack web application to help businesses measure, monitor, and reduce their carbon emissions with advanced analytics, real-time dashboards, and actionable recommendations.

## 🎯 Features

- **Dashboard**: Real-time analytics with KPI cards, trend charts, and scope breakdowns
- **Data Entry**: Multi-tab form for entering electricity, fuel, water, waste, and travel data
- **Carbon Calculator**: Convert activities into CO₂ equivalents using automated calculations
- **Benchmarking**: Compare emissions with industry standards and regional averages
- **Recommendations**: AI-powered sustainability improvement suggestions
- **Reports**: Generate and export emissions reports in CSV/PDF formats
- **Settings**: Manage company profile, preferences, and theme

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for responsive, utility-first styling
- **React Router** for navigation
- **Recharts** for interactive data visualization
- **Zustand** for global state management
- **Axios** for API calls

### Backend (Optional)
- **Node.js + Express** for REST API
- **PostgreSQL** for data persistence
- **Prisma** for ORM

### External APIs
- **Carbon Interface API** - CO₂ emission calculations
- **Electricity Map API** - Grid carbon intensity data
- **World Bank API** - Industry benchmarks

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm/yarn
- Git

### Frontend Setup

```bash
# Navigate to project directory
cd smart-carbon-tracker

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:5173` in your browser.

### Backend Setup (Optional)

```bash
# Navigate to backend directory
cd server

# Install dependencies
npm install

# Create .env file with database URL
# DATABASE_URL=postgresql://user:password@localhost:5432/carbon_db

# Run migrations
npx prisma migrate dev

# Start server
npm run dev
```

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
│   │   └── Settings.tsx
│   ├── services/            # API integration
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

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend (Heroku/Railway)
```bash
git push heroku main
```

## 📈 Future Enhancements

- [ ] AI-powered insights dashboard
- [ ] Real-time grid carbon intensity updates
- [ ] Mobile app (React Native)
- [ ] Advanced predictive analytics
- [ ] Carbon offset marketplace integration
- [ ] Team collaboration features
- [ ] API webhooks for external integrations

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
