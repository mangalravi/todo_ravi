const text = document.getElementById("text");
const addTaskButton = document.getElementById("btn");
const saveTaskButton = document.getElementById("save-todo");
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveindex");

let todoArray = [];
addTaskButton.addEventListener("click", (e) => {
    if(text.value==""){
        alert("Please Enter Valid Value");
        return;
    }
 e.preventDefault();
 let todo = localStorage.getItem("todo");
 if (todo === null) {
   todoArray = [];
 } else {
   todoArray = JSON.parse(todo);
 }
 todoArray.push(text.value);
 text.value = "";
 localStorage.setItem("todo", JSON.stringify(todoArray));
 displayTodo();
});
function displayTodo() {
 let todo = localStorage.getItem("todo");
 if (todo === null) {
   todoArray = [];
 } else {
   todoArray = JSON.parse(todo);
 }
 let htmlCode = "Add List";
 todoArray.forEach((list, ind) => {
   htmlCode += `<tr>
   <td>${list}</td>
   <td><button onclick='edit(${ind})' ><i class="fa-regular fa-pen-to-square"></i></button></td>
   <td><button onclick='deleteTodo(${ind})' ><i class="fa-sharp fa-solid fa-trash"></i></button></td>
</tr>`;
 });
 listBox.innerHTML = htmlCode;
}
function deleteTodo(ind) {
 let todo = localStorage.getItem("todo");
 todoArray = JSON.parse(todo);
 todoArray.splice(ind, 1);
 localStorage.setItem("todo", JSON.stringify(todoArray));
 displayTodo();
}
function edit(ind) {
    console.log(saveInd.value);
 saveInd.value = ind;
 let todo = localStorage.getItem("todo");
 todoArray = JSON.parse(todo);
 text.value = todoArray[ind];
 addTaskButton.style.display = "none";
 saveTaskButton.style.display = "block";
}
saveTaskButton.addEventListener("click", () => {
 let todo = localStorage.getItem("todo");
 todoArray = JSON.parse(todo);

 let id = saveInd.value;
 console.log(id);
 todoArray[id] = text.value;
 addTaskButton.style.display = "block";
 saveTaskButton.style.display = "none";
 text.value = "";
 localStorage.setItem("todo", JSON.stringify(todoArray));
 displayTodo();
});
window.onload=()=>{
    displayTodo();
}