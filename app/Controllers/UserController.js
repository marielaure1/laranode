import Controller from "./Controller.js";
import UserRepository from "../Repository/UserRepository.js";

export default class UserController extends Controller {
  constructor() {
    super("users", new UserRepository());
  }
}
