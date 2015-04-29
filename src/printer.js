var Cart = require('./model/cart');

var printInventory = function(input) {
    var cart = new Cart();
    cart.toCartItems(input);
    return cart.toInventory();
};

module.exports = printInventory;


