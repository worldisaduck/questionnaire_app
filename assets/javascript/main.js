var questions = [
  'Who is the current Mayor of London (and a University of Law graduate)?',
  'Take the number 30, divide it by 1/2, and then add 10. What do you get?',
  'How many Y\'s are there in this picture?',
  'Magistrates are legally able to use \'reasonable force\' to turn back an alien invasion of the UK as long as the aliens:',
];

var possibleAnswers = [
  ['Boris Jhonson', 'Sadiq Khan', 'Zac Goldsmith', 'Alan Sugar'],
  ['15', '25', '40', '70'],
  ['3', '4', '5', '6'],
  ['Don\'t have a licence to invade', 'Have\'t received a royal summons', 'Are radioactive', 'Refuse to comply with the Highway Code'],
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
  var timerNode = document.getElementById("timer");
  window.timerActive = false;
  renderInitialPage();

  function startTimer() {
    if (!window.timerActive) return
    timerNode.style.display = 'block';
    var time = timerNode.innerHTML;
    if (time == '00:00') {
      window.timerActive = false;
      var timeRanOutMsg =
       '<div style="width: 50%; margin: auto; text-align: center;">' +
          '<p style=margin: 25px;>' +
            'Whoops, you\'ve ran out of time!' +
          '</p>' +
          '<div data-page="initial" class="purple-btn" id="reset-btn">(Back to start)</div>' +
        '</div>';

      var h2 = document.createElement('h2');
      h2.innerHTML = timeRanOutMsg;
      mainContent.innerHTML = '';
      mainContent.appendChild(h2);
      timerNode.style.display = 'none';
      var resetBtn = document.getElementById('reset-btn');
      resetBtn.addEventListener('click', renderInitialPage);
    } else {
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
    }
    setTimeout(startTimer, 1000);
  }

  function resetTimer() {
    window.timerActive = false;
    document.getElementById('timer').innerHTML = '00:15';
    window.timerActive = true;
  }

  function startQuestionnaire() {
    var currentQuestionIndex = 0;
    var currentQuestionNumber = 1
    renderQuestion(currentQuestionNumber, questions[currentQuestionIndex], possibleAnswers[currentQuestionIndex]);

    window.timerActive = true;
    startTimer();

    function changeQuestion() {
      currentQuestionIndex += 1
      currentQuestionNumber += 1;

      document.querySelector('body').style.backgroundImage = 'url("assets/images/background_' + currentQuestionNumber + '.jpg")'
      if (questions.length == currentQuestionIndex) finishQuestionnaire();

      renderQuestion(
        currentQuestionNumber,
        questions[currentQuestionIndex],
        possibleAnswers[currentQuestionIndex]
      );

      resetTimer();
    }

    function recordAnswer(answer) {
      usersAnswers.push(answer);
    }

    function finishQuestionnaire() {
      var h2 = document.createElement('h2');
      h2.innerHTML =
        '<div style="width: 50%; margin: auto; text-align: center;">' +
          'Your 4-digit code is:<br>' +
          '<p style=margin: 25px;>' +
          usersAnswers.join(' ') +
          '</p>' +
          '<div data-page="initial" class="purple-btn" id="reset-btn">(Back to start)</div>' +
        '</div>';
      mainContent.innerHTML = '';
      mainContent.appendChild(h2);
      timerNode.style.display = 'none';
      window.timerActive = false;
      var resetBtn = document.getElementById('reset-btn');
      resetBtn.addEventListener('click', renderInitialPage);
    }

    function renderQuestion(questionNum, questionText, answers) {
      mainContent.innerHTML = `<div class="row" id="question">
        <div class="col-1">
          <h1 id="question-title">Q` + questionNum + `</h1>
        </div>
        <div class="col-10" id="question-text">
          <h3>` + questionText + `</h3>
          <div id="question-3-image" style="display: ` + (questionNum == 3 ? `block;` : `none;`) + `"">
            <img src="assets/images/question_3.png"></img>
          </div>
        </div>
      </div>
      <form id="answers-form">
        <div class="row" id="answers">
          <div class="col-md-8 offset-md-1">
            <div class="answer">
              <input type="radio" name="answer" id="answer1" value="1">
                <label for="answer1">1. <span>` + answers[0] + `</span></label>
            </div>

            <div class="answer">
                <input type="radio" name="answer" id="answer2" value="2">
                <label for="answer2">2. <span>` + answers[1] + `</span></label>
              </div>

              <div class="answer">
                <input type="radio" name="answer" id="answer3" value="3">
                <label for="answer3">3. <span>` + answers[2] +  `</span></label>
            </div>

            <div class="answer">
                <input type="radio" name="answer" id="answer4" value="4">
                <label for="answer4">4. <span>` + answers[3] + `</span></label>
              </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 offset-md-9">
            <input type="submit" id="next-question-btn" value="next question">
          </div>
        </div>
      </form>`;

      var answersForm = document.getElementById('answers-form');

      answersForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var currentAnswer = answersForm.elements['answer'].value;
        if (!currentAnswer == '') {
          recordAnswer(currentAnswer);
          changeQuestion();
        } else {
          return;
        }
      });
    }
  }

  function renderInitialPage() {
    resetTimer();
    usersAnswers = [];
    mainContent.innerHTML =
    `<div class="row justify-content-start" id="info-text" style="width: 90%; margin: 0px auto 0px auto;">
        <div class="col-12" style="margin-top: 100px;">
          <p class="changing-text">
            4 questions.<br>
            4 digits.<br>
            Can you open the safe?
          </p>
        </div>
      </div>
      <div data-page="initial" class="purple-btn" id="start-btn">(touch screen to continue)</div>`;

    var startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', function() {
      event.preventDefault();
      var page = this.getAttribute('data-page');
      if (page == 'initial') {
        document.querySelector('p.changing-text').innerHTML = `You'll be asked 4 multiple-choice questions, and you have <b>15</b> seconds to answer each.
          Each option you chose corresponds to a digit on the safe's padlock. Get all 4 answers
          correct and unlock the safe! Simple.`
        this.setAttribute('data-page', 'secondary');
        this.innerText = '(touch screen to start)';
      } else if (page == 'secondary') {
        startQuestionnaire();
      }
    });
  }
}
