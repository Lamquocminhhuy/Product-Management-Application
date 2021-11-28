const { remote } = require("electron");
const main = remote.require("./main.js");

const CateForm = document.getElementById('CateForm');
const searchForm = document.getElementById("searchForm");
const searchData = document.getElementById("searchData")
const name = document.getElementById('name')
const exitModal = document.querySelector(".btn-close");

const cardTitles = document.querySelectorAll("h3.card-title");

let edit = false;
let category = [];
let categoryId = "";

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const search = {
    data: searchData.value,
  };
  const result = await main.searchFormCategory(search);
  renderCategory(result);
});
CateForm.addEventListener('submit', async (event) =>{
  event.preventDefault();
  const Category = {
    name : name.value,

  }
  if (!edit) {
    const result = await main.createCategory(Category);
  } else {
    await main.updateCategory(categoryId, Category);
  }

  CateForm.reset();
  exitModal.click();
  getCategory();
})

// Render category in modal
let getCategory = async () => {
  category = await main.getCategory();

  renderCategory(category);
 
};
let deleteCategory = (id) => {
  const response = confirm("Are you sure you want to delete this category?");
  if (response) {
    const result = main.deleteCategory(id);
    getCategory();
  }

  return;
}
let renderCategory = async (category) => {
  total = await main.getTotalCategory();
  console.log(total);
  table.children[0].innerHTML = `
    <tr>
    <th>#</th>
    <th>Name</th>
    <th class="text-center">Actions</th>
  </tr>
  `;

  category.forEach((category, index) => {
    let row = document.createElement("tr");
    
    row.innerHTML = `
        
            <td>${index + 1}</td>
            <td hidden id="categoryId">${category.id}</td>
            <td>${category.category_name}</td>
            <td class="d-flex justify-content-center">
            <button  type="submit" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#productModal" onclick="updateCategory(${category.id})">Update</button>
            <button id="deleteCategory" type="submit" class="btn btn-danger" onclick="deleteCategory(${category.id})">Delete</button>
            </td>
        `;
    table.children[0].appendChild(row);
    cardTitles[0].innerHTML = total[0][0]['count(*)'];

    

  });
}
let updateCategory= async (id) => {
  // console.log(title)
  title.innerHTML = "Update Category"
  const category = await main.getCategoryById(id);
  name.value = category.category_name;
  edit = true;
  categoryId = category.id;
  console.log(categoryId)
}
async function init() {
  await getCategory();
}

init();
