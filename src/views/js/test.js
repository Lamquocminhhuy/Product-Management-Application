const { remote } = require("electron");
const main = remote.require("./main.js");

const TestForm = document.getElementById('TestForm');
const id = document.getElementById('id')
const name = document.getElementById('name')
const age = document.getElementById('age')



TestForm.addEventListener('submit', (event) =>{
  event.preventDefault();
  const Person = {
    pname : name.value,
    pid : id.value,
    page : age.value
  }

  console.log(Person)
  main.createPerson(Person);
})