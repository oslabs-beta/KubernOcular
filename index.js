const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js')
    }
  })
  // opens dev tools automatically (but we need to require in webContents): 
  // mainWindow.webContents.openDevTools();

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})



/*
// Modules
const {app, BrowserWindow, ipcMain} = require('electron');
// const windowStateKeeper = require('electron-window-state');
const path = require('path');
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  // window state manager
  // let winState = windowStateKeeper({
  //   defaultWidth: 1400, defaultHeight: 1800
  // })

  mainWindow = new BrowserWindow({
    width: 1000, height: 700, minWidth: 300, minHeight: 300,
    // this sets the default x and y positions
    x: 100, y: 100,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true, // this gives us access to node
      backgroundColor: '#2B2E3B',
      // show: false
    }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html');
  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file',
  //   slashes: true,
  // }));

 // winState.manage(mainWindow);
  
  let wc = mainWindow.webContents;

  mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}


app.on('before-quit', () => {
  console.log('app is quitting');
})

// Electron `app` is ready
app.on('ready', () => {
  console.log('DESKTOP:',app.getPath('desktop'));
  console.log('USERDATA',app.getPath('userData'));
  createWindow();
})

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

// you can use app.on('browser-window-blur) when the user is off your app and app.on('browser-window-focus) when your user is on your app

// app.getPath can get the path to your user's local files / directories
// const nativeImage = require('electron').nativeImage
// const image = nativeImage.createFromPath('icon9.png')
// app.dock.setIcon(image);
*/