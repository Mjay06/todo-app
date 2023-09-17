const header = document.querySelector(".head");
const addbuttton = document.querySelector(".searchbar__add");
const body = document.querySelector("body");
let todo_box = document.querySelectorAll(".todos__lists__one");
const searchbox = document.querySelector(".searchbar__box");
const filterbox = document.querySelector(".filter");
const light = document.querySelector(".logo__dark");
const todosbox = document.querySelector(".todos");
let checkcircle = document.querySelectorAll(".todos_circle");
let todotext = document.querySelectorAll(".todos__lists__one_text");
let crosscancel = document.querySelectorAll(".todos__lists__one_image");
let containmenttodo = document.querySelector(".todosboxcontainment");
let itemsl = document.querySelector(".items_left");
let clearcomp = document.querySelector(".items_clear");

const activebtn = document.querySelector(".active");
const completedbtn = document.querySelector(".complete");
const all = document.querySelector(".all");
let switchmode = true;


let inidata;
function addtolocalstorage(){
  window.localStorage.setItem('todos', JSON.stringify(data) )
}
function getlocalstorage(){
  inidata = JSON.parse(window.localStorage.getItem('todos'))
}

getlocalstorage()
console.log(inidata)

let data = inidata ? inidata : [
  { id: 1, content: "complete online javascript course", completed: false },
] 




document.addEventListener("click", function (event) {
  if (event.target.classList.contains("todos__lists__one_image")) {
    var container = event.target.closest(".todos__lists__one");
    var targetElement = container.querySelector(".todos__lists__one_text");
    data.forEach((data, i, arr) => {
      if (+data.id === +targetElement.dataset.id) {
        arr.splice(i, 1);

        updateUI();
      }
      addtolocalstorage()
    });
  }

  if (event.target.classList.contains("todos_circle")) {
    if (event.target.classList.contains("_active")) {
      let container = event.target.closest(".todos__lists__one");
      let targetElement = container.querySelector(".todos__lists__one_text");
      event.target.classList.remove("_active");
      data.forEach((data, i, arr) => {
        if (+data.id === +targetElement.dataset.id) {
          data.completed = false;
          addtolocalstorage()

          itemsleft();
          datas();
          itemsl.textContent = `${count - 1} item left`;
        }
      });

      targetElement.classList.remove("todos__lists__one_text_done");
    } else {
      var container = event.target.closest(".todos__lists__one");
      var targetElement = container.querySelector(".todos__lists__one_text");
      data.forEach((data, i, arr) => {
        if (+data.id === +targetElement.dataset.id) {
          data.completed = true;
          addtolocalstorage()

          itemsleft();
          datas();
          itemsl.textContent = `${count - 1} item left`;
        }
      });
      event.target.classList.add("_active");

      targetElement.classList.add("todos__lists__one_text_done");
    }
  }
});

let count = 0;
function itemsleft() {
  count = 0;
  data.forEach((data) => {
    if (data.completed === false) {
      count++;
    }
    return count;
  });
}
// add more info to the data
function addtodata() {
  const currentdata = {
    id: Number(data[data.length - 1].id) + 1,
    content: searchbox.value,
    completed: false,
  };
  data.push(currentdata);
  addtolocalstorage()
}

// update UI
let activedata;
let notactivedata;
function active() {
  activedata = data.filter((data) => {
    return data.completed == false;
  });
}
function notactive() {
  notactivedata = data.filter((data) => {
    return data.completed == true;
  });
}

function datas() {
  active();
  notactive();
}
let determinant = "all";
activebtn.addEventListener("click", function () {
  determinant = "activenow";
  updateUI();
  activebtn.classList.add("filter-text_active");
  all.classList.remove("filter-text_active");
  completedbtn.classList.remove("filter-text_active");
});
all.addEventListener("click", function () {
  determinant = "all";
  updateUI();
  activebtn.classList.remove("filter-text_active");
  all.classList.add("filter-text_active");
  completedbtn.classList.remove("filter-text_active");
});
completedbtn.addEventListener("click", function () {
  determinant = "complete";
  updateUI();
  activebtn.classList.remove("filter-text_active");
  all.classList.remove("filter-text_active");
  completedbtn.classList.add("filter-text_active");
});
function updateUI() {
  datas();
  containmenttodo.innerHTML = ``;
  let inputval;
  if (determinant === "all") {
    inputval = data;
  } else if (determinant === "activenow") {
    inputval = activedata;
  } else if (determinant === "complete") {
    inputval = notactivedata;
  }
  inputval.forEach((datum, i, arr) => {
    if (datum.content === "complete online javascript course") {
    } else {
      const todosHTML = datum.completed
        ? `<div class="todos__lists__one"  style="background-color: ${
            switchmode ? `hsl(235, 24%, 19%)` : `hsl(0, 0%, 98%)`
          }">
       <div class="container_todo">
       <div class="todos_circle todos_circle _active"></div>
       <h4   class="todos__lists__one_text todos__lists__one_text_done " data-id="${datum.id}">${
         datum.content
       }</h4>
       </div>
       <svg class="todos__lists__one_image" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="currentColor" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
     
      </div>`
        : `
      <div class=" todos__lists__one"  style="background-color: ${
        switchmode ? `hsl(235, 24%, 19%)` : `hsl(0, 0%, 98%)`
      }">
         <div class="container_todo">
         <div class="todos_circle todos_circle "></div>
         <h4 class="todos__lists__one_text " data-id="${datum.id}">${datum.content}</h4>
         </div>
         <svg class="todos__lists__one_image" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="currentColor" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
     </div>`;
      containmenttodo.insertAdjacentHTML("afterbegin", todosHTML);
    }
  });
  searchbox.value = "";
  todotext = document.querySelectorAll(".todos__lists__one_text");
  checkcircle = document.querySelectorAll(".todos_circle");
  todo_box = document.querySelectorAll(".todos__lists__one");
  itemsleft();
  itemsl.textContent = `${count - 1} item left`;
}

function darkmode() {
  if (switchmode == true) {
    light.src = "./images/icon-moon.svg";
    header.style.backgroundImage = "url(/images/bg-desktop-light.jpg)";
    body.style.backgroundColor = "hsl(0, 0%, 98%)";
    searchbox.style.backgroundColor = "hsl(0, 0%, 98%)";
    searchbox.style.color = "black";
    addbuttton.style.backgroundColor = "hsl(236, 9%, 90%)";
    addbuttton.style.color = "black";
    Array.from(todo_box).forEach(
      (arr) => (arr.style.backgroundColor = "hsl(0, 0%, 98%)")
    );
    filterbox.style.backgroundColor = "hsl(0, 0%, 98%)";
    switchmode = !switchmode;
  } else if (switchmode == false) {
    light.src = "./images/icon-sun.svg";
    header.style.backgroundImage = "url(/images/bg-desktop-dark.jpg)";
    body.style.backgroundColor = " hsl(235, 21%, 11%)";
    searchbox.style.backgroundColor = " hsl(235, 24%, 19%)";
    searchbox.style.color = "white";
    addbuttton.style.backgroundColor = " black";
    addbuttton.style.color = "white";
    Array.from(todo_box).forEach(
      (arr) => (arr.style.backgroundColor = "hsl(235, 24%, 19%)")
    );
    filterbox.style.backgroundColor = " hsl(235, 24%, 19%)";
    switchmode = !switchmode;
  }
}





light.addEventListener("click", darkmode);
addbuttton.addEventListener("click", function () {
  if (searchbox.value === "") {
  } else {
    addtodata();
    updateUI();
  }
});
window.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    if (searchbox.value === "") {
    } else {
      addtodata();
      updateUI();
    }
  }
});
clearcomp.addEventListener("click", function () {
  /* const indexes = []
  data.forEach((data, i, arr) => {
    if (data.completed === true) {
      indexes.push(i)
    }
    console.log(indexes)

  }); */
  const newdata = data.filter(datas => datas.completed === false)
  data = newdata
  addtolocalstorage()


  updateUI();
});
updateUI()
