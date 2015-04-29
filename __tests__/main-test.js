jest.autoMockOff();
var moment = require('moment');
var PrintInventory = require('../src/printer');

describe('Pos Inventory', function() {

    var expectResult;

    describe('#no promotion', function() {

        it('should return one cartItem with no promotion', function() {

            var input = ['ITEM000001'];
            expectResult = PrintInventory(input);

            var result = '***<没钱赚商店>购物清单***\n' +
                         '打印时间:' + moment().format('YYYY年-MM月-DD日 HH:mm:ss') + '\n' +
                         '----------------------\n' +
                         '名称：雪碧，数量：1瓶，单价：3.00(元)，小计：3.00(元)\n' +
                         '----------------------\n' +
                         '总计：3.00(元)\n' +
                         '********************** ';
            expect(expectResult).toBe(result);
        });

        it('should return multiple cartItems with no promotion', function() {

            var input = ['ITEM000001','ITEM000002'];
            expectResult = PrintInventory(input);

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

    describe('#promotion', function() {

        it('should return same cartItem of multiple records with promotion', function() {

            var input = ['ITEM000001', 'ITEM000001', 'ITEM000001'];
            expectResult = PrintInventory(input);

            var result = '***<没钱赚商店>购物清单***\n' +
                         '打印时间:' + moment().format('YYYY年-MM月-DD日 HH:mm:ss') + '\n' +
                         '----------------------\n' +
                         '名称：雪碧，数量：3瓶，单价：3.00(元)，小计：9.00(元)\n' +
                         '----------------------\n' +
                         '挥泪赠送商品：\n' +
                         '名称：雪碧，数量：1瓶\n' +
                         '----------------------\n' +
                         '总计：6.00(元)\n' +
                         '节省：3.00(元)\n' +
                         '********************** ';
            expect(expectResult).toBe(result);
        });

        it('should return same cartItem of "-" record with promotion', function() {

            var input = ['ITEM000001-3'];
            expectResult = PrintInventory(input);

            var result = '***<没钱赚商店>购物清单***\n' +
                '打印时间:' + moment().format('YYYY年-MM月-DD日 HH:mm:ss') + '\n' +
                '----------------------\n' +
                '名称：雪碧，数量：3瓶，单价：3.00(元)，小计：9.00(元)\n' +
                '----------------------\n' +
                '挥泪赠送商品：\n' +
                '名称：雪碧，数量：1瓶\n' +
                '----------------------\n' +
                '总计：6.00(元)\n' +
                '节省：3.00(元)\n' +
                '********************** ';
            expect(expectResult).toBe(result);
        });

        it('should return two cartItems with promotion', function() {

            var input = ['ITEM000001-3', 'ITEM000002'];
            expectResult = PrintInventory(input);

            var result = '***<没钱赚商店>购物清单***\n' +
                '打印时间:' + moment().format('YYYY年-MM月-DD日 HH:mm:ss') + '\n' +
                '----------------------\n' +
                '名称：雪碧，数量：3瓶，单价：3.00(元)，小计：9.00(元)\n' +
                '名称：苹果，数量：1斤，单价：5.50(元)，小计：5.50(元)\n' +
                '----------------------\n' +
                '挥泪赠送商品：\n' +
                '名称：雪碧，数量：1瓶\n' +
                '----------------------\n' +
                '总计：11.50(元)\n' +
                '节省：3.00(元)\n' +
                '********************** ';
            expect(expectResult).toBe(result);
        });

        it('should return multiple cartItems with promotion', function() {

            var input = ['ITEM000001',
                         'ITEM000001',
                         'ITEM000001',
                         'ITEM000001',
                         'ITEM000001',
                         'ITEM000003-2',
                         'ITEM000005',
                         'ITEM000005',
                         'ITEM000005'
                        ];
            expectResult = PrintInventory(input);

            var result = '***<没钱赚商店>购物清单***\n' +
                '打印时间:' + moment().format('YYYY年-MM月-DD日 HH:mm:ss') + '\n' +
                '----------------------\n' +
                '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：15.00(元)\n' +
                '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
                '名称：方便面，数量：3袋，单价：4.50(元)，小计：13.50(元)\n' +
                '----------------------\n' +
                '挥泪赠送商品：\n' +
                '名称：雪碧，数量：1瓶\n' +
                '名称：方便面，数量：1袋\n' +
                '----------------------\n' +
                '总计：51.00(元)\n' +
                '节省：7.50(元)\n' +
                '********************** ';
            expect(expectResult).toBe(result);
        });
    });
});