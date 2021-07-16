import { Record } from "../models/record";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { query, orderBy, limit } from "firebase/firestore";

const COLECTION_NAME = "records";

class RecordesService {
  async Get(): Promise<Record[]> {
    try {
      const q = query(
        collection(db, COLECTION_NAME),
        orderBy("score", "desc"),
        limit(15)
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((d) => d.data() as Record);
    } catch (error) {
      console.log("Erro ao buscar recordes do firebase: ", error);
      return [];
    }
  }

  async Add(record: Record) {
    try {
      await addDoc(collection(db, COLECTION_NAME), Object.assign({}, record));
    } catch (error) {
      console.log("erro ao adicionar recorde no firestore: ", error);
    }
  }
}

const recordesService = new RecordesService();

export default recordesService;
