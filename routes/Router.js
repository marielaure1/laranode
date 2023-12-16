

export default class Router {
    constructor() {
        this.routes = [];
        this.prefix = "/api";
    }

    get(path, handler) {
        const fullPath = this.prefix + path;
        this.routes.push({ method: "GET", path: fullPath, handler });
    }
      
    post(path, handler) {
        const fullPath = this.prefix + path;
        this.routes.push({ method: "POST", path: fullPath, handler });
    }

    put(path, handler) {
        const fullPath = this.prefix + path;
        this.routes.push({ method: "PUT", path: fullPath, handler });
    }

    patch(path, handler) {
        const fullPath = this.prefix + path;
        this.routes.push({ method: "PATCH", path: fullPath, handler });
    }

    delete(path, handler) {
        const fullPath = this.prefix + path;
        this.routes.push({ method: "DELETE", path: fullPath, handler });
    }

    getRoutes(){
        return this.routes;
    }
}