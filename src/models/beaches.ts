import { db } from "../firebase";
import { BeachModel, BeachPrices, Coordinates } from "../interfaces";
import { DATABASE_MODELS } from "../utils/enums";
import firebase from "firebase/compat";

interface BeachClass extends BeachModel {
  create(): Promise<firebase.firestore.DocumentData | undefined>;
  update(
    id: string,
    payload: Record<string, unknown>
  ): Promise<firebase.firestore.DocumentData | undefined>;
}

interface FindBeachParams {
  key: "id" | "name" | "capacity" | "available";
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

export class Beach implements BeachClass {
  id: string;
  name: string;
  description: string;
  coordinates: Coordinates;
  capacity: number;
  available: number;
  prices: BeachPrices;
  slug: string;
  beachAdminId: number;
  flag: string;
  constructor({
    name,
    description,
    coordinates,
    capacity,
    available,
    prices,
    slug,
    beachAdminId,
    flag,
  }: {
    name: string;
    description: string;
    coordinates: Coordinates;
    capacity: number;
    available: number;
    prices: BeachPrices;
    slug: string;
    beachAdminId: number;
    flag: string;
  }) {
    this.id = "default";
    this.name = name;
    this.description = description;
    this.coordinates = coordinates;
    this.capacity = capacity;
    this.available = available;
    this.prices = prices;
    this.slug = slug;
    this.beachAdminId = beachAdminId;
    this.flag = flag;
  }

  static async find(params: FindBeachParams) {
    const querySnapshot = await db
      .collection(DATABASE_MODELS.BEACHES)
      .where(params.key, params.operator, params.value)
      .get();

    const beaches = querySnapshot.docs.map((doc) => doc.data());

    return beaches;
  }

  static async findAll() {
    const querySnapshot = await db.collection(DATABASE_MODELS.BEACHES).get();

    const beaches = querySnapshot.docs.map((doc) => doc.data());

    return beaches;
  }

  async create(): Promise<firebase.firestore.DocumentData | undefined> {
    const createSnapshot = await db.collection(DATABASE_MODELS.BEACHES).add({
      id: this.id,
      name: this.name,
      description: this.description,
      coordinates: this.coordinates,
      capacity: this.capacity,
      available: this.available,
      prices: this.prices,
      slug: this.slug,
      beachAdminId: this.beachAdminId,
      flag: this.flag,
    });

    await db.collection(DATABASE_MODELS.BEACHES).doc(createSnapshot.id).update({
      id: createSnapshot.id,
    });

    const querySnapshot = await db
      .collection(DATABASE_MODELS.BEACHES)
      .doc(createSnapshot.id)
      .get();

    const beach = querySnapshot.data();

    return beach;
  }

  async update(
    id: string,
    payload: Record<string, unknown>
  ): Promise<firebase.firestore.DocumentData | undefined> {
    await db.collection(DATABASE_MODELS.BEACHES).doc(id).update(payload);

    const querySnapshot = await db
      .collection(DATABASE_MODELS.BEACHES)
      .doc(id)
      .get();

    const updated = querySnapshot.data();

    return updated;
  }
}
