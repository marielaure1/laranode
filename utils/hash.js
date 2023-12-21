import bcrypt from 'bcrypt'

/**
 * Classe pour la gestion du hachage de données à l'aide de bcrypt.
 */
export default class Hash{

    /**
   * Constructeur de la classe Hash.
   * @param {number} [saltRounds=10] - Le nombre de tours de hachage (complexité du hachage).
   */
    constructor(){
        this.salt = 10;
        this.bcrypt = bcrypt;
    }

    /**
   * Hash les données fournies.
   * @param {string} data - Les données à hacher.
   * @param {number} [saltCustom=false] - La complexité du hachage personnalisée (facultative).
   * @returns {Promise<string>} Une promesse résolue avec le hash résultant.
   * @throws {Error} Une erreur si le hachage échoue.
   */
    async hashData(data, saltCustom = false) {

        try{
            const salt = await this.bcrypt.genSalt(saltCustom ? saltCustom : this.salt)
            const hash = await this.bcrypt.hash(data, salt)

            return hash

        } catch(error){
            console.log(error.message);         
        }
    }

    /**
   * Compare les données avec un hash donné.
   * @param {string} data - Les données à comparer.
   * @param {string} dataToCompare - Le hash avec lequel comparer les données.
   * @param {number} [saltCustom=false] - La complexité du hachage personnalisée (facultative).
   * @returns {Promise<boolean>} Une promesse résolue avec le résultat de la comparaison.
   * @throws {Error} Une erreur si la comparaison échoue.
   */
    async hashCompareData(data, dataToCompare, saltCustom = false) {

        try{
            const salt = await this.bcrypt.genSalt(saltCustom ? saltCustom : this.salt)
            const hash = await this.bcrypt.hash(data, salt)

            const compareData = await this.bcrypt.compare(dataToCompare, hash)

            return compareData

        } catch(error){
            console.log(error.message);         
        }
    }
}