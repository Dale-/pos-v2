var moment = require('moment');
var _ = require('lodash');
var Item = require('./item.js');
var CartItem = require('./cartItem.js');
var Promotion = require('./promotion.js');

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

Cart.prototype.getPromotionCartItems = function() {

    var promotionCartItems = [];
    var promotions = Promotion.loadPromotions()[0].barcodes;

    _.forEach(this.cartItems, function(cartItem) {

        var promotion = _.find(promotions, function(promotion) {
            return cartItem.item.barcode === promotion;
        });

        if(promotion && cartItem.num >= 3) {
            cartItem.promotionNum = Math.floor(cartItem.num/3);
            promotionCartItems.push(cartItem);
        }
    });
    return promotionCartItems;
};

Cart.prototype.getPromotionInformation = function() {

    var promotionInformation = '';
    var promotionCartItems = this.getPromotionCartItems();


    if(promotionCartItems.length != 0) {
        promotionInformation = '挥泪赠送商品：\n';

        _.forEach(promotionCartItems, function (promotionCartItem) {
            promotionInformation += '名称：' + promotionCartItem.item.name + '，' +
            '数量：' + promotionCartItem.promotionNum + promotionCartItem.item.unit + '\n';
        });

        promotionInformation += '----------------------\n';
    }
    return promotionInformation;
};

Cart.prototype.getPromotionMoneyInformation = function() {

    var promotionMoney = this.getPromotionMoney();
    var promotionMoneyInformation = '';
    if(promotionMoney) {
        promotionMoneyInformation = '节省：' + promotionMoney.toFixed(2) + '(元)\n';
    }
    return promotionMoneyInformation;
};

Cart.prototype.getPromotionMoney = function() {

    var promotionCartItems = this.getPromotionCartItems();
    var promotionMoney = 0;

    _.forEach(promotionCartItems, function(promotionCartItem) {
        promotionMoney += promotionCartItem.item.price * promotionCartItem.promotionNum;
    });

    return promotionMoney;
};

Cart.prototype.getTotal = function() {

    var total = 0;
    _.forEach(this.cartItems, function(cartItem) {
        total += cartItem.getSubtotal();
    });
    return total - this.getPromotionMoney();
};

Cart.prototype.toCartItems = function(tags) {

    var _this = this;

    _.forEach(tags, function(tag) {

        var count = 1;

        var item = _.find(Item.loadAllItems(), function(item) {
           return item.barcode === tag;
        });

        var existCartItem = _.find(_this.cartItems, function(cartItem) {
           return cartItem.item.barcode === item.barcode;
        });

        if(existCartItem) {
            existCartItem.num++;
        } else {
            _this.cartItems.push(new CartItem(item, count));
        }

    });
    return this.cartItems;
};

Cart.prototype.toInventory = function() {

    var list =  '***<没钱赚商店>购物清单***\n' +
                '打印时间:' + moment().format('YYYY年-MM月-DD日 HH:mm:ss') + '\n' +
                '----------------------\n' +
                this.getCartItemsInformation() +
                '----------------------\n' +
                this.getPromotionInformation() +
                '总计：' + this.getTotal().toFixed(2) + '(元)\n' +
                this.getPromotionMoneyInformation() +
                '********************** ';

    return list;
};

module.exports = Cart;