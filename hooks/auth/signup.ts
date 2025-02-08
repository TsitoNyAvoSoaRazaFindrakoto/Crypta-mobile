import { useState } from "react";
import Utilisateur from "../../types/Utilisateur";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import * as SecureStore from 'expo-secure-store';

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const db = getFirestore();

  const signUp = async (
    pseudo: string,
    mail: string,
    password: string,
    idUtilisateur: string,
    mobile: true,
    role: string = "Membre simple"
  ) => {
    setLoading(true);
    setError(null);
    try {
      // Calling the static signUp method of Utilisateur.
      const user = Utilisateur.signUp(pseudo, mail, password, idUtilisateur, mobile, role);
      // Allow time for the async password hashing to complete.
      await new Promise((resolve) => setTimeout(resolve, 0));

      await setDoc(doc(db, Utilisateur.table, user.id), {
        pseudo: user.pseudo,
        mail: user.mail,
        idUtilisateur: user.idUtilisateur,
        mobile: user.mobile,
        role: user.role
      });

      // Store the user info securely in secure-store.
      await SecureStore.setItemAsync('user', JSON.stringify(user));

      setLoading(false);
      return user;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { signUp, loading, error };
};

export default useSignUp;
