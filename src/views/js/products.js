const { remote } = require("electron");
const main = remote.require("./main.js");

const productForm = document.getElementById("productForm");
const searchForm = document.getElementById("searchForm");
const searchData = document.getElementById("searchData")
const productName = document.getElementById("name");
const productPrice = document.getElementById("priceId");
const productDescription = document.getElementById("description");
const productSize = document.getElementById("size");  
const productAmount = document.getElementById("amount");
const productCategory = document.getElementById("category");

const table = document.getElementById("table");
// Modal Title
const title = document.getElementById("title");

// Count
const cardTitles = document.querySelectorAll("h3.card-title");

const exitModal = document.querySelector(".btn-close");

let selectHTML = '';

// Create Product
let products = [];
let edit = false;
let productId = "";

searchForm.addEventListener("submit", async (event) => {
   
  event.preventDefault();


  
  const search = {
    data: searchData.value,
 
  };
  const result = await main.searchForm(search);
  renderProducts(result);
  console.log(result);
  

 

});



productForm.addEventListener("submit", async (event) => {
   
  event.preventDefault();
 
  const newProduct = {
    name: productName.value,
    priceId: productPrice.value,
    description: productDescription.value,
    size: productSize.value,
    amount: productAmount.value,
    category_id: parseInt(productCategory.value),
  };

  if (!edit) {
    
    const result = await main.createProduct(newProduct);
  } else {
    await main.updateProduct(productId, newProduct);
  }

  productForm.reset();
  exitModal.click();

  getProducts();
});

let getCategory = async () => {
  category = await main.getCategory();

  for (let i = 0; i < category.length; i++) {
   
    selectHTML +='<option value="'+category[i].id+'">'+category[i].category_name+'</option>';
  }
  document.getElementById('category').innerHTML = selectHTML;
 
 
};

// Delete Product
let deleteProduct = (id) => {
  const response = confirm("Are you sure you want to delete this product?");
  if (response) {
    const result = main.deleteProduct(id);
    getProducts();
  }

  return;
}

// Update Product
 let updateProduct = async (id) => {
  // console.log(title)
  title.innerHTML = "Update Product"
  const product = await main.getProductById(id);
  productName.value = product.name;
  productPrice.value = product.price;
  productDescription.value = product.description;
  productSize.value = product.size;
  productAmount.value = product.amount;


  edit = true;
  productId = product.id;

 
 
}

let getProducts = async () => {
  products = await main.getProducts();
  renderProducts(products);
 
};



// Render Product
let renderProducts =  async (products) => {

  InStData =  await main.getInStock();
  OutStData = await main.getOutOfStock();
  let inStock = 0;
  let outOfStock = 0;
  table.children[0].innerHTML = `
    <tr>
    <th>#</th>
    <th>Category</th>
    <th>Name</th>
    <th>Description</th>
    <th>Price</th>
    <th>Amount</th>
    <th>Size</th>
    <th>Status</th>
    <th class="text-center">Actions</th>
  </tr>
  `;

  products.forEach((product, index) => {
    
    let row = document.createElement("tr");
    
    row.innerHTML = `
        
            <td>${index + 1}</td>
            <td hidden id="productId">${product.id}</td>
            <td>${product.category_name}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.price} $</td>
            <td class="productAmount">${product.amount}</td>
            <td>${product.size}</td>
            <td>${product.amount == 0 ? "Out of stock" : "In stock"}</td>
            <td class="d-flex justify-content-center">
          
            <button  type="submit" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#productModal" onclick="updateProduct(${product.id})">Update</button>
            <button id="deleteProduct" type="submit" class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
    product.amount == 0 ? row.children[6].style.color = "red" : row.children[6].style.color = "black";
    table.children[0].appendChild(row);
    product.amount != 0 ? inStock++ : outOfStock++;
  });

  cardTitles[0].innerHTML = products.length; // Total product
  cardTitles[1].innerHTML = InStData[0][0]['Count(amount)']; // In stock
  cardTitles[2].innerHTML = OutStData[0][0]['Count(amount)'] // Out of Stock
}




// Change Modal Tile
let changeTitle = () => {
    title.innerHTML = "Create Product"
}



async function init() {
  await getProducts();
  await getCategory();

}

init();
