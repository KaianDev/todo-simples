//Elementos

//Elementos do formulário To-do
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');

//Elementos do formulário Edição
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const btnCancel = document.querySelector('#btn-cancel');

//To-do List
const todoList = document.querySelector('#todo-list');

//Toolbar
const searchInput = document.querySelector('#search-input');
const eraseBtn = document.querySelector('#erase-btn');
const filterSelect = document.querySelector('#filter-select');

let oldInputValue;

//Funções

const saveTodo = (text) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo');

    const todoTitle = document.createElement('h3');
    todoTitle.innerText = text;

    const btnFinish = document.createElement('button');
    btnFinish.classList.add('finish-todo');
    btnFinish.innerHTML = '<i class="fa-solid fa-check"></i>';

    const btnEdit = document.createElement('button');
    btnEdit.classList.add('edit-todo');
    btnEdit.innerHTML = '<i class="fa-solid fa-pen"></i>';

    const btnRemove = document.createElement('button');
    btnRemove.classList.add('remove-todo');
    btnRemove.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    todoItem.appendChild(todoTitle);
    todoItem.appendChild(btnFinish);
    todoItem.appendChild(btnEdit);
    todoItem.appendChild(btnRemove);

    todoList.prepend(todoItem);
}


const toggleForm = () =>{
    editForm.classList.toggle('hide');
    todoForm.classList.toggle('hide');
    todoList.classList.toggle('hide');
}

const updateTodo = (text) => {

    let todos = document.querySelectorAll('.todo');

    todos.forEach((todo)=>{
        todoTitle = todo.querySelector('h3');
        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }
    })
}


//Remover To-do
function removeTodo(targetEl, parentEl) {
    if (targetEl.classList.contains('remove-todo')) {
        parentEl.remove();
    }
}


//Finalizar To-do
function doneTodo(targetEl, parentEl) {
    if (targetEl.classList.contains('finish-todo')) {
        parentEl.classList.toggle('done');
    }
}

const searchTodo = () => {
    const inputValue = searchInput.value;
    const todos = document.querySelectorAll('.todo');
    if(inputValue) {
        todos.forEach((todo)=>{
            let todoTitle = (todo.querySelector('h3').innerText).toLowerCase();
            let searchInput = inputValue.toLowerCase();
            if(todoTitle.includes(searchInput)){
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
        })
    }else {
        todos.forEach((todo)=>{
            todo.style.display = 'flex';
        })
    }
}

const filterTodo = () => {
    const todoDone = document.querySelectorAll('#filter-select')[0][1];
    const todoDo = document.querySelectorAll('#filter-select')[0][2];
    const todos = document.querySelectorAll('.todo');

    todos.forEach((todo)=>{
        if(todoDone.selected){
            if(todo.classList.contains('done')){
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
        } else if (todoDo.selected){
            if(!todo.classList.contains('done')){
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
        } else {
            todo.style.display = 'flex';
        }
    })
}

//Eventos
todoForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const inputValue = todoInput.value;

    if(inputValue){
        saveTodo(inputValue);
    }
    todoInput.value = '';
    todoInput.focus();
})

document.addEventListener('click',(element)=>{
    const targetEl = element.target;
    const parentEl = targetEl.closest('div');

    let todoTitle;
    
    doneTodo(targetEl, parentEl);

    if(targetEl.classList.contains('edit-todo')){
        if(parentEl.querySelector('h3')){
            todoTitle = parentEl.querySelector('h3').innerText;
        }
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
        toggleForm();
    }

    removeTodo(targetEl, parentEl);

})

editForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    let editInputValue = editInput.value;
    if(editInputValue){
        updateTodo(editInputValue);
    }
   
    toggleForm();

})

btnCancel.addEventListener('click',(e)=>{
    e.preventDefault();
    toggleForm();
})

searchInput.addEventListener('input',searchTodo);

eraseBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    searchInput.value = '';
    searchTodo();
})

filterSelect.addEventListener('change',filterTodo);

document.querySelector('footer p').innerText += ` - ${new Date().getFullYear()}`;
