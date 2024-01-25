//Create an object to store information about a product (e.g., name, price, quantity, etc.). 
//Write code to calculate the total cost of a specified quantity of the product.

class Product {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    totalCost(specifiedQuantity) {
        if (specifiedQuantity <= this.quantity) {
            return this.price * specifiedQuantity;
        } else {
            console.log('Sorry, the specified quantity is more than what we have in stock.');
            return;
        }
    }
}

let product1 = new Product('laptop', 15000, 5);
console.log(product1.totalCost(5));
