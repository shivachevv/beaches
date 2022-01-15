import { db } from "../firebase";
import { UserModel } from "../interfaces";
import { DATABASE_MODELS } from "../utils/enums";
import firebase from "firebase/compat";

interface UserClass extends UserModel {
  create(): Promise<firebase.firestore.DocumentData | undefined>;
  update(
    id: string,
    payload: Record<string, unknown>
  ): Promise<firebase.firestore.DocumentData | undefined>;
}

export class User implements UserClass {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  deposit: number;
  constructor({
    email,
    role,
    firstName,
    lastName,
    deposit,
  }: {
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    deposit: number;
  }) {
    this.id = "default";
    this.email = email;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.deposit = deposit;
  }

  async create(): Promise<firebase.firestore.DocumentData | undefined> {
    const createSnapshot = await db.collection(DATABASE_MODELS.USERS).add({
      id: this.id,
      email: this.email,
      role: this.role,
      firstName: this.firstName,
      lastName: this.lastName,
      deposit: this.deposit,
    });

    await db.collection(DATABASE_MODELS.USERS).doc(createSnapshot.id).update({
      id: createSnapshot.id,
    });

    const querySnapshot = await db
      .collection(DATABASE_MODELS.USERS)
      .doc(createSnapshot.id)
      .get();

    const user = querySnapshot.data();

    return user;
  }

  async update(
    id: string,
    payload: Record<string, unknown>
  ): Promise<firebase.firestore.DocumentData | undefined> {
    await db.collection(DATABASE_MODELS.USERS).doc(id).update(payload);

    const querySnapshot = await db
      .collection(DATABASE_MODELS.USERS)
      .doc(id)
      .get();

    const updated = querySnapshot.data();

    return updated;
  }
}
