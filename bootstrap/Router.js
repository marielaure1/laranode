import routes from "../routes/routes.js";
import bodyParser from "../utils/BodyParser.js";

/**
 * Fonction pour gérer les routes et les requêtes HTTP.
 * @param {Object} req - Objet représentant la requête HTTP.
 * @param {Object} res - Objet représentant la réponse HTTP.
 */
export default async function router(req, res) {

  const url = req.url;
  const method = req.method;

  const urlSplit = url.split("?");
  let params = {};
  let queries = {};

  const pathSplit = urlSplit[0].split("/");

  if(urlSplit.length > 1){
    const queriesSplit = urlSplit[1].split("&&");
    queriesSplit.forEach((querie) => {
      queries[querie.split("=")[0]] = querie.split("=")[1];
    })
  }
  
  const isRouteExist = routes.find(route => {
    const routePathSplit = route.path.split("/");
    let isMethodExist = route.method === method;
    let isPathExist = true;

    if(routePathSplit.length == pathSplit.length){
      routePathSplit.forEach((routePath, index) => {
        if(routePath.includes(":")){
          params[routePath.split(":")[1]] = pathSplit[index];
        } else if(routePath != pathSplit[index]){
          isPathExist = false;
        }
      })
    } else {
      isPathExist = false;
    }

    return isMethodExist && isPathExist;
  });

  if (isRouteExist) {

    req.params = params;
    req.queries = queries;
    req.body = await bodyParser(req);
    
    isRouteExist.handler(req, res);
  } else {
    const allowedMethods = routes
      .filter((route) => route.path === url)
      .map((route) => route.method);

    if (allowedMethods.length > 0) {
      res.writeHead(405, { "Content-Type": "text/plain", "Allow": allowedMethods.join(", ") });
      res.end("Method Not Allowed");
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Route Not Found");
    }
  }
}
