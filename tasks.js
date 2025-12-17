/**
 * Tasks Module
 * Handles all task-related functionality
 */
const TasksModule = (() => {
  let currentFilter = "all"
  let editingTaskId = null

  // Declare I18n and App variables
  const I18n = window.I18n // Assuming I18n is available on the window object
  const App = window.App // Assuming App is available on the window object

  function init() {
    if (typeof Storage === "undefined" || typeof I18n === "undefined" || typeof App === "undefined") {
      return
    }

    setupEventListeners()
    renderTasks()
    updateFilterButtons()
  }

  function setupEventListeners() {
    // Add task button
    const addBtn = document.getElementById("addTaskBtn")
    if (addBtn) {
      addBtn.addEventListener("click", openAddModal)
    }

    // Modal close button
    const closeBtn = document.getElementById("closeModalBtn")
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal)
    }

    // Modal overlay click to close
    const overlay = document.getElementById("taskModalOverlay")
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          closeModal()
        }
      })
    }

    // Form submission
    const form = document.getElementById("taskForm")
    if (form) {
      form.addEventListener("submit", handleFormSubmit)
    }

    // Cancel button
    const cancelBtn = document.getElementById("cancelTaskBtn")
    if (cancelBtn) {
      cancelBtn.addEventListener("click", closeModal)
    }

    // Filter buttons
    const filterBtns = document.querySelectorAll(".filter-btn")
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        currentFilter = this.getAttribute("data-filter")
        updateFilterButtons()
        renderTasks()
      })
    })

    // Keyboard escape to close modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal()
      }
    })
  }

  function updateFilterButtons() {
    const filterBtns = document.querySelectorAll(".filter-btn")
    filterBtns.forEach((btn) => {
      const filter = btn.getAttribute("data-filter")
      if (filter === currentFilter) {
        btn.classList.add("active")
      } else {
        btn.classList.remove("active")
      }
    })
  }

  function openAddModal() {
    editingTaskId = null
    const form = document.getElementById("taskForm")
    if (form) {
      form.reset()
    }

    const modalTitle = document.getElementById("modalTitle")
    if (modalTitle) {
      modalTitle.textContent = I18n.t("tasks.add")
    }

    const overlay = document.getElementById("taskModalOverlay")
    if (overlay) {
      overlay.classList.add("active")
    }

    // Focus on title input
    const titleInput = document.getElementById("taskTitle")
    if (titleInput) {
      setTimeout(() => {
        titleInput.focus()
      }, 100)
    }
  }

  function openEditModal(taskId) {
    editingTaskId = taskId
    const task = Storage.getTaskById(taskId)
    if (!task) return

    const modalTitle = document.getElementById("modalTitle")
    if (modalTitle) {
      modalTitle.textContent = I18n.t("tasks.edit")
    }

    // Populate form
    const titleInput = document.getElementById("taskTitle")
    if (titleInput) {
      titleInput.value = task.title
    }

    const descInput = document.getElementById("taskDescription")
    if (descInput) {
      descInput.value = task.description || ""
    }

    const dueDateInput = document.getElementById("taskDueDate")
    if (dueDateInput && task.dueDate) {
      dueDateInput.value = task.dueDate.split("T")[0]
    }

    const prioritySelect = document.getElementById("taskPriority")
    if (prioritySelect) {
      prioritySelect.value = task.priority || "low"
    }

    const overlay = document.getElementById("taskModalOverlay")
    if (overlay) {
      overlay.classList.add("active")
    }
  }

  function closeModal() {
    const overlay = document.getElementById("taskModalOverlay")
    if (overlay) {
      overlay.classList.remove("active")
    }
    editingTaskId = null

    // Clear any validation errors
    const errorEl = document.getElementById("titleError")
    if (errorEl) {
      errorEl.textContent = ""
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault()

    const titleInput = document.getElementById("taskTitle")
    const descInput = document.getElementById("taskDescription")
    const dueDateInput = document.getElementById("taskDueDate")
    const prioritySelect = document.getElementById("taskPriority")
    const errorEl = document.getElementById("titleError")

    // Validation
    const title = titleInput ? titleInput.value.trim() : ""
    if (!title) {
      if (errorEl) {
        errorEl.textContent = I18n.t("tasks.validation.titleRequired")
      }
      return
    }

    if (errorEl) {
      errorEl.textContent = ""
    }

    const taskData = {
      title: title,
      description: descInput ? descInput.value.trim() : "",
      dueDate: dueDateInput && dueDateInput.value ? new Date(dueDateInput.value).toISOString() : null,
      priority: prioritySelect ? prioritySelect.value : "low",
    }

    if (editingTaskId) {
      Storage.updateTask(editingTaskId, taskData)
      App.showToast(I18n.t("tasks.updated"))
    } else {
      Storage.addTask(taskData)
      App.showToast(I18n.t("tasks.created"))
    }

    closeModal()
    renderTasks()
  }

  function toggleTaskComplete(taskId) {
    const task = Storage.getTaskById(taskId)
    if (task) {
      Storage.updateTask(taskId, { completed: !task.completed })
      if (!task.completed) {
        App.showToast(I18n.t("tasks.completed"))
      }
      renderTasks()
    }
  }

  function deleteTask(taskId) {
    if (confirm(I18n.t("tasks.deleteConfirm"))) {
      Storage.deleteTask(taskId)
      App.showToast(I18n.t("tasks.deleted"))
      renderTasks()
    }
  }

  function renderTasks() {
    const container = document.getElementById("taskList")
    if (!container) return

    let tasks = Storage.getTasks()

    // Apply filter
    if (currentFilter === "pending") {
      tasks = tasks.filter((t) => !t.completed)
    } else if (currentFilter === "completed") {
      tasks = tasks.filter((t) => t.completed)
    }

    // Sort: incomplete first, then by due date
    tasks.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1
      }
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate)
      }
      if (a.dueDate) return -1
      if (b.dueDate) return 1
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

    if (tasks.length === 0) {
      container.innerHTML =
        '<div class="empty-state">' + App.getIcon("empty") + "<p>" + I18n.t("tasks.empty") + "</p>" + "</div>"
      return
    }

    let html = ""
    tasks.forEach((task) => {
      const isOverdue = !task.completed && task.dueDate && App.isOverdue(task.dueDate)

      html +=
        '<li class="task-item' +
        (task.completed ? " completed" : "") +
        '" data-task-id="' +
        task.id +
        '">' +
        '<input type="checkbox" class="form-checkbox task-checkbox" ' +
        (task.completed ? "checked" : "") +
        " " +
        'aria-label="' +
        I18n.t("tasks.form.title") +
        '" ' +
        'data-action="toggle">' +
        '<div class="task-content">' +
        '<div class="task-title">' +
        escapeHtml(task.title) +
        "</div>" +
        '<div class="task-meta">'

      if (task.dueDate) {
        html += "<span" + (isOverdue ? ' style="font-weight:600"' : "") + ">" + App.formatDate(task.dueDate) + "</span>"
      }

      if (task.priority) {
        html +=
          '<span class="task-priority ' +
          task.priority +
          '">' +
          I18n.t("tasks.form.priority." + task.priority) +
          "</span>"
      }

      html +=
        "</div></div>" +
        '<div class="task-actions">' +
        '<button class="btn btn-ghost btn-icon" data-action="edit" aria-label="' +
        I18n.t("common.edit") +
        '">' +
        App.getIcon("edit") +
        "</button>" +
        '<button class="btn btn-ghost btn-icon" data-action="delete" aria-label="' +
        I18n.t("common.delete") +
        '">' +
        App.getIcon("delete") +
        "</button>" +
        "</div></li>"
    })

    container.innerHTML = html

    // Add event listeners to task items
    container.querySelectorAll(".task-item").forEach((item) => {
      const taskId = item.getAttribute("data-task-id")

      const checkbox = item.querySelector('[data-action="toggle"]')
      if (checkbox) {
        checkbox.addEventListener("change", () => {
          toggleTaskComplete(taskId)
        })
      }

      const editBtn = item.querySelector('[data-action="edit"]')
      if (editBtn) {
        editBtn.addEventListener("click", () => {
          openEditModal(taskId)
        })
      }

      const deleteBtn = item.querySelector('[data-action="delete"]')
      if (deleteBtn) {
        deleteBtn.addEventListener("click", () => {
          deleteTask(taskId)
        })
      }
    })
  }

  function escapeHtml(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }

  return {
    init: init,
    renderTasks: renderTasks,
  }
})()

if (typeof window !== "undefined") {
  window.TasksModule = TasksModule
}

document.addEventListener("DOMContentLoaded", () => {
  // Only initialize on tasks page
  if (document.getElementById("taskList")) {
    TasksModule.init()
  }
})
