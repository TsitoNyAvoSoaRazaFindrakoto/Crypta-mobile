export interface CryptoAsset {
  id: number;
  name: string;
  price: number;
  previousPrice?: number;
  favorite: boolean;
}

export interface ChartData {
  value: number;
  label?: string;
  timestamp: number;
}

export interface CryptoSDKConfig {
  apiKey?: string;
  baseUrl?: string;
}
