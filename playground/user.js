const fs = require('fs');

class Users {
    constructor(){
        this.users = [];
    }
    addUser(id, name, age){
        var user = {
            id,
            name,
            age
        };
        this.users.push(user);
    }
}

fs.writeFile('user.json', Users, () => {
    console.log('File is written successfully...');
});