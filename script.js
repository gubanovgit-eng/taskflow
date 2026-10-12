const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Превращаем старые задачи в новый формат
tasks = tasks.map(function (task) {
    if (typeof task === "string") {
        return { text: task, completed: false };
    }

    return task;
});

// Сохраняем задачи
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Обновляем счётчик
function updateCount() {
    taskCount.textContent = tasks.length;
}

// Создаём задачу на странице
function createTask(taskData) {
    const task = document.createElement("li");
    const text = document.createElement("span");
    const deleteButton = document.createElement("button");

    text.textContent = taskData.text;
    text.style.textDecoration =
        taskData.completed ? "line-through" : "none";

    deleteButton.textContent = "Удалить";

    // Отмечаем задачу выполненной или невыполненной
    task.addEventListener("click", function () {
        taskData.completed = !taskData.completed;

        text.style.textDecoration =
            taskData.completed ? "line-through" : "none";

        saveTasks();
    });

    // Удаляем задачу
    deleteButton.addEventListener("click", function (event) {
        event.stopPropagation();

        tasks = tasks.filter(function (item) {
            return item !== taskData;
        });

        task.remove();
        saveTasks();
        updateCount();
    });

    task.appendChild(text);
    task.appendChild(deleteButton);
    taskList.appendChild(task);
}

// Загружаем сохранённые задачи
tasks.forEach(function (taskData) {
    createTask(taskData);
});

saveTasks();
updateCount();

// Добавляем новую задачу
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = input.value.trim();

    if (taskText === "") {
        return;
    }

    const taskData = {
        text: taskText,
        completed: false
    };

    tasks.push(taskData);
    createTask(taskData);
    saveTasks();
    updateCount();

    input.value = "";
});