const taskInput = document.querySelector(".input-task input"),
filters = document.querySelectorAll(".filters span"),
clear = document.querySelector(".clear-btn"),
taskBox = document.querySelector(".task-box");

let editid;
let isedited=false;
let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", ()=> {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let li= "";
      if(todos){
        todos.forEach(( todo, id) => {
            let iscompleted = todo.status == "completed" ? "checked":"";
            if(filter == todo.status || filter=="all"){
        li += `<li class="tasks">
                <label for="${id}">
                <input onclick= "updateStatus(this)" type="checkbox" id="${id}" ${iscompleted}>
                <p class="${iscompleted}">${todo.name}</p>
            </label>
            <div class="setting">
                <i onclick="showmenu(this)" class="uil uil-ellipsis-h"></i>
                <ul class="task-menu">
                    <li onclick="edittask(${id},'${todo.name}')"><i class="uil uil-pen"></i>Edit</li>
                    <li onclick="deletetask(${id})"><i class="uil uil-trash"></i>delete</li>
                </ul>
            </div>
            </li>`;
           }
        });
   }
        
   taskBox.innerHTML = li || `<span>no tasks here!</span>`;    
}
showTodo("all");

function edittask(taskid,taskname){
    editid=taskid;
    isedited=true;
    taskInput.value= taskname;
}
function deletetask(deleteid){
    todos.splice(deleteid,1);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodo("all");
}

clear.addEventListener("click", () => {
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodo("all");
})

function showmenu(selectedTask){
    let taskmenu = selectedTask.parentElement.lastElementChild;
    taskmenu.classList.add("show");
    document.addEventListener("click", e=> {
        if(e.target.tagName != "I" || e.target != selectedTask){
            taskmenu.classList.remove("show");
        }
    })
}

function updateStatus(selectedTask){
  let taskname = selectedTask.parentElement.lastElementChild;
  if(selectedTask.checked){
    taskname.classList.add("checked");
    todos[selectedTask.id].status ="completed";
  } else {
    taskname.classList.remove("checked");
    todos[selectedTask.id].status ="pending";
  }
  localStorage.setItem("todo-list",JSON.stringify(todos));
}

taskInput.addEventListener( "keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask){
        if(!isedited){
            if(!todos){
                todos=[];
            }
            let taskInfo = {name: userTask,status: "pending"};
            todos.push(taskInfo);
        }
        else {
            isedited=false;
            todos[editid].name = userTask;
        }
        taskInput.value="";
        localStorage.setItem("todo-list",JSON.stringify(todos));
        showTodo("all");
    }
});