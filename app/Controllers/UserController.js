import Controller from "./Controller.js";
import UserRepository from "../Repository/UserRepository.js";
import UserValidator from "../Validator/UserValidator.js";

export default class UserController extends Controller {
  constructor() {
    super("users", new UserRepository(), (data) => new UserValidator(data));
  }
}
