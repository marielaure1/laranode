import Db from '../../bootstrap/Db.js';
import User from '../Models/User.js';
import Hash from '../../utils/hash.js';

export default class UserRepository {
  constructor() {
    this.db = new Db();
    this.hash = new Hash();
  }

  async all() {
    try {
      const query = 'SELECT * FROM users';
      const response = await this.db.execute(query);
      return response.rows.map(userData => new User(userData).toJSON());
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching all users.');
    }
  }

  async get(id) {
    try {
      const query = 'SELECT * FROM users WHERE id = $1';
      const response = await this.db.execute(query, [id]);
      return response.rows.length > 0 ? new User(response.rows[0]).toJSON() : "Not Found";
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching user by ID.');
    }
  }

  async create(data) {
    try {
      await this.findByEmail(data.email);
      const passwordHash = await this.hash.hashData(data.password);
      const query = 'INSERT INTO users (name, email, created_at, updated_at, password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [data.name, data.email, new Date(), new Date(), passwordHash];
      const response = await this.db.execute(query, values);
      return new User(response.rows[0]).toJSON();
    } catch (error) {
      console.error(error);
      throw new Error('Error creating user.');
    }
  }

  async update(id, data) {
    try {
      await this.findByEmail(data.email);
      const passwordHash = await this.hash.hashData(data.password);
      const query = 'UPDATE users SET name = $1, email = $2, updated_at = $3, password = $4 WHERE id = $5 RETURNING *';
      const values = [data.name, data.email, new Date(), passwordHash, id];
      const response = await this.db.execute(query, values);
      return response.rows.length > 0 ? new User(response.rows[0]).toJSON() : "Not Found";
    } catch (error) {
      console.error(error);
      throw new Error('Error updating user.');
    }
  }

  async delete(id) {
    try {
      const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
      const response = await this.db.execute(query, [id]);
      return response.rows.length > 0 ? new User(response.rows[0]).toJSON() : "Not Found";
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting user.');
    }
  }

  async findByEmail(email) {
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const response = await this.db.execute(query, [email]);
      return response.rows.length > 0 ? new User(response.rows[0]).toJSON() : "Not Found";
    } catch (error) {
      console.error(error);
      throw new Error('Error finding user by email.');
    }
  }
}
