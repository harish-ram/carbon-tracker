/**
 * Emission Factors Database
 * Sources: EPA, IPCC, IEA, DEFRA
 * All values in kg CO₂e per unit unless specified
 * Updated: December 2025
 */

export interface EmissionFactor {
  value: number;
  unit: string;
  source: string;
  region?: string;
  notes?: string;
}

export const EMISSION_FACTORS = {
  // ==================== ELECTRICITY ====================
  electricity: {
    // Grid emission factors by country (kg CO₂e per kWh)
    grid: {
      // Asia
      IN: { value: 0.708, unit: 'kg CO₂e/kWh', source: 'CEA India 2024', region: 'India' },
      CN: { value: 0.555, unit: 'kg CO₂e/kWh', source: 'IEA 2024', region: 'China' },
      JP: { value: 0.463, unit: 'kg CO₂e/kWh', source: 'IEA 2024', region: 'Japan' },
      
      // North America
      US: { value: 0.386, unit: 'kg CO₂e/kWh', source: 'EPA eGRID 2024', region: 'USA' },
      CA: { value: 0.120, unit: 'kg CO₂e/kWh', source: 'Environment Canada 2024', region: 'Canada' },
      
      // Europe
      GB: { value: 0.233, unit: 'kg CO₂e/kWh', source: 'DEFRA 2024', region: 'UK' },
      DE: { value: 0.420, unit: 'kg CO₂e/kWh', source: 'UBA Germany 2024', region: 'Germany' },
      FR: { value: 0.056, unit: 'kg CO₂e/kWh', source: 'ADEME 2024', region: 'France' },
      NO: { value: 0.018, unit: 'kg CO₂e/kWh', source: 'NVE 2024', region: 'Norway' },
      SE: { value: 0.013, unit: 'kg CO₂e/kWh', source: 'IEA 2024', region: 'Sweden' },
      
      // Others
      AU: { value: 0.690, unit: 'kg CO₂e/kWh', source: 'DISER Australia 2024', region: 'Australia' },
      BR: { value: 0.092, unit: 'kg CO₂e/kWh', source: 'IEA 2024', region: 'Brazil' },
      
      // Global average
      WORLD: { value: 0.475, unit: 'kg CO₂e/kWh', source: 'IEA 2024', region: 'World Average' },
    },
    
    // Renewable sources (near zero emissions)
    renewable: {
      solar: { value: 0.045, unit: 'kg CO₂e/kWh', source: 'IPCC 2024', notes: 'Lifecycle emissions' },
      wind: { value: 0.011, unit: 'kg CO₂e/kWh', source: 'IPCC 2024', notes: 'Lifecycle emissions' },
      hydro: { value: 0.024, unit: 'kg CO₂e/kWh', source: 'IPCC 2024', notes: 'Lifecycle emissions' },
      nuclear: { value: 0.012, unit: 'kg CO₂e/kWh', source: 'IPCC 2024', notes: 'Lifecycle emissions' },
    },
  },

  // ==================== FUELS ====================
  fuels: {
    // Liquid fuels (kg CO₂e per liter)
    liquid: {
      petrol: { value: 2.31, unit: 'kg CO₂e/liter', source: 'DEFRA 2024', notes: 'Gasoline' },
      diesel: { value: 2.68, unit: 'kg CO₂e/liter', source: 'DEFRA 2024' },
      biodiesel: { value: 1.35, unit: 'kg CO₂e/liter', source: 'EPA 2024', notes: 'B100' },
      ethanol: { value: 1.52, unit: 'kg CO₂e/liter', source: 'EPA 2024', notes: 'E100' },
      kerosene: { value: 2.52, unit: 'kg CO₂e/liter', source: 'DEFRA 2024', notes: 'Jet fuel' },
    },
    
    // Gaseous fuels (kg CO₂e per cubic meter or kg)
    gas: {
      naturalGas: { value: 2.02, unit: 'kg CO₂e/m³', source: 'EPA 2024' },
      lpg: { value: 1.51, unit: 'kg CO₂e/liter', source: 'DEFRA 2024', notes: 'Liquefied Petroleum Gas' },
      cng: { value: 2.75, unit: 'kg CO₂e/kg', source: 'EPA 2024', notes: 'Compressed Natural Gas' },
      propane: { value: 2.98, unit: 'kg CO₂e/kg', source: 'EPA 2024' },
    },
    
    // Solid fuels (kg CO₂e per kg)
    solid: {
      coal: { value: 2.42, unit: 'kg CO₂e/kg', source: 'IPCC 2024', notes: 'Bituminous coal' },
      lignite: { value: 1.05, unit: 'kg CO₂e/kg', source: 'IPCC 2024', notes: 'Brown coal' },
      wood: { value: 0.39, unit: 'kg CO₂e/kg', source: 'DEFRA 2024', notes: 'Sustainable forestry' },
      peat: { value: 0.95, unit: 'kg CO₂e/kg', source: 'IPCC 2024' },
    },
  },

  // ==================== TRANSPORTATION ====================
  transport: {
    // Per passenger-kilometer
    aviation: {
      domestic: { value: 0.255, unit: 'kg CO₂e/pkm', source: 'DEFRA 2024', notes: 'Domestic flight' },
      shortHaul: { value: 0.156, unit: 'kg CO₂e/pkm', source: 'DEFRA 2024', notes: 'Under 3,700 km' },
      longHaul: { value: 0.150, unit: 'kg CO₂e/pkm', source: 'DEFRA 2024', notes: 'Over 3,700 km' },
      international: { value: 0.195, unit: 'kg CO₂e/pkm', source: 'DEFRA 2024', notes: 'Average international' },
    },
    
    road: {
      // Cars (per km)
      petrolCar: { value: 0.170, unit: 'kg CO₂e/km', source: 'DEFRA 2024', notes: 'Average petrol car' },
      dieselCar: { value: 0.164, unit: 'kg CO₂e/km', source: 'DEFRA 2024', notes: 'Average diesel car' },
      hybridCar: { value: 0.110, unit: 'kg CO₂e/km', source: 'DEFRA 2024', notes: 'Hybrid vehicle' },
      electricCar: { value: 0.053, unit: 'kg CO₂e/km', source: 'DEFRA 2024', notes: 'EV with UK grid' },
      
      // Motorcycles
      motorcycle: { value: 0.113, unit: 'kg CO₂e/km', source: 'DEFRA 2024', notes: 'Average motorcycle' },
      
      // Buses (per passenger-km)
      bus: { value: 0.089, unit: 'kg CO₂e/pkm', source: 'EPA 2024', notes: 'City bus' },
      coach: { value: 0.028, unit: 'kg CO₂e/pkm', source: 'DEFRA 2024', notes: 'Long-distance coach' },
      
      // Trucks (per tonne-km)
      lightTruck: { value: 0.214, unit: 'kg CO₂e/tkm', source: 'EPA 2024', notes: 'Light goods vehicle' },
      heavyTruck: { value: 0.083, unit: 'kg CO₂e/tkm', source: 'EPA 2024', notes: 'Heavy goods vehicle' },
    },
    
    rail: {
      passenger: { value: 0.035, unit: 'kg CO₂e/pkm', source: 'DEFRA 2024', notes: 'National rail' },
      metro: { value: 0.029, unit: 'kg CO₂e/pkm', source: 'EPA 2024', notes: 'Urban metro' },
      tram: { value: 0.028, unit: 'kg CO₂e/pkm', source: 'EPA 2024' },
      freight: { value: 0.022, unit: 'kg CO₂e/tkm', source: 'DEFRA 2024', notes: 'Rail freight' },
    },
    
    sea: {
      ferry: { value: 0.113, unit: 'kg CO₂e/pkm', source: 'DEFRA 2024', notes: 'Passenger ferry' },
      cargo: { value: 0.016, unit: 'kg CO₂e/tkm', source: 'IMO 2024', notes: 'Container ship' },
      cruise: { value: 0.247, unit: 'kg CO₂e/pkm', source: 'DEFRA 2024', notes: 'Cruise ship' },
    },
  },

  // ==================== WASTE ====================
  waste: {
    disposal: {
      landfill: { value: 0.466, unit: 'kg CO₂e/kg', source: 'EPA 2024', notes: 'Municipal solid waste' },
      incineration: { value: 0.021, unit: 'kg CO₂e/kg', source: 'DEFRA 2024', notes: 'Energy recovery' },
      composting: { value: 0.021, unit: 'kg CO₂e/kg', source: 'EPA 2024', notes: 'Organic waste' },
      recycling: { value: -0.156, unit: 'kg CO₂e/kg', source: 'EPA 2024', notes: 'Avoided emissions' },
    },
    
    materialSpecific: {
      paper: { value: 0.013, unit: 'kg CO₂e/kg', source: 'EPA 2024', notes: 'Recycled paper' },
      plastic: { value: 0.045, unit: 'kg CO₂e/kg', source: 'EPA 2024', notes: 'Recycled plastic' },
      glass: { value: 0.012, unit: 'kg CO₂e/kg', source: 'EPA 2024', notes: 'Recycled glass' },
      metal: { value: 0.019, unit: 'kg CO₂e/kg', source: 'EPA 2024', notes: 'Recycled metal' },
      organic: { value: 0.021, unit: 'kg CO₂e/kg', source: 'EPA 2024', notes: 'Composted organic' },
    },
  },

  // ==================== WATER ====================
  water: {
    supply: {
      treated: { value: 0.344, unit: 'kg CO₂e/m³', source: 'EPA 2024', notes: 'Water treatment & supply' },
      untreated: { value: 0.150, unit: 'kg CO₂e/m³', source: 'DEFRA 2024', notes: 'Untreated water supply' },
    },
    
    wastewater: {
      treatment: { value: 0.708, unit: 'kg CO₂e/m³', source: 'EPA 2024', notes: 'Wastewater treatment' },
    },
  },

  // ==================== MATERIALS ====================
  materials: {
    construction: {
      cement: { value: 0.930, unit: 'kg CO₂e/kg', source: 'IPCC 2024' },
      concrete: { value: 0.159, unit: 'kg CO₂e/kg', source: 'IPCC 2024' },
      steel: { value: 1.850, unit: 'kg CO₂e/kg', source: 'World Steel 2024' },
      aluminum: { value: 8.200, unit: 'kg CO₂e/kg', source: 'IAI 2024', notes: 'Primary aluminum' },
      brick: { value: 0.230, unit: 'kg CO₂e/kg', source: 'ICE Database 2024' },
      timber: { value: -0.900, unit: 'kg CO₂e/kg', source: 'IPCC 2024', notes: 'Carbon sequestration' },
    },
    
    packaging: {
      paper: { value: 0.917, unit: 'kg CO₂e/kg', source: 'DEFRA 2024' },
      cardboard: { value: 1.050, unit: 'kg CO₂e/kg', source: 'DEFRA 2024' },
      plasticPET: { value: 2.530, unit: 'kg CO₂e/kg', source: 'DEFRA 2024', notes: 'PET plastic' },
      plasticHDPE: { value: 1.950, unit: 'kg CO₂e/kg', source: 'DEFRA 2024', notes: 'HDPE plastic' },
      glass: { value: 0.810, unit: 'kg CO₂e/kg', source: 'DEFRA 2024' },
      aluminum: { value: 8.200, unit: 'kg CO₂e/kg', source: 'DEFRA 2024', notes: 'Aluminum can' },
    },
  },

  // ==================== REFRIGERANTS ====================
  refrigerants: {
    // GWP (Global Warming Potential) in CO₂ equivalent
    r134a: { value: 1430, unit: 'kg CO₂e/kg', source: 'IPCC AR6', notes: 'HFC-134a, 100-year GWP' },
    r410a: { value: 2088, unit: 'kg CO₂e/kg', source: 'IPCC AR6', notes: 'R-410A refrigerant' },
    r32: { value: 675, unit: 'kg CO₂e/kg', source: 'IPCC AR6', notes: 'HFC-32' },
    r404a: { value: 3922, unit: 'kg CO₂e/kg', source: 'IPCC AR6', notes: 'R-404A' },
  },

  // ==================== AGRICULTURE ====================
  agriculture: {
    livestock: {
      beef: { value: 27.0, unit: 'kg CO₂e/kg', source: 'Poore & Nemecek 2018', notes: 'Beef production' },
      lamb: { value: 24.5, unit: 'kg CO₂e/kg', source: 'Poore & Nemecek 2018', notes: 'Lamb production' },
      pork: { value: 7.2, unit: 'kg CO₂e/kg', source: 'Poore & Nemecek 2018', notes: 'Pork production' },
      chicken: { value: 6.1, unit: 'kg CO₂e/kg', source: 'Poore & Nemecek 2018', notes: 'Chicken production' },
      fish: { value: 5.1, unit: 'kg CO₂e/kg', source: 'Poore & Nemecek 2018', notes: 'Farmed fish' },
      eggs: { value: 4.5, unit: 'kg CO₂e/kg', source: 'Poore & Nemecek 2018', notes: 'Egg production' },
      milk: { value: 1.9, unit: 'kg CO₂e/liter', source: 'Poore & Nemecek 2018', notes: 'Dairy milk' },
    },
    
    crops: {
      rice: { value: 2.7, unit: 'kg CO₂e/kg', source: 'Poore & Nemecek 2018' },
      wheat: { value: 0.6, unit: 'kg CO₂e/kg', source: 'Poore & Nemecek 2018' },
      vegetables: { value: 0.5, unit: 'kg CO₂e/kg', source: 'Poore & Nemecek 2018', notes: 'Average vegetables' },
      fruits: { value: 0.4, unit: 'kg CO₂e/kg', source: 'Poore & Nemecek 2018', notes: 'Average fruits' },
    },
  },
};

/**
 * Get emission factor for a specific category and region
 */
export function getEmissionFactor(
  category: string,
  subcategory: string,
  region: string = 'WORLD'
): EmissionFactor | null {
  try {
    // Navigate through the nested object structure
    const categoryData = (EMISSION_FACTORS as any)[category];
    if (!categoryData) return null;

    const subcategoryData = categoryData[subcategory];
    if (!subcategoryData) return null;

    // If it's a region-specific factor (like electricity grid)
    if (subcategoryData[region]) {
      return subcategoryData[region];
    }

    // Return the subcategory data directly if it's not region-specific
    return subcategoryData;
  } catch (error) {
    console.error('Error getting emission factor:', error);
    return null;
  }
}

/**
 * Calculate CO₂e emissions
 */
export function calculateEmissions(
  value: number,
  factor: EmissionFactor
): number {
  return value * factor.value;
}
