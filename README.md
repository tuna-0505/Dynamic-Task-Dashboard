# Web Technologies Laboratory - Assignment 4 (Dynamic Task Dashboard)

**Student Name:** Tunahan Mutlu  
**Student ID:** 230408002  

## 1. File Organization
The project is built as a single-page dynamic dashboard using modular vanilla JavaScript (ES6 Modules) and DOM APIs:

- `index.html`: Contains the essential structural elements (`#loadTasksBtn`, `#statusMessage`, `#taskList`).
- `styles.css`: Custom CSS styling task containers, status notifications, and completed states.
- `taskManager.js`: Defines the `Task` class (with immutable `id` property via `Object.defineProperty`) and `TaskManager` class managing immutable state updates.
- `api.js`: Simulates an asynchronous server request resolving raw dataset after 1500ms using Promises.
- `main.js`: Core orchestration script handling async/await fetching, JSON serialization/parsing, DOM creation (`createElement`, `appendChild`), and event management.
- `README.md`: Explains file setup, immutability, and implementation challenges.

## 2. Challenges Faced & Solutions
- **Immutable Array & Object State:** Preventing accidental mutation when updating tasks required using `Object.freeze()` combined with array spread operators (`[...]`), `.filter()`, and `.map()` instead of standard array methods like `.push()` or `.splice()`.
- **JSON Serialization Pipeline:** Fulfilling the requirement to process raw server data through `JSON.stringify` and `JSON.parse` before mapping back into ES6 class instances ensured safe data parsing practice.
- **Dynamic DOM Event Binding:** Avoiding inline event handlers (`onclick`) required creating elements dynamically with `document.createElement()` and binding closure-safe event listeners to each task's action buttons.
