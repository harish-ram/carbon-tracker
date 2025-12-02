import { ApiResponse, BenchmarkData } from "@/types";

// Mock World Bank & Open Data APIs for benchmarks

class BenchmarkAPI {
  /**
   * Get industry benchmark data
   * @param industry - Industry type
   * @param region - Region code
   */
  async getIndustryBenchmark(
    industry: string,
    region: string = "IN"
  ): Promise<ApiResponse<BenchmarkData>> {
    try {
      // Mock benchmark data - in production, use World Bank API
      const benchmarks: Record<string, Record<string, BenchmarkData>> = {
        manufacturing: {
          IN: {
            industry: "Manufacturing",
            region: "India",
            year: 2023,
            avgEmissions: 2.5,
            unit: "tCO₂e/employee/year",
            dataSource: "World Bank",
          },
          US: {
            industry: "Manufacturing",
            region: "USA",
            year: 2023,
            avgEmissions: 1.8,
            unit: "tCO₂e/employee/year",
            dataSource: "World Bank",
          },
        },
        it: {
          IN: {
            industry: "IT",
            region: "India",
            year: 2023,
            avgEmissions: 0.8,
            unit: "tCO₂e/employee/year",
            dataSource: "World Bank",
          },
          US: {
            industry: "IT",
            region: "USA",
            year: 2023,
            avgEmissions: 1.2,
            unit: "tCO₂e/employee/year",
            dataSource: "World Bank",
          },
        },
        hospitality: {
          IN: {
            industry: "Hospitality",
            region: "India",
            year: 2023,
            avgEmissions: 3.2,
            unit: "tCO₂e/employee/year",
            dataSource: "World Bank",
          },
          US: {
            industry: "Hospitality",
            region: "USA",
            year: 2023,
            avgEmissions: 2.9,
            unit: "tCO₂e/employee/year",
            dataSource: "World Bank",
          },
        },
      };

      const key = industry.toLowerCase();
      const regionKey = region.toUpperCase();
      const benchmark =
        benchmarks[key]?.[regionKey] ||
        benchmarks[key]?.IN ||
        benchmarks.manufacturing.IN;

      return {
        success: true,
        data: benchmark,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch benchmark data",
      };
    }
  }

  /**
   * Get regional benchmarks
   */
  async getRegionalBenchmarks(): Promise<ApiResponse<BenchmarkData[]>> {
    try {
      const benchmarks: BenchmarkData[] = [
        {
          industry: "India Average",
          region: "India",
          year: 2023,
          avgEmissions: 1.9,
          unit: "tCO₂e/capita/year",
          dataSource: "India Statistics",
        },
        {
          industry: "USA Average",
          region: "USA",
          year: 2023,
          avgEmissions: 14.2,
          unit: "tCO₂e/capita/year",
          dataSource: "US EPA",
        },
        {
          industry: "EU Average",
          region: "Europe",
          year: 2023,
          avgEmissions: 6.8,
          unit: "tCO₂e/capita/year",
          dataSource: "Eurostat",
        },
        {
          industry: "Global Average",
          region: "World",
          year: 2023,
          avgEmissions: 4.5,
          unit: "tCO₂e/capita/year",
          dataSource: "IPCC",
        },
      ];

      return {
        success: true,
        data: benchmarks,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch regional benchmarks",
      };
    }
  }
}

export default new BenchmarkAPI();
