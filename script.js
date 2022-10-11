// const todo={
//   id: '',
//   title: '',
//   isCompleted: false
// };
//Get todoDB from local storage
const todoDB = 'db101'
//Reading from the local storage
let todoDBInstance = JSON.parse(localStorage.getItem(todoDB)) || [];


//util
const pageReload = () => {
  window.location.reload();
}
//Todo: create function
const addTodo =()=>{
  const todoInput = document.getElementById('todo-input')
  const title = todoInput.value
 
  const newTodo ={
    _id: todoDBInstance.length + 1,
    title: title,
    isCompleted: false
  }
  const updatedTodoDB = [...todoDBInstance, newTodo];
  localStorage.setItem(todoDB, JSON.stringify(updatedTodoDB))
  pageReload()
  // todoInput.value = '';
}
const addBtn =document.querySelector('#add-btn')
const editBtn =document.querySelector('.edit-btn')
// const checkBtn =document.querySelector('.complete-status-icon')
//Todo: Render fuction
const renderTodoItems = () => {
  const todoListContainer = document.querySelector('#todo-list-container');
  const todoListItems = todoDBInstance.map(todo=>{
    const {_id, title, isCompleted} = todo;
    return`
    <li class="${isCompleted && 'checked'}">${title}
    <span class="complete-status-icon" onClick="toggleMode(${_id})">✅</span>
    <span class="edit-icon" onClick="editMode(${_id})">✍</span>
    <span class="close" onClick="deleteTodo(${_id})">🗑</span>
    </li>
    
    
    `;
  }).join("");
  todoListContainer.innerHTML = todoListItems
}
//Todo: Update function
const editMode = (_id)=>{
  const todo = todoDBInstance.find((todo) => todo._id ===_id);
  document.getElementById('todo-input').value = todo.title;
  addBtn.style.display = 'none';
  editBtn.style.display = 'block';
  editBtn.setAttribute("id", _id)
}
function updateTodoTitle() {
  const { id } = this;
  const _id= parseInt(id)
  const todoToUpdate = todoDBInstance.find((todo) => todo._id ===_id);
  todoToUpdate.title = document.getElementById('todo-input').value

  const updatedTodoDB = todoDBInstance.map((todo) => 
  todo._id ===_id? todoToUpdate: todo)
  localStorage.setItem(todoDB, JSON.stringify(updatedTodoDB))
  pageReload();
}
//Todo: delete function  
function deleteTodo(todoId) {
  const updatedTodoDB = todoDBInstance.filter(({ _id }) => _id !== todoId);
  localStorage.setItem(todoDB, JSON.stringify(updatedTodoDB))
  pageReload();
}

//toggleTodo

const toggleMode = (_id) => {
  const todoToUpdate = todoDBInstance.find((emeka) => emeka._id ===_id);
  todoToUpdate.isCompleted = !todoToUpdate['isCompleted'];
  localStorage.setItem(todoDB, JSON.stringify([...todoDBInstance]))
  pageReload();
}

//Add EventListener
renderTodoItems();
addBtn.addEventListener('click', addTodo);
editBtn.addEventListener('click', updateTodoTitle);
// checkBtn.addEventListener('click', toggleMode);



// <span class="close" onClick="deleteTodo(${id})"></span>