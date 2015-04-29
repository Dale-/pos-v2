jest.dontMock('moment');
jest.dontMock('../src/model/cart');
var Cart = require('../src/model/cart');
var moment = require('moment');

describe('Cart', function() {

    it('should return one cartItem with no promotion', function(){
        var cart = new Cart();
        var expectResult = cart.toList();
        var result = '***<没钱赚商店>购物清单***' +
                     '打印时间:' + moment().format('YYYY年-MM月-DD日 HH:mm:ss') +
                     '----------------------' +
                     '名称：雪碧，数量：1个，单价：3.00(元)，小计：3.00(元)' +
                     '----------------------' +
                     '总计：3.00(元)' +
                    '********************** ';
        expect(expectResult).toBe(result);
    });
});