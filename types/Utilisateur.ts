import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { hashPassword, comparePassword } from "@/utils/crypto";
import { firestore } from "@/config/firebase/firebase-config";
import { getItem, getItemAsync, setItemAsync } from "expo-secure-store";

export default class Utilisateur {
  id: number = 0;
  password: string = "";
  pseudo: string;
  email: string;
  idUtilisateur: number = 0;
  mobile: boolean = false;
  mToken?: string = "";
  img?: string = "";
  favoris?: string[];

  role: string = "Membre simple";
  public static readonly table: string = "utilisateur";

  private constructor(
    pseudo: string,
    mail: string,
    password: string,
    idUtilisateur: number,
    mobile: boolean,
    role: string,
    mToken?: string,
		image? : string,
    favoris?: string[]
  ) {
    this.pseudo = pseudo;
    this.email = mail;
    this.password = password;
    this.idUtilisateur = idUtilisateur;
    this.id = idUtilisateur;
    this.mobile = mobile;
    this.role = role;
		this.mToken = mToken;
		this.img = image;
    this.favoris = favoris;
  }

  // Static method for signing up
  public static async signUp(
    pseudo: string,
    mail: string,
    password: string,
    idUtilisateur: number,
    mobile: boolean,
    role: string = "Membre simple"
  ): Promise<Utilisateur> {
    const user = new Utilisateur(
      pseudo,
      mail,
      password,
      idUtilisateur,
      mobile,
      role
    );
    await user.hashMyPassword();
    return user;
  }

  // Static method to create an instance from Firestore document
  public static fromFirestoreDoc(docSnap: any): Utilisateur {
    const data = docSnap.data();
    return new Utilisateur(
      data.pseudo,
      data.email,
      data.password,
      data.idUtilisateur,
      data.mobile,
      data.role,
			data.mToken,
			data.img,
      data.favoris
    );
  }

  // New: Get utilisateur by idUtilisateur from Firestore
  public static async getById(
    idUtilisateur: number
  ): Promise<Utilisateur | null> {
    const docRef = doc(firestore, Utilisateur.table, String(idUtilisateur));
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return Utilisateur.fromFirestoreDoc(docSnap);
    }
    return null;
  }

  // New: Update favoris field in Firestore for a user
  public static async updateFavoris(
    idUtilisateur: number,
    favoris: string[]
  ): Promise<void> {
    const docRef = doc(firestore, Utilisateur.table, String(idUtilisateur));
    await updateDoc(docRef, { favoris });
  }

  // Hash password asynchronously using new method
  private async hashMyPassword() {
    try {
      this.password = await hashPassword(this.password);
    } catch (error) {
      throw error;
    }
  }

  private async verifyPassword(password: string): Promise<Utilisateur> {
    try {
      const valid = await comparePassword(password, this.password);
      if (!valid) {
        throw new Error("Invalid password");
      }
      return this;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Adds a new favorite crypto (as a string, for example a crypto ID or name)
   * If there are already three favorites, removes the oldest favorite before adding the new one.
   */
  public addFavoris(newFavori: string): void {
    // If favoris is not present, initialize as an empty array
    const favoris = this.favoris ?? [];
    // Optionally, you can prevent duplicates:
    if (favoris.includes(newFavori)) {
      return;
    }
    if (favoris.length >= 3) {
      // Remove the first one, then push the new one
      favoris.shift();
    }
    favoris.push(newFavori);
    this.favoris = favoris;
  }

  // Getters

  public static async updateLocalConfig() {
    const userString = getItem("user");
    if (!userString) {
      throw new Error("No user data found locally.");
    }

    const user = JSON.parse(userString);
    if (!user || !user.id) {
      throw new Error("Invalid user data found locally.");
    }

    const updatedUser = await Utilisateur.getById(user.id);
    if (!updatedUser) {
      throw new Error("User not found in Firestore.");
    }
    await setItemAsync("user", JSON.stringify(updatedUser));
  }

	public static async updateMToken(
		idUtilisateur: number,
		mToken: string
	): Promise<void> {
		const docRef = doc(firestore, Utilisateur.table, String(idUtilisateur));
		await updateDoc(docRef, { mToken });
	}

	public static async updateImage(
		idUtilisateur: number,
		image: string
	): Promise<void> {
		const docRef = doc(firestore, Utilisateur.table, String(idUtilisateur));
		await updateDoc(docRef, { image });
	}
}
