// Elementos
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');

const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const btnCancel = document.querySelector('#btn-cancel');

const todoList = document.querySelector('#todo-list');

let oldInputValue;

//Funções
const saveTodo = (text)=>{

    const todoItem = createDivTodo();
    const todoTitle = createTitleTodo(text);
    const btnFinish = createBtnFinish();
    const btnEdit = createBtnEdit();
    const btnDelete = createBtnDelete();

    todoItem.appendChild(todoTitle);
    todoItem.appendChild(btnFinish);
    todoItem.appendChild(btnEdit);
    todoItem.appendChild(btnDelete);

    todoList.appendChild(todoItem);
    console.log(todoItem);  
}

const toggleForms = () => {
    todoForm.classList.toggle('hide');
    editForm.classList.toggle('hide');
    todoList.classList.toggle('hide');
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll('.todo');

    todos.forEach((todo)=>{
        let todoTitle = todo.querySelector('h3');
        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }
    })
}

function createBtnDelete() {
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('remove-todo');
    btnDelete.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    return btnDelete;
}

function createBtnEdit() {
    const btnEdit = document.createElement('button');
    btnEdit.classList.add('edit-todo');
    btnEdit.innerHTML = '<i class="fa-solid fa-pen"></i>';
    return btnEdit;
}

function createBtnFinish() {
    const btnFinish = document.createElement('button');
    btnFinish.classList.add('finish-todo');
    btnFinish.innerHTML = '<i class="fa-solid fa-check"></i>';
    return btnFinish;
}

function createTitleTodo(text) {
    const todoTitle = document.createElement('h3');
    todoTitle.innerText = text;
    return todoTitle;
}

function createDivTodo() {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo');
    return todoItem;
}

//Eventos

todoForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    if(todoInput.value){
        saveTodo(todoInput.value);
    }
    todoInput.value = '';
    todoInput.focus();
})

document.addEventListener('click',(element)=>{

    const targetEl = element.target;
    const parentEl = targetEl.closest('div');

    let todoTitle;

    if(targetEl.classList.contains('finish-todo')){
        parentEl.classList.toggle('done');
    }

    if(targetEl.classList.contains('remove-todo')){
        parentEl.remove();
    }

    if (targetEl.classList.contains('edit-todo')){
        if(parentEl.querySelector('h3')){
            todoTitle = parentEl.querySelector('h3').innerText;
        }
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
        toggleForms();
    }
})

editForm.addEventListener('submit',(event)=>{
    event.preventDefault();

    const editInputValue = editInput.value
    if(editInputValue){
        updateTodo(editInputValue);
    }
    toggleForms();
})

btnCancel.addEventListener('click',(event)=>{
    event.preventDefault();
    toggleForms();
})


document.querySelector('footer p').innerText += ` - ${new Date().getFullYear()}`;




