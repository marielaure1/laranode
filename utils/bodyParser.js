/**
 * Middleware pour le traitement du corps de la requête (body-parser).
 * @param {IncomingMessage} req - L'objet de requête HTTP.
 * @returns {Promise<Object>} Une promesse résolue avec les données parsées du corps de la requête.
 * @throws {Error} Une erreur si le corps de la requête ne peut pas être analysé.
 */
export default function bodyParser(req) {
  return new Promise((resolve, reject) => {
    let data = '';

    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        resolve(parsedData);
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', (error) => {
      reject(error);
    });
  });
}
