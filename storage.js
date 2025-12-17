/**
 * Storage Module
 * Handles all localStorage operations with error handling
 */
const Storage = (() => {
  const STORAGE_PREFIX = "taskapp_"

  const KEYS = {
    TASKS: STORAGE_PREFIX + "tasks",
    SETTINGS: STORAGE_PREFIX + "settings",
    ACTIVITY: STORAGE_PREFIX + "activity",
    FOCUS_STATS: STORAGE_PREFIX + "focus_stats",
  }

  function isAvailable() {
    try {
      const test = "__storage_test__"
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch (e) {
      return false
    }
  }

  function get(key) {
    if (!isAvailable()) {
      return null
    }
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (e) {
      return null
    }
  }

  function set(key, value) {
    if (!isAvailable()) {
      return false
    }
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (e) {
      return false
    }
  }

  function remove(key) {
    if (!isAvailable()) {
      return false
    }
    try {
      localStorage.removeItem(key)
      return true
    } catch (e) {
      return false
    }
  }

  function clear() {
    if (!isAvailable()) {
      return false
    }
    try {
      Object.values(KEYS).forEach((key) => {
        localStorage.removeItem(key)
      })
      return true
    } catch (e) {
      return false
    }
  }

  // Task Operations
  function getTasks() {
    return get(KEYS.TASKS) || []
  }

  function saveTasks(tasks) {
    return set(KEYS.TASKS, tasks)
  }

  function addTask(task) {
    const tasks = getTasks()
    task.id = Date.now().toString()
    task.createdAt = new Date().toISOString()
    task.completed = false
    tasks.push(task)
    saveTasks(tasks)
    addActivity("task_created", task.title)
    return task
  }

  function updateTask(taskId, updates) {
    const tasks = getTasks()
    const index = tasks.findIndex((t) => t.id === taskId)
    if (index !== -1) {
      tasks[index] = Object.assign({}, tasks[index], updates, { updatedAt: new Date().toISOString() })
      saveTasks(tasks)
      if (updates.completed !== undefined) {
        addActivity(updates.completed ? "task_completed" : "task_uncompleted", tasks[index].title)
      } else {
        addActivity("task_updated", tasks[index].title)
      }
      return tasks[index]
    }
    return null
  }

  function deleteTask(taskId) {
    const tasks = getTasks()
    const task = tasks.find((t) => t.id === taskId)
    const filtered = tasks.filter((t) => t.id !== taskId)
    saveTasks(filtered)
    if (task) {
      addActivity("task_deleted", task.title)
    }
    return true
  }

  function getTaskById(taskId) {
    const tasks = getTasks()
    return tasks.find((t) => t.id === taskId) || null
  }

  // Activity Operations
  function getActivity() {
    return get(KEYS.ACTIVITY) || []
  }

  function addActivity(type, description) {
    const activity = getActivity()
    activity.unshift({
      id: Date.now().toString(),
      type: type,
      description: description,
      timestamp: new Date().toISOString(),
    })
    // Keep only last 50 activities
    if (activity.length > 50) {
      activity.pop()
    }
    set(KEYS.ACTIVITY, activity)
  }

  // Settings Operations
  function getSettings() {
    return (
      get(KEYS.SETTINGS) || {
        language: "ar",
        theme: "light",
        focusWorkDuration: 25,
        focusBreakDuration: 5,
      }
    )
  }

  function saveSettings(settings) {
    return set(KEYS.SETTINGS, settings)
  }

  // Focus Stats Operations
  function getFocusStats() {
    return (
      get(KEYS.FOCUS_STATS) || {
        totalSessions: 0,
        totalMinutes: 0,
        todaySessions: 0,
        lastSessionDate: null,
      }
    )
  }

  function saveFocusStats(stats) {
    return set(KEYS.FOCUS_STATS, stats)
  }

  function incrementFocusSessions(minutes) {
    const stats = getFocusStats()
    const today = new Date().toDateString()

    if (stats.lastSessionDate !== today) {
      stats.todaySessions = 0
    }

    stats.totalSessions += 1
    stats.totalMinutes += minutes
    stats.todaySessions += 1
    stats.lastSessionDate = today

    saveFocusStats(stats)
    addActivity("focus_completed", minutes + " minutes")
    return stats
  }

  // Export all data
  function exportData() {
    return {
      tasks: getTasks(),
      settings: getSettings(),
      activity: getActivity(),
      focusStats: getFocusStats(),
      exportedAt: new Date().toISOString(),
    }
  }

  return {
    KEYS: KEYS,
    isAvailable: isAvailable,
    get: get,
    set: set,
    remove: remove,
    clear: clear,
    getTasks: getTasks,
    saveTasks: saveTasks,
    addTask: addTask,
    updateTask: updateTask,
    deleteTask: deleteTask,
    getTaskById: getTaskById,
    getActivity: getActivity,
    addActivity: addActivity,
    getSettings: getSettings,
    saveSettings: saveSettings,
    getFocusStats: getFocusStats,
    saveFocusStats: saveFocusStats,
    incrementFocusSessions: incrementFocusSessions,
    exportData: exportData,
  }
})()

if (typeof window !== "undefined") {
  window.Storage = Storage
}
