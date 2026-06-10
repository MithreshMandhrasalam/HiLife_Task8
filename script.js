var defaultUsers = {
  "Arjun": "pass1234",
  "Vijay": "pass1234",
  "Mithu": "pass1234",
  "Karthik": "pass1234"
};
var users = JSON.parse(localStorage.getItem("quizUsers"));
if (!users) {
  users = defaultUsers;
}
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
var currentStudentId = "", currentStudentName = "", currentQuestionIndex = 0, score = 0, userAnswers = [], shuffledQuestions = [];

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

function showSignUp() {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("signup-section").style.display = "block";
  document.getElementById("error-message").style.display = "none";
}

function showLogin() {
  document.getElementById("signup-section").style.display = "none";
  document.getElementById("login-section").style.display = "block";
  document.getElementById("signup-error").style.display = "none";
}

function signUp() {
  var newU = document.getElementById("new-username").value;
  var newP = document.getElementById("new-password").value;
  var err = document.getElementById("signup-error");
  if (newU === "" || newP === "") {
    err.innerHTML = "Please fill in both fields!";
    err.style.display = "block";
    return;
  }
  if (users[newU]) {
    err.innerHTML = "Username already exists!";
    err.style.display = "block";
    return;
  }
  users[newU] = newP;
  localStorage.setItem("quizUsers", JSON.stringify(users));
  document.getElementById("new-username").value = "";
  document.getElementById("new-password").value = "";
  err.style.display = "none";
  showLogin();
  alert("Account created successfully! Please login.");
}

function login() {
  var u = document.getElementById("username").value;
  var p = document.getElementById("password").value;
  var errorMsg = document.getElementById("error-message");
  if (u === "" || p === "") {
    errorMsg.innerHTML = "Please enter both username and password!";
    errorMsg.style.display = "block";
    return;
  }
  if (users[u] === p) {
    errorMsg.style.display = "none";
    currentStudentId = u;
    currentStudentName = u;
    startQuiz();
  } else {
    errorMsg.innerHTML = "Wrong username or password!";
    errorMsg.style.display = "block";
  }
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function saveSession(isCompleted) {
  var session = {
    shuffledQuestions: shuffledQuestions,
    currentQuestionIndex: currentQuestionIndex,
    userAnswers: userAnswers,
    isCompleted: isCompleted || false
  };
  localStorage.setItem("quizSession_" + currentStudentId, JSON.stringify(session));
}

function startQuiz() {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("quiz-section").style.display = "block";
  document.getElementById("student-name").innerHTML = currentStudentName;

  var savedSession = localStorage.getItem("quizSession_" + currentStudentId);
  var sessionLoaded = false;
  
  if (savedSession) {
    try {
      var session = JSON.parse(savedSession);
      if (session && session.shuffledQuestions && session.shuffledQuestions.length > 0) {
        shuffledQuestions = session.shuffledQuestions;
        currentQuestionIndex = session.currentQuestionIndex || 0;
        userAnswers = session.userAnswers || [];
        sessionLoaded = true;
        
        if (session.isCompleted) {
          showResults();
          return;
        }
      }
    } catch (e) {
      console.error("Failed to parse session", e);
    }
  } 
  
  if (!sessionLoaded) {
    shuffledQuestions = [];
    for (var i = 0; i < questions.length; i++) {
      shuffledQuestions.push(questions[i]);
    }
    shuffleArray(shuffledQuestions);
    currentQuestionIndex = 0;
    userAnswers = [];
    saveSession(false);
  }
  
  score = 0;
  showQuestion();
}

function showQuestion() {
  var q = shuffledQuestions[currentQuestionIndex];
  document.getElementById("q-number").innerHTML = (currentQuestionIndex + 1);
  document.getElementById("question-text").innerHTML = q.q;
  var optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";
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

  if (userAnswers[currentQuestionIndex] !== undefined && userAnswers[currentQuestionIndex] !== null) {
    var selectedIdx = userAnswers[currentQuestionIndex];
    var options = optionsContainer.getElementsByTagName("button");
    for (var i = 0; i < options.length; i++) {
      options[i].className = "option-btn";
      options[i].disabled = true;
    }
    if (options[selectedIdx]) {
      options[selectedIdx].className = "option-btn selected-option";
    }
    document.getElementById("next-btn").disabled = false;
  }
}

function selectAnswer(index, buttonElement) {
  userAnswers[currentQuestionIndex] = index;
  var options = document.getElementById("options-container").getElementsByTagName("button");
  for (var i = 0; i < options.length; i++) {
    options[i].className = "option-btn";
    options[i].disabled = true;
  }
  buttonElement.className = "option-btn selected-option";
  document.getElementById("next-btn").disabled = false;
  saveSession(false);
}

function nextQuestion() {
  if (currentQuestionIndex < shuffledQuestions.length - 1) {
    currentQuestionIndex++;
    saveSession(false);
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("quiz-section").style.display = "none";
  document.getElementById("results-section").style.display = "block";
  score = 0;
  var summaryDiv = document.getElementById("options-summary");
  summaryDiv.innerHTML = "";
  for (var i = 0; i < shuffledQuestions.length; i++) {
    if (userAnswers[i] === shuffledQuestions[i].answer) score++;
    var p = document.createElement("p");
    p.style.textAlign = "left";
    p.style.borderBottom = "1px solid #ccc";
    p.style.paddingBottom = "5px";
    p.innerHTML = "Q" + (i+1) + "<br>Selected Option: " + shuffledQuestions[i].options[userAnswers[i]] + "<br>Correct Option: " + shuffledQuestions[i].options[shuffledQuestions[i].answer];
    summaryDiv.appendChild(p);
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
  saveSession(true);
}

function logout() {
  localStorage.removeItem("quizSession_" + currentStudentId);
  document.getElementById("results-section").style.display = "none";
  document.getElementById("login-section").style.display = "block";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("password").type = "password";
  document.getElementById("show-hide-btn").innerHTML = "Show";
  document.getElementById("error-message").style.display = "none";
  document.getElementById("options-summary").innerHTML = "";
}
