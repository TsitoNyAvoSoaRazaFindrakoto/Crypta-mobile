export default class CryptoVal {
	dateHeure : Date;
	valeur : number; 
	
	constructor(dateHeure : string, valeur : string) {
		this.dateHeure = new Date(dateHeure);
		this.valeur = parseFloat(valeur);
	}

	static fromDoc(doc : any) : CryptoVal {
		return new CryptoVal(doc.dateHeure, doc.valeur);
	}

	

}
