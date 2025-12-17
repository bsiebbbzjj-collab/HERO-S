/**
 * Settings Module
 * Handles app settings and preferences
 */
const SettingsModule = (() => {
  const I18n = window.I18n // Declare the I18n variable
  const App = window.App // Declare the App variable

  function init() {
    if (typeof Storage === "undefined" || typeof I18n === "undefined" || typeof App === "undefined") {
      return
    }

    setupEventListeners()
    loadCurrentSettings()
  }

  function setupEventListeners() {
    // Language buttons
    const langButtons = document.querySelectorAll(".lang-btn")
    langButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const lang = this.getAttribute("data-lang")
        I18n.setLanguage(lang)
        updateLanguageButtons()
      })
    })

    // Export data button
    const exportBtn = document.getElementById("exportDataBtn")
    if (exportBtn) {
      exportBtn.addEventListener("click", exportData)
    }

    // Reset data button
    const resetBtn = document.getElementById("resetDataBtn")
    if (resetBtn) {
      resetBtn.addEventListener("click", resetAllData)
    }
  }

  function loadCurrentSettings() {
    updateLanguageButtons()
  }

  function updateLanguageButtons() {
    const currentLang = I18n.getLanguage()
    const langButtons = document.querySelectorAll(".lang-btn")
    langButtons.forEach((btn) => {
      const lang = btn.getAttribute("data-lang")
      if (lang === currentLang) {
        btn.classList.add("active")
      } else {
        btn.classList.remove("active")
      }
    })
  }

  function exportData() {
    const data = Storage.exportData()
    const dataStr = JSON.stringify(data, null, 2)
    const blob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "taskapp-data-" + new Date().toISOString().split("T")[0] + ".json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    App.showToast(I18n.t("common.success"))
  }

  function resetAllData() {
    if (confirm(I18n.t("settings.data.resetConfirm"))) {
      Storage.clear()
      App.showToast(I18n.t("settings.data.resetSuccess"))

      // Reload page to reset UI
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
  }

  return {
    init: init,
  }
})()

if (typeof window !== "undefined") {
  window.SettingsModule = SettingsModule
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("settingsPage")) {
    SettingsModule.init()
  }
})
