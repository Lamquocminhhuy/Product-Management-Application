
 const LoginForm = document.getElementById('loginForm')
 const username = document.getElementById('username')
 const password = document.getElementById('password')
 const alertLogin = document.querySelector('.alert-warning')



 LoginForm.addEventListener('submit', (event) => {
     event.preventDefault();
     if (username.value === 'admin' && password.value === 'admin') {
         window.location.href = "index.html"
     }else if(username.value != 'admin' && password.value === 'admin') {
         alertLogin.innerHTML = '<p class="text-center" style="color:red;">Wrong username! </p>'
         
     }else if(password.value != 'admin' && username.value === 'admin') {
         alertLogin.innerHTML = '<p class="text-center" style="color:red;">Wrong password! </p>'

         
     }else{
    
         alertLogin.innerHTML = '<p class="text-center" style="color:red;">Hmmmm :v </p>'
         
     }
 })