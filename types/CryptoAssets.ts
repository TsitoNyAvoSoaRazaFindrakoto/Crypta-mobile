import Crypto from "./Crypto";
import Historique from "./Historique";

class CryptoAsset {
  crypto: Crypto;
  historique: {
    idCrypto: number;
    idUtilisateur: number;
    totalEntree: number;
    totalSortie: number;
  };

  constructor(
    crypto: Crypto,
    historique: {
      idCrypto: number;
      idUtilisateur: number;
      totalEntree: number;
      totalSortie: number;
    }
  ) {
    this.crypto = crypto;
    this.historique = historique;
  }

  public static async getPersonnalData(id: number): Promise<CryptoAsset[]> {
    const historics = await Historique.fetchGroupedByCrypto(id);		
    const cryptoAssets: CryptoAsset[] = [];
    for (const historic of historics) {
      const crypto = await Crypto.getById(historic.idCrypto);
			await crypto.initializePrices(false,1);
      if (crypto) {
        cryptoAssets.push(new CryptoAsset(crypto, historic));
      }
    }
    return cryptoAssets;
  }
}

export default CryptoAsset;
