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
  var startBtn = document.getElementById('start-btn');
  window.timerActive = false;

  var timerNode = document.getElementById("timer");

  startBtn.addEventListener('click', proceed);

  function proceed(event) {
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
  }

  function startTimer() {
    if (!window.timerActive) return
    timerNode.style.display = 'block';
    var time = timerNode.innerHTML;
    if (time == '00:00') {
      window.timerActive = false;
      var sorryMsg =
       '<div style="width: 50%; margin: auto; text-align: center;">' +
          '<p style=margin: 25px;>' +
            'Whoops, you\'ve ran out of time!' +
          '</p>' +
        '</div>';

      var h2 = document.createElement('h2');
      h2.innerHTML = sorryMsg;
      mainContent.innerHTML = '';
      mainContent.appendChild(h2);
      timerNode.style.display = 'none';
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
    var initialHTML = `
      <div class="row" id="question">
        <div class="col-1">
          <h1 id="question-title">Q1</h1>
        </div>
        <div class="col-10" id="question-text">
          <h3>Who is the current Mayor of London (and a University of Law graduate)?</h3>
          <div id="question-3-image">
            <img src="assets/images/question_3.png"></img>
          </div>
        </div>
      </div>
      <form id="answers-form">
        <div class="row" id="answers">
          <div class="col-md-8 offset-md-1">
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
      if (!answersForm.elements['answer'].value == '') {
        recordAnswer(answersForm.elements['answer'].value);
        changeQuestion();
      } else {
        return;
      }
    });
    window.timerActive = true;
    startTimer();

    function changeQuestion() {
      var currentAnswers = possibleAnswers[currentQuestionIndex];
      var questionNumber = currentQuestionIndex + 1;
      questionTitle.innerHTML = 'Q' + questionNumber;
      questionText.innerHTML = questions[currentQuestionIndex];
      if (questionNumber == 3) {
        document.getElementById('question-3-image').style.display = 'block';
      } else {
        document.getElementById('question-3-image').style.display = 'none';
      }
      document.querySelector('body').style.backgroundImage = 'url("assets/images/background_' + questionNumber + '.jpg")'
      if (questions.length == currentQuestionIndex) finishQuestionnaire();

      for (i = 0; i < 4; i++) {
        var currentAnswer = answerNodes[i];
        currentAnswer.checked = false;
        currentAnswer.labels[0].childNodes[1].innerHTML = currentAnswers[i]
      }
      resetTimer();
    }

    function recordAnswer(answer) {
      usersAnswers.push(answer);
      currentQuestionIndex += 1;
    }

    function finishQuestionnaire() {
      var h2 = document.createElement('h2');
      h2.innerHTML =
        '<div style="width: 50%; margin: auto; text-align: center;">' +
          'Thank you!<br>' +
          'Your 4-digit code is:<br>' +
          '<p style=margin: 25px;>' +
          usersAnswers.join(' ') +
          '</p>' +
        '</div>';
      mainContent.innerHTML = '';
      mainContent.appendChild(h2);
      timerNode.style.display = 'none';
      window.timerActive = false;
    }
  }
}
