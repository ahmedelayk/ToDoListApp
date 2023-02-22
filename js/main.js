let input = document.querySelector(".form input[type ='text']");
let addBtn = document.querySelector(".form input[type ='submit']");
let taskContainer = document.querySelector(".task-container");
// empty array for adding tasks in
let taskArr = [];
// Check if there is data in local storage
if (window.localStorage.getItem("tasks")) {
  taskArr = JSON.parse(localStorage.getItem("tasks"));
}
// get data from local storage
getTasksFromLocalStorage();
// click on add button 
addBtn.addEventListener("click", function () {
  // check if textfield has value or not ?
  if (input.value != "") {
    addTaskToArray(input.value);
  }
  input.value = "";
});
// click on delete button or finish button
taskContainer.addEventListener("click", function (event) {
  let id = event.target.parentElement.parentElement.dataset.id;
  if (event.target.classList.contains("del")) {
    // console.log(event.target.parentElement.parentElement.dataset.id);
    deleteTask(id);
    getTasksFromLocalStorage();
  }
  if (event.target.classList.contains("finish")) {
    event.target.parentElement.parentElement.classList.add("finished");
    toggleFinishBtn(id);
  }
});
// push task to array of tasks.
function addTaskToArray(taskname) {
  const task = {
    id: Date.now(),
    content: taskname,
    finished: false,
  }
  if (taskArr.length == 0) {
    taskArr.push(task);
  }
  // check if there is the same task name 
  var unique = false;
  for (let i = 0; i < taskArr.length; i++) {
    if (taskArr[i].content == taskname) {
      unique = false;
      // console.log("found");
      break;
    } else {
      // console.log("Not found");
      unique = true;
    }
  }
  if (unique) {
    taskArr.push(task);
  } else {
    console.log("this task is found already in your to do list");
  }

  // append tasks to the page
  appendTasksToPage(taskArr);
  // Save to local storage
  saveTasksArrayToLocalStorage(taskArr);
}
// Add tasks to page
function appendTasksToPage(taskArr) {
  taskContainer.innerHTML = "";
  // create heading h3
  let title = document.createElement("h3");
  title.appendChild(document.createTextNode("Tasks you added"));
  taskContainer.appendChild(title);
  taskArr.forEach((task) => {
    // create parent div for any task
    let div = document.createElement("div");
    div.className = "task";
    // check if the task is finished 
    if (task.finished) {
      div.className = "task finished";
    }
    // add data-id attribute for every div
    div.setAttribute("data-id", task.id);
    // create span for task content
    let taskName = document.createElement("span");
    taskName.appendChild(document.createTextNode(task.content));
    div.appendChild(taskName);
    // create btns div for finished and delete buttons
    let btnsDiv = document.createElement("div");
    btnsDiv.className = "btns";
    // create span for finished button
    let finishspan = document.createElement("span");
    finishspan.className = "finish";
    if (!task.finished) {
      finishspan.appendChild(document.createTextNode("Finish"));
    } else {
      finishspan.appendChild(document.createTextNode("Finished"));
    }
    
    btnsDiv.appendChild(finishspan);
    // create span for delet button
    let deletespan = document.createElement("span");
    deletespan.className = "del";
    deletespan.appendChild(document.createTextNode("Delete"));
    btnsDiv.appendChild(deletespan);
    div.appendChild(btnsDiv);
    taskContainer.appendChild(div);
  });
}
// Save Array of tasks in local storage
function saveTasksArrayToLocalStorage(taskArr) {
  window.localStorage.setItem("tasks", JSON.stringify(taskArr));
}
// function for get data from local storage
function getTasksFromLocalStorage(){
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    if (tasks.length == 0) {
      taskContainer.innerHTML = "<h3>No tasks added yet.</h3>";
      console.log("hello");
    } else {
      appendTasksToPage(tasks);
    }
    
  }
}
// function for delete a task
function deleteTask(id) {
  taskArr = taskArr.filter((task) => task.id != id);
  saveTasksArrayToLocalStorage(taskArr);
}
// function for make a task finished or not
function toggleFinishBtn(id) {
  taskArr.forEach((task) => {
    if (task.id == id) {
      task.finished == true ? task.finished = false : task.finished = true;
    }
  });
  saveTasksArrayToLocalStorage(taskArr);
  getTasksFromLocalStorage();
}