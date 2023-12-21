/**
 * Classe pour définir les méthodes de routage communes (GET, POST, PUT, PATCH, DELETE).
 */
export default class RouterMethods {
    /**
     * Constructeur de la classe RouterMethods.
     */
    constructor() {
        this.routes = [];
        this.prefix = "/api";
    }

    /**
     * Méthode pour définir une route HTTP GET.
     * @param {string} path - Le chemin de la route.
     * @param {Function} handler - Le gestionnaire de la route.
     */
    get(path, handler) {
        const fullPath = this.prefix + path;
        this.routes.push({ method: "GET", path: fullPath, handler });
    }
      
    /**
     * Méthode pour définir une route HTTP POST.
     * @param {string} path - Le chemin de la route.
     * @param {Function} handler - Le gestionnaire de la route.
     */
    post(path, handler) {
        const fullPath = this.prefix + path;
        this.routes.push({ method: "POST", path: fullPath, handler });
    }

    /**
     * Méthode pour définir une route HTTP PUT.
     * @param {string} path - Le chemin de la route.
     * @param {Function} handler - Le gestionnaire de la route.
     */
    put(path, handler) {
        const fullPath = this.prefix + path;
        this.routes.push({ method: "PUT", path: fullPath, handler });
    }

    /**
     * Méthode pour définir une route HTTP PATCH.
     * @param {string} path - Le chemin de la route.
     * @param {Function} handler - Le gestionnaire de la route.
     */
    patch(path, handler) {
        const fullPath = this.prefix + path;
        this.routes.push({ method: "PATCH", path: fullPath, handler });
    }

    /**
     * Méthode pour définir une route HTTP DELETE.
     * @param {string} path - Le chemin de la route.
     * @param {Function} handler - Le gestionnaire de la route.
     */
    delete(path, handler) {
        const fullPath = this.prefix + path;
        this.routes.push({ method: "DELETE", path: fullPath, handler });
    }

    /**
     * Méthode pour obtenir la liste des routes définies.
     * @returns {Array} - Liste des routes définies.
     */
    getRoutes(){
        return this.routes;
    }
}
