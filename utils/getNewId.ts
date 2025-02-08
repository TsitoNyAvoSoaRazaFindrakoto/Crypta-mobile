import { getFirestore, collection, getCountFromServer } from "firebase/firestore";
import Utilisateur from "../types/Utilisateur";

const getNewId = async (): Promise<string> => {
  const db = getFirestore();
  const collRef = collection(db, Utilisateur.table);
  const snapshot = await getCountFromServer(collRef);
  const newId = (snapshot.data().count + 1).toString();
  return newId;
};

export default getNewId;
