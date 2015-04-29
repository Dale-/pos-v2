
var CartItem = function(item, num) {
    this.item = item;
    this.num = num;
};

CartItem.prototype.getSubtotal = function() {
  return this.item.price * this.num;
};

CartItem.prototype.getBarcode = function() {
    return this.item.barcode;
};

CartItem.prototype.getName = function() {
    return this.item.name;
};

CartItem.prototype.getUnit = function() {
    return this.item.unit;
};

CartItem.prototype.getPrice = function() {
    return this.item.price;
};

CartItem.prototype.getCartItemInformation = function() {
    return '名称：' + this.getName() + '，数量：' + this.num + this.getUnit() +
           '，单价：' + this.getPrice().toFixed(2) + '(元)，' +
           '小计：' + this.getSubtotal().toFixed(2) + '(元)\n';
};



module.exports = CartItem;