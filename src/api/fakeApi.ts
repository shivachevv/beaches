import { ApiInterface, Database, DatabaseModel } from "../interfaces";
import db from './db/db.json'

export class Api implements ApiInterface {
  db: Database;
    
  constructor(db: Database) {
    this.db = db;
  }

  get({ model, id }:{ model:DatabaseModel, id:string }) {
    return this.db[model].filter(item => item.id === id)[0]
  }

  find({ model, queryKey, queryValue }:{ model:DatabaseModel, queryKey:string, queryValue: string }) {
    return this.db[model].filter(item => item[queryKey] === queryValue)
  }

  findAll({ model }:{ model:DatabaseModel }):Array<any> {
    return this.db[model]
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
