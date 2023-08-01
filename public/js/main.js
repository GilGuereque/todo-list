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
async function deleteItem(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(error){
        console.log(error)
    }
};

// async function to mark complete 
async function markComplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(error){
        console.log(error)
    }
};

// async function to mark uncomplete
async function markUnComplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markUnComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}