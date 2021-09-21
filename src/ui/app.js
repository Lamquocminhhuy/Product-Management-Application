const { remote } = require('electron');
const main = remote.require("./main.js");



const productForm = document.getElementById('productForm');

const productName = document.getElementById('name');
const productPrice = document.getElementById('priceId');
const productDescription = document.getElementById('description');
const productSize = document.getElementById('size');
const productAmount = document.getElementById('amount');
const table = document.getElementById('table');

// Count 
const cardTitles = document.querySelectorAll('h3.card-title');

// Render Product
const productsList = document.getElementById('products')
let products = []

productForm.addEventListener('submit', async (event) => {
    event.preventDefault();
   
    const newProduct = {
        name: productName.value,
        priceId: productPrice.value,
        description: productDescription.value,
        size: productSize.value,
        amount: productAmount.value,
    }
    const result = await main.createProduct(newProduct);
    console.log(result);
  
    productForm.reset();
    // location.reload();
    getProducts();
})
function deleteProduct(id){
    const response = confirm("Are you sure you want to delete this product?")
    if(response){
        const result = main.deleteProduct(id);
        getProducts();
    }

    return;
   
}

function renderProducts(products) {
    var inStock = 0;
    var outOfStock = 0;
    table.children[0].innerHTML = ''

    products.forEach((product,index) => {
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${index+1}</td>
            <td hidden id="productId">${product.id}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.priceId}</td>
            <td>${product.amount}</td>
            <td>${product.size}</td>
            <td>${product.amount == 0 ? "Out of stock" : "In stock"}</td>
            <td class="d-flex justify-content-center">
            <a class="btn btn-sm btn-info" href="/update_order/4/">Update</a>
            <button id="deleteProduct" type="submit" class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        table.children[0].appendChild(row);
        product.amount != 0 ? inStock++ : outOfStock++;
    })

    cardTitles[0].innerHTML = products.length; // Total product
    cardTitles[1].innerHTML = inStock; // In stock
    cardTitles[2].innerHTML = outOfStock; // Out of Stockv
}

const getProducts = async () => {
    products = await main.getProducts();
    renderProducts(products)
    window.onload = ()=>{
        setTimeout(()=>{
            loading.style.display = 'none';
        },1000);
    }
  
 }

 async function init () {
      await getProducts();
   
      
 }

 init();