const { ipcRenderer} = require('electron')
const https          = require('http')
const fs             = require('fs')
const path           = require('path')
const dir_login = __dirname +'/app/login';



window.addEventListener('DOMContentLoaded', function () {
  const buttonCancel = document.getElementById("buttonCancel")
  const buttonReg    = document.getElementById("button_ok")
  const LoginVal     = document.getElementById("login")
  const PassWordVal  = document.getElementById("password")
  const RepeatPassw  = document.getElementById("confirm_password")


buttonCancel.addEventListener('click',function(){
  ipcRenderer.send('Registration_Exit', {})
})

buttonReg.addEventListener('click',function(){
  
  if ((LoginVal.value.trim() == null ) || (LoginVal.value.trim() == "" ))
  {
    alert("Не заполнено поле с Именем Пользователя");
    LoginVal.focus();
    return false;
  }

  if ((PassWordVal.value.trim() == null ) || (PassWordVal.value.trim() == "" ))
  {
    alert("Не заполнено поле Пароль");
    PassWordVal.focus();
    return false;
  }

  if (RepeatPassw.value.trim() != PassWordVal.value.trim() ) 
  {
    alert("Пароли не совпадают");
    PassWordVal.focus();
    return false;
    
  }

  var RegInformation;

  RegInformation = { "Login" : [LoginVal.value],
                     "Password" : [PassWordVal.value]
                   }

  let RegInfoStr = JSON.stringify(RegInformation);

  const options = {
    host : '192.168.1.11',
    port: 80,
    method: 'POST',
    headers: {
      'Content-Type': 'json',
      'Content-Length': RegInfoStr.length
      }
    }

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
    
    res.on('data', d => {
      process.stdout.write(d)
    })
  })

  req.on('error', error => {
    console.error(error)
    
  })
  req.write(RegInfoStr);
  req.end()
      
  var proxyPort = 9090
  var pg = require('pg')
  var conString = 'postgres://'+LoginVal.value+':'+PassWordVal.value+'@127.0.0.1:' + proxyPort + '/postgres'
  client = new pg.Client(conString);

  
  try {client.connect(function(err) {
      console.log('we connected to db')
    })
  }
  catch {
    alert('Ошибка!')
  }
  
  client.end();
  })
})

