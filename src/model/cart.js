var moment = require('moment');
var _ = require('lodash');
var Item = require('./item.js');
var CartItem = require('./cartItem.js');

var Cart = function () {
    this.cartItems = [];
};

Cart.prototype.getCartItemsInformation = function() {

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

    var list =  '***<没钱赚商店>购物清单***' +
                '打印时间:' + moment().format('YYYY年-MM月-DD日 HH:mm:ss') +
                '----------------------' +
                '名称：' + '，数量：' + '，单价：' + '(元)，小计：' + '(元)' +
                '----------------------' +
                '总计：' + '(元)' +
                '********************** ';

    return list;
};

module.exports = Cart;