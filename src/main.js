// Modules to control application life and create native browser window
const {app, BrowserWindow, Notification} = require('electron')
const path = require('path')
const { getConnection } = require("./config/database") 


// Test for order page .
let searchFormCategory = async (searchData) => {
  const conn = await getConnection();
  const result = await conn.query(`SELECT * FROM Category where category_name like '%${searchData.data}%' order by id`)
  return result; 
}
let getCategoryById = async (id) => {
  const conn = await getConnection();
  const result = await conn.query('SELECT * FROM Category WHERE id = ?', id);
  return result[0]; 
}
let createCategory = async (Category) => {

  const conn = await getConnection();

  const result = await conn.query(`INSERT INTO Category (category_name) VALUES ('${Category.name}');`);

  console.log(result)

}
let updateCategory = async (id, Category) => {
  const conn = await getConnection();
  const result = await conn.query(`UPDATE Category SET category_name = '${Category.name}' WHERE id = ?;`,id);
  
  return result[0]; 
}
let getCategory = async (category) => {
  const conn = await getConnection();
  const results = await conn.query('SELECT * FROM Category')
  console.log(results)

  return results
}
let deleteCategory = async (id) => {
  const conn = await getConnection();
  const result = await conn.query('DELETE FROM Category WHERE id = ?', id);
  // console.log(result)


  new Notification({
    title: 'Candy Management App',
    body: 'Deleted Category',
  }).show();
}
let getTotalCategory = async () => {
  const conn = await getConnection();
  const results = await conn.query('CALL sp_GetTotalCategory();')
  console.log(results)

  return results
}

//  <!--------------------------------------------------------------------------------------------------------->

// Product Page
let searchForm = async (searchData) => {
  const conn = await getConnection();
  const result = await conn.query(`select Products.id, Products.name, Products.amount, Products.price,
  Products.size,Products.description, Category.category_name 
  from Products  join Category  on Products.category_id = Category.id where name like '%${searchData.data}%' order by category_id`)
  return result; 
}

let getInStock = async () => {
  const conn = await getConnection();
  const results = await conn.query('CALL sp_GetInStock();')
  console.log(results)

  return results
}

let getOutOfStock = async () => {
  const conn = await getConnection();
  const results = await conn.query('CALL sp_GetOutOfStock();')


  return results
}

 let createProduct = async (product) => {
  try{
    const conn = await getConnection();
    product.amount = parseInt(product.amount)
    console.log(product.category_id)
    const result = await conn.query(`INSERT INTO Products (name, description, amount, price, size, category_id) 
    VALUES ('${product.name}', '${product.description}', ${product.amount}, '${product.priceId}', '${product.size}', ${product.category_id});`
    )


  new Notification({

    title: 'Candy Management App',
    body: 'New Product Saved Successfully',
  }).show();

  product.id = result.insertId;
  return product;

  }catch(e){
    console.log(e)
  }

}

 let getProducts = async (product) =>{
  const conn = await getConnection();
  const results = await conn.query(`select Products.id, Products.name, Products.amount, Products.price, Products.size,Products.description, Category.category_name 
  from Products  join Category  on Products.category_id = Category.id order by category_id;`)

  console.log(results)

  return results
}

let deleteProduct = async (id) => {
  const conn = await getConnection();
  const result = await conn.query('DELETE FROM Products WHERE id = ?', id);
  // console.log(result)


  new Notification({
    title: 'Candy Management App',
    body: 'Deleted Product',
  }).show();
}

let getProductById = async (id) => {
  const conn = await getConnection();
  const result = await conn.query('SELECT * FROM Products WHERE id = ?', id);
  return result[0]; 
}



let updateProduct = async (id, product) => {
  const conn = await getConnection();
  const result = await conn.query(`UPDATE Products SET name = '${product.name}', description =  '${product.description}',
   amount = ${product.amount} , price = '${product.priceId}', size = '${product.size }' , category_id = ${product.category_id} WHERE id = ?`,id);
  return result[0]; 
}
//


function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true
     
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('src/views/login.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

module.exports = {
  createProduct,
  createWindow,
  getProducts,
  deleteProduct,
  getProductById,
  updateProduct,
  createCategory,
  getCategory,
  getInStock,
  getOutOfStock,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getTotalCategory,
  searchForm,
  searchFormCategory
}