class Item {
    constructor(data) {
        this.price = data.product.price;
        this.quantity = data.quantity;
        this.product = data.product;
    }

    toJson() {
        return {
            price: this.price,
            quantity: this.quantity,
            product: this.product
        }
    }
}

module.exports = Item;
