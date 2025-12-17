/**
 * Main Application Module
 * Handles common functionality across all pages
 */
const App = (() => {
  // SVG Icons as inline strings (hand-drawn style)
  const Icons = {
    dashboard:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    tasks:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>',
    calendar:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    focus:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    settings:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    delete:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
    close:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    chevronLeft:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
    chevronRight:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    phone:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    pause:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
    refresh:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>',
    skip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>',
    activity:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    empty:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>',
    language:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
    download:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  }

  function getIcon(name) {
    return Icons[name] || ""
  }

  function init() {
    const I18n = window.I18n // Declare the I18n variable here
    if (typeof I18n !== "undefined") {
      I18n.init()
    }
    setupNavigation()
    setupLanguageSwitcher()
  }

  function setupNavigation() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html"

    // Sidebar navigation
    const sidebarLinks = document.querySelectorAll(".nav-link")
    sidebarLinks.forEach((link) => {
      const href = link.getAttribute("href")
      if (href === currentPage || (currentPage === "" && href === "index.html")) {
        link.classList.add("active")
      }
    })

    // Bottom navigation
    const bottomLinks = document.querySelectorAll(".bottom-nav-link")
    bottomLinks.forEach((link) => {
      const href = link.getAttribute("href")
      if (href === currentPage) {
        link.classList.add("active")
      }
    })
  }

  function setupLanguageSwitcher() {
    const langButtons = document.querySelectorAll(".lang-btn")
    langButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const lang = this.getAttribute("data-lang")
        const I18n = window.I18n // Declare the I18n variable here
        if (typeof I18n !== "undefined") {
          I18n.setLanguage(lang)
        }
      })
    })
  }

  // Toast notification system
  function showToast(message, duration) {
    duration = duration || 3000
    let container = document.querySelector(".toast-container")
    if (!container) {
      container = document.createElement("div")
      container.className = "toast-container"
      document.body.appendChild(container)
    }

    const toast = document.createElement("div")
    toast.className = "toast"
    toast.textContent = message
    container.appendChild(toast)

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add("visible")
    })

    setTimeout(() => {
      toast.classList.remove("visible")
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast)
        }
      }, 200)
    }, duration)
  }

  // Date formatting utilities
  function formatDate(dateString, lang) {
    lang = lang || (typeof window.I18n !== "undefined" ? window.I18n.getLanguage() : "ar")
    const date = new Date(dateString)
    const options = { year: "numeric", month: "short", day: "numeric" }
    return date.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", options)
  }

  function formatTime(dateString, lang) {
    lang = lang || (typeof window.I18n !== "undefined" ? window.I18n.getLanguage() : "ar")
    const date = new Date(dateString)
    const options = { hour: "2-digit", minute: "2-digit" }
    return date.toLocaleTimeString(lang === "ar" ? "ar-EG" : "en-US", options)
  }

  function formatRelativeTime(dateString, lang) {
    lang = lang || (typeof window.I18n !== "undefined" ? window.I18n.getLanguage() : "ar")
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (lang === "ar") {
      if (minutes < 1) return "الآن"
      if (minutes < 60) return "منذ " + minutes + " دقيقة"
      if (hours < 24) return "منذ " + hours + " ساعة"
      if (days < 7) return "منذ " + days + " يوم"
      return formatDate(dateString, lang)
    } else {
      if (minutes < 1) return "Just now"
      if (minutes < 60) return minutes + " min ago"
      if (hours < 24) return hours + " hours ago"
      if (days < 7) return days + " days ago"
      return formatDate(dateString, lang)
    }
  }

  // Check if date is today
  function isToday(dateString) {
    const date = new Date(dateString)
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  // Check if date is overdue
  function isOverdue(dateString) {
    if (!dateString) return false
    const date = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  // Generate unique ID
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  return {
    init: init,
    getIcon: getIcon,
    showToast: showToast,
    formatDate: formatDate,
    formatTime: formatTime,
    formatRelativeTime: formatRelativeTime,
    isToday: isToday,
    isOverdue: isOverdue,
    generateId: generateId,
  }
})()

if (typeof window !== "undefined") {
  window.App = App
}

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  App.init()
})
