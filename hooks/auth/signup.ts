import { useState } from "react";
import Utilisateur from "../../types/Utilisateur";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import * as SecureStore from 'expo-secure-store';
import { firestore } from "@/config/firebase/firebase-config";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = async (
    pseudo: string,
    mail: string,
    password: string,
    idUtilisateur: number,
    mobile: true,
    role: string = "Membre simple"
  ) => {
    setLoading(true);
    setError(null);
    try {
			console.log("hook sign up");
      // Calling the static signUp method of Utilisateur.
      const user = await Utilisateur.signUp(pseudo, mail, password, idUtilisateur, mobile, role);
			console.log("creation mdp");
			

			// Allow time for the async password hashing to complete.
      await new Promise((resolve) => setTimeout(resolve, 0));
      console.log(`utilisateur mdp : ${user.password}`);

      await setDoc(doc(firestore, Utilisateur.table, String(user.id)), {
        pseudo: user.pseudo,
        mail: user.mail,
        idUtilisateur: user.idUtilisateur,
        mobile: user.mobile,
        role: user.role,
				password : user.password
      });

      // Store the user info securely in secure-store.

			console.log(await SecureStore.getItemAsync('user'));
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