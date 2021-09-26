// Modules to control application life and create native browser window
const {app, BrowserWindow, Notification} = require('electron')
const path = require('path')
const { getConnection } = require("./config/database") 


// Test for order page .

let createPerson = async (Person) => {

  const conn = await getConnection();

  const result = await conn.query(`INSERT INTO Persons (Id, LastName, Age) VALUES (${Person.pid}, '${Person.pname}', ${Person.page})`);

}

//  <!--------------------------------------------------------------------------------------------------------->

// Product Page
 let createProduct = async (product) => {
  try{
    const conn = await getConnection();
    product.amount = parseInt(product.amount)
    const result = await conn.query(`INSERT INTO Products (name, description, amount, price, size) VALUES ('${product.name}', '${product.description}', ${product.amount}, '${product.priceId}', '${product.size}')`)


  new Notification({
    title: 'Product Management Application',
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
  const results = await conn.query('SELECT * FROM Products')
  // console.log(results)

  return results
}

let deleteProduct = async (id) => {
  const conn = await getConnection();
  const result = await conn.query('DELETE FROM Products WHERE id = ?', id);
  // console.log(result)


  new Notification({
    title: 'Product Management Application',
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
   amount = ${product.amount} , price = '${product.priceId}', size = '${product.size }' WHERE id = ?`,id);
  return result[0]; 
}
//


function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
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
  createPerson
}