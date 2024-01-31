//Create an object with one property. Declare second object and assign it to previous object.
//Change the property of first object. Print out the second object and observe the output !

A = { name: "abc" };
B = A;
console.log("B value before", B);
A.name = "def";
console.log("B value after" , B);