jest.autoMockOff();
var moment = require('moment');
var Cart = require('../src/model/cart');
var PrinterInventory = require('../src/printer');

describe('Pos Inventory', function() {

    var expectResult;

    describe('#no promotion', function() {

        it('should return one cartItem with no promotion', function(){

            var input = ['ITEM000001'];
            expectResult = PrinterInventory(input);

            var result = '***<没钱赚商店>购物清单***\n' +
                '打印时间:' + moment().format('YYYY年-MM月-DD日 HH:mm:ss') + '\n' +
                '----------------------\n' +
                '名称：雪碧，数量：1瓶，单价：3.00(元)，小计：3.00(元)\n' +
                '----------------------\n' +
                '总计：3.00(元)\n' +
                '********************** ';
            expect(expectResult).toBe(result);
        });

        it('should return multiple cartItems with no promotion', function(){

            var input = ['ITEM000001','ITEM000002'];
            expectResult = PrinterInventory(input);

            var result = '***<没钱赚商店>购物清单***\n' +
                '打印时间:' + moment().format('YYYY年-MM月-DD日 HH:mm:ss') + '\n' +
                '----------------------\n' +
                '名称：雪碧，数量：1瓶，单价：3.00(元)，小计：3.00(元)\n' +
                '名称：苹果，数量：1斤，单价：5.50(元)，小计：5.50(元)\n' +
                '----------------------\n' +
                '总计：8.50(元)\n' +
                '********************** ';
            expect(expectResult).toBe(result);
        });

    });


});