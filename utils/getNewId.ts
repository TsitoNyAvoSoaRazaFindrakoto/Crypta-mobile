import { collection, getCountFromServer } from "firebase/firestore";
import Utilisateur from "../types/Utilisateur";
import { firestore } from "@/config/firebase/firebase-config";

const getNewId = async (): Promise<string> => {
  const collRef = collection(firestore, Utilisateur.table);
  const snapshot = await getCountFromServer(collRef);
  const newId = (snapshot.data().count + 1).toString();
  return newId;
};

export default getNewId;
