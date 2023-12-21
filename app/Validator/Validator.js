export default class Validator {
    constructor(data, customMessages = {}) {
      this.data = data;
      this.customMessages = customMessages;
      this.errors = [];
    }
  
    required(field) {
      if (!this.data[field]) {
        const message = this.customMessages[field] || `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        this.errors.push(message);
      }
      return this;
    }

    email(field) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(this.data[field])) {
        const message = this.customMessages[field] || `Email invalid.`;
        this.errors.push(message);
      }
      return this;
    }

    password(field, conditions = {}) {
      conditions.min = conditions.min || 12;
      conditions.max = conditions.max || 20;
      conditions.lowercase = conditions.lowercase !== undefined ? conditions.lowercase : true;
      conditions.uppercase = conditions.uppercase !== undefined ? conditions.uppercase : true;
      conditions.digit = conditions.digit !== undefined ? conditions.digit : true;
      conditions.symbol = conditions.symbol !== undefined ? conditions.symbol : true;
    
      const lowercaseRegex = "(?=.*[a-z])";
      const uppercaseRegex = "(?=.*[A-Z])";
      const digitRegex = "(?=.*\\d)";
      const symbolRegex = "(?=.*[@$!%*?&])";
    
      const passwordRegex = new RegExp(
        `^${conditions.lowercase ? lowercaseRegex : ""}${conditions.uppercase ? uppercaseRegex : ""}${conditions.digit ? digitRegex : ''}${conditions.symbol ? symbolRegex : ""}[A-Za-z\\d@$!%*?&]{${conditions.min},${conditions.max}}$`
      );
    
      if (!passwordRegex.test(this.data[field])) {
        const message = this.customMessages[field] || `Password invalid.`;
        this.errors.push(message);
      }
      return this;
    }
    
  
  }
  