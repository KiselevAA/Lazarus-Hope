const { ipcRenderer} = require('electron')
const  pg          = require('pg')

window.addEventListener('DOMContentLoaded', function () {
  const BRegistration = document.getElementById("Bregistration")
  const BLogin        = document.getElementById("BLogin")
  const iPassword     = document.getElementById("password")
  const iLogin        = document.getElementById("login")
  
  BRegistration.addEventListener('click',function(){
    ipcRenderer.send('BRegistration_init', {})
    })

    BLogin.addEventListener('click',function(){

    if ((iLogin.value.trim() == null ) || (iLogin.value.trim() == "" ))
    {
      alert("Не заполнено поле с Именем Пользователя");
      iLogin.focus();
      
    }
  
    if ((iPassword.value.trim() == null ) || (iPassword.value.trim() == "" ))
    {
      alert("Не заполнено поле Пароль");
      iPassword.focus();
      
    }

    var proxyPort = 9090
    
    var conString = 'postgres://'+iLogin.value+':'+iPassword.value+'@127.0.0.1:' + proxyPort + '/postgres'
    console.log(conString)
    client = new pg.Client(conString);
    client.connect(function(err) {
      console.log('we connected to db')
      ipcRenderer.send('BLogin-Succes', {})
    })  
  })
})