import { Database, DatabaseModel } from "../interfaces";
import db from './db/db.json'

export class Api {
  public static db: Database; // we can use Singleton pattern here, for our current use we can use the previous code 
                              // but if we want to open connections to the DB in the constructor every instance of Api class
                              // will open a new connection to the DB and we want to avoid that.
    
  constructor(db: Database) {
    if (!Api.db) {
      Api.db = db;
    }
  }

  get({ model, id }:{ model:DatabaseModel, id:string }) {
    return Api.db[model].filter(item => item.id === id)[0]
  }

  find({ model, queryKey, queryValue }:{ model:DatabaseModel, queryKey:string, queryValue: string }) {
    return Api.db[model].filter(item => item[queryKey] === queryValue)
  }

  findAll({ model }:{ model:DatabaseModel }):Array<any> {
    return Api.db[model]
  }

  // async create(data, params?: ) {
  // }

  // async patch(
  //   id: string,
  //   params?: Params,
  // ) {
    
  // }
}
export default new Api(db);
