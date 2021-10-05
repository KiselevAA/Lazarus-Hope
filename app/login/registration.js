const { ipcRenderer} = require('electron')
const https = require('http')
const options = {
    host : '192.168.1.11',
    port: 80,
    method: 'GET'
}


window.addEventListener('DOMContentLoaded', function () {
  const buttonCancel = document.getElementById("buttonCancel")
  const buttonReg    = document.getElementById("button_ok")
buttonCancel.addEventListener('click',function(){
  ipcRenderer.send('Registration_Exit', {})
})

buttonReg.addEventListener('click',function(){
  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
  
    res.on('data', d => {
      process.stdout.write(d)
    })
  })
  
  req.on('error', error => {
    console.error(error)
  })
  req.end()
})
})

