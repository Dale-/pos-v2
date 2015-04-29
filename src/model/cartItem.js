
var CartItem = function(item, num) {
    this.item = item;
    this.num = num;
};

CartItem.prototype.getSubtotal = function() {
  return this.item.price * this.num;
};

module.exports = CartItem;