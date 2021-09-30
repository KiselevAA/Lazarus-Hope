

window.addEventListener('DOMContentLoaded', function () {
  const passww_in = document.getElementById("password")
  const login_in = document.getElementById("login")
  const change_pass_view = document.getElementById("change_pass_view")

  passww_in.addEventListener('focus', function () {
    passww_in.setAttribute("placeholder", "")
  })
  passww_in.addEventListener('blur', function () {
    if (passww_in.value == '')
      {
        passww_in.setAttribute("placeholder", "Введите пароль")
      }
  })
  login_in.addEventListener('focus', function () {
    login_in.setAttribute("placeholder", "")
  })
  login_in.addEventListener('blur', function () {
    if (login_in.value == '')
      {
        login_in.setAttribute("placeholder", "Введите пользователя")
      }
  })
  
  change_pass_view.addEventListener('click',function(){
    if (passww_in.value != '')
    {
      switch (passww_in.getAttribute('type')) {
        case 'password': passww_in.setAttribute("type","text"); break;
        case 'text': passww_in.setAttribute("type","password"); break;
      }
    }
  })
}
)