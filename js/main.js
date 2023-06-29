const handleException = (exception) => {
  alert(exception);
};

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  async fetchUsers() {
    const response = await fetch('utils/users.json');
    return response.json();
  }

  async setUser() {
    const users = await this.fetchUsers();
    this.user = users.find(user => user.username === this.username);
    if (!this.user) {
      throw Error('El usuario no se encuentra en nuestra base de datos');
    }
    return this.user;
  }

  async getUser() {
    await this.setUser();
    return this.user;
  }

  async validate() {
    await this.getUser();
    return this.user.password === this.password;
  }
}