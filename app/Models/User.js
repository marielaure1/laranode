/**
 * Classe représentant un utilisateur.
 */
export default class User {

   /**
   * Constructeur de la classe User.
   * @param {Object} userData - Données de l'utilisateur.
   * @param {string} userData.id - Identifiant de l'utilisateur.
   * @param {string} userData.name - Nom de l'utilisateur.
   * @param {string} userData.email - Adresse e-mail de l'utilisateur.
   * @param {string} userData.created_at - Date de création de l'utilisateur.
   * @param {string} userData.updated_at - Date de mise à jour de l'utilisateur.
   * @param {string} userData.password - Mot de passe de l'utilisateur.
   */
    constructor({ id, name, email, created_at, updated_at, password }) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.created_at = created_at;
      this.updated_at = updated_at;
      this.password = password;
    }
  
  /**
   * Méthode statique pour créer une instance User à partir des données de la base de données.
   * @param {Object} data - Données de la base de données.
   * @returns {User} - Instance de la classe User.
   */
    static fromDatabase(data) {
      return new User({
        id: data.id,
        name: data.name,
        email: data.email,
        created_at: data.created_at,
        updated_at: data.updated_at,
        password: data.password,
      });
    }
  

  /**
   * Méthode pour convertir l'objet User en un objet JSON sans donnée sensible (mot de passe).
   * @returns {Object} - Objet JSON représentant l'utilisateur.
   */
    toJSON() {
      return {
        id: this.id,
        name: this.name,
        email: this.email,
        created_at: this.created_at,
        updated_at: this.updated_at,
      };
    }
}
  