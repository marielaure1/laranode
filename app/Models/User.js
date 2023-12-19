export default class User {
    constructor({ id, name, email, created_at, updated_at, password }) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.created_at = created_at;
      this.updated_at = updated_at;
      this.password = password;
    }
  
    static fromDatabase(data) {
      return new User({
        id: data.id,
        name: data.name,
        email: data.email,
        created_at: data.created_at,
        updated_at: data.updated_at,
        password: data.password,
      });
    }
  
µ
    toJSON() {
      return {
        id: this.id,
        name: this.name,
        email: this.email,
        created_at: this.created_at,
        updated_at: this.updated_at,
      };
    }
}
  