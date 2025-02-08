import { useState } from 'react';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import * as SecureStore from 'expo-secure-store';
import Utilisateur from "@/types/Utilisateur";
import bcrypt from 'bcryptjs';

const useSignIn = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const signIn = async (email: string, password: string) => {
		setLoading(true);
		setError(null);
		// Assuming Utilisateur constructor accepts email and password as arguments
		// and that the constructor is public
		const user = Utilisateur.signIn(email, password);

		try {
			const db = getFirestore();
			const utilisateurCollection = collection(db, 'Utilisateur');
			const q = query(utilisateurCollection, where('email', '==', email));
			const querySnapshot = await getDocs(q);

			if (!querySnapshot.empty) {
				// Assuming email is unique, take the first document
				const userDoc = querySnapshot.docs[0];
				const userData = userDoc.data();

				// Verify password using bcrypt
				const isPasswordValid = await bcrypt.compare(password, userData.password);
				if (!isPasswordValid) {
					setError('Invalid credentials');
					return null;
				}

				const utilisateur = Utilisateur.fromFirestoreDoc(userDoc);

				// Save the user data to SecureStore
				await SecureStore.setItemAsync('user', JSON.stringify(utilisateur));

				return utilisateur;
			} else {
				setError('User not found');
				return null;
			}
		} catch (e: any) {
			setError(e.message);
			return null;
		} finally {
			setLoading(false);
		}
	};

	return { signIn, loading, error };
};

export default useSignIn;