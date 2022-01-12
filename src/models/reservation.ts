import { db } from "../firebase";
import { ReservationModel } from "../interfaces";
import { DATABASE_MODELS } from "../utils/enums";
import firebase from "firebase/compat";

interface ReservationMethod {
  userId: string;
  beachId: string;
  sets: string | number;
  time: Date;
  create(): Promise<firebase.firestore.DocumentData | undefined>;
  //   update(): Promise<ReservationModel>;
}

export class Reservation implements ReservationMethod {
  userId: string;
  beachId: string;
  sets: string | number;
  time: Date;

  constructor({
    userId,
    beachId,
    sets,
    time,
  }: {
    userId: string;
    beachId: string;
    sets: string | number;
    time: Date;
  }) {
    this.userId = userId;
    this.beachId = beachId;
    this.sets = sets;
    this.time = time;
  }

  async create(): Promise<firebase.firestore.DocumentData | undefined> {
    const createSnapshot = await db
      .collection(DATABASE_MODELS.RESERVATIONS)
      .add({
        userId: this.userId,
        beachId: this.beachId,
        sets: this.sets,
        time: this.time,
      });
    const querySnapshot = await db
      .collection(DATABASE_MODELS.RESERVATIONS)
      .doc(createSnapshot.id)
      .get();

    const reservation = querySnapshot.data();

    return reservation;
  }
  //   async update(): Promise<ReservationModel> {}
}
