/**
 * Focus Module
 * Handles Pomodoro timer functionality
 */
const FocusModule = (() => {
  let timerInterval = null
  let timeRemaining = 0
  let isRunning = false
  let isPaused = false
  let isWorkSession = true
  let workDuration = 25
  let breakDuration = 5
  const I18n = window.I18n // Declare I18n variable
  const App = window.App // Declare App variable

  function init() {
    if (typeof Storage === "undefined" || typeof I18n === "undefined" || typeof App === "undefined") {
      return
    }

    loadSettings()
    setupEventListeners()
    updateDisplay()
    updateStats()
  }

  function loadSettings() {
    const settings = Storage.getSettings()
    workDuration = settings.focusWorkDuration || 25
    breakDuration = settings.focusBreakDuration || 5
    timeRemaining = workDuration * 60

    const workInput = document.getElementById("workDuration")
    if (workInput) {
      workInput.value = workDuration
    }

    const breakInput = document.getElementById("breakDuration")
    if (breakInput) {
      breakInput.value = breakDuration
    }
  }

  function setupEventListeners() {
    const startBtn = document.getElementById("startBtn")
    if (startBtn) {
      startBtn.addEventListener("click", startTimer)
    }

    const pauseBtn = document.getElementById("pauseBtn")
    if (pauseBtn) {
      pauseBtn.addEventListener("click", pauseTimer)
    }

    const resetBtn = document.getElementById("resetBtn")
    if (resetBtn) {
      resetBtn.addEventListener("click", resetTimer)
    }

    const skipBtn = document.getElementById("skipBtn")
    if (skipBtn) {
      skipBtn.addEventListener("click", skipSession)
    }

    const workInput = document.getElementById("workDuration")
    if (workInput) {
      workInput.addEventListener("change", function () {
        const value = Number.parseInt(this.value, 10)
        if (value >= 1 && value <= 120) {
          workDuration = value
          saveSettings()
          if (!isRunning && isWorkSession) {
            timeRemaining = workDuration * 60
            updateDisplay()
          }
        }
      })
    }

    const breakInput = document.getElementById("breakDuration")
    if (breakInput) {
      breakInput.addEventListener("change", function () {
        const value = Number.parseInt(this.value, 10)
        if (value >= 1 && value <= 60) {
          breakDuration = value
          saveSettings()
          if (!isRunning && !isWorkSession) {
            timeRemaining = breakDuration * 60
            updateDisplay()
          }
        }
      })
    }
  }

  function saveSettings() {
    const settings = Storage.getSettings()
    settings.focusWorkDuration = workDuration
    settings.focusBreakDuration = breakDuration
    Storage.saveSettings(settings)
  }

  function startTimer() {
    if (isRunning && !isPaused) return

    isRunning = true
    isPaused = false

    updateButtonStates()

    timerInterval = setInterval(() => {
      timeRemaining--
      updateDisplay()

      if (timeRemaining <= 0) {
        completeSession()
      }
    }, 1000)
  }

  function pauseTimer() {
    if (!isRunning) return

    isPaused = !isPaused

    if (isPaused) {
      clearInterval(timerInterval)
    } else {
      startTimer()
    }

    updateButtonStates()
  }

  function resetTimer() {
    clearInterval(timerInterval)
    isRunning = false
    isPaused = false
    isWorkSession = true
    timeRemaining = workDuration * 60

    updateDisplay()
    updateButtonStates()
  }

  function skipSession() {
    clearInterval(timerInterval)
    isRunning = false
    isPaused = false

    // Switch session type
    isWorkSession = !isWorkSession
    timeRemaining = (isWorkSession ? workDuration : breakDuration) * 60

    updateDisplay()
    updateButtonStates()
  }

  function completeSession() {
    clearInterval(timerInterval)
    isRunning = false
    isPaused = false

    // Play notification sound (simple beep using Web Audio API)
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioCtx.destination)

      oscillator.frequency.value = 800
      oscillator.type = "sine"
      gainNode.gain.value = 0.3

      oscillator.start()
      setTimeout(() => {
        oscillator.stop()
      }, 200)
    } catch (e) {
      // Audio not supported
    }

    if (isWorkSession) {
      // Completed work session
      Storage.incrementFocusSessions(workDuration)
      updateStats()
      App.showToast(I18n.t("focus.sessionComplete"))
    }

    // Switch to next session
    isWorkSession = !isWorkSession
    timeRemaining = (isWorkSession ? workDuration : breakDuration) * 60

    updateDisplay()
    updateButtonStates()
  }

  function updateDisplay() {
    const timerDisplay = document.getElementById("timerDisplay")
    const sessionLabel = document.getElementById("sessionLabel")

    if (timerDisplay) {
      const minutes = Math.floor(timeRemaining / 60)
      const seconds = timeRemaining % 60
      timerDisplay.textContent = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0")
    }

    if (sessionLabel) {
      sessionLabel.textContent = I18n.t(isWorkSession ? "focus.work" : "focus.break")
    }
  }

  function updateButtonStates() {
    const startBtn = document.getElementById("startBtn")
    const pauseBtn = document.getElementById("pauseBtn")
    const pauseBtnText = document.getElementById("pauseBtnText")

    if (startBtn) {
      if (isRunning && !isPaused) {
        startBtn.style.display = "none"
      } else {
        startBtn.style.display = "inline-flex"
      }
    }

    if (pauseBtn) {
      if (isRunning) {
        pauseBtn.style.display = "inline-flex"
      } else {
        pauseBtn.style.display = "none"
      }
    }

    if (pauseBtnText) {
      pauseBtnText.textContent = I18n.t(isPaused ? "focus.resume" : "focus.pause")
    }
  }

  function updateStats() {
    const stats = Storage.getFocusStats()

    const sessionsEl = document.getElementById("completedSessions")
    if (sessionsEl) {
      sessionsEl.textContent = stats.todaySessions || 0
    }

    const totalEl = document.getElementById("totalSessions")
    if (totalEl) {
      totalEl.textContent = stats.totalSessions || 0
    }
  }

  return {
    init: init,
  }
})()

if (typeof window !== "undefined") {
  window.FocusModule = FocusModule
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("timerDisplay")) {
    FocusModule.init()
  }
})
