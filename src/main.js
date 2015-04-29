var Cart = require('./model/cart');


var printInventory = function(input) {
    var cart = new Cart();
    cart.toCartItems(input);
    //console.log(cart.toInventory());
};

(function main() {
    var input = ['ITEM000001'];
    printInventory(input);
})();
