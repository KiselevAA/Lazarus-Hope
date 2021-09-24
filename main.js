const { app, BrowserWindow } = require('electron')
const path = require('path')
const { contextIsolated } = require('process')
const { Client } = require('ssh2');
const { Pool } = require('pg');

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

    
    
    const conn = new Client();
    conn.on('ready', () => {
      console.log('Client :: ready');
      conn.exec('uptime', (err, stream) => {
        if (err) throw err;
        stream.on('close', (code, signal) => {
          console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
          conn.end();
        }).on('data', (data) => {
          console.log('STDOUT: ' + data);
        }).stderr.on('data', (data) => {
          console.log('STDERR: ' + data);
        });
      });
    }).connect({
      host: '192.168.1.11',
      port: 22,
      username: 'artem',
      password:'5381'
    });
    

    var config = {
      user: 'postgres', 
      database: 'postgres', 
      password: '5381', 
      host: '127.0.0.0', 
      port: 5433, 
      max: 10,
      idleTimeoutMillis: 0,
      connectionTimeoutMillis: 0
      };

    const pool = new Pool(config);
    pool.on('error', function (err, client) {
      console.error('idle client error', err.message, err.stack);
    });
    pool.query('SELECT $1::int AS number', ['2'], function(err, res) {
      if(err) {
          return console.error('error running query', err);
      }
      console.log('number:', res.rows[0].number);
    });
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