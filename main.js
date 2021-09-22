const { app, BrowserWindow } = require('electron')
const path = require('path')
const { contextIsolated } = require('process')

function createWindow () {
    const win = new BrowserWindow({
      width: 720,
      height: 820,
      titleBarOverlay: false,
      titleBarStyle: "hidden",
      frame: true,
      webPreferences: {
        //preload: path.join(__dirname, 'preload.js'),
        preload: path.join(__dirname, 'login_jq.js'),
        contextIsolated: false
      }
    })
    // Load Login_form
    win.loadFile('login.html')
    //win.loadFile('index.html')
    win.webContents.openDevTools()
    
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