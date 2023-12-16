import Router from "./Router.js"

const routes = new Router()

routes.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("Hello from GET /");
  res.end();
});

routes.post("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("Hello from POST /");
  res.end();
});

routes.get("/users", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("Hello from GET /users");
  res.end();
});

export default routes.getRoutes();