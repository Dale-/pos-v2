var moment = require('moment');

var Cart = function () {

};

Cart.prototype.toInventory = function() {

    var list =  '***<没钱赚商店>购物清单***' +
                '打印时间:' + moment().format('YYYY年-MM月-DD日 HH:mm:ss') +
                '----------------------' +
                '名称：雪碧，数量：1个，单价：3.00(元)，小计：3.00(元)' +
                '----------------------' +
                '总计：3.00(元)' +
                '********************** ';

    console.log(list);
    return list;
};

module.exports = Cart;