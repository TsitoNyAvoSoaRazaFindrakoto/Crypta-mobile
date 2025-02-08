import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import Utilisateur from "../types/Utilisateur";
import { firestore } from "@/config/firebase/firebase-config";

const getNewId = async (): Promise<string> => {
  const collRef = collection(firestore, Utilisateur.table);
  const q = query(collRef, orderBy("idUtilisateur", "desc"), limit(1));
  const querySnapshot = await getDocs(q);

  let newId = "1"; // Default ID if no documents exist

  if (!querySnapshot.empty) {
    const lastDoc = querySnapshot.docs[0];
    const lastId = lastDoc.data().idUtilisateur;
    newId = (parseInt(lastId, 10) + 1).toString();
  }

  return newId;
};

export default getNewId;