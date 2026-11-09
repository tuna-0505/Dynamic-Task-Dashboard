export class Task {
    constructor(id, title, completed = false) {
        Object.defineProperty(this, 'id', {
            value: id,
            writable: false,
            configurable: false,
            enumerable: true
        });

        this.title = title;
        this.completed = completed;
    }

    toggle() {
        return new Task(this.id, this.title, !this.completed);
    }
}

export class TaskManager {
    constructor(initialTasks = []) {
        this.tasks = Object.freeze([...initialTasks]);
    }

    setTasks(newTasks) {
        this.tasks = Object.freeze([...newTasks]);
    }

    addTask(task) {
        this.tasks = Object.freeze([...this.tasks, task]);
    }

    removeTask(taskId) {
        this.tasks = Object.freeze(this.tasks.filter(t => t.id !== taskId));
    }

    toggleTask(taskId) {
        this.tasks = Object.freeze(
            this.tasks.map(t => t.id === taskId ? t.toggle() : t)
        );
    }
}
