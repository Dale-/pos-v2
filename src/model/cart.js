var moment = require('moment');
var _ = require('lodash');
var Item = require('./item.js');
var CartItem = require('./cartItem.js');

var Cart = function () {
    this.cartItems = [];
};

Cart.prototype.getCartItemsInformation = function() {

    var cartItemsInformation = '';

    _.forEach(this.cartItems, function(cartItem) {

        cartItemsInformation += '名称：' + cartItem.item.name + '，数量：' + cartItem.num + cartItem.item.unit +
                                '，单价：' + cartItem.item.price.toFixed(2) + '(元)，' +
                                 '小计：' + cartItem.getSubtotal().toFixed(2) + '(元)\n';
    });
    return cartItemsInformation;
};

Cart.prototype.getTotal = function() {

    var total = 0;
    _.forEach(this.cartItems, function(cartItem) {
        total += cartItem.getSubtotal();
    });
    return total;
};

Cart.prototype.toCartItems = function(tags) {

    var _this = this;

    _.forEach(tags, function(tag) {

        var item = _.find(Item.loadAllItems(), function(item) {
           return item.barcode === tag;
        });

        _this.cartItems.push(new CartItem(item, 1));
    });
    return this.cartItems;
};

Cart.prototype.toInventory = function() {

    var list =  '***<没钱赚商店>购物清单***\n' +
                '打印时间:' + moment().format('YYYY年-MM月-DD日 HH:mm:ss') + '\n' +
                '----------------------\n' +
                this.getCartItemsInformation() +
                '----------------------\n' +
                '总计：' + this.getTotal().toFixed(2) + '(元)\n' +
                '********************** ';

    return list;
};

module.exports = Cart;