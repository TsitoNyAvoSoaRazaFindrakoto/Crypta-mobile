import bcrypt from "bcryptjs";

const saltRounds = 10;

export default class Utilisateur {
  private _id: string = "";
  private _password: string = "";
  private _pseudo: string;
  private _mail: string;
  private _idUtilisateur: string = "";
  private _mobile: boolean = false;
  role: string = "Membre simple";
  public static readonly table: string = "utilisateurs";

  private constructor(
    pseudo: string,
    mail: string,
    password: string,
    idUtilisateur: string,
    mobile: boolean,
    role: string
  ) {
    this._pseudo = pseudo;
    this._mail = mail;
    this._password = password;
    this._idUtilisateur = idUtilisateur;
		this._id = idUtilisateur;
    this._mobile = mobile;
    this.role = role;
  }

  // Static method for signing up
  public static async signUp(
    pseudo: string,
    mail: string,
    password: string,
    idUtilisateur: string,
    mobile: boolean,
    role: string = "Membre simple"
  ): Promise<Utilisateur> {
    const user = new Utilisateur(pseudo, mail, password, idUtilisateur, mobile, role);
    user._password = await user.hashPassword(password);
    return user;
  }

  // Static method for signing in
  public static signIn(mail: string, password: string): Utilisateur {
    return new Utilisateur("", mail, password, "", false, "Membre simple");
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
      data.role
    );
  }

  // Hash password asynchronously
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get pseudo(): string {
    return this._pseudo;
  }

  get password(): string {
    return this._password;
  }

  get idUtilisateur(): string {
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

  set idUtilisateur(value: string) {
    if (!value) {
      throw new Error("ID Utilisateur cannot be empty.");
    }
    this._idUtilisateur = value;
  }

  set mobile(value: boolean) {
    this._mobile = value;
  }
}
