/**
 * Classe de base pour les contrôleurs dans le framework.
 */
export default class Controller {

  /**
   * Constructeur de la classe Controller.
   * @param {string} tableName - Nom de la table associée au contrôleur.
   * @param {Object} repository - Instance du repository associé au contrôleur.
   * @param {Function} validator - Fonction de validation associée au contrôleur.
   */
  constructor(tableName, repository, validator) {
    if (new.target === Controller) {
      throw new TypeError('Error Controller.');
    }

    this.tableName = tableName;
    this.repository = repository;
    this.validator = validator;
  }

  /**
   * Méthode pour récupérer toutes les données d'une table.
   * @param {Object} request - Objet de la requête HTTP.
   * @param {Object} response - Objet de la réponse HTTP.
   */
  async all(request, response) {
    try {
      const data = await this.repository.all();
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify(data));
      response.end();
    } catch (err) {
      console.error(err);
      response.writeHead(500, { 'Content-type': 'text/plain' });
      response.write('Internal Server Error');
      response.end();
    }
  }

  /**
   * Méthode pour récupérer une donnée par son identifiant.
   * @param {Object} request - Objet de la requête HTTP.
   * @param {Object} response - Objet de la réponse HTTP.
   */

  async get(request, response) {
    try {
      const id = request.params.id;
      const data = await this.repository.get(id);
  
      if(data == "Not Found"){
        throw Error("Not Found");
      } else{
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(data));
      }
  
      response.end();
    } catch (err) {
      console.error(err);
      let writeHead = 500;
      let write = "Internal Server Error";

      if(err.message == "Not Found"){
        writeHead = 404;
        write = "Not Found";
      }

      response.writeHead(writeHead, { 'Content-type': 'text/plain' });
      response.write(write);
      response.end();
    }
  }

   /**
   * Méthode pour créer une nouvelle donnée.
   * @param {Object} request - Objet de la requête HTTP.
   * @param {Object} response - Objet de la réponse HTTP.
   */
  async create(request, response, uniqueData) {
    try {
      const createdData = request.body;

      const entityValidator = this.validator(createdData);
      const createErrors = entityValidator.validateCreate();

      if(createErrors.code == 422){
        throw Object.assign(new Error("Unprocessable Entity"), { errorData : createErrors });
      }

      const isExist = await this.repository.findByUnique(uniqueData);

      if(isExist != "Not Found"){
        throw Error("Conflict");
      }

      const data = await this.repository.create(createdData);
  
      response.writeHead(201, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify(data));
      response.end();
    } catch (err) {
      console.error(err);
      let writeHead = 500;
      let write = "Internal Server Error";

      if(err.message == "Unprocessable Entity"){
        writeHead = 422;
        write = JSON.stringify({ errors: err.errorData.errors});
      }

      if(err.message == "Conflict"){
        writeHead = 409;
        write = "Conflict";
      }

      response.writeHead(writeHead, { 'Content-type': 'text/plain' });
      response.write(write);
      response.end();
    }
  }

  /**
   * Méthode pour mettre à jour une donnée existante.
   * @param {Object} request - Objet de la requête HTTP.
   * @param {Object} response - Objet de la réponse HTTP.
   */
  async update(request, response, uniqueData) {
    try {
      const id = request.params.id;
      const updatedData = request.body;

      const entityValidator = this.validator(updatedData);
      const updateErrors = entityValidator.validateCreate();

      if(updateErrors.code == 422){
        throw Object.assign(new Error("Unprocessable Entity"), { errorData : updateErrors });
      }

      const isExist = await this.repository.findByUnique(uniqueData);

      if(isExist != "Not Found"){
        throw Error("Conflict");
      }

      const data = await this.repository.update(id, updatedData);
  
      if(data == "Not Found"){
        throw Error("Not Found");
      } else{
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(data));
      }
  
      response.end();
    } catch (err) {
      console.error(err);
      let writeHead = 500;
      let write = "Internal Server Error";

      if(err.message == "Not Found"){
        writeHead = 404;
        write = "Not Found";
      }

      if(err.message == "Unprocessable Entity"){
        writeHead = 422;
        write = JSON.stringify({ errors: err.errorData.errors});
      }

      if(err.message == "Conflict"){
        writeHead = 409;
        write = "Conflict";
      }

      response.writeHead(writeHead, { 'Content-type': 'text/plain' });
      response.write(write);
      response.end();
    }
  }

  /**
   * Méthode pour supprimer une donnée par son identifiant.
   * @param {Object} request - Objet de la requête HTTP.
   * @param {Object} response - Objet de la réponse HTTP.
   */
  async delete(request, response) {
    try {
      const id = request.params.id;
      const data = await this.repository.delete(id);
  
      if(data == "Not Found"){
        throw Error("Not Found");
      } else{
        response.writeHead(204, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(data));
      }
  
      response.end();
    } catch (err) {
      console.error(err);
      let writeHead = 500;
      let write = "Internal Server Error";

      if(err.message == "Not Found"){
        writeHead = 404;
        write = "Not Found";
      }

      response.writeHead(writeHead, { 'Content-type': 'text/plain' });
      response.write(write);
      response.end();
    }
  }
}