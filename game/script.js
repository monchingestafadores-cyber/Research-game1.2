let currentGame = 1
let currentQuestion = 0
let score = 0
let streak = 0
let correctAnswers = 0
let questions = []
let questionBank = {}

let currentModule = 1
let modulePage = 0

let lessonTimeLeft = 5
let lessonTimerInterval = null

let questionTimeLeft = 15
let questionTimerInterval = null
let questionDuration = 15
let alreadyAnswered = false

let hintCount = 0
let rewardTracker = 0

let unlockedGame = 1

const modules = {
  1: [
    {
      title: "Module 1: Basic Figures of Speech",
      content: `
        <div class="lesson-card">
          <h3>What is a Figure of Speech?</h3>
          <p>A figure of speech is a creative way of using words.</p>
          <p>It makes sentences more colorful and interesting.</p>
          <p><b>Example:</b> He runs like the wind.</p>
        </div>
      `
    },
    {
      title: "Module 1: Simile",
      content: `
        <div class="lesson-card">
          <h3>Simile</h3>
          <p>A simile compares two unlike things using <b>like</b> or <b>as</b>.</p>
          <p><b>Example:</b> She shines like the sun.</p>
        </div>
      `
    },
    {
      title: "Module 1: Metaphor",
      content: `
        <div class="lesson-card">
          <h3>Metaphor</h3>
          <p>A metaphor compares two things directly without using <b>like</b> or <b>as</b>.</p>
          <p><b>Example:</b> The classroom was a zoo.</p>
        </div>
      `
    },
    {
      title: "Module 1: Personification, Hyperbole, and Idiom",
      content: `
        <div class="lesson-card">
          <h3>Personification</h3>
          <p>Giving human actions to non-human things.</p>
          <p><b>Example:</b> The wind whispered softly.</p>

          <h3>Hyperbole</h3>
          <p>An exaggerated statement.</p>
          <p><b>Example:</b> I’ve told you a million times!</p>

          <h3>Idiom</h3>
          <p>A phrase with a meaning different from its literal words.</p>
          <p><b>Example:</b> Break a leg = Good luck.</p>
        </div>
      `
    },
    {
      title: "Module 1 Complete",
      content: `
        <div class="lesson-card">
          <h3>Ready for Game 1?</h3>
          <p>You must get at least <b>80%</b> or <b>4 out of 5 correct answers</b> to unlock the next module.</p>
        </div>
      `
    }
  ],

  2: [
    {
      title: "Module 2: Analyzing Figurative Language",
      content: `
        <div class="lesson-card">
          <h3>How to Analyze a Figure of Speech</h3>
          <p>When analyzing figurative language, ask:</p>
          <p>1. What figure of speech is used?</p>
          <p>2. What does the sentence mean?</p>
          <p>3. What feeling or idea does it show?</p>
        </div>
      `
    },
    {
      title: "Module 2: Alliteration",
      content: `
        <div class="lesson-card">
          <h3>Alliteration</h3>
          <p>Alliteration is the repetition of beginning consonant sounds.</p>
          <p><b>Example:</b> Peter Piper picked a peck of pickled peppers.</p>
        </div>
      `
    },
    {
      title: "Module 2: Onomatopoeia",
      content: `
        <div class="lesson-card">
          <h3>Onomatopoeia</h3>
          <p>Onomatopoeia is a word that sounds like the sound it describes.</p>
          <p><b>Example:</b> Buzz! Bang! Splash!</p>
        </div>
      `
    },
    {
      title: "Module 2: Irony",
      content: `
        <div class="lesson-card">
          <h3>Irony</h3>
          <p>Irony happens when what occurs is different from what is expected.</p>
          <p><b>Example:</b> A fire station burns down.</p>
        </div>
      `
    },
    {
      title: "Module 2 Complete",
      content: `
        <div class="lesson-card">
          <h3>Ready for Game 2?</h3>
          <p>You must get at least <b>80%</b> or <b>4 out of 5 correct answers</b> to unlock the next module.</p>
        </div>
      `
    }
  ],

  3: [
    {
      title: "Module 3: Creating Figurative Language",
      content: `
        <div class="lesson-card">
          <h3>How to Create a Figurative Sentence</h3>
          <p>Read the literal sentence carefully.</p>
          <p>Then rewrite it using the assigned figure of speech.</p>
        </div>
      `
    },
    {
      title: "Module 3: Creating a Simile",
      content: `
        <div class="lesson-card">
          <h3>Simile</h3>
          <p>Use <b>like</b> or <b>as</b>.</p>
          <p><b>Example:</b> He is very fast → He runs like the wind.</p>
        </div>
      `
    },
    {
      title: "Module 3: Creating a Metaphor and Personification",
      content: `
        <div class="lesson-card">
          <h3>Metaphor</h3>
          <p>Compare directly without like or as.</p>
          <p><b>Example:</b> The classroom is a zoo.</p>

          <h3>Personification</h3>
          <p>Give a human action to a thing or object.</p>
          <p><b>Example:</b> The wind danced across the field.</p>
        </div>
      `
    },
    {
      title: "Module 3: Creating Hyperbole and Alliteration",
      content: `
        <div class="lesson-card">
          <h3>Hyperbole</h3>
          <p>Use exaggeration.</p>
          <p><b>Example:</b> I am so tired I could sleep for a year.</p>

          <h3>Alliteration</h3>
          <p>Repeat beginning consonant sounds.</p>
          <p><b>Example:</b> sleepy, silent, soft</p>
        </div>
      `
    },
    {
      title: "Module 3 Complete",
      content: `
        <div class="lesson-card">
          <h3>Ready for Game 3?</h3>
          <p>You must get at least <b>80%</b> or <b>4 out of 5 correct answers</b> to finish successfully.</p>
        </div>
      `
    }
  ]
}

function shuffleArray(array) {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

async function loadQuestionBank() {
  const response = await fetch("questions.json")
  questionBank = await response.json()
}

function pickRandomQuestions(gameKey, count = 5) {
  const pool = questionBank[gameKey] || []
  return shuffleArray(pool).slice(0, count)
}

function startModules() {

  const music = document.getElementById("bgMusic")

  if (music) {
    music.volume = 0.3
    music.play()
  }

  document.getElementById("menu").style.display = "none"
  document.getElementById("gameBox").style.display = "none"
  document.getElementById("lessonBox").style.display = "block"

  openModule(unlockedGame)
}

function openModule(moduleNumber) {
  currentModule = moduleNumber
  modulePage = 0
  document.getElementById("lessonBox").style.display = "block"
  document.getElementById("gameBox").style.display = "none"
  showModulePage()
}

function showModulePage() {
  const moduleData = modules[currentModule]
  document.getElementById("lessonContent").innerHTML = moduleData[modulePage].content

  startLessonTimer()
}

function nextLesson() {
  const moduleData = modules[currentModule]
  modulePage++

  if (modulePage >= moduleData.length) {
    document.getElementById("lessonBox").style.display = "none"
    startGame(currentModule)
    return
  }

  showModulePage()
}

function prevLesson() {
  if (modulePage > 0) {
    modulePage--
    showModulePage()
  }
}

function startGame(gameNumber) {
  currentGame = gameNumber
  currentQuestion = 0
  score = 0
  streak = 0
  correctAnswers = 0
  hintCount = 0
  rewardTracker = 0

  document.getElementById("score").innerText = score
  document.getElementById("streak").innerText = streak
  document.getElementById("hintCount").innerText = hintCount
  document.getElementById("gameBox").style.display = "block"

  loadGame()
}

function loadGame() {

  if (currentGame === 1) {
    document.getElementById("levelTitle").innerText = "Game 1 – Sentence Sleuths"
    questions = pickRandomQuestions("game1", 5)
    questionDuration = 15
  }

  else if (currentGame === 2) {
    document.getElementById("levelTitle").innerText = "Game 2 – Text Detectives"
    questions = pickRandomQuestions("game2", 5)
    questionDuration = 15
  }

  else if (currentGame === 3) {
    document.getElementById("levelTitle").innerText = "Game 3 – Expression Lab"
    questions = pickRandomQuestions("game3", 5)
    questionDuration = 60
  }

  loadQuestion()
}

function loadQuestion() {
  const q = questions[currentQuestion]

  alreadyAnswered = false

  document.getElementById("result").innerText = ""
  document.getElementById("hint").innerText = ""

  if (currentGame === 3) {
    document.getElementById("sentence").innerHTML =
      `Rewrite using <b>${q.figure}</b><br><br>Literal sentence: ${q.literal}`

    document.getElementById("choices").innerHTML = `
      <input id="playerAnswer" type="text" placeholder="Type your sentence here">
      <button class="fantasy-btn gold-btn" onclick="checkCreative()">Submit</button>
    `
  } else {
    if (q.text) {
      document.getElementById("sentence").innerHTML =
        `<b>Text:</b><br>${q.text}<br><br>${q.question}`
    } else {
      document.getElementById("sentence").innerText = q.sentence
    }

    let html = ""
    q.choices.forEach(choice => {
      html += `<button onclick="checkAnswer('${choice.replace(/'/g, "\\'")}')">${choice}</button>`
    })
    document.getElementById("choices").innerHTML = html
  }

  updateProgress()
  startQuestionTimer()
}

function checkAnswer(choice) {
  if (alreadyAnswered) return
  alreadyAnswered = true
  clearInterval(questionTimerInterval)

  const correct = questions[currentQuestion].answer

  if (choice === correct) {
    score += 10
    streak++
    correctAnswers++
    rewardTracker++

    if (rewardTracker === 2) {
      hintCount++
      rewardTracker = 0
      document.getElementById("hintCount").innerText = hintCount
    }

    if (streak >= 3) {
      score += 5
      document.getElementById("result").innerText = "Correct! 🔥 Streak bonus!"
    } else {
      document.getElementById("result").innerText = "Correct!"
    }
  } else {
    streak = 0
    document.getElementById("result").innerText = "Wrong! The correct answer is: " + correct
  }

  document.getElementById("score").innerText = score
  document.getElementById("streak").innerText = streak

  disableCurrentChoices()

  setTimeout(nextQuestion, 1500)
}

function checkCreative() {
  if (alreadyAnswered) return
  alreadyAnswered = true
  clearInterval(questionTimerInterval)

  const q = questions[currentQuestion]
  const answer = document.getElementById("playerAnswer").value.trim().toLowerCase()
  let correct = false

  if (q.figure === "Simile") {
    if (answer.includes(" like ") || answer.includes(" as ") || answer.startsWith("like ")) {
      correct = true
    }
  } else if (q.figure === "Metaphor") {
    if (answer.length > 0 && !answer.includes(" like ") && !answer.includes(" as ")) {
      correct = true
    }
  } else if (q.figure === "Personification") {
    const humanActions = ["whisper", "dance", "sing", "cry", "laugh", "talk", "shout", "sleep", "run"]
    correct = humanActions.some(word => answer.includes(word))
  } else if (q.figure === "Hyperbole") {
    const exaggerations = ["million", "forever", "extremely", "never", "always", "tons", "could die", "for a year"]
    correct = exaggerations.some(word => answer.includes(word))
  } else if (q.figure === "Alliteration") {
    const words = answer.replace(/[^a-zA-Z\s]/g, "").split(/\s+/).filter(Boolean)
    for (let i = 0; i < words.length - 1; i++) {
      if (words[i][0] && words[i][0] === words[i + 1][0]) {
        correct = true
        break
      }
    }
  }

  if (correct) {
    score += 15
    correctAnswers++
    document.getElementById("result").innerText = "Good creative answer!"
  } else {
    document.getElementById("result").innerText = "Wrong answer. No points earned."
  }

  document.getElementById("score").innerText = score

  disableCurrentChoices()

  setTimeout(nextQuestion, 1500)
}

function nextQuestion() {
  clearInterval(questionTimerInterval)
  currentQuestion++

  if (currentQuestion >= questions.length) {
    checkGameResult()
    return
  }

  loadQuestion()
}

function checkGameResult() {
  const passingScore = 4
  const percent = (correctAnswers / questions.length) * 100

  if (correctAnswers >= passingScore) {
    alert(
      "You passed Game " + currentGame + "!\n" +
      "Correct Answers: " + correctAnswers + "/5\n" +
      "Percentage: " + percent + "%"
    )

    if (currentGame < 3) {
      unlockedGame = Math.max(unlockedGame, currentGame + 1)
      updateUnlockMap()
      openModule(currentGame + 1)
    } else {
      alert("Congratulations! You finished all games successfully.")
      document.getElementById("gameBox").style.display = "none"
      document.getElementById("menu").style.display = "block"
      updateUnlockMap()
    }
  } else {
    alert(
      "You got only " + correctAnswers + "/5 (" + percent + "%).\n" +
      "You need at least 4/5 or 80% to unlock the next game.\n\n" +
      "Please read Module " + currentGame + " again and retry Game " + currentGame + "."
    )

    openModule(currentGame)
  }
}

function showHint() {
  const q = questions[currentQuestion]

  if (hintCount <= 0) {
    document.getElementById("hint").innerText = "No hints available yet. Earn hints by getting correct answers."
    return
  }

  if (q.hint) {
    hintCount--
    document.getElementById("hintCount").innerText = hintCount
    document.getElementById("hint").innerText = "Hint: " + q.hint
  }
}

function fiftyFifty() {
  if (currentGame === 3) {
    document.getElementById("result").innerText = "50/50 is only for multiple-choice games."
    return
  }

  const q = questions[currentQuestion]
  const wrong = q.choices.filter(choice => choice !== q.answer).slice(0, 2)

  const buttons = document.querySelectorAll("#choices button")
  buttons.forEach(btn => {
    if (wrong.includes(btn.innerText)) {
      btn.style.display = "none"
    }
  })
}

function showInstructions() {
  alert("Read each module first. Get at least 80% or 4 out of 5 correct answers to unlock the next game.")
}

function updateProgress() {
  const percent = (currentQuestion / questions.length) * 100
  document.getElementById("progress").style.width = percent + "%"
}

window.onload = async function () {
  try {
    await loadQuestionBank()
    updateUnlockMap()
  } catch (error) {
    alert("questions.json could not be loaded. Please run the game using a local server.")
    console.error(error)
  }
}

function startLessonTimer() {
  clearInterval(lessonTimerInterval)

  lessonTimeLeft = 5
  const timerDisplay = document.getElementById("lessonTimer")
  const nextBtn = document.getElementById("lessonNextBtn")

  nextBtn.disabled = true
  timerDisplay.innerText = lessonTimeLeft

  lessonTimerInterval = setInterval(() => {
    lessonTimeLeft--
    timerDisplay.innerText = lessonTimeLeft

    if (lessonTimeLeft <= 0) {
      clearInterval(lessonTimerInterval)
      nextBtn.disabled = false
      timerDisplay.innerText = "Done"
    }
  }, 1000)
}

function startQuestionTimer() {
  clearInterval(questionTimerInterval)

  questionTimeLeft = questionDuration
  alreadyAnswered = false

  const timerDisplay = document.getElementById("questionTimer")
  timerDisplay.innerText = questionTimeLeft

  questionTimerInterval = setInterval(() => {
    questionTimeLeft--
    timerDisplay.innerText = questionTimeLeft

    if (questionTimeLeft <= 0) {
      clearInterval(questionTimerInterval)

      if (!alreadyAnswered) {
        alreadyAnswered = true
        streak = 0
        document.getElementById("streak").innerText = streak
        document.getElementById("result").innerText = "Time's up! No points earned."

        disableCurrentChoices()

        setTimeout(nextQuestion, 1500)
      }
    }
  }, 1000)
}

function updateUnlockMap() {
  const card1 = document.getElementById("card1")
  const card2 = document.getElementById("card2")
  const card3 = document.getElementById("card3")

  if (!card1 || !card2 || !card3) return

  card1.classList.remove("locked-card")
  card1.innerText = "🔓 Module 1 + Game 1"

  if (unlockedGame >= 2) {
    card2.classList.remove("locked-card")
    card2.innerText = "🔓 Module 2 + Game 2"
  } else {
    card2.classList.add("locked-card")
    card2.innerText = "🔒 Module 2 + Game 2"
  }

  if (unlockedGame >= 3) {
    card3.classList.remove("locked-card")
    card3.innerText = "🔓 Module 3 + Game 3"
  } else {
    card3.classList.add("locked-card")
    card3.innerText = "🔒 Module 3 + Game 3"
  }
}

function toggleMusic() {

  const music = document.getElementById("bgMusic")

  if (music.paused) {
    music.play()
  } else {
    music.pause()
  }

}

function openModuleMap() {
  const welcome = document.getElementById("welcomeScreen")
  const map = document.getElementById("moduleMap")

  if (welcome) welcome.style.display = "none"
  if (map) map.style.display = "block"
}

function startModulesFromMap(moduleNumber) {
  if (moduleNumber > unlockedGame) {
    showPopup("NOTE", "Please finish the previous module first before proceeding.")
    return
  }

  const map = document.getElementById("moduleMap")
  const lesson = document.getElementById("lessonBox")

  if (map) map.style.display = "none"
  if (lesson) lesson.style.display = "block"

  openModule(moduleNumber)
}

function showPopup(title, message) {
  document.getElementById("popupTitle").innerText = title
  document.getElementById("popupMessage").innerText = message
  document.getElementById("popupModal").style.display = "flex"
}

function closePopup() {
  document.getElementById("popupModal").style.display = "none"
}

function openSettings() {
  clearInterval(questionTimerInterval)

  document.getElementById("settingsPanel").style.display = "flex"
  document.getElementById("gameShell").classList.add("paused-blur")
}

function closeSettings() {
  document.getElementById("settingsPanel").style.display = "none"
  document.getElementById("gameShell").classList.remove("paused-blur")

  const gameBox = document.getElementById("gameBox")
  if (gameBox && gameBox.style.display !== "none") {
    startQuestionTimer()
  }
}

function restartGame() {

  score = 0
  streak = 0
  correctAnswers = 0
  rewardTracker = 0

  document.getElementById("score").innerText = score
  document.getElementById("streak").innerText = streak

  currentQuestion = 0

  closeSettings()
  loadQuestion()

}

function restartGame() {
  score = 0
  streak = 0
  correctAnswers = 0
  rewardTracker = 0
  hintCount = 0
  currentQuestion = 0
  alreadyAnswered = false

  document.getElementById("score").innerText = score
  document.getElementById("streak").innerText = streak
  document.getElementById("hintCount").innerText = hintCount

  document.getElementById("settingsPanel").style.display = "none"
  document.getElementById("gameShell").classList.remove("paused-blur")

  loadQuestion()
}

function endGame() {

  clearInterval(questionTimerInterval)

  document.getElementById("gameBox").style.display = "none"
  document.getElementById("moduleMap").style.display = "block"

  closeSettings()

}

function askEndGame() {
  document.getElementById("confirmEndModal").style.display = "flex"
}

function cancelEndGame() {
  document.getElementById("confirmEndModal").style.display = "none"
}

function confirmEndGame() {
  document.getElementById("confirmEndModal").style.display = "none"
  endGame()
}

