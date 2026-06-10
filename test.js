const fs = require('fs');

// Mock localStorage
let storage = {};
global.localStorage = {
  getItem: key => storage[key] || null,
  setItem: (key, val) => { storage[key] = String(val); },
  removeItem: key => { delete storage[key]; }
};

// Mock DOM
global.document = {
  getElementById: id => {
    if (!global.elements) global.elements = {};
    if (!global.elements[id]) {
      global.elements[id] = {
        style: {},
        innerHTML: "",
        value: "",
        type: "text",
        getElementsByTagName: () => {
          return [
            { className: "", setAttribute: () => {}, disabled: false },
            { className: "", setAttribute: () => {}, disabled: false },
            { className: "", setAttribute: () => {}, disabled: false },
            { className: "", setAttribute: () => {}, disabled: false }
          ];
        },
        appendChild: () => {}
      };
    }
    return global.elements[id];
  },
  createElement: tag => {
    return { className: "", setAttribute: () => {}, style: {} };
  }
};

const script = fs.readFileSync('script.js', 'utf-8');
eval(script);

document.getElementById("username").value = "Arjun";
document.getElementById("password").value = "pass1234";

console.log("--- Initial Login ---");
login();
console.log("currentQuestionIndex:", currentQuestionIndex);

console.log("\n--- Answer Q1 ---");
selectAnswer(2, document.createElement("button"));
console.log("userAnswers:", userAnswers);

console.log("\n--- Next Question ---");
nextQuestion();
console.log("currentQuestionIndex:", currentQuestionIndex);

console.log("\n--- Simulating Refresh ---");
// Simulate refresh by clearing memory but keeping localStorage (storage variable)
eval(script); // Re-evaluate to reset globals
document.getElementById("username").value = "Arjun";
document.getElementById("password").value = "pass1234";

login();
console.log("After refresh login:");
console.log("currentQuestionIndex:", currentQuestionIndex);
console.log("userAnswers:", userAnswers);

