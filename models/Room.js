/**
 * Created by tomasnagy on 14/12/14.
 */
var Room  = function(name) {
    'use strict';
    this.name = name;
    this.users = [];
    this.availableGuitars = ['cheap', 'heartBroken', 'practiceSpace', 'woollyOctave'];
};

Room.prototype =  {
    get Name() { return this.name; },

    get Users() { return this.users; },

    getUserById: function(id) {
        var i = this.users.length - 1,
            user;

        for(i; i >= 0; i--) {
            // cast object to User
            //user = Object.create(this.User, this.users[i]);
            if(this.users[i].Name === id) {
                // return requested user
                return this.users[i];
            }
        }
    },

    addUser: function(user) {
        if(this.users.length < 4) {
            this.users.push(user);
            this.grantGuitarToUser(user);
        } else {
            // room full return 0 to notify controller to create new room
            return 0;
        }
    },

    removeUser: function(user) {
        // re-add guitar to available guitars
        this.availableGuitars.push(user.guitar);

        // remove user
        var index = this.users.indexOf(user);
        this.users.splice(index, 1);
    },

    grantGuitarToUser: function(user) {
        // grant guitar to user
        user.Guitar = this.availableGuitars[0];

        // remove guitar from available guitars
        var index = this.availableGuitars.indexOf(user.Guitar);
        this.availableGuitars.splice(index, 1);
    }
};

module.exports = Room;