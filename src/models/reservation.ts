import { db } from "../firebase";
import { BeachModel, ReservationModel } from "../interfaces";
import { DATABASE_MODELS } from "../utils/enums";
import firebase from "firebase/compat";

interface ReservationClass extends ReservationModel {
  userId: string;
  beachId: string;
  sets: string | number;
  time: string;
  create(): Promise<firebase.firestore.DocumentData | undefined>;
  //   update(): Promise<ReservationModel>;
}

interface FindReservationsParams {
  key: "id" | "userId" | "beachId" | "sets" | "time";
  operator:
    | "<="
    | "=="
    | ">"
    | ">="
    | "!="
    | "array-contains"
    | "array-contains-any"
    | "in"
    | "not-in";
  value: string;
}

export class Reservation implements ReservationClass {
  id: string;
  userId: string;
  beachId: string;
  sets: string | number;
  time: string;
  beach: any;
  constructor({
    id,
    userId,
    beachId,
    sets,
    time,
  }: {
    id?: string;
    userId: string;
    beachId: string;
    sets: string | number;
    time: string;
  }) {
    this.id = id ? id : "default";
    this.userId = userId;
    this.beachId = beachId;
    this.sets = sets;
    this.time = time;
  }

  static async find(params: FindReservationsParams) {
    const querySnapshot = await db
      .collection(DATABASE_MODELS.RESERVATIONS)
      .where(params.key, params.operator, params.value)
      .get();

    const reservations = querySnapshot.docs.map((doc) => doc.data());

    return reservations;
  }

  static async findAll() {
    const querySnapshot = await db
      .collection(DATABASE_MODELS.RESERVATIONS)
      .get();

    const result = querySnapshot.docs.map((doc) => doc.data());

    return result;
  }

  async create(): Promise<firebase.firestore.DocumentData | undefined> {
    const createSnapshot = await db
      .collection(DATABASE_MODELS.RESERVATIONS)
      .add({
        id: this.id,
        userId: this.userId,
        beachId: this.beachId,
        sets: this.sets,
        time: this.time,
      });
    await db
      .collection(DATABASE_MODELS.RESERVATIONS)
      .doc(createSnapshot.id)
      .update({
        id: createSnapshot.id,
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
