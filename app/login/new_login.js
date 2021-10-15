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
    
    var conString = 'postgres://postgres:5381@127.0.0.1:' + 9090 + '/postgres'

    var pg = require('pg')
    pclient = new pg.Client(conString);
    pclient.connect(function(err) {
      
    pclient.query('SELECT db_data.first_time_check('+"'"+'artem_pacient'+"'"+') as message', (err, res) => {
      if (err) throw err
      console.log(res.rows[0].message)
    pclient.end()
    })
  })
})
})