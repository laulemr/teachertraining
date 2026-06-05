const startBtn = document.getElementById('startBtn');
const gameSection = document.getElementById('gameSection');
const studentCounter = document.getElementById('studentCounter');
const phaseLabel = document.getElementById('phaseLabel');

const studentCard = document.getElementById('studentCard');
const studentName = document.getElementById('studentName');
const studentRole = document.getElementById('studentRole');
const studentDescription = document.getElementById('studentDescription');
const studentObservations = document.getElementById('studentObservations');

const questionSection = document.getElementById('questionSection');
const questionChoices = document.getElementById('questionChoices');

const moveSection = document.getElementById('moveSection');
const movePrompt = document.getElementById('movePrompt');
const moveChoices = document.getElementById('moveChoices');

const feedbackSection = document.getElementById('feedbackSection');
const feedbackSummary = document.getElementById('feedbackSummary');
const feedbackDetails = document.getElementById('feedbackDetails');
const nextStudentBtn = document.getElementById('nextStudentBtn');

const finalSection = document.getElementById('finalSection');
const finalSummary = document.getElementById('finalSummary');
const finalHighlights = document.getElementById('finalHighlights');
const restartBtn = document.getElementById('restartBtn');

let currentStudentIndex = 0;
let selectedData = [];

const students = [
  {
    name: "Alex",
    role: "Anxious first-day student",
    description:
      "Alex hovers just outside the classroom door, backpack clutched tight, eyes on the floor while other students stream past.",
    observations: [
      "Checks the room but doesn’t step in.",
      "Keeps one hand on the door frame.",
      "No previous notes in the system."
    ],
    questions: [
      {
        label: "Step into the hallway, greet them softly by name, and say you're glad they're here.",
        effect: "warm",
        feedback: "You reduce pressure by meeting Alex where they are and using a calm, private greeting."
      },
      {
        label: "Call out from the front: “If you’re in this class, come on in!”",
        effect: "public",
        feedback: "You gave clear directions, but public attention can spike anxiety for hesitant students."
      },
      {
        label: "Turn back to your slides to keep class moving and hope they come in.",
        effect: "ignore",
        feedback: "You preserved your plan, but Alex is still on the edge of the community."
      }
    ],
    movesPrompt: "Alex has stepped partway into the room and is hovering near the back. What’s your first-day move?",
    moves: [
      {
        label: "Offer a specific seat near a supportive peer and normalize feeling nervous.",
        feedbackSummary: "You pair structure with reassurance.",
        feedbackPoints: [
          "Clear seating removes decision fatigue.",
          "Normalizing nerves makes the room feel safer.",
          "Pairing with a supportive peer can anchor Alex socially."
        ]
      },
      {
        label: "Let Alex pick any open seat and move on.",
        feedbackSummary: "You give autonomy but little guidance.",
        feedbackPoints: [
          "Some students like choice, but anxious students may default to hiding.",
          "A brief check-in can turn a random seat into a safer one.",
          "First-day moments like this set long-term patterns."
        ]
      },
      {
        label: "Tell Alex to sit wherever but remind the class that participation is expected.",
        feedbackSummary: "You emphasize expectations over connection.",
        feedbackPoints: [
          "Expectations matter, but timing and tone are key.",
          "For anxious students, connection first often unlocks participation later.",
          "A private reminder usually lands better than a public one."
        ]
      }
    ]
  },
  {
    name: "Jordan",
    role: "High-energy talker",
    description:
      "Jordan has already made three jokes during your intro. The class laughs; your pacing is slipping.",
    observations: [
      "Sits near the center with friends.",
      "Responds quickly to anything you say.",
      "No behavior referrals last year, but several comments about 'off-task chatting'."
    ],
    questions: [
      {
        label: "Slide closer to that group while continuing and make brief eye contact.",
        effect: "proximity",
        feedback: "You use nonverbal cues to redirect without calling them out."
      },
      {
        label: "Pause and say, “Jordan, I need you listening right now.” in front of the class.",
        effect: "public-correct",
        feedback: "You reset expectations clearly, but risk embarrassment and power struggles."
      },
      {
        label: "Ignore it for now so you can finish your intro.",
        effect: "delay",
        feedback: "You keep your flow but signal that interruptions might be tolerated."
      }
    ],
    movesPrompt: "You’ve got the room’s attention back. What’s your move with Jordan?",
    moves: [
      {
        label: "Give Jordan a positive leadership role for later (timekeeper, discussion helper) and name the behavior you need now.",
        feedbackSummary: "You separate the student from the behavior.",
        feedbackPoints: [
          "You preserve Jordan’s status while tightening boundaries.",
          "Framing leadership channels energy into something useful.",
          "Naming what’s going well plus what needs to change builds buy-in."
        ]
      },
      {
        label: "Document the behavior mentally and plan to move their seat next class, without mentioning it now.",
        feedbackSummary: "You plan ahead but miss a teachable moment.",
        feedbackPoints: [
          "Changing seats can help but won’t teach expectations by itself.",
          "A quick reset in the moment gives clearer signals.",
          "Students read what you ignore as allowable."
        ]
      },
      {
        label: "Tell Jordan privately after class that jokes are not acceptable in your room.",
        feedbackSummary: "You address it privately but miss the chance to frame ‘how’ enthusiasm fits.",
        feedbackPoints: [
          "Private conversations are good, but defining when humor is welcome matters.",
          "High-energy students can become key contributors when given clear lanes.",
          "First day is a chance to show that fun and focus can coexist."
        ]
      }
    ]
  },
  {
    name: "Sam",
    role: "Reluctant icebreaker participant",
    description:
      "You launch a low-stakes ‘Find someone who…’ mingle. Sam stays seated, arms crossed, eyes fixed on their desk.",
    observations: [
      "Desk is near the wall, slightly away from others.",
      "No eye contact when you gave directions.",
      "Last year’s notes mention frequent absences and a 504 plan."
    ],
    questions: [
      {
        label: "Walk over and quietly ask, “Do you want a different way to do this or some extra time to watch first?”",
        effect: "accommodate",
        feedback: "You offer choice and recognize that participation can look different."
      },
      {
        label: "From the front, say, “Sam, remember everyone participates in this class.”",
        effect: "public-pressure",
        feedback: "You reinforce expectations but risk shaming someone whose refusal may have deeper roots."
      },
      {
        label: "Continue circulating and hope they join once they see others moving.",
        effect: "observe",
        feedback: "You keep scanning, but Sam may feel invisible or stuck."
      }
    ],
    movesPrompt: "Sam still isn’t up, but listens as you speak. How do you adjust?",
    moves: [
      {
        label: "Offer an alternative: Sam can jot answers individually or interview just one peer at their desk.",
        feedbackSummary: "You blend inclusion with flexibility.",
        feedbackPoints: [
          "Alternative formats keep the purpose but remove barriers.",
          "You show that ‘belonging’ isn’t one-size-fits-all.",
          "Students with anxiety or access needs often engage more when choice is normalized."
        ]
      },
      {
        label: "Tell Sam you’ll check back in next time and move on.",
        feedbackSummary: "You avoid pressure but delay support.",
        feedbackPoints: [
          "Deferring can communicate patience, but also that withdrawal is unnoticed.",
          "First-day patterns harden quickly.",
          "A brief plan (What will we try next time?) can turn delay into intention."
        ]
      },
      {
        label: "Ask a nearby student to ‘help get Sam moving’ and pull them into the activity.",
        feedbackSummary: "You enlist peers but risk unwanted attention.",
        feedbackPoints: [
          "Peer help is powerful when the student consents.",
          "Without consent, it can feel like ganging up.",
          "Private check-ins help you gauge what support is welcome."
        ]
      }
    ]
  }
];

function updateStatus(phase) {
  studentCounter.textContent = `Student ${currentStudentIndex + 1} of ${students.length}`;
  phaseLabel.textContent = phase;
}

function renderStudent() {
  const s = students[currentStudentIndex];

  updateStatus("Reading the room");

  studentName.textContent = s.name;
  studentRole.textContent = s.role;
  studentDescription.textContent = s.description;
  studentObservations.innerHTML = "";
  s.observations.forEach(obs => {
    const li = document.createElement('li');
    li.textContent = obs;
    studentObservations.appendChild(li);
  });

  studentCard.classList.remove('hidden');
  renderQuestions();
}

function renderQuestions() {
  const s = students[currentStudentIndex];

  updateStatus("Ask good questions");
  questionSection.classList.remove('hidden');
  questionChoices.innerHTML = "";

  s.questions.forEach((q, index) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = q.label;
    btn.addEventListener('click', () => handleQuestionChoice(index));
    questionChoices.appendChild(btn);
  });
}

function handleQuestionChoice(index) {
  const s = students[currentStudentIndex];
  const question = s.questions[index];

  [...questionChoices.children].forEach(btn => btn.classList.remove('selected'));
  questionChoices.children[index].classList.add('selected');

  renderMoves(question);
}

function renderMoves(selectedQuestion) {
  const s = students[currentStudentIndex];

  updateStatus("Choose your move");
  moveSection.classList.remove('hidden');
  movePrompt.textContent = s.movesPrompt;
  moveChoices.innerHTML = "";

  s.moves.forEach((m, index) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = m.label;
    btn.addEventListener('click', () => handleMoveChoice(selectedQuestion, m, index));
    moveChoices.appendChild(btn);
  });
}

function handleMoveChoice(question, move, index) {
  [...moveChoices.children].forEach(btn => btn.classList.remove('selected'));
  moveChoices.children[index].classList.add('selected');

  showFeedback(question, move);
}

function showFeedback(question, move) {
  updateStatus("Debrief");

  feedbackSection.classList.remove('hidden');
  feedbackSummary.textContent = move.feedbackSummary;

  feedbackDetails.innerHTML = "";
  const qItem = document.createElement('li');
  qItem.textContent = `Your question: ${question.feedback}`;
  feedbackDetails.appendChild(qItem);

  move.feedbackPoints.forEach(p => {
    const li = document.createElement('li');
    li.textContent = p;
    feedbackDetails.appendChild(li);
  });

  selectedData.push({
    student: students[currentStudentIndex].name,
    questionEffect: question.effect,
    moveSummary: move.feedbackSummary
  });
}

function showFinal() {
  gameSection.classList.add('hidden');
  finalSection.classList.remove('hidden');

  finalSummary.textContent = "You just navigated three very different first-day moments. These patterns tend to matter more than any single perfect line.";

  finalHighlights.innerHTML = "";
  selectedData.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.student}: ${item.moveSummary}`;
    finalHighlights.appendChild(li);
  });
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  gameSection.classList.remove('hidden');
  currentStudentIndex = 0;
  selectedData = [];
  renderStudent();
});

nextStudentBtn.addEventListener('click', () => {
  currentStudentIndex++;
  feedbackSection.classList.add('hidden');
  moveSection.classList.add('hidden');
  questionSection.classList.add('hidden');
  studentCard.classList.add('hidden');

  if (currentStudentIndex < students.length) {
    renderStudent();
  } else {
    showFinal();
  }
});

restartBtn.addEventListener('click', () => {
  finalSection.classList.add('hidden');
  startBtn.disabled = false;
  selectedData = [];
  currentStudentIndex = 0;
});
