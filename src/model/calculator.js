var _ = require('lodash');

var Calculator = function() {
};

Calculator.prototype.calculate = function(cart) {
    var total = 0;
    _.forEach(cart.cartItems, function(cartItem) {
        total += cartItem.getSubtotal();
    });
    return total - cart.getPromotionMoney();
};

module.exports = Calculator;