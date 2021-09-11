const form = document.querySelector('#add-todo');
const input = document.querySelector('#task');
const todoListBoard = document.querySelector('#todoList-board');
const currentTodoList = document.createElement('ul'); 
currentTodoList.setAttribute('id','todoList');
let todoListObj = {}; // take name as key and favoritefriend status as value

const createNewTodo = (inputTodo) => { // string input
  const newTodo= document.createElement('li'); //create <li></li> tag
  newTodo.innerText = inputTodo; //add string input into li tag
  const removeBtn = document.createElement('button'); // add remove btn into li tag
  removeBtn.innerText = 'remove'; //name button
  newTodo.append(removeBtn); // attach button to li tag
  return newTodo; // return li tag with todo and button 
};



if(localStorage.todoList) {
  let previousTodoList = JSON.parse(localStorage.todoList) //retrieve previous todoList from localStorage and parse it to JS
  todoListObj = {...previousTodoList}; // update todoListObject to previous todoList
  for(let currentTodo in todoListObj){ // loop over each todo in the list
    let todo = createNewTodo(currentTodo); // craete a todo
    if(todoListObj[currentTodo]==='completed'){ // check if todo was completed
      todo.setAttribute('class', 'completed'); // add completed class to completed todo
    } 
    currentTodoList.append(todo);// append todo to todoList
  }todoListBoard.append(currentTodoList); //append todoList to todoListBoard
} else {
  todoListBoard.append(currentTodoList); // append empty todoList to todoListBoard
}

  currentTodoList.addEventListener('click', (e)=> {
    if(e.target.tagName === 'LI') { 
      let todo = e.target.innerText.split('remove')[0]; // getting only todo name
      console.log(todo);
      if(e.target.classList.length){ // check if todo is crossed as completed
        e.target.classList.remove('completed');// take out crossing 
        todoListObj[todo] = "";
        saveTodos(todoListObj);//update localStorage
      }else{
        e.target.classList.add('completed');  // cross out todo as completed
        todoListObj[todo] = 'completed';
        saveTodos(todoListObj);// update localStorage
      }
    } 
    else if(e.target.tagName === 'BUTTON') {
      let removedTodo = e.target.parentElement.innerText.split('remove')[0];
      console.log(removedTodo);
      delete todoListObj[removedTodo]; // remove todo from todoListObj
      e.target.parentElement.remove();//remove todo out from todoList
      saveTodos(todoListObj);//update localStorage
    }
  }) 

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  if(input.value){
  todoListObj[input.value] = "";
  saveTodos(todoListObj);//update localStorage
  currentTodoList.append(createNewTodo(input.value));// attach todo on the currentTodoList
  input.value = "";// clear todoInput
  } else { //alert when user input empty todo
    alert('please type new todo!')
  };
});
/* function saveTodos, updates current todoList to localStorage  */


/* function renderTodoList, create todoLIst from previous todolist in localStorage */
const renderTodoList = () => {
  todoListObj = {...JSON.parse(localStorage.todoList)};
  for(let list in todoListObj){
    let newList = createNewTodo(list);
    if(todoListObj[list]==='completed'){
      newList.setAttribute('class','completed');
      } 
    currentTodoList.append(newList);
  }
  todoListBoard.append(currentTodoList);
}
const saveTodos = (updatedTodoList) => {
  localStorage.todoList = JSON.stringify(updatedTodoList);
}
