var obj = {key1:"value"};

var obj1 = Object.assign(obj);
console.log("// obj assigned to obj1");
console.log("Obj1: ", obj1);
console.log("Obj: ", obj);
console.log("--------------------");

obj1.key1 = "other value";
console.log("// changed key1 value in obj1");
console.log("Obj1: ", obj1);
console.log("Obj: ", obj);
console.log("--------------------");

obj.key2 = "my value";
console.log("// added key2 value in obj");
console.log("Obj1: ", obj1);
console.log("Obj: ", obj);
console.log("----------- = ---------");

var obj1 = {key:"value"};
console.log("// created new object for obj1");
console.log("Obj1: ", obj1);
console.log("Obj: ", obj);
console.log("--------------------");

obj = {key1:"value"};
var obj1 = Object.assign({}, obj);
console.log("\n\n\n", "// obj assigned to obj1 with {}");
console.log("Obj1: ", obj1);
console.log("Obj: ", obj);
console.log("--------------------");

obj1.key1 = "other value";
console.log("// changed key1 value in obj1");
console.log("Obj1: ", obj1);
console.log("Obj: ", obj);
console.log("--------------------");

obj.key2 = "my value";
console.log("// added key2 value in obj");
console.log("Obj1: ", obj1);
console.log("Obj: ", obj);
console.log("----------- = ---------");

var obj1 = {key:"value"};
console.log("// created new object for obj1");
console.log("Obj1: ", obj1);
console.log("Obj: ", obj);
console.log("--------------------");

var obj2 = {key2:"value1"};
console.log("\n\n");

var obj3 = {key3:"value2"};
var obj4 = {key4:"value3"};
obj = Object.assign({}, obj2, obj3, obj4);
console.log("//Merge multiple objects");
console.log("Obj2: ", obj2);
console.log("Obj3: ", obj3);
console.log("Obj4: ", obj4);
console.log("Obj: ", obj);
console.log("--------------------");

obj.key1 = "other value";
console.log("// Change value in obj");
console.log("Obj2: ", obj2);
console.log("Obj3: ", obj3);
console.log("Obj4: ", obj4);
console.log("Obj: ", obj);
console.log("--------------------");


