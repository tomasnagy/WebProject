/**
 * Created by tomasnagy on 01/12/14.
 */
var GuitarHistoryItem = function(title, date, description, image, interactiveGuitarName) {
    this.title = title;
    this.date = date;
    this.year = date.split(' ')[date.split(' ').length - 1];
    this.description = description;
    this.image = image;
    this.interactiveGuitarName = interactiveGuitarName;
};

GuitarHistoryItem.prototype = {
    get Title() { return this.title; },

    get Date() { return this.date; },

    get Year() { return this.year; },

    get Description() { return this.description; },

    get Image() { return this.image; },

    get InteractiveGuitarName() { return this.interactiveGuitarName; }
};