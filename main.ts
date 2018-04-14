import { app, BrowserWindow, ipcMain } from 'electron';
import { join, dirname } from 'path';
import { AppState } from './src/reducers';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';

let mainWindow: BrowserWindow | null;
const appFolderPath = join(app.getPath('appData'), 'CopyCat');
const settingsFile = join(appFolderPath, 'state.json');
const DEV_MODE = true;

if (!existsSync(appFolderPath)) {
    mkdirSync(appFolderPath);
}

if (!existsSync(settingsFile)) {
    writeFileSync(settingsFile, '{}');
}

if (DEV_MODE) {
    app.setName('CopyCat');
}

ipcMain.on('saveStore', (event: any, args: [AppState]) => {
    writeFileSync(settingsFile, JSON.stringify(args[0]));
});

ipcMain.on('ready', (event: any) => {
    event.sender.send('initialState', JSON.parse(readFileSync(settingsFile).toString()) || {});
});

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: DEV_MODE ? 800 : 400,
        height: DEV_MODE ? 800 : 200,
    });

    const mainUrl = process.env.MAIN_APP_URL || join('file://', __dirname, '/dist/index.html');
    console.log(`Loading: ${mainUrl}`);

    // and load the index.html of the app.
    mainWindow.loadURL(mainUrl);

    if (DEV_MODE) {
        // Open the DevTools.
        mainWindow.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // if (process.platform !== 'darwin') {
    app.quit();
    // }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});