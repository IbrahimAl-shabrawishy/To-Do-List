//Html Elements
let taskInput=document.getElementById("taskInput");
let btn=document.getElementById("btn");
let tasks=document.getElementById("tasks");
let loading=document.getElementById("loading");

//Add Todo

btn.addEventListener("click",function()
{
   
    let task=
    {
        title:taskInput.value,
        apiKey:"66ecede260a208ee1fdd5bf8"
    }
    addTodo(task);
    clearData();
})



async function addTodo(task)
{
    let response=await fetch(`https://todos.routemisr.com/api/v1/todos`,{
        method:"POST",
        body:JSON.stringify(task),
        headers:{
            "content-type":"application/json"
        }
    })
    let data=await response.json();
   if(data.message=='success')
   {
    getTodolist();
   
   }
}




//get toDo list

async function getTodolist()
{
    loading.style.display='block'; 
    tasks.style.display='none';
    let response=await fetch(`https://todos.routemisr.com/api/v1/todos/66ecede260a208ee1fdd5bf8`);
    let data=await response.json();
   

if(data.message=='success')
{

    loading.style.display='none';
    tasks.style.display='block';
    displayData(data.todos);
}

}
getTodolist();
//display All Todo List


function displayData(arr)
{
    let content=``;
    for(let i=0;i<arr.length;i++)
    {
        content+=`
        
         <div class="task px-4 d-flex justify-content-between w-75 m-auto shadow align-items-center p-2 rounded-4">
            <p class="task-text m-0 p-0 ${arr[i].completed?'text-decoration-line-through':''}">${arr[i].title}</p>
           
            <div>
                <i  onclick="markTodo('${arr[i]._id}')" class="fa-regular fa-circle-check ${arr[i].completed?"d-none":" "}"></i>
                <i onclick="deleteTodo('${arr[i]._id}')" class="fa-solid fa-trash"></i>
            </div>
        </div>
        
        
         <br/>
        
        `
       
    }

tasks.innerHTML=content;


}


//clear data

function clearData()
{
taskInput.value="";
}



//delete todo

async function deleteTodo(id)
{
    let response=await fetch(`https://todos.routemisr.com/api/v1/todos`,
        {
            method:"delete",
            body:JSON.stringify({todoId:id}),
            headers:{
                "content-type":"application/json"
            }

        }
    )
      
    let data=await response.json();
   if(data.message=='success')
   {
    getTodolist();
   }



}




//Mark Completed

async function markTodo(id)
{
    let response=await fetch(`https://todos.routemisr.com/api/v1/todos`,
        {
            method:"put",
            body:JSON.stringify({todoId:id}),
            headers:{
                "content-type":"application/json"
            }

        }
    )
      
    let data=await response.json();
   if(data.message=='success')
   {
    getTodolist();
   }



}




