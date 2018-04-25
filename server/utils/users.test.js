const expect = require('expect');
const { Users } = require('./users');

describe('User', () => {
  const users = new Users();

  beforeEach(() => {

  });

  it('should create valid user', () => {
    const response = users.addUser( '1' , 'jhon', 'chat1');
    expect(response.id).toBe('1');
  });

  it('should not create a user', () => {
    const response = users.addUser( '' , '', '');
    expect(response.status).toBe(400);
  });

  it('should delete a user whit id 1', () => {
    users.addUser('4', 'jhon1', 'chat');
    users.addUser('3', 'jhon1', 'chat');
    users.addUser('5', 'jhon2', 'chat');
    users.addUser('6', 'jhon3', 'chat');
    const response = users.removeUser(1);
    expect(response.id).toBe('1');
  });

  it('shoul return a user with id 5', () => {
    const response = users.getUser(5);
    expect(response.id).toBe('5'); 
  });

  it('should return a list with 2 items for room chat', () => {
    const response = users.getUserList('chat');
    expect(response.length).toBe(4);
  });

});