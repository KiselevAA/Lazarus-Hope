const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
    const win = new BrowserWindow({
      width: 720,
      height: 820,
      titleBarOverlay: false,
      titleBarStyle: "hidden",
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
    // Load Login_form
    win.loadFile('login/index.html')
    
  }

  app.whenReady().then(() => {
    createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })
})