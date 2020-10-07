/* 

* Upcoming
- Click on both a or i tag should work for links (check and delete buttons)
- Count the number of items in each list and display it
- Sort lists by the time of checking/un-checking
- If the list is empty show some card with a text

*/

// DECLARING DOM OBJECTS

const taskInputForm = document.getElementById("input-form");
const taskTitleInput = document.getElementById("task-name");
const taskList = document.getElementById("task-list");
const taskCompletedList = document.getElementById("completed-task-list");
const taskLists = document.getElementById("task-lists");
const taskClearAll = document.getElementById("clear-all-tasks");

// LOADING EVENT NOTIFIERS

loadEventsListeners();

function loadEventsListeners() {
  // Adding event from the input
  taskInputForm.addEventListener("submit", addTask);
  // Complete task from todo list
  taskList.addEventListener("click", completeTask);
  // Un-checking task from completed list
  taskCompletedList.addEventListener("click", unCompleteTask);
  // Deleting a task
  taskLists.addEventListener("click", deleteTask);
  // Searching for tasks
  taskTitleInput.addEventListener("keyup", filterTasks);
  // Clear all tasks
  taskClearAll.addEventListener("click", clearAllTasks);
}

/* 

█████╗ ██████╗ ██████╗     ████████╗ █████╗ ███████╗██╗  ██╗
██╔══██╗██╔══██╗██╔══██╗    ╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
███████║██║  ██║██║  ██║       ██║   ███████║███████╗█████╔╝ 
██╔══██║██║  ██║██║  ██║       ██║   ██╔══██║╚════██║██╔═██╗ 
██║  ██║██████╔╝██████╔╝       ██║   ██║  ██║███████║██║  ██╗
╚═╝  ╚═╝╚═════╝ ╚═════╝        ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
*/

/* 
  1. Listen for the event of submit button
  2. When pushed if the input is empty alert them that they should give an input
  3. <not now> When there is input, stop displaying the 'add some shit to do' text
  4. Create a new list item with the todo item template and use the input as the task name
*/

function addTask(event) {
  if (taskTitleInput.value === "") {
    alert("Please enter a valid value");
  } else {
    const newTask = generateTaskNode(taskTitleInput.value);
    taskList.appendChild(newTask);
    taskTitleInput.value = "";
  }
  event.preventDefault();
}

function generateTaskNode(taskName) {
  const li = document.createElement("li");
  li.classList.add("task-item", "row");
  li.innerHTML = `
    <a href="#" class="one column task-check-button">
        <i class="fa fa-square-o"></i>
    </a>
    <span class="ten columns">${taskName}</span>
    <a href="#" class="one column task-delete-button">
        <i class="fa fa-trash"></i>
    </a>
    `;
  return li;
}

/* 
 ██████╗ ██████╗ ███╗   ███╗██████╗ ██╗     ███████╗████████╗███████╗    ████████╗ █████╗ ███████╗██╗  ██╗
██╔════╝██╔═══██╗████╗ ████║██╔══██╗██║     ██╔════╝╚══██╔══╝██╔════╝    ╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
██║     ██║   ██║██╔████╔██║██████╔╝██║     █████╗     ██║   █████╗         ██║   ███████║███████╗█████╔╝ 
██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║     ██╔══╝     ██║   ██╔══╝         ██║   ██╔══██║╚════██║██╔═██╗ 
╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ███████╗███████╗   ██║   ███████╗       ██║   ██║  ██║███████║██║  ██╗
 ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚══════╝╚══════╝   ╚═╝   ╚══════╝       ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝                                                                                        
*/

/* 
  1. Listen for the event of check button in the incomplete list
  2. When pushed, copy the current li for a backup (using cloneNode)
  3. Remove the current li from the task-list and then in the clone ...
  4. Toggle fa-square-o class in the i element (with false to force it to remove)
  5. Toggle fa-check-square in the i element (with true to force it to add)
  6. Append the cloned node in the completed list
*/

function completeTask(event) {
  if (event.target.parentElement.classList.contains("task-check-button")) {
    // Cloning the li element first and manipulating for completed marking
    const clone = event.target.parentElement.parentElement.cloneNode(true);
    clone.children[0].children[0].classList.toggle("fa-check-square", true);
    clone.children[0].children[0].classList.toggle("fa-square-o", false);
    // Removing the element from the todo list
    event.target.parentElement.parentElement.remove();
    // Adding the clone to the completed list
    taskCompletedList.appendChild(clone);
  }
}

/* 
██╗   ██╗███╗   ██╗       ██████╗██╗  ██╗███████╗ ██████╗██╗  ██╗██╗███╗   ██╗ ██████╗     ████████╗ █████╗ ███████╗██╗  ██╗███████╗
██║   ██║████╗  ██║      ██╔════╝██║  ██║██╔════╝██╔════╝██║ ██╔╝██║████╗  ██║██╔════╝     ╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝██╔════╝
██║   ██║██╔██╗ ██║█████╗██║     ███████║█████╗  ██║     █████╔╝ ██║██╔██╗ ██║██║  ███╗       ██║   ███████║███████╗█████╔╝ ███████╗
██║   ██║██║╚██╗██║╚════╝██║     ██╔══██║██╔══╝  ██║     ██╔═██╗ ██║██║╚██╗██║██║   ██║       ██║   ██╔══██║╚════██║██╔═██╗ ╚════██║
╚██████╔╝██║ ╚████║      ╚██████╗██║  ██║███████╗╚██████╗██║  ██╗██║██║ ╚████║╚██████╔╝       ██║   ██║  ██║███████║██║  ██╗███████║
 ╚═════╝ ╚═╝  ╚═══╝       ╚═════╝╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝        ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝                                                                                                                                    
*/

/* 
  1. Listen for the event of check button in the completed list
  2. Copy the current li for a backup using cloneNode
  3. Remove the current li from the completed-task-list and then in the clone
  4. Toggle fa-check-square class in the i element, with false to force it to remove
  5. Toggle fa-square-o class in the i element, with true to force it to add
  6. Append the cloned node in the incomplete list
*/

function unCompleteTask(event) {
  if (event.target.parentElement.classList.contains("task-check-button")) {
    // Cloning the li element first and the manipulating for marking as todo
    const clone = event.target.parentElement.parentElement.cloneNode(true);
    clone.children[0].children[0].classList.toggle("fa-check-square", false);
    clone.children[0].children[0].classList.toggle("fa-square-o", true);
    // Removing the element from the completed list
    event.target.parentElement.parentElement.remove();
    // Adding the cloned element to the todo list
    taskList.appendChild(clone);
  }
}

/* 
██████╗ ███████╗██╗     ███████╗████████╗██╗███╗   ██╗ ██████╗     ████████╗ █████╗ ███████╗██╗  ██╗███████╗
██╔══██╗██╔════╝██║     ██╔════╝╚══██╔══╝██║████╗  ██║██╔════╝     ╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝██╔════╝
██║  ██║█████╗  ██║     █████╗     ██║   ██║██╔██╗ ██║██║  ███╗       ██║   ███████║███████╗█████╔╝ ███████╗
██║  ██║██╔══╝  ██║     ██╔══╝     ██║   ██║██║╚██╗██║██║   ██║       ██║   ██╔══██║╚════██║██╔═██╗ ╚════██║
██████╔╝███████╗███████╗███████╗   ██║   ██║██║ ╚████║╚██████╔╝       ██║   ██║  ██║███████║██║  ██╗███████║
╚═════╝ ╚══════╝╚══════╝╚══════╝   ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝        ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝
*/

/* 
  1. Listen for delete button in both the lists
  2. If pushed, check with them if they are sure
  3. Remove the subsequent li element
*/

function deleteTask(event) {
  if (event.target.parentElement.classList.contains("task-delete-button")) {
    // Alerting them if they want to delete
    if (confirm("Are you sure?")) {
      event.target.parentElement.parentElement.remove();
    }
  }
}

/* 
███████╗██╗██╗  ████████╗███████╗██████╗     ████████╗ █████╗ ███████╗██╗  ██╗███████╗
██╔════╝██║██║  ╚══██╔══╝██╔════╝██╔══██╗    ╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝██╔════╝
█████╗  ██║██║     ██║   █████╗  ██████╔╝       ██║   ███████║███████╗█████╔╝ ███████╗
██╔══╝  ██║██║     ██║   ██╔══╝  ██╔══██╗       ██║   ██╔══██║╚════██║██╔═██╗ ╚════██║
██║     ██║███████╗██║   ███████╗██║  ██║       ██║   ██║  ██║███████║██║  ██╗███████║
╚═╝     ╚═╝╚══════╝╚═╝   ╚══════╝╚═╝  ╚═╝       ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝
*/

/* 
  1. Use the same text field for search input
  2. Listen for keyup event in the text field
  3. Use querySelectorAll for selecting all the task items
  4. Loop through all of them on each event trigger using forEach
  5. Check if the search term is in the (lower cased) task name
  6. If yes, then set the display property of that item to block, if else none
*/

function filterTasks(event) {
  const searchText = event.target.value.toLowerCase();
  document.querySelectorAll(".task-item").forEach(function (task) {
    const item = task.children[1].textContent;
    if (item.toLowerCase().indexOf(searchText) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

/* 
 ██████╗██╗     ███████╗ █████╗ ██████╗      █████╗ ██╗     ██╗         ████████╗ █████╗ ███████╗██╗  ██╗███████╗
██╔════╝██║     ██╔════╝██╔══██╗██╔══██╗    ██╔══██╗██║     ██║         ╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝██╔════╝
██║     ██║     █████╗  ███████║██████╔╝    ███████║██║     ██║            ██║   ███████║███████╗█████╔╝ ███████╗
██║     ██║     ██╔══╝  ██╔══██║██╔══██╗    ██╔══██║██║     ██║            ██║   ██╔══██║╚════██║██╔═██╗ ╚════██║
╚██████╗███████╗███████╗██║  ██║██║  ██║    ██║  ██║███████╗███████╗       ██║   ██║  ██║███████║██║  ██╗███████║
 ╚═════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚══════╝╚══════╝       ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝
*/

/* 
  1. Listen for the click event of the clear all task button
  2. Confirm if they want to remove all
  3. Select all the task-item class elements using querySelectorAll
  4. Loop through all of them and remove one by one
*/

function clearAllTasks(event) {
  if (confirm("This will delete all tasks. Are you sure?")) {
    document.querySelectorAll(".task-item").forEach(function (task) {
      task.remove();
    })
  }
}