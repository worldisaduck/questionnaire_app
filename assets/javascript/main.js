var questions = [
  'Very very very very very long uestion number two?',
  'Very very very very very long question number three?',
  'Very very very very very long question number four?',
  'Very very very very very long question number five?'
];

var possibleAnswers = [
  ['Answer 1 One', 'Answer 1 Two', 'Answer 1 Three', 'Answer 1 Four'],
  ['Answer 2 One', 'Answer 2 Two', 'Answer 2 Three', 'Answer 2 Four'],
  ['Answer 3 One', 'Answer 3 Two', 'Answer 3 Three', 'Answer 3 Four'],
  ['Answer 3 One', 'Answer 3 Two', 'Answer 3 Three', 'Answer 3 Four']
];
var usersAnswers = []

var img1 = new Image();
var img2 = new Image();
var img3 = new Image();
var img4 = new Image();
var img5 = new Image();

img1.src = "assets/images/background_1.jpg";
img2.src = "assets/images/background_2.jpg";
img3.src = "assets/images/background_3.jpg";
img4.src = "assets/images/background_4.jpg";
img5.src = "assets/images/background_5.jpg";

window.onload = function() {
  var mainContent = document.getElementById('body-content');
  var startBtn = document.getElementById('start-btn');

  startBtn.addEventListener('click', startQuestionnaire);

  function startTimer() {
    var timerNode = document.getElementById("timer");
    timerNode.style.display = 'block';
    var time = timerNode.innerHTML;
    var arr = time.split(":");
    var m = parseInt(arr[0]);
    var s = parseInt(arr[1]);
    if (s == 0) {
      m -= 1;
      s = 60;
      if (m == 0) m = 4;
    } else {
      s -= 1;
    }

    m = JSON.stringify(m);
    s = JSON.stringify(s);

    if (m.length == 1) m = 0 + m;
    if (s.length == 1) s = 0 + s;

    document.getElementById("timer").innerHTML = m + ":" + s;
    setTimeout(startTimer, 1000);
  }

  function startQuestionnaire() {
    var initialHTML = `
      <div class="row" id="question">
        <div class="col-1">
          <h1 id="question-title">Q1</h1>
        </div>
        <div class="col-6" id="question-text">
          <h3>Who is the current Mayor of London (and a University of Law graduate)?</h3>
        </div>
      </div>
      <form id="answers-form">
        <div class="row" id="answers">
          <div class="col-md-5 offset-md-1">
            <div class="answer">
              <input type="radio" name="answer" id="answer1" value="1">
                <label for="answer1">1. <span>Boris Jhonson</span></label>
            </div>

            <div class="answer">
                <input type="radio" name="answer" id="answer2" value="2">
                <label for="answer2">2. <span>Sadiq Khan</span></label>
              </div>

              <div class="answer">
                <input type="radio" name="answer" id="answer3" value="3">
                <label for="answer3">3. <span>Zac Goldsmith</span></label>
            </div>

            <div class="answer">
                <input type="radio" name="answer" id="answer4" value="4">
                <label for="answer4">4. <span>Alan Sugar</span></label>
              </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 offset-md-9">
            <input type="submit" id="next-question-btn" value="next question">
          </div>
        </div>
      </form>
    `;
    mainContent.innerHTML = initialHTML;
    var questionTitle = document.getElementById('question-title');
    var questionText = document.getElementById('question-text').childNodes[1];
    var currentQuestionIndex = 0;

    var answersForm = document.getElementById('answers-form');
    var answerNodes = document.querySelectorAll('input[name="answer"]');
  
    answersForm.addEventListener('submit', function(event) {
      event.preventDefault();
      recordAnswer(answersForm.elements['answer'].value);
      changeQuestion();
    });
    startTimer();

    function changeQuestion() {
      var currentAnswers = possibleAnswers[currentQuestionIndex];
      var questionNumber = currentQuestionIndex + 1;
      questionTitle.innerHTML = 'Q' + questionNumber;
      questionText.innerHTML = questions[currentQuestionIndex];
      document.querySelector('body').style.backgroundImage = 'url("assets/images/background_' + questionNumber + '.jpg")'

      for (i = 0; i < 4; i++) {
        var currentAnswer = answerNodes[i];
        currentAnswer.checked = false;
        currentAnswer.labels[0].childNodes[1].innerHTML = currentAnswers[i]
      }
    }

    function recordAnswer(answer) {
      usersAnswers.push(answer);
      currentQuestionIndex += 1;
    }
  }
}

