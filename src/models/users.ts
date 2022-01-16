import { db } from "../firebase";
import { UserModel } from "../interfaces";
import { DATABASE_MODELS } from "../utils/enums";
import firebase from "firebase/compat";

interface FindUserParams {
  key: "id" | "email" | "firstName" | "lastName" | "deposit";
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
interface UserClass extends UserModel {
  create(): Promise<firebase.firestore.DocumentData | undefined>;
  update(
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
    id,
    email,
    role,
    firstName,
    lastName,
    deposit,
  }: {
    id?: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    deposit: number;
  }) {
    this.id = id ? id : "default";
    this.email = email;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.deposit = deposit;
  }

  static async find({ params }: { params: FindUserParams }) {
    const querySnapshot = await db
      .collection(DATABASE_MODELS.USERS)
      .where(params.key, params.operator, params.value)
      .get();

    const users = querySnapshot.docs.map((doc) => doc.data());

    return users;
  }

  static async findAll() {
    const querySnapshot = await db.collection(DATABASE_MODELS.USERS).get();

    const users = querySnapshot.docs.map((doc) => doc.data());

    return users;
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
    payload: Record<string, any>
  ): Promise<firebase.firestore.DocumentData | undefined> {
    await db.collection(DATABASE_MODELS.USERS).doc(this.id).update(payload);

    const querySnapshot = await db
      .collection(DATABASE_MODELS.USERS)
      .doc(this.id)
      .get();

    const updated = querySnapshot.data();

    return updated;
  }
}
