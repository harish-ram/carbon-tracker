import { ApiResponse, GridCarbonIntensity } from "@/types";
import { EMISSION_FACTORS } from "@/data/emissionFactors";

/**
 * Electricity Map API - Uses real grid emission factors
 * Data sources: EPA eGRID 2024, DEFRA 2024, CEA India 2024, IEA 2024
 */
class ElectricityMapAPI {
  /**
   * Get grid carbon intensity for a region
   * Uses official emission factors from EPA, DEFRA, IEA, and CEA
   * @param region - Region/country code (ISO 2-letter)
   */
  async getGridCarbonIntensity(
    region: string = "IN"
  ): Promise<ApiResponse<GridCarbonIntensity>> {
    try {
      const regionCode = region.toUpperCase() as keyof typeof EMISSION_FACTORS.electricity.grid;
      
      // Get real emission factor from database
      const gridData = EMISSION_FACTORS.electricity.grid[regionCode];
      
      if (!gridData) {
        // Use world average if region not found
        return {
          success: true,
          data: {
            region: regionCode,
            co2Intensity: 475, // World average (IEA 2024)
            unit: "gCO₂e/kWh",
            timestamp: new Date().toISOString(),
            trend: "stable",
          },
        };
      }

      // Convert kg to grams (multiply by 1000)
      const co2Intensity = Math.round(gridData.value * 1000);

      return {
        success: true,
        data: {
          region: regionCode,
          co2Intensity,
          unit: "gCO₂e/kWh",
          timestamp: new Date().toISOString(),
          trend: this.determineTrend(co2Intensity) as "increasing" | "decreasing" | "stable",
        },
      };
    } catch (error: any) {
      console.error('Error fetching grid carbon intensity:', error);
      return {
        success: false,
        error: error.message || "Failed to fetch grid carbon intensity",
      };
    }
  }

  /**
   * Determine emission trend based on intensity
   */
  private determineTrend(intensity: number): "stable" | "increasing" | "decreasing" {
    // Simplified trend based on intensity level
    if (intensity < 300) return "stable";
    if (intensity < 600) return "stable";
    return "stable"; // Would need historical data for actual trend
  }

  /**
   * Get forecast for lowest carbon intensity hours
   * Uses simplified model based on renewable energy availability
   * @param region - Region code
   * @param hours - Number of hours to forecast
   */
  async getLowCarbonHours(
    region: string = "IN",
    hours: number = 24
  ): Promise<
    ApiResponse<
      Array<{ hour: number; intensity: number; recommendation: string }>
    >
  > {
    try {
      const regionCode = region.toUpperCase() as keyof typeof EMISSION_FACTORS.electricity.grid;
      const gridData = EMISSION_FACTORS.electricity.grid[regionCode];
      const baseIntensity = gridData ? gridData.value * 1000 : 475;

      // Generate hourly forecast based on typical renewable patterns
      // Solar peak: 10 AM - 4 PM (lower intensity)
      // Wind: varies, assume moderate throughout
      const forecast = Array.from({ length: hours }, (_, i) => {
        const hour = i;
        let variation = 1.0;

        // Solar contribution (peaks at noon)
        if (hour >= 6 && hour <= 18) {
          const solarFactor = Math.sin(((hour - 6) / 12) * Math.PI);
          variation -= solarFactor * 0.3; // Up to 30% reduction during peak solar
        }

        // Night time typically higher coal usage
        if (hour >= 20 || hour <= 5) {
          variation += 0.15; // 15% increase at night
        }

        const intensity = Math.round(baseIntensity * variation);
        const recommendation = this.getRecommendation(intensity);

        return { hour, intensity, recommendation };
      });

      return {
        success: true,
        data: forecast,
      };
    } catch (error: any) {
      console.error('Error forecasting low carbon hours:', error);
      return {
        success: false,
        error: error.message || "Failed to fetch low carbon hours",
      };
    }
  }

  /**
   * Get recommendation based on intensity
   */
  private getRecommendation(intensity: number): string {
    if (intensity < 200) return "Excellent time - very low emissions";
    if (intensity < 400) return "Good time - below average emissions";
    if (intensity < 600) return "Moderate - average emissions";
    if (intensity < 800) return "High emissions - consider delaying if possible";
    return "Very high emissions - avoid if possible";
  }

  /**
   * Get all supported regions
   */
  getSupportedRegions(): string[] {
    return Object.keys(EMISSION_FACTORS.electricity.grid);
  }

  /**
   * Get region details
   */
  getRegionDetails(region: string): {
    code: string;
    factor: number;
    unit: string;
    source: string;
  } | null {
    const regionCode = region.toUpperCase() as keyof typeof EMISSION_FACTORS.electricity.grid;
    const gridData = EMISSION_FACTORS.electricity.grid[regionCode];
    
    if (!gridData) return null;

    return {
      code: regionCode,
      factor: gridData.value,
      unit: gridData.unit,
      source: gridData.source,
    };
  }
}

export default new ElectricityMapAPI();
