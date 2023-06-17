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

class TodoItem {
    constructor(title, done, id) {
        this.title = title;
        this.done = done;
        this.id = id;
    }
}

class Db {
    constructor() {
        let id = localStorage.getItem('idT');
        if(id === null){
            localStorage.setItem('idT',0);
        }
    }

    getNextId() {
        let nextId = localStorage.getItem('idT');
        return (Number(nextId)+1);
    }

    insertTodo(item){
        let id = this.getNextId();
        localStorage.setItem(`todo@${id}`, item);
        localStorage.setItem('idT', id);
    }

    loadTodo(){
        let id = localStorage.getItem('idT');
        let todoItems = [];
        for (let i = 1; i <= id; i++) {
            let todoItem = JSON.parse(localStorage.getItem(`todo@${i}`));
            
            if(todoItem == null){
                continue;
            }

            todoItems.push(
                todoItem
            )
        }
        return todoItems
    }

    updateTodo(id, todo){
        localStorage.setItem(`todo@${id}`, JSON.stringify(todo));
    }

}

let db = new Db();

//Funções
const saveTodo = (text, load = false, done = false) => {

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

    let id = db.getNextId()
    
    if(load == false){
        let objTodoItem = new TodoItem(text, false, id);
        db.insertTodo(JSON.stringify(objTodoItem));
        console.log(objTodoItem);
    }

    if(done) {
        todoItem.classList.add('done');
    }
}

const toggleForm = () =>{
    editForm.classList.toggle('hide');
    todoForm.classList.toggle('hide');
    todoList.classList.toggle('hide');
}

const updateTodo = (text) => {
    let todos = document.querySelectorAll('.todo');
    let todosLS = db.loadTodo();

    todos.forEach((todo)=>{
        let todoTitle = todo.querySelector('h3');
        if(todoTitle.innerText === oldInputValue){
            todosLS.map((todoLS)=>{
                if(todoLS.title === oldInputValue){
                    todoTitle.innerText = text;
                    let objTodoItem = new TodoItem(text, todoLS.done, todoLS.id);
                    db.updateTodo(todoLS.id, objTodoItem);
                }
            })
        }
    })
}

//Remover To-do
function removeTodo(targetEl, parentEl) {
    if (targetEl.classList.contains('remove-todo')) {

        let todoTitle = parentEl.querySelector('h3').innerText;
        let todos = db.loadTodo();
        todos.map((todo)=>{
            if(todo.title == todoTitle){
                let id = todo.id;
                parentEl.remove();
                localStorage.removeItem(`todo@${id}`)
            }
        })
    }
}

//Finalizar To-do
function doneTodo(targetEl, parentEl) {
    
    if (targetEl.classList.contains('finish-todo')) {
        parentEl.classList.toggle('done');
        let todoTitle = parentEl.querySelector('h3').innerText;
        let todos = db.loadTodo();

        todos.forEach((todo) => {
            if(todo.title === todoTitle){
                let id = todo.id;
                let done = todo.done == true ? false : true;
                let objTodoItem = new TodoItem(todoTitle, done, id);
                db.updateTodo(id, objTodoItem);
            }
        })        
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
    const todos = document.querySelectorAll('.todo')

    todos.forEach((todo)=>{
        todo.style.display = 'none';
        switch(filterSelect.value){
            case 'done':
                todo.classList.contains('done') ?
                todo.style.display = 'flex' : 
                'none';
                break;

            case 'todo':
                !todo.classList.contains('done') ?
                todo.style.display = 'flex' : 
                'none';
                break;

            default:
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
});

filterSelect.addEventListener('change',filterTodo);

function loadTodoListLS(){
    let todosLS = db.loadTodo();
    todosLS.map((todo)=>{
        saveTodo(todo.title, true, todo.done);
    })
}

loadTodoListLS();

document.querySelector('footer p').innerText += ` - ${new Date().getFullYear()}`;
