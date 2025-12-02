# Technical Documentation

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Web Browser                           │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    ┌──────▼─────────┐
                    │  React + TS    │
                    │   Component    │
                    │   Layer        │
                    └──────┬─────────┘
                           │
                ┌──────────▼──────────┐
                │   Zustand Store    │
                │   (Global State)   │
                └──────────┬─────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐      ┌─────▼────┐      ┌─────▼────┐
   │  Local  │      │API Calls │      │ LocalSt  │
   │ Storage │      │  (Axios) │      │ orage    │
   └────────┘      └──────────┘      └──────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────────┐  ┌─────▼──────┐  ┌─────▼──────┐
   │ Carbon API  │  │Electricity │  │  World     │
   │             │  │ Map API    │  │  Bank API  │
   └─────────────┘  └────────────┘  └────────────┘
```

## Frontend Architecture

### Component Hierarchy

```
App
├── Navbar
│   ├── Logo
│   ├── NavLinks
│   ├── ThemeToggle
│   └── MobileMenu
├── Main Routes
│   ├── Dashboard
│   │   ├── KPICards
│   │   └── Charts
│   ├── DataEntry
│   │   ├── FormTabs
│   │   └── RecordsPreview
│   ├── CarbonCalculator
│   │   ├── InputForm
│   │   └── ResultsCard
│   ├── Benchmarks
│   │   ├── BenchmarkCharts
│   │   └── DataTable
│   ├── Recommendations
│   │   └── RecommendationCards
│   ├── Reports
│   │   ├── Filters
│   │   └── DataTable
│   └── Settings
│       ├── CompanyForm
│       ├── PreferencesForm
│       └── DangerZone
└── Footer
```

### State Management (Zustand)

**Store Structure:**
```typescript
interface AppStore {
  // Theme
  theme: "light" | "dark"
  setTheme: (theme: "light" | "dark") => void
  
  // Company
  company: CompanyProfile | null
  setCompany: (company: CompanyProfile) => void
  
  // Records
  records: EmissionRecord[]
  addRecord: (record: Omit<EmissionRecord, "id" | "timestamp">) => void
  updateRecord: (id: string, record: Partial<EmissionRecord>) => void
  deleteRecord: (id: string) => void
  
  // UI State
  isLoading: boolean
  error: string | null
  success: string | null
}
```

**Persistence:**
- Uses localStorage via Zustand middleware
- Stored under `carbon-tracker-store` key
- Persists: theme, company, records

### Service Layer

#### carbonAPI.ts
```typescript
// Static emission factors
- calculateElectricity(kWh, region?) → CO₂e
- calculateFuel(liters, fuelType?) → CO₂e
- calculateTravel(distance, mode?) → CO₂e
- calculateWaste(weight, wasteType?) → CO₂e
- calculateWater(cubicMeters) → CO₂e
```

#### electricityMapAPI.ts
```typescript
// Grid carbon intensity
- getGridCarbonIntensity(region) → gCO₂/kWh
- getLowCarbonHours(region, hours) → optimal operation windows
```

#### benchmarkAPI.ts
```typescript
// Industry benchmarks
- getIndustryBenchmark(industry, region) → benchmark data
- getRegionalBenchmarks() → all regional data
```

### Utility Functions

#### helpers.ts
- `formatNumber()` - Format with thousand separators
- `formatLargeNumber()` - Abbreviate (K, M, B)
- `calculatePercentageChange()` - Percent calculations
- `generateId()` - Unique ID generation
- `groupBy()` - Array grouping
- `sortBy()` - Array sorting
- `deepClone()` - Object cloning

#### emissions.ts
- `calculateTotalEmissions()` - Sum all CO₂e
- `calculateScopeEmissions()` - Scope breakdown
- `calculateEmissionsByCategory()` - Category breakdown
- `calculateMonthlyTrend()` - Trend data
- `getEmissionsStatistics()` - Min, max, avg
- `getYearOverYearComparison()` - YoY analysis

### Styling Architecture

**Tailwind CSS Configuration:**
- Custom color palette (primary green, charcoal, blues)
- Extended theme with animations
- Custom components (btn, card, input utilities)
- Dark mode support via class strategy

**CSS Layers:**
- `globals.css` - Resets, base styles, components, animations
- Component-scoped styles via className props
- Responsive utilities via breakpoints

**Animations:**
- Fade-in (0.3s)
- Scale-in (0.3s)
- Slide-up (0.35s)
- Pulse-glow (2s infinite)

## Backend Architecture (Optional)

### API Endpoints

**Records**
```
GET    /api/records                    # List all records
POST   /api/records                    # Create new record
PUT    /api/records/:id               # Update record
DELETE /api/records/:id               # Delete record
```

**Company**
```
GET    /api/company                   # Get company profile
POST   /api/company                   # Create company
PUT    /api/company/:id              # Update company
```

**Analytics**
```
GET    /api/analytics/summary         # Emissions summary
```

### Database Schema (Prisma)

**Company Model**
- id (String, PK)
- name, industry, region
- employees (Int, optional)
- settings (theme, emailAlerts, currency, unit)
- timestamps

**EmissionRecord Model**
- id (String, PK)
- month, year, category
- value, unit, co2e
- notes, companyId (FK)
- timestamps

**BenchmarkData Model**
- id (String, PK)
- industry, region, year
- avgEmissions, unit, dataSource
- Unique constraint: (industry, region, year)

### Request/Response Format

**Emission Record Request**
```json
{
  "month": 1,
  "year": 2024,
  "category": "electricity",
  "value": 150,
  "unit": "kWh",
  "notes": "January consumption"
}
```

**Emission Record Response**
```json
{
  "id": "record_1234567890",
  "month": 1,
  "year": 2024,
  "category": "electricity",
  "value": 150,
  "unit": "kWh",
  "co2e": 60,
  "companyId": "company_123",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

## Data Flow

### Adding an Emission Record

```
User Input (DataEntry)
        ↓
Form Validation
        ↓
API Call to carbonAPI
        ↓
CO₂e Calculation
        ↓
Store in Zustand (addRecord)
        ↓
localStorage update
        ↓
UI Update (confirmation toast)
```

### Viewing Dashboard

```
Load App
        ↓
Fetch Records from Store
        ↓
Calculate Metrics:
- Total emissions
- Scope breakdown
- Monthly trend
- Categories
        ↓
Render Charts & KPIs
```

## Performance Optimizations

### Frontend
- Lazy loading of page components via React.lazy()
- Memoization of expensive calculations
- Efficient chart rendering with Recharts
- localStorage caching of app state
- CSS Grid/Flexbox for layout efficiency

### API Calls
- Debounced search/filters
- Batch operations where possible
- Caching with localStorage
- Error retry logic

### Bundle Size
- Tree-shaking unused code
- Gzip compression
- Code splitting by routes
- Vite optimizations

## Error Handling

### Frontend Error Handling
```typescript
try {
  const result = await carbonAPI.calculateElectricity(value);
  if (result.success) {
    // Success path
  } else {
    setError(result.error);
  }
} catch (error) {
  setError("An unexpected error occurred");
}
```

### Backend Error Handling
```typescript
app.use((err, req, res) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});
```

## Testing Strategy

### Unit Tests
- Utility functions (emissions.ts, helpers.ts)
- Store actions
- API response parsing

### Integration Tests
- User flows (data entry → calculation → storage)
- Chart rendering with mock data
- Form validation

### E2E Tests
- Complete user journeys
- Cross-browser compatibility
- Dark mode toggle
- Export functionality

## Security Considerations

1. **Input Validation**
   - Type-safe TypeScript
   - Form validation before submission
   - Sanitized data in displays

2. **API Security**
   - Environment variables for API keys
   - CORS configuration
   - Rate limiting (on backend)

3. **Data Privacy**
   - localStorage only (no server by default)
   - Optional backend keeps data encrypted
   - Export/delete functionality for GDPR compliance

4. **Error Messages**
   - Generic error messages to users
   - Detailed logs for developers
   - No sensitive data in error messages

## Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build  # Creates 'dist' folder
# Deploy dist folder to CDN
```

### Backend (Heroku/Railway)
```bash
npm run build
git push heroku main
# Heroku runs: npm run start
```

### Environment Variables
```
Frontend (.env):
- VITE_API_URL
- VITE_CARBON_API_KEY

Backend (.env):
- DATABASE_URL
- CARBON_INTERFACE_API_KEY
- CORS_ORIGIN
```

## Monitoring & Analytics

### Frontend
- Error tracking (Sentry optional)
- User analytics (GA optional)
- Performance monitoring

### Backend
- Server logs
- Database query performance
- API response times
- Error rates

## Future Enhancements

1. **Real-time Updates**
   - WebSocket for live data
   - Push notifications

2. **Advanced Analytics**
   - Machine learning predictions
   - Anomaly detection
   - Automated insights

3. **Integrations**
   - Slack notifications
   - Google Sheets sync
   - Salesforce integration

4. **Mobile App**
   - React Native version
   - Offline support
   - Mobile-optimized UI

## Development Workflow

### Local Development
```bash
# Terminal 1: Frontend
cd smart-carbon-tracker
npm run dev

# Terminal 2: Backend (optional)
cd server
npm run dev

# Terminal 3: Database (optional)
docker run -e POSTGRES_PASSWORD=password postgres:15
```

### Git Workflow
```bash
git checkout -b feature/feature-name
git commit -m "feat: description"
git push origin feature/feature-name
# Create Pull Request
```

---

**For more details, see README.md and GETTING_STARTED.md**
