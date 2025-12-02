import { ApiResponse, CarbonCalculationResult } from "@/types";

// Mock API - In production, replace with real Carbon Interface API

class CarbonAPI {
  constructor() {
    // Mock API initialization
  }

  /**
   * Calculate CO₂e emissions for electricity usage
   * @param kwhValue - kilowatt-hours value
   * @param region - Optional region code
   */
  async calculateElectricity(
    kwhValue: number,
    region?: string
  ): Promise<ApiResponse<CarbonCalculationResult>> {
    try {
      // Mock calculation: 0.4 kg CO₂e per kWh (average grid)
      const gridFactor = region === "india" ? 0.68 : 0.4;
      const co2e = kwhValue * gridFactor;

      return {
        success: true,
        data: {
          type: "electricity",
          value: kwhValue,
          unit: "kWh",
          co2e: parseFloat(co2e.toFixed(2)),
          co2eUnit: "kg",
          factors: {
            gridFactor,
            region: region || "average",
            notes: `Based on ${region || "global average"} grid carbon intensity`,
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
   * @param liters - liters of fuel consumed
   * @param fuelType - Type of fuel (diesel, petrol, lpg, etc.)
   */
  async calculateFuel(
    liters: number,
    fuelType: "diesel" | "petrol" | "lpg" | "cng" = "diesel"
  ): Promise<ApiResponse<CarbonCalculationResult>> {
    try {
      // Emission factors (kg CO₂e per liter)
      const emissionFactors: Record<string, number> = {
        diesel: 2.68,
        petrol: 2.31,
        lpg: 1.50,
        cng: 2.31,
      };

      const factor = emissionFactors[fuelType] || 2.31;
      const co2e = liters * factor;

      return {
        success: true,
        data: {
          type: "fuel",
          value: liters,
          unit: "liters",
          co2e: parseFloat(co2e.toFixed(2)),
          co2eUnit: "kg",
          factors: {
            fuelType,
            emissionFactor: factor,
            notes: `${fuelType.toUpperCase()} - Standard emission factor`,
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
   * @param mode - travel mode (flight, car, train, bus)
   */
  async calculateTravel(
    distance: number,
    mode: "flight" | "car" | "train" | "bus" = "car"
  ): Promise<ApiResponse<CarbonCalculationResult>> {
    try {
      // Emission factors (kg CO₂e per km)
      const emissionFactors: Record<string, number> = {
        flight: 0.255, // average for medium-haul
        car: 0.17, // average car with 1 passenger
        train: 0.035,
        bus: 0.089,
      };

      const factor = emissionFactors[mode] || 0.17;
      const co2e = distance * factor;

      return {
        success: true,
        data: {
          type: "travel",
          value: distance,
          unit: "km",
          co2e: parseFloat(co2e.toFixed(2)),
          co2eUnit: "kg",
          factors: {
            mode,
            emissionFactor: factor,
            notes: `${mode.toUpperCase()} - Per kilometer emission`,
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
   * @param wasteType - type of waste (organic, recycled, landfill)
   */
  async calculateWaste(
    weight: number,
    wasteType: "organic" | "recycled" | "landfill" = "landfill"
  ): Promise<ApiResponse<CarbonCalculationResult>> {
    try {
      // Emission factors (kg CO₂e per kg of waste)
      const emissionFactors: Record<string, number> = {
        organic: 0.005,
        recycled: 0.002,
        landfill: 0.015,
      };

      const factor = emissionFactors[wasteType] || 0.015;
      const co2e = weight * factor;

      return {
        success: true,
        data: {
          type: "waste",
          value: weight,
          unit: "kg",
          co2e: parseFloat(co2e.toFixed(2)),
          co2eUnit: "kg",
          factors: {
            wasteType,
            emissionFactor: factor,
            notes: `${wasteType.toUpperCase()} waste treatment`,
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
   */
  async calculateWater(cubicMeters: number): Promise<ApiResponse<CarbonCalculationResult>> {
    try {
      // Emission factors vary by region, using average: 0.25 kg CO₂e per m³
      const factor = 0.25;
      const co2e = cubicMeters * factor;

      return {
        success: true,
        data: {
          type: "water",
          value: cubicMeters,
          unit: "m³",
          co2e: parseFloat(co2e.toFixed(2)),
          co2eUnit: "kg",
          factors: {
            emissionFactor: factor,
            notes: "Average water treatment and supply carbon intensity",
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
