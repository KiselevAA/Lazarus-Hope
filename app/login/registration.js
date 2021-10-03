const { ipcRenderer} = require('electron')

window.addEventListener('DOMContentLoaded', function () {
  const BRegistration = document.getElementById("Bregistration")

  BRegistration.addEventListener('click',function(){
    ipcRenderer.send('BRegistration_init', {})
    })

  
})