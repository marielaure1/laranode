import pg from 'pg';
import config from '../config/app.js';

const { database } = config;

/**
 * Classe pour l'exécution des requêtes à la base de données.
 */
export default class Db {
  /**
   * Exécute une requête à la base de données.
   * @param {string} request - Requête SQL à exécuter.
   * @param {Array} values - Paramètres de la requête.
   * @returns {Object} - Résultat de la requête.
   */
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
