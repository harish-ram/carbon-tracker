# Getting Started Guide

## Quick Start (5 minutes)

### 1. Frontend Setup

```bash
# Navigate to frontend directory
cd smart-carbon-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### 2. First Steps in the App

1. **Go to Settings** - Set up your company profile:
   - Company name
   - Industry type
   - Region (for grid carbon intensity)
   - Number of employees

2. **Data Entry** - Start entering emission data:
   - Click on different tabs (Electricity, Fuel, Travel, etc.)
   - Enter monthly values
   - System automatically calculates CO₂e

3. **Dashboard** - View your emissions:
   - Total emissions across all scopes
   - Monthly trends
   - Category breakdown

## Features Overview

### 📊 Dashboard
- **KPI Cards**: View total emissions, scope breakdowns
- **Trend Charts**: See emissions patterns over time
- **Category Analysis**: Understand which activities emit most

### ✍️ Data Entry
- **Multi-tab Interface**: Separate forms for each activity type
- **Auto-calculation**: CO₂e is calculated automatically
- **Recent Records**: Quick view of latest entries

### 🧮 Carbon Calculator
- Standalone calculator for quick CO₂e calculations
- Supports electricity, fuel, travel, waste, water
- Shows calculation methodology

### 📈 Benchmarks
- Compare with industry standards
- Regional comparison data
- Industry-specific metrics

### 💡 Recommendations
- Actionable sustainability tips
- Filtered by impact and cost
- Estimated savings for each recommendation

### 📑 Reports
- Export data as CSV
- Filter by time period
- Scope-wise breakdown

### ⚙️ Settings
- Company information management
- Preference configuration
- Theme toggling

## Core Concepts

### Emission Scopes

**Scope 1**: Direct emissions
- Fuel consumption
- Heating and cooling

**Scope 2**: Indirect energy emissions
- Purchased electricity
- Steam and heating

**Scope 3**: Indirect other emissions
- Travel (flights, trains)
- Waste management
- Water consumption

### Carbon Calculations

The app uses industry-standard emission factors:

**Electricity**
- Default: 0.4 kg CO₂e per kWh (global average)
- India: 0.68 kg CO₂e per kWh (higher coal dependency)
- France: 0.05 kg CO₂e per kWh (nuclear-heavy grid)

**Fuel**
- Diesel: 2.68 kg CO₂e per liter
- Petrol: 2.31 kg CO₂e per liter
- LPG: 1.50 kg CO₂e per liter

**Travel**
- Flight: 0.255 kg CO₂e per km
- Car: 0.17 kg CO₂e per km
- Train: 0.035 kg CO₂e per km

**Waste**
- Landfill: 0.015 kg CO₂e per kg
- Recycled: 0.002 kg CO₂e per kg

## Best Practices

### Data Entry
1. **Be Consistent**: Enter data monthly for accurate trends
2. **Use Accurate Units**: Ensure consistency when entering values
3. **Add Notes**: Document any special circumstances
4. **Regular Updates**: Keep data current for reliable insights

### Analytics Review
1. **Monitor Trends**: Look for unusual spikes
2. **Compare Periods**: Month-over-month and year-over-year analysis
3. **Identify Hotspots**: Find which categories contribute most
4. **Set Targets**: Use benchmarks to establish realistic goals

### Taking Action
1. **Prioritize**: Focus on high-impact, low-cost recommendations first
2. **Track Progress**: Monitor reduction after implementing changes
3. **Communicate**: Share insights with stakeholders
4. **Report**: Use built-in reports for compliance and transparency

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+S` | Save current form |
| `Esc` | Close modals/dropdowns |
| `/` | Search navigation |
| `Ctrl+/` | Open keyboard shortcut help |

## Troubleshooting

### Data Not Saving
- Check browser's localStorage is enabled
- Try refreshing the page
- Clear cache and reload

### Calculations Seem Off
- Verify the unit selection
- Check regional settings (affects grid carbon intensity)
- Confirm input values

### Charts Not Showing
- Ensure you have at least 2 data points
- Try refreshing the page
- Check browser console for errors

## Dark Mode

Toggle dark mode in two ways:
1. **Via Settings**: Switch the "Dark Mode" toggle
2. **Via Navbar**: Use the theme toggle in the navigation bar

Dark mode settings are automatically saved.

## Exporting Data

### CSV Export
1. Go to **Reports**
2. Select date range
3. Click **Download CSV**
4. Open in Excel or Google Sheets

### PDF Export (Coming Soon)
- Will allow formatted reports
- Professional styling
- Print-ready format

## Integrations

### Carbon Interface API
Provides accurate CO₂ emission calculations for various activities.

### Electricity Map API
Gives real-time grid carbon intensity for different regions, helping identify low-carbon operation windows.

### World Bank Data
Provides benchmark data for comparing with industry standards and national averages.

## Mobile Responsiveness

The app is fully responsive and works on:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px+)
- ✅ Mobile (320px+)

Navigation adapts automatically on smaller screens.

## Accessibility

The application follows WCAG 2.1 standards:
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ High contrast mode compatible
- ✅ Color not the only indicator

## Performance Tips

1. **Use Filters**: When you have many records, use date filters
2. **Regular Exports**: Archive old data and export for storage
3. **Browser Cache**: Let browser cache static assets
4. **Internet**: A stable connection improves chart rendering

## Support & Feedback

- **Documentation**: Check README.md for detailed docs
- **Issues**: Report bugs on GitHub
- **Suggestions**: We welcome feature requests!

## Next Steps

1. ✅ Complete company setup
2. ✅ Enter your first month of data
3. ✅ Review Dashboard insights
4. ✅ Check Recommendations
5. ✅ Set baseline emissions
6. ✅ Plan reduction strategy

---

**Happy tracking! 🌱**
