//Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');


//Event Listners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteAndCheck);
//Functions

function deleteAndCheck(event){
    const item = event.target;

    // delete item
    if(item.classList[0] === 'trash-btn'){
        item.parentElement.remove();
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