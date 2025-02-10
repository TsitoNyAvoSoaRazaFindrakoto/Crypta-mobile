import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import Utilisateur from "../types/Utilisateur";
import { firestore } from "@/config/firebase/firebase-config";

const getNewId = async (): Promise<number> => {
  const collRef = collection(firestore, Utilisateur.table);
  const q = query(collRef, orderBy("idUtilisateur", "desc"), limit(1));
  const querySnapshot = await getDocs(q);

  let newId = 1; 

  if (!querySnapshot.empty) {
    const lastDoc = querySnapshot.docs[0];
    const lastId = lastDoc.data().idUtilisateur;
    newId = parseInt(lastId, 10) + 1;
  }

  return newId;
};

export default getNewId;