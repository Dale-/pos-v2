var moment = require('moment');
var _ = require('lodash');
var Calculator = require('../calculator');
var Promotion = require('./promotion.js');

var Cart = function () {
    this.cartItems = [];
};

Cart.prototype.getCartItemsText = function() {

    var cartItemsText = '';

    _.forEach(this.cartItems, function(cartItem) {
        cartItemsText += cartItem.getCartItemText();
    });

    return cartItemsText;
};

Cart.prototype.getPromotionCartItems = function() {

    var promotionCartItems = [];
    var promotionBarcodes = Promotion.loadPromotions()[0].barcodes;

    _.forEach(this.cartItems, function(cartItem) {

        var barcode = cartItem.getBarcode();
        var promotionBarcode = _.find(promotionBarcodes, function(promotionBarcode) {
            return cartItem.getBarcode() === promotionBarcode;
        });

        if(promotionBarcode && cartItem.num >= 3) {
            cartItem.promotionNum = Math.floor(cartItem.num/3);
            promotionCartItems.push(cartItem);
        }
    });

    return promotionCartItems;
};

Cart.prototype.getPromotionText = function() {

    var promotionText = '';
    var promotionCartItems = this.getPromotionCartItems();

    if(promotionCartItems.length != 0) {
        promotionText = '挥泪赠送商品：\n';

        _.forEach(promotionCartItems, function (promotionCartItem) {
            promotionText += '名称：' + promotionCartItem.getName() + '，' +
                                    '数量：' + promotionCartItem.promotionNum + promotionCartItem.getUnit() + '\n';
        });

        promotionText += '----------------------\n';
    }

    return promotionText;
};

Cart.prototype.getPromotionMoneyText = function() {

    var promotionMoney = this.getPromotionMoney();
    var promotionMoneyText = '';
    if(promotionMoney) {
        promotionMoneyText = '节省：' + promotionMoney.toFixed(2) + '(元)\n';
    }

    return promotionMoneyText;
};

Cart.prototype.getPromotionMoney = function() {

    var promotionCartItems = this.getPromotionCartItems();
    var promotionMoney = 0;

    _.forEach(promotionCartItems, function(promotionCartItem) {
        promotionMoney += promotionCartItem.getPrice() * promotionCartItem.promotionNum;
    });

    return promotionMoney;
};

Cart.prototype.toInventory = function() {

    var calculator = new Calculator();

    var list =  '***<没钱赚商店>购物清单***\n' +
                '打印时间:' + moment().format('YYYY年-MM月-DD日 HH:mm:ss') + '\n' +
                '----------------------\n' +
                this.getCartItemsText() +
                '----------------------\n' +
                this.getPromotionText() +
                '总计：' + calculator.calculate(this).toFixed(2) + '(元)\n' +
                this.getPromotionMoneyText() +
                '********************** ';

    return list;
};

module.exports = Cart;