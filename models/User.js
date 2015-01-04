/**
 * Created by tomasnagy on 14/12/14.
 */
var User = function(name, location) {
    'use strict';
    this.name = name;
    this.location = location;
    this.guitar = '';
};

User.prototype = {
    get Name() { return this.name; },

    get Location() { return this.location; },

    get Guitar() { return this.guitar; },
    set Guitar(v) { this.guitar = v; }
};

module.exports = User;
