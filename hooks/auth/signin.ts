import { useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import Utilisateur from "@/types/Utilisateur";
import { comparePassword } from "@/utils/cryptographie"; // new import
import { firestore } from '@/config/firebase/firebase-config';
import { registerForPushNotifications } from '../notifications';

const useSignIn = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const signIn = async (email: string, password: string) => {
		setLoading(true);
		setError(null);
		
		try {
			const utilisateurCollection = collection(firestore, Utilisateur.table);
			const q = query(utilisateurCollection, where('email', '==', email));
			const querySnapshot = await getDocs(q);

			if (!querySnapshot.empty) {
				const userDoc = querySnapshot.docs[0];
				const userData = userDoc.data();

				const isPasswordValid = await comparePassword(password, userData.password);
				if (!isPasswordValid) {
					setError('Invalid credentials');
					return null;
				}
				console.log("user found");
				const utilisateur = Utilisateur.fromFirestoreDoc(userDoc);
				const mToken = await registerForPushNotifications();
				if (mToken) {
					await Utilisateur.updateMToken(utilisateur.id, mToken);
				}
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