var firebaseConfig = {
    apiKey: "AIzaSyCE_n_syNbbzYz0pEQGPG55EgR-0PRKgso",
    authDomain: "todos-723cc.firebaseapp.com",
    projectId: "todos-723cc",
    storageBucket: "todos-723cc.appspot.com",
    messagingSenderId: "733819439997",
    appId: "1:733819439997:web:dca4b60eb591a5f9531a14",
    measurementId: "G-GTQJZ3LR5M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const list = document.querySelector(".todos");
const add = document.querySelector(".add");
const search = document.querySelector(".search input");
const db = firebase.firestore();

//showing files from database
db.collection("todo").onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
            const file = change.doc;
            addTodo(file.data().item, file.id);
        }
    });
});


function addTodo(todos, id) {
    html = `<li data-list="${id}" class="list-group-item d-flex text-light justify-content-between align-items-center">
        <span>${todos}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>`;
    list.innerHTML += html;

}

function filterTodos(term) {
    Array.from(list.children).filter((todo) => !todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.add("d-none"));

    Array.from(list.children).filter((todo) => todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.remove("d-none"));



}
//Adding a todo

add.addEventListener("submit", (e) => {
    e.preventDefault();
    const now = new Date();

    const todos = {
        item: add.add1.value.trim(),
        time: now
    };
    db.collection("todo").add(todos).then(() => console.log("succuess")).catch(() => console.log("error"));
    add.reset();
});


// Deleting list

list.addEventListener("click", e => {
    console.log(e.target.tagName);
    const id = e.target.parentElement.getAttribute("data-list");

    if (e.target.tagName === "I") {
        e.target.parentElement.remove();
        db.collection("todo").doc(id).delete().then(() => console.log("deleted")).catch(() => console.log("error"));
    }


})

//searching

search.addEventListener("keyup", e => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});

