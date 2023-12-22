import Db from '../../bootstrap/Db.js';
import User from '../Models/User.js';
import Hash from '../../utils/hash.js';

/**
 * Classe représentant l'interaction entre l'application et la base de donnée avec la table user.
 */
export default class UserRepository {

   /**
   * Constructeur de la classe UserRepository.
   */
  constructor() {
    this.db = new Db();
    this.hash = new Hash();
  }

   /**
   * Récupère tous les utilisateurs.
   * @returns {Array} - Liste des utilisateurs au format JSON.
   * @throws {Error} - En cas d'erreur lors de la récupération des utilisateurs.
   */
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

  /**
   * Récupère un utilisateur par son identifiant.
   * @param {string} id - Identifiant de l'utilisateur.
   * @returns {Object|string} - Objet JSON représentant l'utilisateur ou "Not Found" si non trouvé.
   * @throws {Error} - En cas d'erreur lors de la récupération de l'utilisateur.
   */
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

   /**
   * Crée un nouvel utilisateur.
   * @param {Object} data - Données de l'utilisateur à créer.
   * @returns {Object} - Objet JSON représentant le nouvel utilisateur.
   * @throws {Error} - En cas d'erreur lors de la création de l'utilisateur.
   */
  async create(data) {
    try {
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

  /**
   * Met à jour un utilisateur existant.
   * @param {string} id - Identifiant de l'utilisateur à mettre à jour.
   * @param {Object} data - Nouvelles données de l'utilisateur.
   * @returns {Object|string} - Objet JSON représentant l'utilisateur mis à jour ou "Not Found" si non trouvé.
   * @throws {Error} - En cas d'erreur lors de la mise à jour de l'utilisateur.
   */
  async update(id, data) {
    try {
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

  /**
   * Supprime un utilisateur par son identifiant.
   * @param {string} id - Identifiant de l'utilisateur à supprimer.
   * @returns {Object|string} - Objet JSON représentant l'utilisateur supprimé ou "Not Found" si non trouvé.
   * @throws {Error} - En cas d'erreur lors de la suppression de l'utilisateur.
   */
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

  /**
   * Recherche un utilisateur par son adresse e-mail.
   * @param {string} email - Adresse e-mail de l'utilisateur à rechercher.
   * @returns {Object|string} - Objet JSON représentant l'utilisateur trouvé ou "Not Found" si non trouvé.
   * @throws {Error} - En cas d'erreur lors de la recherche de l'utilisateur par e-mail.
   */
  async findByUnique(uniqueData) {
    try {

      const filters = Object.keys(uniqueData).map((field, index) => `${field} = $${index + 1}`).join(' AND ');
      const query = `SELECT * FROM users WHERE ${filters}`;
      const fieldsArray = Object.values(uniqueData);
      const response = await this.db.execute(query, fieldsArray);

      return response.rows.length > 0 ? new User(response.rows[0]).toJSON() : "Not Found";
    } catch (error) {
      console.error(error);
      throw new Error('Error finding user.');
    }
  }
}
