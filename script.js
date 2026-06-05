var currentStudentId = "";
var currentStudentName = "";
var currentQuestionIndex = 0;
var score = 0;
var users = {
  "student1": "Arjun Sharma",
  "student2": "Priya Mehta",
  "student3": "Rahul Verma",
  "student4": "Sneha Patel"
};
// Data
var users = {
  "student1": "Arjun Sharma",
  "student2": "Priya Mehta",
  "student3": "Rahul Verma",
  "student4": "Sneha Patel"
};

var questions = [
  { q: "Which keyword is used to declare a block-scoped variable in JavaScript?", options: ["var", "let", "def", "dim"], answer: 1 },
  { q: "What is the output of: typeof null?", options: ["\"null\"", "\"undefined\"", "\"object\"", "\"boolean\""], answer: 2 },
  { q: "Which method is used to add an element at the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], answer: 0 },
  { q: "What does the === operator check in JavaScript?", options: ["Value only", "Type only", "Value and type (strict equality)", "Neither value nor type"], answer: 2 },
  { q: "Which of the following is NOT a JavaScript data type?", options: ["String", "Boolean", "Float", "Symbol"], answer: 2 },
  { q: "What is a closure in JavaScript?", options: ["A function that has access to its own scope only", "A function that has access to variables from its outer (enclosing) scope", "A method to close a browser window", "A way to end a loop"], answer: 1 },
  { q: "Which built-in method returns the calling string value converted to upper case?", options: ["toLowerCase()", "toUpperCase()", "charAt()", "concat()"], answer: 1 },
  { q: "What is the result of: 2 + \"3\" in JavaScript?", options: ["5", "\"23\"", "NaN", "Error"], answer: 1 },
  { q: "Which statement is used to exit a loop prematurely in JavaScript?", options: ["exit", "return", "break", "continue"], answer: 2 },
  { q: "What does JSON stand for?", options: ["JavaScript Object Notation", "Java Standard Object Notation", "JavaScript Oriented Network", "Java Script Open Node"], answer: 0 },
  { q: "Which method is used to parse a JSON string into a JavaScript object?", options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.decode()"], answer: 1 },
  { q: "What will: console.log(0.1 + 0.2 === 0.3) output?", options: ["true", "false", "undefined", "TypeError"], answer: 1 },
  { q: "Which array method creates a new array with all elements that pass a test?", options: ["map()", "forEach()", "filter()", "reduce()"], answer: 2 },
  { q: "What is \"hoisting\" in JavaScript?", options: ["Moving variable/function declarations to the top of their scope before code execution", "A way to import modules", "An event-handling technique", "A method for asynchronous operations"], answer: 0 },
  { q: "Which of the following creates a Promise in JavaScript?", options: ["new Promise(function(resolve, reject) {})", "Promise.create()", "async function Promise() {}", "Promise = new Object()"], answer: 0 }
];
