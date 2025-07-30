import Dexie, { Table } from "dexie";

export interface Profile {
  id: string;
  position: string;
  email: string;
  address: string;
}

export class MyDB extends Dexie {
  profile!: Table<Profile>;

  constructor() {
    super("profileDb");
    this.version(1).stores({
      profile: "id, position, email, address"
    });
  }
}

export const indexedDb = new MyDB();