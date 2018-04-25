var { isValidString ,isValidInteger } = require('./utils');

class Users {
  
  constructor () {
    this.users = [];
  }

  addUser(id, name, room) {
    if (isValidString(id) && isValidString(name) ){
      const user = {id, name, room};
      this.users.push(user);
      return user;
    }else{
      return { status : 400 };
    }
  }


  removeUser(id) {
    let user = this.getUser(id);
    if (user) {
      this.users = this.users.filter( i => i.id !== user.id );
    }
    return user;
  }

  getUser(id) {
    var indexUser = this.users.findIndex(u => u.id == id);
    if (indexUser > -1) {
      return this.users[indexUser];
    }
    return null;
  }

  getUserList(room) {
    return this.users
    .filter( (item) => item.room === room )
    .map( (item) => item.name );
  }
}

module.exports = {Users};