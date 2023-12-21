import Validator from "./Validator.js";

export default class UserValidator extends Validator {
    constructor(data) {
        super();
        this.data = data;
    }
      
    validateCreate() {
        this.required("name")
        .required("email")
        .required("password")
        .email("email")
        .password("password");

        this.code = 201;

        if (this.errors.length > 0) {
            this.code = 422; 
        }

        return {errors: this.errors, code: this.code};
    }
}
