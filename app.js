const input = document.querySelector("input");
const addBtn = document.querySelector(".add-btn");
const listContainer = document.querySelector("ul");

//Add btn
addBtn.addEventListener("click", () => {
  getInput();
});
//add task to list when addbtn is clicked
function getInput() {
  const date = new Date();
  const option = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  //get day added
  let currentDay = new Intl.DateTimeFormat(navigator.language, option).format(
    date
  );
  //check input field
  if (input.value === "") {
    alert("You Must Enter Something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = `
    <div class="list-head">
      <button id="status" class="not-done">
        <div class="status-msg">Mark Not Done</div>
        <div class="loader hide"></div>
      </button>
      <button class="close">&times;</button>
    </div>
    <div class="task">
      ${input.value}
    </div>
    <div class="date-added">⏰ ${currentDay}</div>
    `;
    listContainer.prepend(li);
  }
  //clear input
  input.value = "";
  saveData();
}

//add eventlistener to li
listContainer.addEventListener("click", function (e) {
  let target = e.target;
  if (target.classList.contains("status-msg")) {
    markDoneOrNotDone(target);
  }
  // when close is clicked delete task
  else if (target.classList.contains("close")) {
    remove(target);
    saveData();
  }
});

// liStatus.addEventListener("click", markDoneOrNotDone);

// when mark, display loading
function markDone(el) {
  const loader = el.nextElementSibling;
  el.classList.add("hide");
  loader.classList.remove("hide");
  setTimeout(() => {
    loader.classList.add("hide");
    el.parentElement.classList.replace("not-done", "done");
    el.innerText = "Mark Done";
    el.classList.remove("hide");
    saveData();
  }, 3000);
}
function markNotDone(el) {
  const loader = el.nextElementSibling;
  el.classList.add("hide");
  loader.classList.remove("hide");
  setTimeout(() => {
    loader.classList.add("hide");
    el.parentElement.classList.replace("done", "not-done");
    el.innerText = "Mark Not Done";
    el.classList.remove("hide");
    saveData();
  }, 3000);
}

function markDoneOrNotDone(el) {
  const isDone = el.parentElement.classList.contains("done");
  isDone ? markNotDone(el) : markDone(el);
}

//remove Task
function remove(el) {
  el.parentElement.parentElement.remove();
}
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
