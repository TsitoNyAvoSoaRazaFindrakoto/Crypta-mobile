export default class CryptoVal {
	private _dateHeure : Date;
	private _valeur : number; 
	
	constructor(dateHeure : string, valeur : string) {
		this._dateHeure = new Date(dateHeure);
		this._valeur = parseFloat(valeur);
	}

	get dateHeure() : Date {
		return this._dateHeure;
	}

	set dateHeure(dateHeure : string) {
		this._dateHeure = new Date(dateHeure);
	}

	get valeur() : number {
		return this._valeur;
	}

	set valeur(valeur : number | string) {
		if (typeof valeur === 'string') {
			this._valeur = parseFloat(valeur);
		} else {
			this._valeur = valeur;
		}
	}

	static fromDoc(doc : any) : CryptoVal {
		return new CryptoVal(doc._dateHeure, doc._valeur);
	}



}
