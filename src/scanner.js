var _ = require('lodash');
var Item = require('./model/item');
var CartItem = require('./model/cartItem');

var scanner = function(tags, cart) {

    _.forEach(tags, function(tag) {

        var count = 1;

        var array = tag.split('-');
        var barcode = array[0];
        if(array[1]) {
            count = array[1];
        }

        var item = _.find(Item.loadAllItems(), function(item) {
            return item.barcode === barcode;
        });

        var existCartItem = _.find(cart.cartItems, function(cartItem) {
            return cartItem.item.barcode === item.barcode;
        });

        if(existCartItem) {
            existCartItem.num += count;
        } else {
            cart.cartItems.push(new CartItem(item, count));
        }

    });
    return this.cartItems;
};

module.exports = scanner;