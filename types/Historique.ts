import { firestore } from "@/config/firebase/firebase-config";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";

interface HistoriqueData {
  dateTransaction: string; // Stored as string in Firestore (e.g., "2022-01-01")
  entree: number;
  idCrypto: number;
  idTransCrypto: number;
  idUtilisateur: number;
  prixUnitaire: string; // Stored as string in Firestore (e.g., "1524.22")
  sortie: number;
  utilisateur: {
    idUtilisateur: number;
    pseudo: string;
  };
}

class Historique {
	public static table : string = "transCrypto";
  dateTransaction: Date;
  entree: number;
  idCrypto: number;
  idTransCrypto: number;
  idUtilisateur: number;
  prixUnitaire: number; // Converted to number
  sortie: number;
  utilisateur: {
    idUtilisateur: number;
    pseudo: string;
  };

  constructor(
    dateTransaction: Date,
    entree: number,
    idCrypto: number,
    idTransCrypto: number,
    idUtilisateur: number,
    prixUnitaire: number,
    sortie: number,
    utilisateur: { idUtilisateur: number; pseudo: string }
  ) {
    this.dateTransaction = dateTransaction;
    this.entree = entree;
    this.idCrypto = idCrypto;
    this.idTransCrypto = idTransCrypto;
    this.idUtilisateur = idUtilisateur;
    this.prixUnitaire = prixUnitaire;
    this.sortie = sortie;
    this.utilisateur = utilisateur;
  }

  // Convert Firestore data to Historique instance
  static fromFirestore(data: HistoriqueData): Historique {
    return new Historique(
      new Date(data.dateTransaction), // Convert string to Date
      data.entree,
      data.idCrypto,
      data.idTransCrypto,
      data.idUtilisateur,
      parseFloat(data.prixUnitaire), // Convert string to number
      data.sortie,
      data.utilisateur
    );
  }

  // Fetch all historique entries from Firestore
  static async fetchAll(idUtilisateur: number): Promise<Historique[]> {
    try {
      const historiqueCollection = collection(firestore, Historique.table);
      const q = query(
        historiqueCollection,
        where("idUtilisateur", "==", idUtilisateur) // Filter by user ID
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return [];
      }

      return snapshot.docs.map((doc) => {
        const data = doc.data() as HistoriqueData;
        return Historique.fromFirestore(data);
      });
    } catch (error) {
      console.error("Error fetching all historique entries:", error);
      throw new Error("Failed to fetch historique entries");
    }
  }

  // Fetch the latest historique entries with a limit
  static async fetchLatestWithLimit(
    idUtilisateur: number,
    limitCount: number = 5
  ): Promise<Historique[]> {
    try {
      const historiqueCollection = collection(firestore, Historique.table);
      const q = query(
        historiqueCollection,
        where("idUtilisateur", "==", idUtilisateur),
        orderBy("dateTransaction", "desc"),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return [];
      }

      return snapshot.docs.map((doc) => {
        const data = doc.data() as HistoriqueData;
        return Historique.fromFirestore(data);
      });
    } catch (error) {
      console.error("Error fetching latest historique entries:", error);
      throw new Error("Failed to fetch latest historique entries");
    }
  }
}

export default Historique;
