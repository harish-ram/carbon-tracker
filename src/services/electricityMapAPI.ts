import { ApiResponse, GridCarbonIntensity } from "@/types";

// Mock Electricity Map API
// In production, integrate with: https://api.electricitymap.org/v3/carbon-intensity/latest

class ElectricityMapAPI {
  /**
   * Get grid carbon intensity for a region
   * @param _region - Region code or coordinates
   */
  async getGridCarbonIntensity(
    _region: string = "IN"
  ): Promise<ApiResponse<GridCarbonIntensity>> {
    try {
      // Mock data - replace with real API call
      const intensityData: Record<string, number> = {
        IN: 650, // India - gCO₂/kWh
        US: 380,
        DE: 250,
        FR: 50,
        NO: 20,
      };

      const co2Intensity = intensityData[_region] || 400;

      return {
        success: true,
        data: {
          region: _region,
          co2Intensity,
          unit: "gCO₂/kWh",
          timestamp: new Date().toISOString(),
          trend: "stable",
        },
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch grid carbon intensity",
      };
    }
  }

  /**
   * Get forecast for lowest carbon intensity hours
   * @param _region - Region code
   * @param hours - Number of hours to forecast
   */
  async getLowCarbonHours(
    _region: string = "IN",
    hours: number = 24
  ): Promise<
    ApiResponse<
      Array<{ hour: number; intensity: number; recommendation: string }>
    >
  > {
    try {
      // Mock low-carbon hours forecast
      const forecast = Array.from({ length: hours }, (_, i) => ({
        hour: i,
        intensity: Math.random() * 300 + 400, // Random between 400-700
        recommendation: Math.random() > 0.5 ? "Good time to operate" : "High intensity",
      }));

      return {
        success: true,
        data: forecast,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch low carbon hours",
      };
    }
  }
}

export default new ElectricityMapAPI();
