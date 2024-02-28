//Create an array of objects to store information about multiple people or products. 
//Write code to loop through the array and display the information for each object.

class Product {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}
let products = [
    new Product('laptop', 1500, 10),
    new Product('phone', 800, 20),
    new Product('tablet', 1000, 15)
];

for (let i = 0; i < products.length; i++) {
    console.log(`Name: ${products[i].name}`);
    console.log(`Price: ${products[i].price}`);
    console.log(`Quantity: ${products[i].quantity}`);
    console.log('--------------------');
}