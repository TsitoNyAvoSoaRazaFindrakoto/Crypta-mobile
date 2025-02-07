import { CryptoAsset, ChartData, CryptoSDKConfig } from './types';

export class CryptaSDK {
  private config: CryptoSDKConfig;

  constructor(config: CryptoSDKConfig = {}) {
    this.config = {
      baseUrl: config.baseUrl || 'https://api.crypta.com',
      apiKey: config.apiKey
    };
  }

  /**
   * Récupère la liste des cryptomonnaies
   */
  async getCryptoAssets(): Promise<CryptoAsset[]> {
    try {
      const response = await fetch(`${this.config.baseUrl}/assets`, {
        headers: this.getHeaders()
      });
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch crypto assets: ${error}`);
    }
  }

  /**
   * Récupère les données historiques pour une cryptomonnaie
   */
  async getHistoricalData(assetId: number, period: 'day' | 'week' | 'month' = 'day'): Promise<ChartData[]> {
    try {
      const response = await fetch(`${this.config.baseUrl}/assets/${assetId}/history?period=${period}`, {
        headers: this.getHeaders()
      });
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch historical data: ${error}`);
    }
  }

  /**
   * Ajoute ou supprime une cryptomonnaie des favoris
   */
  async toggleFavorite(assetId: number): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/assets/${assetId}/favorite`, {
        method: 'POST',
        headers: this.getHeaders()
      });
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to toggle favorite: ${error}`);
    }
  }

  /**
   * Calcule la variation de prix en pourcentage
   */
  calculatePriceChange(currentPrice: number, previousPrice: number): number {
    return ((currentPrice - previousPrice) / previousPrice) * 100;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };

    if (this.config.apiKey) {
      headers['Authorization'] = `Bearer ${this.config.apiKey}`;
    }

    return headers;
  }
}

export * from './types';
