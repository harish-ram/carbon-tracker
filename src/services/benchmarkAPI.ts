import { ApiResponse, BenchmarkData } from "@/types";
import worldBankAPI from "./worldBankAPI";
import { getMobileErrorMessage } from "@/utils/network";

/**
 * Benchmark API - Integrates with World Bank Climate Data API
 * Free public API - no authentication required
 */
class BenchmarkAPI {
  /**
   * Get industry benchmark data
   * Uses real World Bank data with industry multipliers
   * @param industry - Industry type
   * @param region - Region/country code (ISO 3-letter code)
   */
  async getIndustryBenchmark(
    industry: string,
    region: string = "USA"
  ): Promise<ApiResponse<BenchmarkData>> {
    try {
      // Call World Bank API for real data
      const result = await worldBankAPI.getIndustryBenchmark(industry, region);
      
      if (result.success && result.data) {
        return result;
      }
      
      // Fallback to estimated data if World Bank fails
      return this.getEstimatedBenchmark(industry, region);
    } catch (error: any) {
      console.error('Error fetching industry benchmark:', error);
      return {
        success: false,
        error: getMobileErrorMessage(error),
      };
    }
  }

  /**
   * Get regional benchmarks from World Bank
   */
  async getRegionalBenchmarks(): Promise<ApiResponse<BenchmarkData[]>> {
    try {
      // Try to fetch real data from World Bank API
      const result = await worldBankAPI.getRegionalBenchmarks();
      
      // If API succeeds and returns data, use it
      if (result.success && result.data && result.data.length > 0) {
        return result;
      }
      
      // Otherwise use fallback static data (reliable and always available)
      console.log('Using fallback benchmark data (World Bank API unavailable)');
      return this.getFallbackBenchmarks();
    } catch (error: any) {
      console.error('Error fetching regional benchmarks:', error);
      // Always return fallback data on error
      return this.getFallbackBenchmarks();
    }
  }

  /**
   * Fallback estimated benchmark (used if World Bank API fails)
   */
  private async getEstimatedBenchmark(
    industry: string,
    region: string
  ): Promise<ApiResponse<BenchmarkData>> {
    const industryMultipliers: Record<string, number> = {
      manufacturing: 2.5,
      it: 0.8,
      technology: 0.8,
      hospitality: 1.5,
      retail: 1.2,
      healthcare: 1.1,
      education: 0.9,
      finance: 0.7,
      construction: 3.0,
      agriculture: 2.0,
    };

    const regionEmissions: Record<string, number> = {
      USA: 14.2,
      IND: 1.9,
      CHN: 7.4,
      DEU: 8.1,
      GBR: 5.2,
      JPN: 8.5,
      CAN: 15.4,
      AUS: 15.0,
    };

    const multiplier = industryMultipliers[industry.toLowerCase()] || 1.5;
    const baseEmissions = regionEmissions[region.toUpperCase()] || 4.5;
    const avgEmissions = baseEmissions * multiplier;

    return {
      success: true,
      data: {
        industry: industry.charAt(0).toUpperCase() + industry.slice(1),
        region: region.toUpperCase(),
        year: 2023,
        avgEmissions: parseFloat(avgEmissions.toFixed(3)),
        unit: 'tCO₂e/employee/year',
        dataSource: 'Estimated (IPCC)',
      },
    };
  }

  /**
   * Fallback static benchmark data
   */
  private async getFallbackBenchmarks(): Promise<ApiResponse<BenchmarkData[]>> {
    const benchmarks: BenchmarkData[] = [
      {
        industry: "United States",
        region: "USA",
        year: 2023,
        avgEmissions: 14.9,
        unit: "tCO₂e/capita/year",
        dataSource: "US EPA 2023",
      },
      {
        industry: "China",
        region: "CHN",
        year: 2023,
        avgEmissions: 8.0,
        unit: "tCO₂e/capita/year",
        dataSource: "IEA 2023",
      },
      {
        industry: "India",
        region: "IND",
        year: 2023,
        avgEmissions: 2.0,
        unit: "tCO₂e/capita/year",
        dataSource: "CEA India 2023",
      },
      {
        industry: "Germany",
        region: "DEU",
        year: 2023,
        avgEmissions: 7.9,
        unit: "tCO₂e/capita/year",
        dataSource: "Eurostat 2023",
      },
      {
        industry: "United Kingdom",
        region: "GBR",
        year: 2023,
        avgEmissions: 5.0,
        unit: "tCO₂e/capita/year",
        dataSource: "DEFRA 2023",
      },
      {
        industry: "Japan",
        region: "JPN",
        year: 2023,
        avgEmissions: 8.3,
        unit: "tCO₂e/capita/year",
        dataSource: "IEA 2023",
      },
      {
        industry: "Canada",
        region: "CAN",
        year: 2023,
        avgEmissions: 14.2,
        unit: "tCO₂e/capita/year",
        dataSource: "Environment Canada 2023",
      },
      {
        industry: "Australia",
        region: "AUS",
        year: 2023,
        avgEmissions: 15.3,
        unit: "tCO₂e/capita/year",
        dataSource: "Australia DoE 2023",
      },
      {
        industry: "Brazil",
        region: "BRA",
        year: 2023,
        avgEmissions: 2.3,
        unit: "tCO₂e/capita/year",
        dataSource: "IEA 2023",
      },
      {
        industry: "France",
        region: "FRA",
        year: 2023,
        avgEmissions: 4.6,
        unit: "tCO₂e/capita/year",
        dataSource: "Eurostat 2023",
      },
      {
        industry: "World Average",
        region: "WLD",
        year: 2023,
        avgEmissions: 4.7,
        unit: "tCO₂e/capita/year",
        dataSource: "IPCC 2023",
      },
    ];

    return {
      success: true,
      data: benchmarks,
    };
  }
}

export default new BenchmarkAPI();
