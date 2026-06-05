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

// Variables
var currentStudentId = "";
var currentStudentName = "";
var currentQuestionIndex = 0;
var score = 0;
var userAnswers = [];
var shuffledQuestions = [];

function togglePassword() {
  var passwordInput = document.getElementById("password");
  var btn = document.getElementById("show-hide-btn");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    btn.innerHTML = "Hide";
  } else {
    passwordInput.type = "password";
    btn.innerHTML = "Show";
  }
}

function login() {
  var usernameSelect = document.getElementById("username");
  var passwordInput = document.getElementById("password");
  var errorMsg = document.getElementById("error-message");

  var u = usernameSelect.value;
  var p = passwordInput.value;

  if (u === "" || p === "") {
    errorMsg.innerHTML = "Please enter both username and password!";
    errorMsg.style.display = "block";
    return;
  }

  // Very simple password check
  if (p === "pass1234") {
    errorMsg.style.display = "none";
    currentStudentId = u;
    currentStudentName = users[u];
    
    startQuiz();
  } else {
    errorMsg.innerHTML = "Wrong password!";
    errorMsg.style.display = "block";
  }
}

function shuffleArray(array) {
  // Simple random shuffle using basic loop
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function startQuiz() {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("quiz-section").style.display = "block";
  
  document.getElementById("student-name").innerHTML = currentStudentName;

  // Make a copy of questions and shuffle
  shuffledQuestions = [];
  for (var i = 0; i < questions.length; i++) {
    shuffledQuestions.push(questions[i]);
  }
  shuffleArray(shuffledQuestions);

  // Initialize variables
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];

  showQuestion();
}

function showQuestion() {
  var q = shuffledQuestions[currentQuestionIndex];
  document.getElementById("q-number").innerHTML = (currentQuestionIndex + 1);
  document.getElementById("question-text").innerHTML = q.q;

  var optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = ""; // clear old options

  for (var i = 0; i < q.options.length; i++) {
    var btn = document.createElement("button");
    btn.innerHTML = q.options[i];
    btn.className = "option-btn";
    btn.setAttribute("onclick", "selectAnswer(" + i + ", this)");
    optionsContainer.appendChild(btn);
  }

  document.getElementById("next-btn").disabled = true;
  if (currentQuestionIndex === shuffledQuestions.length - 1) {
    document.getElementById("next-btn").innerHTML = "Submit Quiz";
  } else {
    document.getElementById("next-btn").innerHTML = "Next";
  }
}

function selectAnswer(index, buttonElement) {
  userAnswers[currentQuestionIndex] = index;
  
  var options = document.getElementById("options-container").getElementsByTagName("button");
  for (var i = 0; i < options.length; i++) {
    options[i].className = "option-btn"; // reset all
    options[i].disabled = true; // disable all
  }
  
  buttonElement.className = "option-btn selected-option";
  document.getElementById("next-btn").disabled = false;
}

function nextQuestion() {
  if (currentQuestionIndex < shuffledQuestions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("quiz-section").style.display = "none";
  document.getElementById("results-section").style.display = "block";

  // Calculate score
  score = 0;
  for (var i = 0; i < shuffledQuestions.length; i++) {
    if (userAnswers[i] === shuffledQuestions[i].answer) {
      score++;
    }
  }

  document.getElementById("result-student").innerHTML = "Student: " + currentStudentName;
  document.getElementById("score-number").innerHTML = score;

  var passMessage = document.getElementById("pass-fail-message");
  if (score >= 9) {
    passMessage.innerHTML = "You Passed!";
    passMessage.style.color = "green";
  } else {
    passMessage.innerHTML = "You Failed! Keep trying.";
    passMessage.style.color = "red";
  }
}

function showReview() {
  var reviewContainer = document.getElementById("review-container");
  var reviewList = document.getElementById("review-list");
  
  if (reviewContainer.style.display === "block") {
    reviewContainer.style.display = "none";
    return;
  }
  
  reviewContainer.style.display = "block";
  reviewList.innerHTML = "";

  for (var i = 0; i < shuffledQuestions.length; i++) {
    var q = shuffledQuestions[i];
    var userAnswerIndex = userAnswers[i];
    var correctAnswerIndex = q.answer;
    
    var item = document.createElement("div");
    item.className = "review-item";
    
    var questionHtml = "<b>Question " + (i + 1) + ":</b> " + q.q + "<br>";
    
    if (userAnswerIndex === correctAnswerIndex) {
      questionHtml += "<span class='correct-text'>Correct! Your answer: " + q.options[userAnswerIndex] + "</span><br>";
    } else {
      questionHtml += "<span class='wrong-text'>Wrong! Your answer: " + q.options[userAnswerIndex] + "</span><br>";
      questionHtml += "<span class='correct-text'>Correct answer is: " + q.options[correctAnswerIndex] + "</span><br>";
    }
    
    item.innerHTML = questionHtml;
    reviewList.appendChild(item);
  }
}

function logout() {
  document.getElementById("results-section").style.display = "none";
  document.getElementById("login-section").style.display = "block";
  
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("password").type = "password";
  document.getElementById("show-hide-btn").innerHTML = "Show";
  document.getElementById("error-message").style.display = "none";
  document.getElementById("review-container").style.display = "none";
}
