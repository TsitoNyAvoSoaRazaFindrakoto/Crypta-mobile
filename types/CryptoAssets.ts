import Crypto from "./Crypto";

class CryptoAsset {
	crypto: Crypto;
	value: number;

	constructor(crypto: Crypto, value: number) {
		this.crypto = crypto;
		this.value = value;
	}
}

export default CryptoAsset;