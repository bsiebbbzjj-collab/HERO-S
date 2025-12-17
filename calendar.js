/**
 * Calendar Module
 * Handles monthly calendar view and task display
 */
const CalendarModule = (() => {
  let currentDate = new Date()
  let selectedDate = null

  // Declare I18n and App variables here or import them if they are modules
  const I18n = window.I18n // Example declaration, adjust as necessary
  const App = window.App // Example declaration, adjust as necessary

  function init() {
    if (typeof Storage === "undefined" || typeof I18n === "undefined" || typeof App === "undefined") {
      return
    }

    setupEventListeners()
    renderCalendar()
  }

  function setupEventListeners() {
    const prevBtn = document.getElementById("calendarPrev")
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1)
        renderCalendar()
      })
    }

    const nextBtn = document.getElementById("calendarNext")
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1)
        renderCalendar()
      })
    }

    const todayBtn = document.getElementById("calendarToday")
    if (todayBtn) {
      todayBtn.addEventListener("click", () => {
        currentDate = new Date()
        selectedDate = new Date()
        renderCalendar()
        renderDayTasks()
      })
    }
  }

  function renderCalendar() {
    renderCalendarHeader()
    renderCalendarGrid()
  }

  function renderCalendarHeader() {
    const monthLabel = document.getElementById("calendarMonthLabel")
    if (monthLabel) {
      const monthName = I18n.t("calendar.months." + currentDate.getMonth())
      const year = currentDate.getFullYear()
      monthLabel.textContent = monthName + " " + year
    }
  }

  function renderCalendarGrid() {
    const grid = document.getElementById("calendarGrid")
    if (!grid) return

    const lang = I18n.getLanguage()
    const tasks = Storage.getTasks()

    // Day headers
    const dayKeys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    let html = ""

    dayKeys.forEach((day) => {
      html += '<div class="calendar-day-header">' + I18n.t("calendar.days." + day) + "</div>"
    })

    // Calculate calendar days
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startPadding = firstDay.getDay()
    const totalDays = lastDay.getDate()

    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = startPadding - 1; i >= 0; i--) {
      const dayNum = prevMonthLastDay - i
      html += '<div class="calendar-day other-month"><span class="calendar-day-number">' + dayNum + "</span></div>"
    }

    // Current month days
    const today = new Date()
    for (let day = 1; day <= totalDays; day++) {
      const dateStr = year + "-" + String(month + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0")
      const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year

      // Find tasks for this day
      const dayTasks = tasks.filter((task) => {
        if (!task.dueDate) return false
        const taskDate = new Date(task.dueDate)
        return taskDate.getDate() === day && taskDate.getMonth() === month && taskDate.getFullYear() === year
      })

      let classes = "calendar-day"
      if (isToday) classes += " today"
      if (isSelected) classes += " selected"

      html +=
        '<div class="' +
        classes +
        '" data-date="' +
        dateStr +
        '">' +
        '<span class="calendar-day-number">' +
        day +
        "</span>"

      if (dayTasks.length > 0) {
        html += '<div class="calendar-day-tasks">'
        const maxDots = Math.min(dayTasks.length, 3)
        for (let i = 0; i < maxDots; i++) {
          html += '<div class="calendar-task-dot"></div>'
        }
        html += "</div>"
      }

      html += "</div>"
    }

    // Next month days
    const endPadding = 42 - (startPadding + totalDays)
    for (let i = 1; i <= endPadding; i++) {
      html += '<div class="calendar-day other-month"><span class="calendar-day-number">' + i + "</span></div>"
    }

    grid.innerHTML = html

    // Add click listeners
    grid.querySelectorAll(".calendar-day:not(.other-month)").forEach((dayEl) => {
      dayEl.addEventListener("click", function () {
        const dateStr = this.getAttribute("data-date")
        if (dateStr) {
          selectedDate = new Date(dateStr + "T00:00:00")
          renderCalendar()
          renderDayTasks()
        }
      })
    })
  }

  function renderDayTasks() {
    const container = document.getElementById("dayTasksList")
    const dateLabel = document.getElementById("selectedDateLabel")

    if (!container) return

    if (!selectedDate) {
      container.innerHTML = '<div class="empty-state"><p>' + I18n.t("calendar.noTasks") + "</p></div>"
      if (dateLabel) {
        dateLabel.textContent = ""
      }
      return
    }

    if (dateLabel) {
      dateLabel.textContent = App.formatDate(selectedDate.toISOString())
    }

    const tasks = Storage.getTasks()
    const dayTasks = tasks.filter((task) => {
      if (!task.dueDate) return false
      const taskDate = new Date(task.dueDate)
      return taskDate.toDateString() === selectedDate.toDateString()
    })

    if (dayTasks.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>' + I18n.t("calendar.noTasks") + "</p></div>"
      return
    }

    let html = '<ul class="task-list">'
    dayTasks.forEach((task) => {
      html +=
        '<li class="task-item' +
        (task.completed ? " completed" : "") +
        '">' +
        '<div class="task-content">' +
        '<div class="task-title">' +
        escapeHtml(task.title) +
        "</div>" +
        '<div class="task-meta">'

      if (task.priority) {
        html +=
          '<span class="task-priority ' +
          task.priority +
          '">' +
          I18n.t("tasks.form.priority." + task.priority) +
          "</span>"
      }

      html += "</div></div></li>"
    })
    html += "</ul>"

    container.innerHTML = html
  }

  function escapeHtml(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }

  return {
    init: init,
  }
})()

if (typeof window !== "undefined") {
  window.CalendarModule = CalendarModule
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("calendarGrid")) {
    CalendarModule.init()
  }
})
