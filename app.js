//Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteAndCheck);
filterOption.addEventListener('change', filterTodo);


//Functions
function saveLocalTodo(todo){
    let todos;

    // do we have any save data
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos')); // load save data
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function filterTodo(event){

    // we  use Array.from to convert the HtmlCollection to an array so we can call foreach on it
    const todos = Array.from(todoList.children);
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "complete":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "incomplete":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'none';
                } else {
                    todo.style.display = 'flex';
                }
                break;
        }
    });

}

function deleteAndCheck(event){
    const item = event.target;

    // delete item
    if(item.classList[0] === 'trash-btn'){
        item.parentElement.classList.add('fall');
        removeTodosLocalStorage(item.parentElement);
        item.parentElement.addEventListener('transitionend', function(){
            item.parentElement.remove();
        });
        
    }

    // check as complete
    if(item.classList[0] === "complete-btn"){
        item.parentElement.classList.toggle('completed');
    }
}  

function addTodo(event){
    event.preventDefault(); // can stop default behavior from button click i.e. refreshing page on submit
    
    // div wrapper for element 
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // creates li element for a list item
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // add to localstorage
    saveLocalTodo(todoInput.value);

    // CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // TRASH/DELETE BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    //clear input
    todoInput.value = '';

}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos')); // load save data
    }

    todos.forEach((todo) => {
        // div wrapper for element 
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // creates li element for a list item
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // CHECK MARK BUTTON
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        // TRASH/DELETE BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });

}

function removeTodosLocalStorage(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos')); // load save data
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}