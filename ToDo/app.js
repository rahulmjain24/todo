const list = document.querySelector(".todos");
const add = document.querySelector(".add");
const search = document.querySelector(".search input")


function addTodo(todos){
    html=`<li class="list-group-item d-flex text-light justify-content-between align-items-center">
        <span>${todos}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>`;
    list.innerHTML+=html;

}

function filterTodos(term){
    Array.from(list.children).filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.add("d-none"));
    
    Array.from(list.children).filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.remove("d-none"));
    
        
    
}
//Adding a todo

add.addEventListener("submit",(e) => {
    e.preventDefault();
    const todos = add.add1.value.trim();
    if(todos.length){
        addTodo(todos);
        add.reset();
    }
});


// Deleting list

list.addEventListener("click", e => {
    if(e.target.classList.contains("delete")){
        e.target.parentElement.remove();
    }
})

//searching

search.addEventListener("keyup", e => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});