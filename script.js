const taskInput=document.querySelector(".task-input input");
let taskBox=document.querySelector(".task-box")
let clear=document.querySelector(".clear-btn")


let editId;
let isTaskEdited=false //use as switch

let todos=JSON.parse(localStorage.getItem("todo-list")) //covert string to object


  function showTodos(){
    let li="";
  if(todos){  //when todos are present
    todos.forEach((value,id)=>{
      //if todo status is compledted return value checked
      let isComplete=value.status=="completed"?"checked":"";
        li+=`<div class="task">
            <div class="sec">
                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isComplete}>
                <p class=${isComplete}>${value.name}</p>
            </div>
            <div class="status">${value.status}</div>
            <div class="settings">
                <button onclick="editTask(${id},'${value.name}','${value.status}')" class="update">Update</button>
                <button onclick="deleteTask(${id})" class="delete">Delete</button>
            </div>
    </div>`
  })
  }
    taskBox.innerHTML=li || "<span>You don't have any task here </span>"
  }




  function updateStatus(selectvalue){
    //targeting paragraph
    let taskName=selectvalue.parentElement.lastElementChild
    if(selectvalue.checked){
      taskName.classList.add('checked');
     // updated the status of task to completed
      todos[selectvalue.id].status="completed"
    }else{
      //updated the status of task to pending
      taskName.classList.remove('checked');
      todos[selectvalue.id].status="pending"
    }
  // We have to update value in locaL storage
  showTodos()
   localStorage.setItem("todo-list",JSON.stringify(todos))
  }

  function deleteTask(taskValue){
    //delete and update new todo value
    todos.splice(taskValue,1)
    localStorage.setItem("todo-list",JSON.stringify(todos)) ///to get all the todos  
    showTodos()
  }

  function editTask(id,editvalue,statusvalue){
    if(statusvalue=="completed"){
      alert("you cannot update completed task.Please create a new task")
    }else{
    editId=id //stores the id
     taskInput.value=editvalue
     isTaskEdited=true  //now turn on the switch as we have to edit
    }
  }

taskInput.addEventListener("keyup",e=>{
    let userTask=taskInput.value.trim();
    if(e.key=="Enter" && userTask){
  if(!isTaskEdited){ //if task is true
 //if no todos found then return an empty array
 if(!todos){
  todos=[]
}
let taskInfo={name:userTask,status:"pending"}
todos.push(taskInfo) //adding new value to the array
  }else{
isTaskEdited=false;
todos[editId].name=userTask
  }
       
        //empty input value after enter
        taskInput.value=""
        localStorage.setItem("todo-list",JSON.stringify(todos))
        showTodos() //use to get updated value of todos
    }
})

clear.addEventListener("click",()=>{
  todos.splice(0)
  localStorage.setItem("todo-list",JSON.stringify(todos)) 
  showTodos()
})

showTodos()//call by default