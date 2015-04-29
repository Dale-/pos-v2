var moment = require('moment');
var _ = require('lodash');
var Item = require('./item.js');
var CartItem = require('./cartItem.js');
var Calculator = require('./calculator');
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

Cart.prototype.toInventory = function() {

    var calculator = new Calculator();

    var list =  '***<没钱赚商店>购物清单***\n' +
                '打印时间:' + moment().format('YYYY年-MM月-DD日 HH:mm:ss') + '\n' +
                '----------------------\n' +
                this.getCartItemsInformation() +
                '----------------------\n' +
                this.getPromotionInformation() +
                '总计：' + calculator.calculate(this).toFixed(2) + '(元)\n' +
                this.getPromotionMoneyInformation() +
                '********************** ';

    return list;
};

module.exports = Cart;