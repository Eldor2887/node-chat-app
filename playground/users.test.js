const expect = require('expect');
const {Users} = require('./user');

describe('Users', () => {
    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '1234',
            name: 'eldor',
            age: 31
        };
        var resUsers = users.addUser(user.id, user.name, user.age);

        expect(resUsers).toEqual([user]);
    })
})
