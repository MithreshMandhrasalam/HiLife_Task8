const fs = require('fs');
let storage = {};
global.localStorage = {
  getItem: key => storage[key] || null,
  setItem: (key, val) => { storage[key] = String(val); },
  removeItem: key => { delete storage[key]; }
};

global.document = {
  getElementById: id => {
    if (!global.elements) global.elements = {};
    if (!global.elements[id]) {
      global.elements[id] = {
        style: {},
        innerHTML: "",
        value: "",
        type: "text",
        getElementsByTagName: () => [
          { className: "", setAttribute: () => {}, disabled: false },
          { className: "", setAttribute: () => {}, disabled: false },
          { className: "", setAttribute: () => {}, disabled: false },
          { className: "", setAttribute: () => {}, disabled: false }
        ],
        appendChild: () => {}
      };
    }
    return global.elements[id];
  },
  createElement: tag => ({ className: "", setAttribute: () => {}, style: {} })
};
global.alert = console.log;
global.console.error = console.log;

const script = fs.readFileSync('script.js', 'utf-8');
eval(script);

document.getElementById("username").value = "Arjun";
document.getElementById("password").value = "pass1234";
login();

// Answer all questions
for (let i = 0; i < 15; i++) {
  selectAnswer(0, document.createElement("button"));
  if (i < 14) nextQuestion();
}
// Last question -> Next button should say "Submit Quiz" and call showResults in nextQuestion
nextQuestion();

console.log("storage after completion:", storage["quizSession_Arjun"]);

// Refresh simulation
eval(script);
document.getElementById("username").value = "Arjun";
document.getElementById("password").value = "pass1234";
login();

console.log("Is results section block?", document.getElementById("results-section").style.display === "block");
