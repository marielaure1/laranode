import Validator from "./Validator.js";

export default class UserValidator extends Validator {
    constructor(data) {
        super();
        this.data = data;
    }
      
    validateCreate() {
        this.required("name", "Name")
        .required("email", "Email")
        .required("password", "Password");

        return this.errors;
    }

    validateUpdate() {
        this.required("name", "Name")
        .required("email", "Email")
        .required("password", "Password");

        return this.errors;
    }
}
