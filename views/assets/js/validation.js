
(function() {
    'use strict';
    const un_valid = RegExp(/^[a-zA-Z0-9!@#$%^&*\-\_]{6,16}$/, 'g');
    const pass_valid = RegExp(/^(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9])[a-zA-Z0-9!@#$%^&*]{6,24}$/,"g")
    window.addEventListener('load', function() {
      var forms = document.getElementsByClassName('needs-validation');
      document.getElementById('username').addEventListener("change", () => {
            var un = document.getElementById("username")
            if (un_valid.test(un.value)){
              un.setCustomValidity("")}
            else{
              un.setCustomValidity("No mg")
            }
      }, false)

      const pass = document.getElementById("password")
      if(pass){
        pass.addEventListener("change", () => {
          if(pass_valid.test(password.value)){password.setCustomValidity("")}
          else{
              password.setCustomValidity("galat pass")
          }
        })
      }

      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
        
      });
    }, false);
  })();