const { app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const { contextIsolated } = require('process')
const { Client } = require('ssh2');
const pg = require('pg');

const dir_login = __dirname +'/app/login';

let withDebug = true;

  app.whenReady().then(() => {
    
    let RegistrationWin;

    function init_registration(){
       RegistrationWin = new BrowserWindow({
        width: 600,
        height: 450,
        titleBarOverlay: false,
        titleBarStyle: "hidden",
        frame: false,
        transparent: true,
        resizable:false,
        webPreferences: {
          preload: path.join(dir_login, 'registration.js'),
          contextIsolated: false
        }
      })
    }
    const win = new BrowserWindow({
      width: 1500,
      height: 900,
      titleBarOverlay: false,
      titleBarStyle: "hidden",
      frame: false,
      transparent: true,
      resizable:false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        //preload: path.join(dir_login, 'index.js'),
        contextIsolated: false
      }
    })

    
    function createWindow () {

    
      // Load Login_form
      win.loadFile(path.join(dir_login,'index.html'))
      //win.loadFile('index.html')
      if (withDebug)
       {
        win.webContents.openDevTools();
       }
      

  
      var pgHost = 'localhost', // remote hostname/ip
      pgPort = 5433,
      proxyPort = 9090,
      ready = false;
  
      var proxy = require('net').createServer(function(sock) {
        if (!ready)
          return sock.destroy();
        c.forwardOut(sock.remoteAddress, sock.remotePort, pgHost, pgPort, function(err, stream) {
          if (err)
            return sock.destroy();
          sock.pipe(stream);
          stream.pipe(sock);
        });
      });
      proxy.listen(proxyPort, '127.0.0.1');
  
      var c = new Client();
      c.connect({
        host : '192.168.1.11',
        port : 22,
        username : 'lh_user',
        password : 'lh_user1'
      });
      c.on('connect', function() {
        console.log('Connection :: connect');
      });
      c.on('ready', function() {
        ready = true;
        
      });
    }

    createWindow()

    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })

    ipcMain.on('BRegistration_init', (event, arg) => {
      win.hide();
      init_registration();
      RegistrationWin.loadFile(path.join(dir_login,'registration.html'))
      RegistrationWin.webContents.openDevTools();
    })

    ipcMain.on('Registration_Exit', (event, arg) => {
      RegistrationWin.close();
      win.show();
    })
  })
  
  


