export default class RegistrationRequest {
  constructor(
    private name: string,
    private surname: string,
    private birthDate: string,
    private login: string,
    private email: string,
    private password: string,
  ) {}

  getName() {
    return this.name
  }

  getSurname() {
    return this.surname
  }

  getBirthDate() {
    return this.birthDate
  }

  getLogin() {
    return this.login
  }

  getEmail() {
    return this.email
  }

  getPassword() {
    return this.password
  }
}
