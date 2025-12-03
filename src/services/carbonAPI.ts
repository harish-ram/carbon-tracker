import { ApiResponse, CarbonCalculationResult } from "@/types";
import { EMISSION_FACTORS } from "@/data/emissionFactors";

/**
 * Carbon Emissions Calculator using EPA/IPCC/IEA emission factors
 * Free and production-ready - no external API calls required
 */
class CarbonAPI {
  /**
   * Calculate CO₂e emissions for electricity usage
   * @param kwhValue - kilowatt-hours value
   * @param region - Region code (e.g., 'IN', 'US', 'GB', 'WORLD')
   */
  async calculateElectricity(
    kwhValue: number,
    region: string = 'WORLD'
  ): Promise<ApiResponse<CarbonCalculationResult>> {
    try {
      // Get region-specific grid emission factor
      const regionCode = region.toUpperCase();
      const gridFactor = EMISSION_FACTORS.electricity.grid[regionCode as keyof typeof EMISSION_FACTORS.electricity.grid] 
        || EMISSION_FACTORS.electricity.grid.WORLD;
      
      const co2e = kwhValue * gridFactor.value;

      return {
        success: true,
        data: {
          type: "electricity",
          value: kwhValue,
          unit: "kWh",
          co2e: parseFloat(co2e.toFixed(3)),
          co2eUnit: "kg",
          factors: {
            gridFactor: gridFactor.value,
            region: gridFactor.region,
            source: gridFactor.source,
            notes: `Grid emission factor for ${gridFactor.region}: ${gridFactor.value} ${gridFactor.unit}`,
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to calculate electricity emissions",
      };
    }
  }

  /**
   * Calculate CO₂e emissions for fuel consumption
   * @param value - Amount of fuel consumed
   * @param fuelType - Type of fuel (diesel, petrol, lpg, cng, naturalGas, etc.)
   * @param unit - Unit of measurement (liters, m3, kg)
   */
  async calculateFuel(
    value: number,
    fuelType: "diesel" | "petrol" | "lpg" | "cng" | "naturalGas" | "biodiesel" | "ethanol" = "diesel"
  ): Promise<ApiResponse<CarbonCalculationResult>> {
    try {
      let factor: { value: number; unit: string; source: string } | undefined;
      
      // Get appropriate emission factor based on fuel type
      switch(fuelType) {
        case 'diesel':
          factor = EMISSION_FACTORS.fuels.liquid.diesel;
          break;
        case 'petrol':
          factor = EMISSION_FACTORS.fuels.liquid.petrol;
          break;
        case 'lpg':
          factor = EMISSION_FACTORS.fuels.gas.lpg;
          break;
        case 'cng':
          factor = EMISSION_FACTORS.fuels.gas.cng;
          break;
        case 'naturalGas':
          factor = EMISSION_FACTORS.fuels.gas.naturalGas;
          break;
        case 'biodiesel':
          factor = EMISSION_FACTORS.fuels.liquid.biodiesel;
          break;
        case 'ethanol':
          factor = EMISSION_FACTORS.fuels.liquid.ethanol;
          break;
        default:
          factor = EMISSION_FACTORS.fuels.liquid.diesel;
      }
      
      const co2e = value * factor.value;

      return {
        success: true,
        data: {
          type: "fuel",
          value,
          unit: factor.unit.split('/')[1], // Extract unit from "kg CO₂e/liter"
          co2e: parseFloat(co2e.toFixed(3)),
          co2eUnit: "kg",
          factors: {
            fuelType,
            emissionFactor: factor.value,
            source: factor.source,
            notes: `${fuelType.toUpperCase()} - ${factor.source}`,
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to calculate fuel emissions",
      };
    }
  }

  /**
   * Calculate CO₂e emissions for travel
   * @param distance - distance traveled in kilometers
   * @param mode - travel mode (flight, car, train, bus, etc.)
   */
  async calculateTravel(
    distance: number,
    mode: "flight" | "car" | "train" | "bus" | "metro" | "electricCar" | "motorcycle" = "car"
  ): Promise<ApiResponse<CarbonCalculationResult>> {
    try {
      let factor;
      
      switch(mode) {
        case 'flight':
          factor = EMISSION_FACTORS.transport.aviation.domestic;
          break;
        case 'car':
          factor = EMISSION_FACTORS.transport.road.petrolCar;
          break;
        case 'electricCar':
          factor = EMISSION_FACTORS.transport.road.electricCar;
          break;
        case 'train':
          factor = EMISSION_FACTORS.transport.rail.passenger;
          break;
        case 'metro':
          factor = EMISSION_FACTORS.transport.rail.metro;
          break;
        case 'bus':
          factor = EMISSION_FACTORS.transport.road.bus;
          break;
        case 'motorcycle':
          factor = EMISSION_FACTORS.transport.road.motorcycle;
          break;
        default:
          factor = EMISSION_FACTORS.transport.road.petrolCar;
      }

      const co2e = distance * factor.value;

      return {
        success: true,
        data: {
          type: "travel",
          value: distance,
          unit: "km",
          co2e: parseFloat(co2e.toFixed(3)),
          co2eUnit: "kg",
          factors: {
            mode,
            emissionFactor: factor.value,
            source: factor.source,
            notes: factor.notes || `${mode.toUpperCase()} - ${factor.source}`,
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to calculate travel emissions",
      };
    }
  }

  /**
   * Calculate CO₂e emissions for waste
   * @param weight - weight in kg
   * @param wasteType - type of waste (organic, recycled, landfill, composting, incineration)
   */
  async calculateWaste(
    weight: number,
    wasteType: "organic" | "recycled" | "landfill" | "composting" | "incineration" = "landfill"
  ): Promise<ApiResponse<CarbonCalculationResult>> {
    try {
      let factor;
      
      switch(wasteType) {
        case 'landfill':
          factor = EMISSION_FACTORS.waste.disposal.landfill;
          break;
        case 'recycled':
          factor = EMISSION_FACTORS.waste.disposal.recycling;
          break;
        case 'composting':
        case 'organic':
          factor = EMISSION_FACTORS.waste.disposal.composting;
          break;
        case 'incineration':
          factor = EMISSION_FACTORS.waste.disposal.incineration;
          break;
        default:
          factor = EMISSION_FACTORS.waste.disposal.landfill;
      }

      const co2e = weight * factor.value;

      return {
        success: true,
        data: {
          type: "waste",
          value: weight,
          unit: "kg",
          co2e: parseFloat(co2e.toFixed(3)),
          co2eUnit: "kg",
          factors: {
            wasteType,
            emissionFactor: factor.value,
            source: factor.source,
            notes: factor.notes || `${wasteType.toUpperCase()} - ${factor.source}`,
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to calculate waste emissions",
      };
    }
  }

  /**
   * Calculate CO₂e emissions for water usage
   * @param cubicMeters - water consumption in cubic meters (m³)
   * @param includeWastewater - whether to include wastewater treatment emissions
   */
  async calculateWater(
    cubicMeters: number,
    includeWastewater: boolean = false
  ): Promise<ApiResponse<CarbonCalculationResult>> {
    try {
      const supplyFactor = EMISSION_FACTORS.water.supply.treated;
      let totalFactor = supplyFactor.value;
      
      if (includeWastewater) {
        const wastewaterFactor = EMISSION_FACTORS.water.wastewater.treatment;
        totalFactor += wastewaterFactor.value;
      }
      
      const co2e = cubicMeters * totalFactor;

      return {
        success: true,
        data: {
          type: "water",
          value: cubicMeters,
          unit: "m³",
          co2e: parseFloat(co2e.toFixed(3)),
          co2eUnit: "kg",
          factors: {
            emissionFactor: totalFactor,
            source: supplyFactor.source,
            notes: includeWastewater 
              ? `Water supply + wastewater treatment - ${supplyFactor.source}` 
              : supplyFactor.notes || `Water supply - ${supplyFactor.source}`,
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to calculate water emissions",
      };
    }
  }
}

export default new CarbonAPI();
