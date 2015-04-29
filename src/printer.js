var Cart = require('./model/cart');
var Scanner = require('./scanner');

var printInventory = function(input) {
    var cart = new Cart();
    Scanner(input, cart);
    return cart.toInventory();
};

module.exports = printInventory;


