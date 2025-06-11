// Wait for the DOM to fully load before executing any script
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage on page load
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // Load task without re-saving
        });
    }

    // Function to add a task to the DOM and optionally save it
    function addTask(taskText, save = true) {
        // If taskText is not provided (e.g., user clicked Add), get input value
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        // Don't add empty tasks
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new list item <li>
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the "Remove" button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Remove task on button click and update Local Storage
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(taskText);
        };

        // Append button to list item, and list item to task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';

        // Save task to Local Storage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Function to remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Add task on button click
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Add task when pressing "Enter" key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

});
