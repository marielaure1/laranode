import routes from "./routes.js"

export default function router(req, res) {
  const url = req.url;
  const method = req.method;

  const isRouteExist = routes.find(route => {
    const isMethodExist = route.method === method;
    const isPathExist = route.path === url || (route.path === "/" && url === "");

    return isMethodExist && isPathExist;
  });

  if (isRouteExist) {
    isRouteExist.handler(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
}