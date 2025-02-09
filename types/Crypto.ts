import { database, firestore } from "@/config/firebase/firebase-config";
import CryptoVal from "./CryptoVal";
import {
  ref,
  query,
  orderByChild,
  limitToLast,
  get,
  DataSnapshot,
} from "firebase/database";
import {
  collection,
  query as firestoreQuery,
  getDocs,
  where,
} from "firebase/firestore";

interface ValueData {
  dateHeure: string;
  valeur: string;
}

export default class Crypto {
  public static table: string = "crypto";
  private _crypto: string;
  private _id: string;
  private _idCrypto: number;
  private _current?: number;
  private _vals?: CryptoVal[];

  constructor(crypto: string, id: string, idCrypto: number) {
    this._crypto = crypto;
    this._id = id;
    this._idCrypto = idCrypto;
  }

  public async initializePrices(all: boolean, limit: number): Promise<void> {
    this._vals = all
      ? await this.fetchAllValues()
      : await this.fetchLatestValues(limit);
    if (this._vals && this._vals.length > 0) {
      this._current = this._vals[this._vals.length - 1].valeur;
    }
  }

  // Fetch ALL historical values for this crypto
  async fetchAllValues(): Promise<CryptoVal[]> {
    try {
      const dbRef = ref(database, `${this.idCrypto}`);
      const queryRef = query(dbRef, orderByChild("dateHeure"));

      const snapshot = await get(queryRef);

      if (!snapshot.exists()) {
        console.log("tsisy valeur");
        return [];
      }
      console.log();
      return this.parseSnapshot(snapshot);
    } catch (error) {
      console.error("Error fetching all values:", error);
      throw new Error("Failed to fetch values");
    }
  }

  async fetchLatestValues(limit: number = 10): Promise<CryptoVal[]> {
    try {
      const dbRef = ref(database, `${this.idCrypto}`);
      const queryRef = query(
        dbRef,
        orderByChild("dateHeure"),
        limitToLast(limit)
      );

      const snapshot = await get(queryRef);

      if (!snapshot.exists()) {
        console.log("there is none");

        return [];
      }
      return this.parseSnapshot(snapshot);
    } catch (error) {
      console.error("Error fetching latest values:", error);
      throw new Error("Failed to fetch latest values");
    }
  }

  async fetchAndSetLatestValue(): Promise<void> {
    try {
      const latestValues = await this.fetchLatestValues(1);
      this.current = latestValues[0]?.valeur || 0;
    } catch (error) {
      console.error("Error fetching and setting latest value:", error);
      this.current = 0;
      throw error;
    }
  }

  private parseSnapshot(snapshot: DataSnapshot): CryptoVal[] {
    const values: CryptoVal[] = [];

    snapshot.forEach((childSnapshot) => {
      const valueData = childSnapshot.val() as ValueData;
      if (valueData?.dateHeure && valueData?.valeur) {
        values.push(new CryptoVal(valueData.dateHeure, valueData.valeur));
      }
      return false; // Continue enumeration
    });
    console.log(values);

    return values;
  }

  static fromDoc(doc: any): Crypto {
    return new Crypto(doc.crypto, doc.idCrypto, doc.idCrypto);
  }

  public get crypto(): string {
    return this._crypto;
  }
  public get id(): string {
    return this._id;
  }
  public get idCrypto(): number {
    return this._idCrypto;
  }
  public set crypto(value: string) {
    this._crypto = value;
  }
  public set id(value: string) {
    this._id = value;
  }
  public set idCrypto(value: number) {
    this._idCrypto = value;
    this._id = String(this._idCrypto);
  }
  get current(): number {
    return this._current ?? 0;
  }

  public get vals(): CryptoVal[] {
    return this._vals ?? [];
  }
  public set vals(value: CryptoVal[]) {
    this._vals = value;
  }

  set current(current: number | string) {
    if (typeof current === "string") {
      this._current = parseFloat(current);
    } else {
      this._current = current;
    }
  }

  public static async getById(idCrypto: number): Promise<Crypto | null> {
    try {
      const historiqueCollection = collection(firestore, Crypto.table);
      const q = firestoreQuery(
        historiqueCollection,
        where("idCrypto", "==", idCrypto)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        console.log(`Crypto with id ${idCrypto} not found`);
        return null;
      }

      const doc = snapshot.docs[0]; // Assuming idCrypto is unique
      const data = { ...doc.data() };

      return Crypto.fromDoc(data);
    } catch (error) {
      console.error(`Error fetching crypto with id ${idCrypto}:`, error);
      throw new Error(`Failed to fetch crypto with id ${idCrypto}`);
    }
  }

  public static async getAll(): Promise<Crypto[]> {
    try {
      const historiqueCollection = collection(firestore, Crypto.table);
      const q = firestoreQuery(historiqueCollection);

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        console.log("there are cryptos");
        return [];
      }

      return snapshot.docs.map((doc) => {
        const data = { ...doc.data() };
        return Crypto.fromDoc(data);
      });
    } catch (error) {
      console.error("Error fetching all historique entries:", error);
      throw new Error("Failed to fetch historique entries");
    }
  }
}
