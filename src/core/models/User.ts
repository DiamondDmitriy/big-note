export default class User {
  constructor(
    private id: string,
    private username: string,
    private name: string,
    private surname: string,
    private email: string,
    private birthDate: string,
    private createdAt: string,
    private updatedAt: string,
    private role: null,
  ) {}

  getId() {
    return this.id
  }

  getUsername() {
    return this.username
  }

  getName() {
    return this.name
  }

  getSurname() {
    return this.surname
  }

  getEmail() {
    return this.email
  }

  getBirthDate() {
    return this.birthDate
  }

  getCreatedAt() {
    return this.createdAt
  }

  getUpdatedAt() {
    return this.updatedAt
  }

  getRole() {
    return this.role
  }
}
