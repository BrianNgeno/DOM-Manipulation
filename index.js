document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-field");
  const baseUrl = "http://localhost:3000/dishes"    
  

  form.addEventListener("submit",handleSubmit)
  

  function handleSubmit(e){
    e.preventDefault()
    
    let foodObj={
        name: e.target.name.value,
        img: e.target.img.value,
        description:e.target.description.value,
        price:e.target.price.value,
        inventory:e.target.inventory.value
    }

    console.log(foodObj)
    postData(foodObj)
    

  }

  function renderMenu(food) {
    console.log(food)

    const div = document.createElement("div");
    // const delBtn = document.createElement("button")
    // delBtn.textContent = "Delete"

    // delBtn.addEventListener("click",handleDelete)
    // console.log(delBtn)
    div.innerHTML = `
        <div class="card col-md-4" >
  <img src="${food.img}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${food.name}</h5>
    <p class="card-text">${food.description}</p>
    <p class="card-text" id="inventory"> ${food.inventory}</p>
    <a class="btn btn-primary">${food.price}</a>
    <a class="btn btn-danger" id="del">x</a>
  </div>
</div>
        `

    const id = food.id
    console.log(id)
    div.querySelector("#del").addEventListener("click",()=>{
        deleteFood(id)
        div.remove()
        

    })


    document.querySelector("#output").appendChild(div)  

     
  }

  

  function getMenu() {
    fetch(`${baseUrl}`)
      .then(res => res.json())
      .then(foodMenu => foodMenu.forEach(food => renderMenu(food)));
  }
  function postData(foodObj){
    console.log(foodObj)
    fetch(`${baseUrl}`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(foodObj)
    })
    .then(res=>res.json())
    .then(food=>console.log(food))
  }

  function deleteFood(id){
    fetch(`${baseUrl}/${id}`,{
        method:'DELETE',
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(res=>res.json())
    .then(food=>console.log(food))
  }
  
  
  getMenu();
});
