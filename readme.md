# 📌 To-Do App (JavaScript)

A simple, clean, fully functional To-Do application built with **HTML, CSS, and Vanilla JavaScript**.
Supports adding tasks, marking them as finished, deleting tasks, and saving everything using **localStorage**.

---

## 🚀 Features

- ✔ Add new tasks
- ✔ Handles edge cases like preventing empty tasks and duplicate tasks
- ✔ Toggle tasks as finished / unfinished
- ✔ Delete single tasks
- ✔ Delete all tasks
- ✔ Finish all tasks
- ✔ Automatically save tasks and theme preference to **localStorage**
- ✔ Load saved tasks on page refresh
- ✔ Shows “No tasks to show” when list is empty
- ✔ Light & Dark Theme toggle



---

## 🧠 How It Works

### **1. Add Task**

- Validates empty input
- Checks duplicates
- Renders the task in the UI
- Saves everything to localStorage

### **2. Task Actions**

Each task supports:

- **Finish / Unfinish** — toggles a class
- **Delete** — removes the element and updates storage

### **3. Bulk Actions**

- **Delete All**
- **Finish All**

### **4. Local Storage**

All tasks are saved as an array of objects:

```json
[
  { "task": "Study", "finished": false },
  { "task": "Walk", "finished": true }
]
```

---

## ⚒️ Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript**
- Local Storage

---

## 📹 Live Demo

🔗 [Live Preview](https://rowanessam14.github.io/todo-app/)

---

## ❔ How to Run

1. Download or clone the repo:

```bash
   git clone https://github.com/RowanEssam14/todo-app
```

2. Open the project folder and open index.html in any browser (or use Live Server).
