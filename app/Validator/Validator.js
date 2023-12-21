/**
 * Classe de validation des données.
 */
export default class Validator {

  /**
   * Constructeur de la classe Validator.
   * @param {Object} data - Données à valider.
   * @param {Object} customMessages - Messages d'erreur personnalisés.
   */
    constructor(data, customMessages = {}) {
      this.data = data;
      this.customMessages = customMessages;
      this.errors = [];
    }
  
  /**
   * Vérifie si un champ est requis.
   * @param {string} field - Nom du champ à vérifier.
   * @returns {Validator} - L'instance du validateur.
   */
    required(field) {
      if (!this.data[field]) {
        const message = this.customMessages[field] || `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        this.errors.push(message);
      }
      return this;
    }

  /**
   * Vérifie si un champ est une adresse e-mail valide.
   * @param {string} field - Nom du champ à vérifier.
   * @returns {Validator} - L'instance du validateur.
   */
    email(field) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(this.data[field])) {
        const message = this.customMessages[field] || `Email invalid.`;
        this.errors.push(message);
      }
      return this;
    }

    /**
   * Vérifie si un champ est un mot de passe valide selon les conditions spécifiées.
   * @param {string} field - Nom du champ à vérifier.
   * @param {Object} conditions - Conditions pour le mot de passe (min, max, lowercase, uppercase, digit, symbol).
   * @returns {Validator} - L'instance du validateur.
   */
    password(field, conditions = {}) {
      conditions.min = conditions.min || 12;
      conditions.max = conditions.max || 20;
      conditions.lowercase = conditions.lowercase !== undefined ? conditions.lowercase : true;
      conditions.uppercase = conditions.uppercase !== undefined ? conditions.uppercase : true;
      conditions.digit = conditions.digit !== undefined ? conditions.digit : true;
      conditions.symbol = conditions.symbol !== undefined ? conditions.symbol : true;
    
      const lowercaseRegex = "(?=.*[a-z])";
      const uppercaseRegex = "(?=.*[A-Z])";
      const digitRegex = "(?=.*\\d)";
      const symbolRegex = "(?=.*[@$!%*?&])";
    
      const passwordRegex = new RegExp(
        `^${conditions.lowercase ? lowercaseRegex : ""}${conditions.uppercase ? uppercaseRegex : ""}${conditions.digit ? digitRegex : ''}${conditions.symbol ? symbolRegex : ""}[A-Za-z\\d@$!%*?&]{${conditions.min},${conditions.max}}$`
      );
    
      if (!passwordRegex.test(this.data[field])) {
        const message = this.customMessages[field] || `Password invalid.`;
        this.errors.push(message);
      }
      return this;
    }
    
  
  }
  