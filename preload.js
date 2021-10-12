const { ipcRenderer} = require('electron')

window.addEventListener('DOMContentLoaded', function () {
  const BRegistration = document.getElementById("Bregistration")
  
  const iPassword = document.getElementById("password")
  const iLogin = document.getElementById("login")

  BRegistration.addEventListener('click',function(){
    ipcRenderer.send('BRegistration_init', {})
    })

  
})