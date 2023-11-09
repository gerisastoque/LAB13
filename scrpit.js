//"Cuadro que contine la lista de to do"
const taskManager = document.getElementById("taskManager")
taskManager.classList.add("taskManager")

//Primer cuadro vertical
const toDoList = document.createElement("div")
toDoList.classList.add("toDoList")
taskManager.appendChild(toDoList)

//"espacio para colocar nuevas tareas"
const addTask = document.createElement("div")
addTask.classList.add("addTask")
toDoList.appendChild(addTask)

// Crear un campo de texto para ingresar la tarea y un botón para publicarla
const inputTask = document.createElement("input");
inputTask.setAttribute("type", "text");
inputTask.setAttribute("placeholder", "Ingrese la tarea");
inputTask.classList.add("inputTask")
addTask.appendChild(inputTask);

const div = document.createElement("div")
div.classList.add("div")
addTask.appendChild(div)

const publishButton = document.createElement("button");
publishButton.textContent = "Publicar";
publishButton.classList.add("publishButton")
div.appendChild(publishButton);


//Lista de tareas por hacer
const toDo = document.createElement("div")
toDo.classList.add("toDo")
toDoList.appendChild(toDo)

const toDoTittle = document.createElement("p")
toDoTittle.innerText = "To do"
toDoTittle.classList.add("toDoTittle")
toDo.appendChild(toDoTittle)

const toDoTasks = document.createElement("div")
toDo.appendChild(toDoTasks)

// Lista de tareas que se estan haciendo
const doing = document.createElement("div")
doing.classList.add("doing")
taskManager.appendChild(doing)

const doingTittle = document.createElement("p")
doingTittle.innerText = "To do"
doingTittle.classList.add("toDoTittle")
doing.appendChild(doingTittle)

const doingTasks = document.createElement("div")
doing.appendChild(doingTasks)

//Lista de tareas completadas
const done = document.createElement("div")
done.classList.add("done")
taskManager.appendChild(done)

const doneTittle = document.createElement("p")
doneTittle.innerText = "To do"
doneTittle.classList.add("toDoTittle")
done.appendChild(doneTittle)

const doneTasks = document.createElement("div")
done.appendChild(doneTasks)

// Creación de la clase Task para representar las tareas
class Task {
    constructor(text, state) {
      this.text = text;
      this.state = state; // Estado: 'ToDo', 'Doing', 'Done'
    }
  }
  
  // Obtener datos del LocalStorage si existen, si no, inicializar como un array vacío
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
  // Función para guardar en el LocalStorage
  function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Función para agregar una tarea al array y al localStorage
  function addTaskToToDoList(text) {
    const task = new Task(text, 'ToDo');
    tasks.push(task);
    saveToLocalStorage();
  }
  
// Función para crear una tarjeta de tarea
function createTaskCard(task, index) {
    const taskCard = document.createElement("div");
    taskCard.classList.add('taskCard');
    taskCard.innerHTML = `
        <p>${task.text}</p>
        <button class="upButton" data-index="${index}">↑</button>
        <button class="downButton" data-index="${index}">↓</button>
        <button class="deleteButton" data-index="${index}">X</button>
    `;
    return taskCard;
}

// Función para renderizar las tareas en sus respectivas secciones
function renderTasks() {


    toDoTasks.innerHTML = '';
    doingTasks.innerHTML = '';
    doneTasks.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskCard = createTaskCard(task, index);
        if (task.state === 'ToDo') {
            toDoTasks.appendChild(taskCard);
        } else if (task.state === 'Doing') {
            doingTasks.appendChild(taskCard);
        } else if (task.state === 'Done') {
            doneTasks.appendChild(taskCard);
        }
    });

    // Event listeners para cambiar el estado y eliminar tareas
    document.querySelectorAll('.upButton').forEach(button => {
        button.addEventListener('click', event => {
            const index = event.target.dataset.index;
            changeTaskState(index, 'up');
        });
    });

    document.querySelectorAll('.downButton').forEach(button => {
        button.addEventListener('click', event => {
            const index = event.target.dataset.index;
            changeTaskState(index, 'down');
        });
    });

    document.querySelectorAll('.deleteButton').forEach(button => {
        button.addEventListener('click', event => {
            const index = event.target.dataset.index;
            deleteTask(index);
        });
    });
}
  
  
  // Event listener for adding a task to the 'ToDo' list
  publishButton.addEventListener('click', () => {
    const text = inputTask.value;
    addTaskToToDoList(text);
    renderTasks(); 
    inputTask.value = '';
});

// Mostrar las tareas al cargar la página
window.addEventListener('load', () => {
    renderTasks(); 
});






  