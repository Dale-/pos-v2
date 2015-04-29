var _ = require('lodash');
var Item = require('./model/item');
var CartItem = require('./model/cartItem');

var scanner = function(tags, cart) {

    _.forEach(tags, function(tag) {

        var array = tag.split('-');
        var barcode = array[0];
        var count = array[1] || 1;

        var existCartItem = _.find(cart.cartItems, function(cartItem) {
            return cartItem.getBarcode() === barcode;
        });

        if(existCartItem) {
            existCartItem.num += count;
        } else {
            var item = _.find(Item.loadAllItems(), 'barcode', barcode);
            cart.cartItems.push(new CartItem(item, count));
        }

    });
    return this.cartItems;
};

module.exports = scanner;