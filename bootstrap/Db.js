import pg from 'pg';
import config from '../config/app.js';

const { database } = config;


export default class Db {
  async execute(request, values = []) {
    const client = new pg.Client(database);
    try {
      await client.connect();
      const response = await client.query(request, values);

      return response;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      await client.end();
    }
  }
}
