//Write a function that takes an object as an argument and returns a new object with specific properties. 
//For example, a function that takes an object with name, age, and address properties and returns an object with only the name and age properties.

function getSpecificProperties(obj) {
    return {
        name: obj.name,
        age: obj.age
    };
}

let person = {
    name: 'Tathya Shukla',
    age: 23,
    address: 'Rajkot'
};

let newObj = getSpecificProperties(person);
console.log(newObj); 