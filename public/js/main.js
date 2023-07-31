const deleteBtn = document.querySelectorAll('.fa-trash')
const item = document.querySelectorAll('.item span')
const itemCompleted = document.querySelectorAll('.item span.completed')

// function to delete tasks onclick from list
Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteItem)
});

// function to mark task complete on click
Array.from(item).forEach((element) => {
    element.addEventListener('click', markComplete)
});

// function to mark task uncomplete on click
Array.from(itemCompleted).forEach((element) => {
    element.addEventListener('click', markUncomplete)
});

// async function to delete the task
async function()