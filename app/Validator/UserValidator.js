import Validator from "./Validator.js";

/**
 * Classe de validation spécifique pour la table user.
 */
export default class UserValidator extends Validator {

   /**
   * Constructeur de la classe UserValidator.
   * @param {Object} data - Données à valider.
   */
    constructor(data) {
        super();
        this.data = data;
    }

   /**
   * Valide la création d'un utilisateur.
   * @returns {Object} - Résultat de la validation (erreurs et code HTTP).
   */
    validateCreate() {
        this.required("name")
        .required("email")
        .required("password")
        .email("email")
        .password("password");

        this.code = 201;

        if (this.errors.length > 0) {
            this.code = 422; 
        }

        return {errors: this.errors, code: this.code};
    }
}
