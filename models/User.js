/**
 * Created by tomasnagy on 14/12/14.
 */
var User = function(name) {
    this.name = name;
    this.guitar = '';
}

User.prototype = {
    get Name() { return this.name; },

    get Guitar() { return this.guitar; },
    set Guitar(v) { this.guitar = v; }
}

module.exports = User;
