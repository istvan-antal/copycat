import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { join, dirname } from 'path';
import { watch, FSWatcher } from 'chokidar';
import { AppState } from './src/reducers';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { AppAction } from './src/actions';
import { FolderActionType } from './src/actions/folders';
import { setFolderPath } from './src/actions/folderForm';

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

let watchers: FSWatcher[] = []

const refreshWatchers = (state: AppState) => {
    watchers.forEach(watcher => {
        watcher.close();
    });

    watchers = state.folders.map(folder => {
        const watcher = watch(folder.path, { ignoreInitial: true, awaitWriteFinish: true });

        watcher
            .on('add', path => console.log(`File ${path} has been added`))
            .on('change', path => console.log(`File ${path} has been changed`))
            .on('unlink', path => console.log(`File ${path} has been removed`));

        return watcher;
    });
};

const saveStore = (state: AppState) => {
    writeFileSync(settingsFile, JSON.stringify(state));
    refreshWatchers(state);
};

ipcMain.on('ready', (event: any) => {
    const state: AppState = JSON.parse(readFileSync(settingsFile).toString()) || {};
    event.sender.send('initialState', state);
});

const state: AppState = JSON.parse(readFileSync(settingsFile).toString()) || {};
refreshWatchers(state);

function createWindow() {
    mainWindow = new BrowserWindow({
        width: DEV_MODE ? 800 : 400,
        height: DEV_MODE ? 800 : 200,
    });

    const mainUrl = process.env.MAIN_APP_URL || join('file://', __dirname, '/dist/index.html');
    console.log(`Loading: ${mainUrl}`);

    mainWindow.loadURL(mainUrl);

    if (DEV_MODE) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    ipcMain.on('action', (event: any, args: [AppState, AppAction]) => {
        const action = args[1];

        switch (action.type) {
            case FolderActionType.BrowseForFolder:
                dialog.showOpenDialog(mainWindow!, { properties: ['openDirectory', 'createDirectory'] }, paths => {
                    event.sender.send('action', setFolderPath(paths[0]));
                });
            break;
            case FolderActionType.AddFolder:
                saveStore(args[0]);
            break;
        }
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    // if (process.platform !== 'darwin') {
    app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});