/**
 * Internationalization Module
 * Handles language switching between Arabic (RTL) and English (LTR)
 */
const I18n = (() => {
  const translations = {
    ar: {
      // Navigation
      "nav.dashboard": "لوحة التحكم",
      "nav.tasks": "المهام",
      "nav.calendar": "التقويم",
      "nav.focus": "وضع التركيز",
      "nav.settings": "الإعدادات",

      // Landing Page
      "landing.title": "أنجز مهامك بكفاءة",
      "landing.description": "تطبيق إدارة المهام الذي يساعدك على تنظيم يومك وزيادة إنتاجيتك بأسلوب بسيط وفعّال",
      "landing.cta.start": "ابدأ الآن",
      "landing.cta.learn": "تعرف أكثر",
      "landing.features": "المميزات",
      "landing.howItWorks": "كيف يعمل",
      "landing.contact": "تواصل معنا",
      "landing.footer": "جميع الحقوق محفوظة",

      // About Page
      "about.nav": "عن المبرمج",
      "about.name": "محمد صابر",
      "about.title": "مطور واجهات أمامية",
      "about.bio":
        "أنا مبرمج عمري 15 سنة، بدأت رحلتي في تعلم البرمجة عام 2021. أركز بشكل أساسي على تطوير الواجهات الأمامية، وأسعى دائماً لبناء واجهات ويب نظيفة وعملية. أتعلم باستمرار وأعمل على تطوير مهاراتي يوماً بعد يوم.",
      "about.skills.title": "المهارات والخبرات",
      "about.skills.frontend": "تطوير الواجهات والويب",
      "about.skills.languages": "لغات البرمجة",
      "about.skills.database": "قواعد البيانات",
      "about.skills.note": "بعض هذه اللغات أستخدمها للتعلم والتجريب ومشاريع التدريب الشخصية.",
      "about.contact.title": "تواصل معي",

      // Features
      "feature.tasks.title": "إدارة المهام",
      "feature.tasks.desc": "أنشئ وتابع مهامك بسهولة مع تصنيفات وأولويات مرنة",
      "feature.calendar.title": "عرض التقويم",
      "feature.calendar.desc": "شاهد مهامك على التقويم الشهري لتخطيط أفضل",
      "feature.focus.title": "وضع التركيز",
      "feature.focus.desc": "استخدم تقنية بومودورو للعمل بتركيز عالٍ",
      "feature.sync.title": "حفظ تلقائي",
      "feature.sync.desc": "جميع بياناتك محفوظة محلياً بشكل آمن",
      "feature.rtl.title": "دعم العربية",
      "feature.rtl.desc": "واجهة كاملة بالعربية مع دعم الاتجاه من اليمين لليسار",
      "feature.responsive.title": "تصميم متجاوب",
      "feature.responsive.desc": "يعمل بشكل مثالي على جميع الأجهزة",

      // Steps
      "step.1.title": "أنشئ حسابك",
      "step.1.desc": "ابدأ مباشرة بدون تسجيل - بياناتك محفوظة في متصفحك",
      "step.2.title": "أضف مهامك",
      "step.2.desc": "أضف مهامك مع تحديد الأولوية وتاريخ الاستحقاق",
      "step.3.title": "تابع تقدمك",
      "step.3.desc": "راقب إنجازاتك من لوحة التحكم والتقويم",

      // Dashboard
      "dashboard.title": "لوحة التحكم",
      "dashboard.welcome": "مرحباً بك",
      "dashboard.stats.total": "إجمالي المهام",
      "dashboard.stats.completed": "مكتملة",
      "dashboard.stats.pending": "قيد التنفيذ",
      "dashboard.stats.overdue": "متأخرة",
      "dashboard.recent": "النشاط الأخير",
      "dashboard.noActivity": "لا يوجد نشاط حتى الآن",

      // Tasks
      "tasks.title": "المهام",
      "tasks.add": "إضافة مهمة",
      "tasks.edit": "تعديل المهمة",
      "tasks.delete": "حذف",
      "tasks.deleteConfirm": "هل أنت متأكد من حذف هذه المهمة؟",
      "tasks.empty": "لا توجد مهام بعد",
      "tasks.filter.all": "الكل",
      "tasks.filter.pending": "قيد التنفيذ",
      "tasks.filter.completed": "مكتملة",
      "tasks.form.title": "عنوان المهمة",
      "tasks.form.titlePlaceholder": "أدخل عنوان المهمة",
      "tasks.form.description": "الوصف",
      "tasks.form.descriptionPlaceholder": "أدخل وصف المهمة (اختياري)",
      "tasks.form.dueDate": "تاريخ الاستحقاق",
      "tasks.form.priority": "الأولوية",
      "tasks.form.priority.low": "منخفضة",
      "tasks.form.priority.medium": "متوسطة",
      "tasks.form.priority.high": "عالية",
      "tasks.form.save": "حفظ",
      "tasks.form.cancel": "إلغاء",
      "tasks.validation.titleRequired": "عنوان المهمة مطلوب",
      "tasks.created": "تم إنشاء المهمة",
      "tasks.updated": "تم تحديث المهمة",
      "tasks.deleted": "تم حذف المهمة",
      "tasks.completed": "تم إكمال المهمة",

      // Calendar
      "calendar.title": "التقويم",
      "calendar.today": "اليوم",
      "calendar.noTasks": "لا توجد مهام في هذا اليوم",
      "calendar.days.sun": "أحد",
      "calendar.days.mon": "إثن",
      "calendar.days.tue": "ثلا",
      "calendar.days.wed": "أرب",
      "calendar.days.thu": "خمي",
      "calendar.days.fri": "جمع",
      "calendar.days.sat": "سبت",
      "calendar.months.0": "يناير",
      "calendar.months.1": "فبراير",
      "calendar.months.2": "مارس",
      "calendar.months.3": "أبريل",
      "calendar.months.4": "مايو",
      "calendar.months.5": "يونيو",
      "calendar.months.6": "يوليو",
      "calendar.months.7": "أغسطس",
      "calendar.months.8": "سبتمبر",
      "calendar.months.9": "أكتوبر",
      "calendar.months.10": "نوفمبر",
      "calendar.months.11": "ديسمبر",

      // Focus
      "focus.title": "وضع التركيز",
      "focus.work": "وقت العمل",
      "focus.break": "وقت الاستراحة",
      "focus.start": "ابدأ",
      "focus.pause": "إيقاف مؤقت",
      "focus.resume": "استمرار",
      "focus.reset": "إعادة تعيين",
      "focus.skip": "تخطي",
      "focus.workDuration": "مدة العمل (دقيقة)",
      "focus.breakDuration": "مدة الاستراحة (دقيقة)",
      "focus.sessions": "الجلسات المكتملة",
      "focus.sessionComplete": "انتهت الجلسة!",

      // Settings
      "settings.title": "الإعدادات",
      "settings.language": "اللغة",
      "settings.language.ar": "العربية",
      "settings.language.en": "English",
      "settings.theme": "المظهر",
      "settings.theme.light": "فاتح",
      "settings.theme.dark": "داكن",
      "settings.data": "البيانات",
      "settings.data.export": "تصدير البيانات",
      "settings.data.reset": "مسح جميع البيانات",
      "settings.data.resetConfirm": "هل أنت متأكد؟ سيتم حذف جميع المهام والإعدادات.",
      "settings.data.resetSuccess": "تم مسح جميع البيانات",

      // Common
      "common.save": "حفظ",
      "common.cancel": "إلغاء",
      "common.delete": "حذف",
      "common.edit": "تعديل",
      "common.close": "إغلاق",
      "common.loading": "جاري التحميل...",
      "common.error": "حدث خطأ",
      "common.success": "تم بنجاح",
      "common.confirm": "تأكيد",
    },
    en: {
      // Navigation
      "nav.dashboard": "Dashboard",
      "nav.tasks": "Tasks",
      "nav.calendar": "Calendar",
      "nav.focus": "Focus Mode",
      "nav.settings": "Settings",

      // Landing Page
      "landing.title": "Get Things Done Efficiently",
      "landing.description":
        "A task management app that helps you organize your day and boost productivity with a simple and effective approach",
      "landing.cta.start": "Get Started",
      "landing.cta.learn": "Learn More",
      "landing.features": "Features",
      "landing.howItWorks": "How It Works",
      "landing.contact": "Contact Us",
      "landing.footer": "All rights reserved",

      // About Page
      "about.nav": "About Developer",
      "about.name": "Mohamed Saber",
      "about.title": "Frontend Developer",
      "about.bio":
        "I'm a 15-year-old developer who started learning programming in 2021. I focus primarily on frontend development, always striving to build clean and functional web interfaces. I continuously learn and work on improving my skills day by day.",
      "about.skills.title": "Skills & Experience",
      "about.skills.frontend": "Frontend & Web",
      "about.skills.languages": "Programming Languages",
      "about.skills.database": "Databases",
      "about.skills.note":
        "Some of these languages are used for learning, experimentation, and personal practice projects.",
      "about.contact.title": "Contact Me",

      // Features
      "feature.tasks.title": "Task Management",
      "feature.tasks.desc": "Create and track your tasks easily with flexible categories and priorities",
      "feature.calendar.title": "Calendar View",
      "feature.calendar.desc": "View your tasks on a monthly calendar for better planning",
      "feature.focus.title": "Focus Mode",
      "feature.focus.desc": "Use the Pomodoro technique to work with high concentration",
      "feature.sync.title": "Auto Save",
      "feature.sync.desc": "All your data is saved locally and securely",
      "feature.rtl.title": "Arabic Support",
      "feature.rtl.desc": "Full Arabic interface with right-to-left layout support",
      "feature.responsive.title": "Responsive Design",
      "feature.responsive.desc": "Works perfectly on all devices",

      // Steps
      "step.1.title": "Create Your Account",
      "step.1.desc": "Start immediately without registration - your data is saved in your browser",
      "step.2.title": "Add Your Tasks",
      "step.2.desc": "Add tasks with priority and due date settings",
      "step.3.title": "Track Your Progress",
      "step.3.desc": "Monitor your achievements from the dashboard and calendar",

      // Dashboard
      "dashboard.title": "Dashboard",
      "dashboard.welcome": "Welcome",
      "dashboard.stats.total": "Total Tasks",
      "dashboard.stats.completed": "Completed",
      "dashboard.stats.pending": "Pending",
      "dashboard.stats.overdue": "Overdue",
      "dashboard.recent": "Recent Activity",
      "dashboard.noActivity": "No activity yet",

      // Tasks
      "tasks.title": "Tasks",
      "tasks.add": "Add Task",
      "tasks.edit": "Edit Task",
      "tasks.delete": "Delete",
      "tasks.deleteConfirm": "Are you sure you want to delete this task?",
      "tasks.empty": "No tasks yet",
      "tasks.filter.all": "All",
      "tasks.filter.pending": "Pending",
      "tasks.filter.completed": "Completed",
      "tasks.form.title": "Task Title",
      "tasks.form.titlePlaceholder": "Enter task title",
      "tasks.form.description": "Description",
      "tasks.form.descriptionPlaceholder": "Enter task description (optional)",
      "tasks.form.dueDate": "Due Date",
      "tasks.form.priority": "Priority",
      "tasks.form.priority.low": "Low",
      "tasks.form.priority.medium": "Medium",
      "tasks.form.priority.high": "High",
      "tasks.form.save": "Save",
      "tasks.form.cancel": "Cancel",
      "tasks.validation.titleRequired": "Task title is required",
      "tasks.created": "Task created",
      "tasks.updated": "Task updated",
      "tasks.deleted": "Task deleted",
      "tasks.completed": "Task completed",

      // Calendar
      "calendar.title": "Calendar",
      "calendar.today": "Today",
      "calendar.noTasks": "No tasks on this day",
      "calendar.days.sun": "Sun",
      "calendar.days.mon": "Mon",
      "calendar.days.tue": "Tue",
      "calendar.days.wed": "Wed",
      "calendar.days.thu": "Thu",
      "calendar.days.fri": "Fri",
      "calendar.days.sat": "Sat",
      "calendar.months.0": "January",
      "calendar.months.1": "February",
      "calendar.months.2": "March",
      "calendar.months.3": "April",
      "calendar.months.4": "May",
      "calendar.months.5": "June",
      "calendar.months.6": "July",
      "calendar.months.7": "August",
      "calendar.months.8": "September",
      "calendar.months.9": "October",
      "calendar.months.10": "November",
      "calendar.months.11": "December",

      // Focus
      "focus.title": "Focus Mode",
      "focus.work": "Work Time",
      "focus.break": "Break Time",
      "focus.start": "Start",
      "focus.pause": "Pause",
      "focus.resume": "Resume",
      "focus.reset": "Reset",
      "focus.skip": "Skip",
      "focus.workDuration": "Work Duration (min)",
      "focus.breakDuration": "Break Duration (min)",
      "focus.sessions": "Completed Sessions",
      "focus.sessionComplete": "Session complete!",

      // Settings
      "settings.title": "Settings",
      "settings.language": "Language",
      "settings.language.ar": "العربية",
      "settings.language.en": "English",
      "settings.theme": "Theme",
      "settings.theme.light": "Light",
      "settings.theme.dark": "Dark",
      "settings.data": "Data",
      "settings.data.export": "Export Data",
      "settings.data.reset": "Reset All Data",
      "settings.data.resetConfirm": "Are you sure? All tasks and settings will be deleted.",
      "settings.data.resetSuccess": "All data has been cleared",

      // Common
      "common.save": "Save",
      "common.cancel": "Cancel",
      "common.delete": "Delete",
      "common.edit": "Edit",
      "common.close": "Close",
      "common.loading": "Loading...",
      "common.error": "An error occurred",
      "common.success": "Success",
      "common.confirm": "Confirm",
    },
  }

  let currentLang = "ar"

  function init() {
    const savedLang = localStorage.getItem("taskapp_language")
    if (savedLang && translations[savedLang]) {
      currentLang = savedLang
    }
    applyLanguage()
  }

  function setLanguage(lang) {
    if (translations[lang]) {
      currentLang = lang
      localStorage.setItem("taskapp_language", lang)
      applyLanguage()
    }
  }

  function getLanguage() {
    return currentLang
  }

  function t(key) {
    const langTranslations = translations[currentLang]
    return langTranslations[key] || key
  }

  function applyLanguage() {
    const direction = currentLang === "ar" ? "rtl" : "ltr"
    document.documentElement.setAttribute("dir", direction)
    document.documentElement.setAttribute("lang", currentLang)

    // Update all elements with data-i18n attribute
    const elements = document.querySelectorAll("[data-i18n]")
    elements.forEach((el) => {
      const key = el.getAttribute("data-i18n")
      el.textContent = t(key)
    })

    // Update placeholders
    const placeholders = document.querySelectorAll("[data-i18n-placeholder]")
    placeholders.forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder")
      el.setAttribute("placeholder", t(key))
    })

    // Update aria-labels
    const ariaLabels = document.querySelectorAll("[data-i18n-aria]")
    ariaLabels.forEach((el) => {
      const key = el.getAttribute("data-i18n-aria")
      el.setAttribute("aria-label", t(key))
    })

    // Update language buttons
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

  return {
    init: init,
    setLanguage: setLanguage,
    getLanguage: getLanguage,
    t: t,
    applyLanguage: applyLanguage,
  }
})()

// Export for use in other modules
if (typeof window !== "undefined") {
  window.I18n = I18n
}
