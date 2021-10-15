const { app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const { contextIsolated, stdout } = require('process')
const { Client } = require('ssh2');

const dir_login = __dirname +'/app/login';
const dir_first_time = __dirname+'/app/first_time_insert';
let withDebug = true;

  app.whenReady().then(() => {
    
    let RegistrationWin;

    function init_registration(){
       RegistrationWin = new BrowserWindow({
        width: 450,
        height: 600,
        titleBarOverlay: false,
        titleBarStyle: "hidden",
        frame: false,
        transparent: true,
        resizable:false,
        webPreferences: {
          preload: path.join(dir_login, 'new_registration.js'),
          contextIsolated: false
        }
      })
    }
    
    function init_login_succes(){
      login_succesWin = new BrowserWindow({
        width: 450,
        height: 600,
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
      //width: 450,
      //height: 600,
      width: 750,
      height: 1100,
      titleBarOverlay: false,
      titleBarStyle: "hidden",
      frame: false,
      transparent: true,
      resizable:false,
      webPreferences: {
        //preload: path.join(dir_login, 'new_login.js'),
        //preload: path.join(dir_login, 'index.js'),
        preload: path.join(dir_first_time, 'first_time_insert.js'),
        contextIsolated: false
      }
    })

    
    function createWindow () {

    
      // Load Login_form
      //win.loadFile(path.join(dir_login,'new_login.html'))
      win.loadFile(path.join(dir_first_time,'first_time_insert.html'))
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
      RegistrationWin.loadFile(path.join(dir_login,'new_registration.html'))
      RegistrationWin.webContents.openDevTools();
    })
    ipcMain.on('BLogin-Succes', (event, arg) => {
      win.close();
      init_login_succes();
      
    })
    ipcMain.on('Registration_Exit', (event, arg) => {
      RegistrationWin.close();
      win.show();
      
    })
  })
  
  


