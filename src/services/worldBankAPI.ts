/**
 * World Bank Climate Data API Integration
 * Free API for climate and emissions data
 * Documentation: https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation
 */

import { ApiResponse, BenchmarkData } from "@/types";
import { retryWithBackoff, getMobileErrorMessage } from "@/utils/network";

interface WorldBankResponse {
  page: number;
  pages: number;
  per_page: number;
  total: number;
  data?: Array<{
    indicator: { id: string; value: string };
    country: { id: string; value: string };
    countryiso3code: string;
    date: string;
    value: number | null;
    unit: string;
    obs_status: string;
    decimal: number;
  }>;
}

class WorldBankAPI {
  private baseURL = 'https://api.worldbank.org/v2';
  
  /**
   * CO₂ emissions indicators from World Bank
   */
  private indicators = {
    co2PerCapita: 'EN.ATM.CO2E.PC', // CO₂ emissions (metric tons per capita)
    co2Total: 'EN.ATM.CO2E.KT', // CO₂ emissions (kt)
    co2GDPIntensity: 'EN.ATM.CO2E.PP.GD', // CO₂ emissions (kg per PPP $ of GDP)
    ghgTotal: 'EN.ATM.GHGT.KT.CE', // Total greenhouse gas emissions (kt of CO₂ equivalent)
    electricityFromCoal: 'EG.ELC.COAL.ZS', // Electricity production from coal sources (% of total)
    renewableEnergy: 'EG.FEC.RNEW.ZS', // Renewable energy consumption (% of total final energy consumption)
  };

  /**
   * Fetch data from World Bank API
   */
  private async fetchWorldBankData(
    indicator: string,
    countries: string[],
    startYear: number = 2020,
    endYear: number = 2023
  ): Promise<WorldBankResponse | null> {
    return retryWithBackoff(async () => {
      const countryString = countries.join(';');
      const url = `${this.baseURL}/country/${countryString}/indicator/${indicator}?date=${startYear}:${endYear}&format=json&per_page=1000`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // Add timeout for mobile networks
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (!response.ok) {
        throw new Error(`World Bank API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // World Bank API returns array [metadata, data]
      if (Array.isArray(data) && data.length > 1) {
        return {
          page: data[0].page,
          pages: data[0].pages,
          per_page: data[0].per_page,
          total: data[0].total,
          data: data[1],
        };
      }

      return null;
    }, 2, 2000); // 2 retries, 2 second base delay
  }

  /**
   * Get CO₂ emissions per capita for countries
   */
  async getCO2PerCapita(
    countries: string[] = ['USA', 'CHN', 'IND', 'DEU', 'GBR', 'WLD']
  ): Promise<ApiResponse<BenchmarkData[]>> {
    try {
      const data = await this.fetchWorldBankData(
        this.indicators.co2PerCapita,
        countries
      );
      
      if (!data || !data.data || data.data.length === 0) {
        // Return empty but successful response instead of throwing
        return {
          success: false,
          error: getMobileErrorMessage(new Error('No data available from World Bank API')),
          data: [],
        };
      }

      const benchmarks: BenchmarkData[] = [];
      
      // Group by country and get most recent value
      const countryData = new Map<string, any>();
      
      data.data.forEach((item) => {
        if (item.value !== null) {
          const existing = countryData.get(item.country.value);
          if (!existing || parseInt(item.date) > parseInt(existing.date)) {
            countryData.set(item.country.value, item);
          }
        }
      });
      
      // Convert to BenchmarkData format
      countryData.forEach((item) => {
        benchmarks.push({
          industry: item.country.value,
          region: item.countryiso3code,
          year: parseInt(item.date),
          avgEmissions: parseFloat(item.value.toFixed(3)),
          unit: 'tCO₂e/capita/year',
          dataSource: 'World Bank Open Data',
        });
      });
      
      return {
        success: true,
        data: benchmarks,
      };
    } catch (error: any) {
      // Don't log error loudly - this is expected when API is unavailable
      return {
        success: false,
        error: getMobileErrorMessage(error),
        data: [],
      };
    }
  }

  /**
   * Get GHG emissions data
   */
  async getGHGEmissions(
    countries: string[] = ['USA', 'CHN', 'IND', 'DEU', 'GBR']
  ): Promise<ApiResponse<BenchmarkData[]>> {
    try {
      const data = await this.fetchWorldBankData(
        this.indicators.ghgTotal,
        countries
      );
      
      if (!data || !data.data) {
        throw new Error('No GHG data received');
      }

      const benchmarks: BenchmarkData[] = [];
      const countryData = new Map<string, any>();
      
      data.data.forEach((item) => {
        if (item.value !== null) {
          const existing = countryData.get(item.country.value);
          if (!existing || parseInt(item.date) > parseInt(existing.date)) {
            countryData.set(item.country.value, item);
          }
        }
      });
      
      countryData.forEach((item) => {
        benchmarks.push({
          industry: `${item.country.value} Total GHG`,
          region: item.countryiso3code,
          year: parseInt(item.date),
          avgEmissions: parseFloat((item.value / 1000).toFixed(2)), // Convert kt to Mt
          unit: 'MtCO₂e/year',
          dataSource: 'World Bank Open Data',
        });
      });
      
      return {
        success: true,
        data: benchmarks,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch GHG data',
      };
    }
  }

  /**
   * Get renewable energy consumption percentage
   */
  async getRenewableEnergyData(
    countries: string[] = ['USA', 'CHN', 'IND', 'DEU', 'GBR', 'BRA', 'NOR']
  ): Promise<ApiResponse<Array<{ country: string; code: string; year: number; renewablePercent: number }>>> {
    try {
      const data = await this.fetchWorldBankData(
        this.indicators.renewableEnergy,
        countries
      );
      
      if (!data || !data.data) {
        throw new Error('No renewable energy data received');
      }

      const result: Array<{ country: string; code: string; year: number; renewablePercent: number }> = [];
      const countryData = new Map<string, any>();
      
      data.data.forEach((item) => {
        if (item.value !== null) {
          const existing = countryData.get(item.country.value);
          if (!existing || parseInt(item.date) > parseInt(existing.date)) {
            countryData.set(item.country.value, item);
          }
        }
      });
      
      countryData.forEach((item) => {
        result.push({
          country: item.country.value,
          code: item.countryiso3code,
          year: parseInt(item.date),
          renewablePercent: parseFloat(item.value.toFixed(2)),
        });
      });
      
      return {
        success: true,
        data: result,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch renewable energy data',
      };
    }
  }

  /**
   * Get comprehensive regional benchmarks
   */
  async getRegionalBenchmarks(): Promise<ApiResponse<BenchmarkData[]>> {
    try {
      // Fetch CO₂ per capita data (most commonly used benchmark)
      const co2Data = await this.getCO2PerCapita([
        'USA', // United States
        'CHN', // China
        'IND', // India
        'DEU', // Germany
        'GBR', // United Kingdom
        'JPN', // Japan
        'CAN', // Canada
        'AUS', // Australia
        'BRA', // Brazil
        'ZAF', // South Africa
        'WLD', // World average
      ]);
      
      if (co2Data.success && co2Data.data) {
        return co2Data;
      }
      
      throw new Error('Failed to fetch benchmark data');
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch regional benchmarks',
      };
    }
  }

  /**
   * Get industry-specific benchmark (estimated from country data)
   */
  async getIndustryBenchmark(
    industry: string,
    region: string = 'USA'
  ): Promise<ApiResponse<BenchmarkData>> {
    try {
      const co2Data = await this.getCO2PerCapita([region]);
      
      if (!co2Data.success || !co2Data.data || co2Data.data.length === 0) {
        throw new Error('No data available for region');
      }
      
      const countryData = co2Data.data[0];
      
      // Industry multipliers (estimated based on sector carbon intensity)
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
      
      const multiplier = industryMultipliers[industry.toLowerCase()] || 1.5;
      const industryEmissions = countryData.avgEmissions * multiplier;
      
      return {
        success: true,
        data: {
          industry: industry.charAt(0).toUpperCase() + industry.slice(1),
          region: countryData.industry, // Country name
          year: countryData.year,
          avgEmissions: parseFloat(industryEmissions.toFixed(3)),
          unit: 'tCO₂e/employee/year',
          dataSource: 'World Bank (estimated)',
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch industry benchmark',
      };
    }
  }
}

export default new WorldBankAPI();
