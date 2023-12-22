import Router from "../bootstrap/RouterMethods.js";
import UserController from "../app/Controllers/UserController.js";

/**
 * Configuration des routes de l'application.
 */
const routes = new Router()
const userController = new UserController();

routes.get("/users", async (req, res) => {
  try {
    await userController.all(req, res);
  } catch (error) {
    console.error("Error:", error);
    res.writeHead(500, { "Content-type": "text/plain" });
    res.write("Internal Server Error");
    res.end();
  }
});

routes.post("/users", async (req, res) => {
  try {
    const { email } = req.body;

    await userController.create(req, res, {email});
  } catch (error) {
    console.error("Error:", error);
    res.writeHead(500, { "Content-type": "text/plain" });
    res.write("Internal Server Error");
    res.end();
  }
});

routes.get("/users/:id", async (req, res) => {
  try {
    await userController.get(req, res); 
  } catch (error) {
    console.error("Error:", error);
    res.writeHead(500, { "Content-type": "text/plain" });
    res.write("Internal Server Error");
    res.end();
  }
});

routes.put("/users/:id", async (req, res) => {
  try {
    const { email } = req.body;
    
    await userController.update(req, res, {email}); 
  } catch (error) {
    console.error("Error:", error);
    res.writeHead(500, { "Content-type": "text/plain" });
    res.write("Internal Server Error");
    res.end();
  }
});


routes.delete("/users/:id", async (req, res) => {
  try {
    await userController.delete(req, res); 
  } catch (error) {
    console.error("Error:", error);
    res.writeHead(500, { "Content-type": "text/plain" });
    res.write("Internal Server Error");
    res.end();
  }
});

export default routes.getRoutes();