import { Task, TaskManager } from './taskManager.js';
import { fetchTasks } from './api.js';

const manager = new TaskManager();

const loadTasksBtn = document.getElementById('loadTasksBtn');
const statusMessage = document.getElementById('statusMessage');
const taskListContainer = document.getElementById('taskList');

function renderTasks() {
    taskListContainer.innerHTML = '';

    manager.tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = `task ${task.completed ? 'completed' : ''}`;

        const titleSpan = document.createElement('span');
        titleSpan.textContent = task.title;

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'task-actions';

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'btn-toggle';
        toggleBtn.textContent = task.completed ? 'Undo' : 'Complete';
        toggleBtn.addEventListener('click', () => {
            manager.toggleTask(task.id);
            renderTasks();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            manager.removeTask(task.id);
            renderTasks();
        });

        actionsDiv.appendChild(toggleBtn);
        actionsDiv.appendChild(deleteBtn);

        taskDiv.appendChild(titleSpan);
        taskDiv.appendChild(actionsDiv);

        taskListContainer.appendChild(taskDiv);
    });
}

async function handleLoadTasks() {
    statusMessage.textContent = 'Loading tasks...';
    statusMessage.style.color = '#7f8c8d';
    taskListContainer.innerHTML = '';

    try {
        const rawData = await fetchTasks();

        const jsonString = JSON.stringify(rawData);
        const parsedData = JSON.parse(jsonString);

        const taskInstances = parsedData.map(item => new Task(item.id, item.title, item.completed));

        manager.setTasks(taskInstances);
        renderTasks();

        statusMessage.textContent = '';
    } catch (error) {
        statusMessage.textContent = 'Failed to load tasks. Please try again.';
        statusMessage.style.color = '#e74c3c';
        console.error('Error fetching tasks:', error);
    }
}

loadTasksBtn.addEventListener('click', handleLoadTasks);
