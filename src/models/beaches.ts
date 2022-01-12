import { db } from "../firebase";
import {
  Beach,
  BeachPrices,
  Coordinates,
  ReservationModel,
} from "../interfaces";
import { DATABASE_MODELS } from "../utils/enums";
import firebase from "firebase/compat";

// interface BeachMethod extends Beach {
//   create(): Promise<firebase.firestore.DocumentData | undefined>;
//   id?: string;
//   //   update(): Promise<ReservationModel>;
// }

export class Beachh {
  async create(
    payload: any
  ): Promise<firebase.firestore.DocumentData | undefined> {
    const createSnapshot = await db
      .collection(DATABASE_MODELS.BEACHES)
      .add(payload);
    const querySnapshot = await db
      .collection(DATABASE_MODELS.BEACHES)
      .doc(createSnapshot.id)
      .get();

    const beach = querySnapshot.data();

    return beach;
  }
  //   async update(): Promise<ReservationModel> {}
}
