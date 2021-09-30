const { app, BrowserWindow } = require('electron')
const path = require('path')
const { contextIsolated } = require('process')
const { Client } = require('ssh2');
const pg = require('pg');


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
    win.webContents.openDevTools();

    /*var pg = require('pg'),
        ssh2 = require('ssh2');

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

    var c = new ssh2();
    c.connect({
      host : '192.168.1.11',
      port : 22,
      username : 'artem',
      password : ''
    });
    c.on('connect', function() {
      console.log('Connection :: connect');
    });
    c.on('ready', function() {
      ready = true;
      var conString = 'postgres://postgres:@127.0.0.1:' + proxyPort + '/postgres',
          client = new pg.Client(conString);
      client.connect(function(err) {
        // ....
        client
          .query('INSERT INTO test(id) VALUES($1) RETURNING *', ['123'])
          .then(res => {
          console.log(res.rows[0])
          // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
        })
        .catch(e => console.error(e.stack))
      });
    });*/
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