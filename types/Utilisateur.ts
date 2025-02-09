import { hashPassword, comparePassword } from "@/utils/crypto";

export default class Utilisateur {

  private _id: number = 0;
  private _password: string = "";
  private _pseudo: string;
  private _mail: string;
  private _idUtilisateur: number = 0;
  private _mobile: boolean = false;
  // Optional favoris field: may not be present initially
  private _favoris?: string[];

  role: string = "Membre simple";
  public static readonly table: string = "utilisateur";

  private constructor(
    pseudo: string,
    mail: string,
    password: string,
    idUtilisateur: number,
    mobile: boolean,
    role: string,
    favoris?: string[]
  ) {
    this._pseudo = pseudo;
    this._mail = mail;
    this._password = password;
    this._idUtilisateur = idUtilisateur;
    this._id = idUtilisateur;
    this._mobile = mobile;
    this.role = role;
    this._favoris = favoris;
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
  public static fromFirestoreDoc(doc: any): Utilisateur {
    const data = doc.data();
    return new Utilisateur(
      data.pseudo,
      data.mail,
      data.password,
      data.idUtilisateur,
      data.mobile,
      data.role,
      data.favoris // this field may be undefined if not present in the document
    );
  }

  // Hash password asynchronously using new method
  private async hashMyPassword() {
    try {
      this._password = await hashPassword(this._password);
    } catch (error) {
      throw error;
    }
  }

  private async verifyPassword(password: string): Promise<Utilisateur> {
    try {
      const valid = await comparePassword(password, this._password);
      if (!valid) {
        throw new Error("Invalid password");
      }
      return this;
    } catch (error) {
      throw error;
    }
  }

  // Getter for favoris
  public get favoris(): string[] {
    return this._favoris ?? [];
  }

  /**
   * Adds a new favorite crypto (as a string, for example a crypto ID or name)
   * If there are already three favorites, removes the oldest favorite before adding the new one.
   */
  public addFavoris(newFavori: string): void {
    // If favoris is not present, initialize as an empty array
    const favoris = this._favoris ?? [];
    // Optionally, you can prevent duplicates:
    if (favoris.includes(newFavori)) {
      return;
    }
    if (favoris.length >= 3) {
      // Remove the first one, then push the new one
      favoris.shift();
    }
    favoris.push(newFavori);
    this._favoris = favoris;
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get pseudo(): string {
    return this._pseudo;
  }

  get password(): string {
    return this._password;
  }

  get idUtilisateur(): number {
    return this._idUtilisateur;
  }

  get mobile(): boolean {
    return this._mobile;
  }

  get mail(): string {
    return this._mail;
  }

  // Setters
  set pseudo(value: string) {
    if (!value.trim()) {
      throw new Error("Pseudo cannot be empty.");
    }
    this._pseudo = value;
  }

  set idUtilisateur(value: number) {
    if (!value) {
      throw new Error("ID Utilisateur cannot be empty.");
    }
    this._idUtilisateur = value;
  }

  set mobile(value: boolean) {
    this._mobile = value;
  }
}