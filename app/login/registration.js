const { ipcRenderer} = require('electron')

window.addEventListener('DOMContentLoaded', function () {
  const buttonCancel = document.getElementById("buttonCancel")

buttonCancel.addEventListener('click',function(){
  ipcRenderer.send('Registration_Exit', {})
})

  
})