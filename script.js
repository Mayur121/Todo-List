//get all the elements required
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
  //get value from user
  let userData = inputBox.value;

  if (userData.trim() != 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};

addBtn.onclick = () => {
  let userData = inputBox.value;

  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }
  listArr.push(userData);
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
  addBtn.classList.remove("active");
};

//function to add task list inside ul
function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo"); //get local storage
  if (getLocalStorage == null) {
    //if local storage is null
    listArr = []; //create empty array
  } else {
    listArr = JSON.parse(getLocalStorage); //convert json string into a js object
  }
  const pendingNumb = document.querySelector(".pendingNumb");
  pendingNumb.textContent = listArr.length; //pass the length in pendingNumb
  if (listArr.length > 0) {
    deleteAllBtn.classList.add("active");
  } else {
    deleteAllBtn.classList.remove("active");
  }

  let newLiTag = "";

  listArr.forEach((element, index) => {
    newLiTag += `<li>${element}<span onclick = "deleteTask(${index})" ><i class="fas fa-trash"></i></span></li>`;
  });

  todoList.innerHTML = newLiTag; //add new li tag inside ul
  inputBox.value = ""; //make input field blank once task added
}

//delete task function
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1); //delete the task
  // after deletion update local storage again
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
}

//delete all tasks function
deleteAllBtn.onclick = () => {
  listArr = []; //empty the array
  // after deletion of all tasks update local storage again
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
};
