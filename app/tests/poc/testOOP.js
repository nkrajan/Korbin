// define the Person Class
function Person() {

}

Person.staticMethod = function(){
    console.log('I am a static person');
}

Person.prototype.walk = function(){
    console.log ('I am walking!');
};

Person.prototype.sayHello = function(){
    console.log ('hello');
};

// define the Student class
function Student() {
    // Call the parent constructor
    Person.call(this);
}



// inherit Person
Student.prototype = new Person();
Student = Person;

// correct the constructor pointer because it points to Person
Student.prototype.constructor = Student;

// replace the sayHello method
Student.prototype.sayHello = function(){
    console.log('hi, I am a student');
};

/** Check Inheritance **/
Student.prototype.sayGoodBye = function(){
    console.log('goodBye');
};

/** Check Inheritance **/
var student1 = new Student();
Student.staticMethod();
student1.sayHello();
student1.walk();
student1.sayGoodBye();

/** Check Inheritance **/
console.log(student1 instanceof Person);
console.log(student1 instanceof Student);


