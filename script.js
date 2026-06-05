const startBtn = document.getElementById('startBtn');
const scenarioSection = document.getElementById('scenarioSection');
const scenarioText = document.getElementById('scenarioText');
const choicesContainer = document.getElementById('choicesContainer');
const nextBtn = document.getElementById('nextBtn');
const resultsSection = document.getElementById('resultsSection');
const resultsText = document.getElementById('resultsText');
const restartBtn = document.getElementById('restartBtn');

let currentScenarioIndex = 0;
let currentStepIndex = 0;
let selectedFeedback = [];

// You can add more scenarios to this array
const scenarios = [
  {
    title: "The anxious student at the door",
    steps: [
      {
        text: `
It’s five minutes before the bell. Students are trickling in. 
You’re at the door greeting them by name from your roster. 
A student hovers just outside, backpack clutched tight, avoiding eye contact.

What do you do first?`,
        choices: [
          {
            label: "Greet them warmly by name and invite them in.",
            feedback: "Greeting by name at the door and offering a low-pressure invitation supports belonging and lowers anxiety."
          },
          {
            label: "Turn back to the class and start your intro.",
            feedback: "You kept the flow, but the student stayed on the margin. A brief personal check-in can make a big difference on day one."
          },
          {
            label: "Call out: “If you’re in this class, come in and find a seat anywhere.”",
            feedback: "Publicly calling out can increase anxiety. When possible, use quiet 1:1 language for hesitant students."
          }
        ]
      }
    ],
    debrief: `
Key moves on the first day: greet at the door, use names, and give simple choices (where to sit, how to participate) so anxious students can ease into the room.
`
  }
];

function showStep() {
  const scenario = scenarios[currentScenarioIndex];
  const step = scenario.steps[currentStepIndex];

  scenarioText.textContent = step.text.trim();
  choicesContainer.innerHTML = '';
  nextBtn.classList.add('hidden');

  step.choices.forEach((choice, index) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice.label;
    btn.addEventListener('click', () => handleChoice(index));
    choicesContainer.appendChild(btn);
  });
}

function handleChoice(choiceIndex) {
  const scenario = scenarios[currentScenarioIndex];
  const step = scenario.steps[currentStepIndex];
  const choice = step.choices[choiceIndex];

  selectedFeedback.push(choice.feedback);

  choicesContainer.innerHTML = `
    <p><strong>Your move:</strong> ${choice.label}</p>
    <p><strong>Why it matters:</strong> ${choice.feedback}</p>
  `;

  if (currentStepIndex < scenario.steps.length - 1) {
    nextBtn.classList.remove('hidden');
  } else {
    nextBtn.textContent = "See debrief";
    nextBtn.classList.remove('hidden');
  }
}

function showResults() {
  const scenario = scenarios[currentScenarioIndex];
  const feedbackList = selectedFeedback.map(f => `<li>${f}</li>`).join('');
  resultsText.innerHTML = `
    <p><strong>Scenario:</strong> ${scenario.title}</p>
    <p>${scenario.debrief.trim()}</p>
    <ul>${feedbackList}</ul>
  `;

  resultsSection.classList.remove('hidden');
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  scenarioSection.classList.remove('hidden');
  showStep();
});

nextBtn.addEventListener('click', () => {
  const scenario = scenarios[currentScenarioIndex];
  if (currentStepIndex < scenario.steps.length - 1) {
    currentStepIndex += 1;
    showStep();
  } else {
    showResults();
    nextBtn.classList.add('hidden');
  }
});

restartBtn.addEventListener('click', () => {
  currentScenarioIndex = 0;
  currentStepIndex = 0;
  selectedFeedback = [];
  startBtn.disabled = false;
  scenarioSection.classList.add('hidden');
  resultsSection.classList.add('hidden');
});
