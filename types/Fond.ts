import { firestore } from "@/config/firebase/firebase-config";
import { getItemAsync } from "expo-secure-store";
import { collection, addDoc } from "firebase/firestore";
import Utilisateur from "./Utilisateur";

class Fond {
  dateTransaction: string;
  entree: number = 0;
  mobile: boolean = true;
  sortie: number = 0;
  utilisateur: { idUtilisateur: number; utilisateur: string };

  constructor(
    dateTransaction: string,
    entree: number,
    mobile: boolean,
    sortie: number,
    utilisateur: { idUtilisateur: number; utilisateur: string }
  ) {
    this.dateTransaction = dateTransaction;
    this.entree = entree;
    this.mobile = mobile;
    this.sortie = sortie;
    this.utilisateur = utilisateur;
  }

  static async createFond(entree: boolean, montant: number): Promise<Fond> {
		
    const dateTransaction = new Date().toISOString();
    const utilisateurString = await getItemAsync("user");
    let utilisateur;
    if (utilisateurString) {
      const user : Utilisateur = JSON.parse(utilisateurString);
      utilisateur = {
        idUtilisateur: user.id,
        utilisateur: user.pseudo,
      };
    } else {
      throw new Error("Utilisateur non trouvé dans le stockage sécurisé");
    }
    let entreeValue = 0;
    let sortieValue = 0;

    if (entree) {
      entreeValue = montant;
    } else {
      sortieValue = montant;
    }
		
    return new Fond(
      dateTransaction,
      entreeValue,
      true,
      sortieValue,
      utilisateur
    );
  }

  async saveToFirestore() {
    try {
      // Add a new document with a generated id.
      const docRef = await addDoc(
        collection(firestore, "fondUtilisateurRequest"),
        {
          dateTransaction: this.dateTransaction,
          entree: this.entree,
          mobile: this.mobile,
          sortie: this.sortie,
          utilisateur: this.utilisateur,
        }
      );

      console.log("Document written with ID: ", docRef.id);
      return docRef;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

export default Fond;
