export default class Validator {
    constructor(data, customMessages = {}) {
      this.data = data;
      this.customMessages = customMessages;
      this.errors = [];
    }
  
    required(field, fieldName) {
      if (!this.data[field]) {
        const message = this.customMessages[field] || `${fieldName} is required.`;
        this.errors.push(message);
      }
      return this;
    }
  
  }
  