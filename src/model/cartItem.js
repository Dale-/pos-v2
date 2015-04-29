
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




module.exports = CartItem;