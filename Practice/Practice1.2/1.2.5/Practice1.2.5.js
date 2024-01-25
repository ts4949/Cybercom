//Write a function that takes two objects as arguments and returns a new object that combines the properties of both objects.
//For example, a function that takes two objects with name and age properties and returns an object with name, age, and address properties.

  const person1 = { name: 'Tathya', age: 23 };
  const person2 = { address: 'Rajkot' };
  
function combineObjects(obj1, obj2) {
    // Create a new object to store the combined properties
    let combinedObject = {};
  
    // Copy properties from the first object
    for (let key in obj1) {
      if (obj1.hasOwnProperty(key)) {
        combinedObject[key] = obj1[key];
      }
    }
  
    // Copy properties from the second object
    for (let key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        combinedObject[key] = obj2[key];
      }
    }
  
    return combinedObject;
  }

  const combinedPerson = combineObjects(person1, person2);
  console.log(combinedPerson); 
