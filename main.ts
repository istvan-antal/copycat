import { app, BrowserWindow, ipcMain, dialog, Tray, Menu } from 'electron';
import { join, dirname } from 'path';
import { watch, FSWatcher } from 'chokidar';
// import { Client } from 'fb-watchman';
import { AppState } from './src/reducers';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { AppAction } from './src/actions';
import { FolderActionType, updateFolderStatus, FolderStatus } from './src/actions/folders';
import { setFolderPath, FolderFormActionType } from './src/actions/folderForm';
import { Folder } from './src/reducers/folders';
import { spawn } from 'child_process';
const sane = require('sane');

/* const watchClient = new Client();
watchClient.capabilityCheck({ optional: [], required: ['relative_root'] },
function (error, resp) {
    if (error) {
        // error will be an Error object if the watchman service is not
        // installed, or if any of the names listed in the `required`
        // array are not supported by the server
        console.error(error);
    }
    // resp will be an extended version response:
    // {'version': '3.8.0', 'capabilities': {'relative_root': true}}
    console.log(resp);
});*/

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

let tray: Tray;

const foldersSyncing: Folder[] = [];
const foldersToSync: Folder[] = [];

const findIndex = <T>(array: T[], fn: (item: T) => boolean) => {
    for (let i = 0; i < array.length; i += 1) {
        if (fn(array[i])) {
            return i;
        }
    }
    return -1;
};

const sync = (folder: Folder) => {
    // console.log('rsync', [/*'--dry-run', */'-avz', '--delete', folder.path, folder.remote]);
    if (foldersSyncing.filter(item => item.path === folder.path).length) {
        if (!foldersToSync.filter(item => item.path === folder.path).length) {
            foldersToSync.push(folder);
        }
        return;
    }
    foldersSyncing.push(folder);

    tray.setImage(`${__dirname}/../menu-working-inverted.png`);
    if (mainWindow) {
        mainWindow.webContents.send('action', updateFolderStatus(folder.path, FolderStatus.Sycing));
    }

    const syncProcess = spawn('rsync', ['-avz', '--delete', folder.path, folder.remote]);
    syncProcess.stdout.on('data', data => {
        console.log(data.toString());
    });

    syncProcess.stderr.on('data', data => {
        console.error(data.toString());
    });

    syncProcess.on('close', code => {
        console.log('close', folder, code);
        if (mainWindow) {
            mainWindow.webContents.send('action', updateFolderStatus(folder.path, FolderStatus.Idle));
        }

        foldersSyncing.splice(findIndex(foldersSyncing, item => item.path === folder.path), 1);
        const folderIndex = findIndex(foldersToSync, item => item.path === folder.path);
        if (folderIndex !== -1) {
            foldersToSync.splice(folderIndex, 1);
            sync(folder);
        } else if (!foldersSyncing.length) {
            tray.setImage(`${__dirname}/../menu-inverted.png`);
        }
    });
};

// let watchers: FSWatcher[] = [];
let watchers: /* sane.Watcher*/any[] = [];
let watchedPaths: string[] = [];

const refreshWatchers = (state: AppState) => {
    watchers.forEach(watcher => {
        watcher.close();
    });

    watchers = (state.folders || []).map(folder => {
        const watcher = sane(folder.path, { watchman: true });
        watcher.on('change', (e: any) => {
            console.log('change', e);
            sync(folder);
        });
        watcher.on('add', (e: any) => {
            console.log('add');
            sync(folder);
        });
        watcher.on('delete', (e: any) => {
            console.log('delete', e);
            sync(folder);
        });
        return watcher;
        /* watchClient.command(['watch-project', folder.path.substring(0, folder.path.length - 1)],
        function (error, resp) {
            if (error) {
                console.error('Error initiating watch:', error);
                return;
            }

            // It is considered to be best practice to show any 'warning' or
            // 'error' information to the user, as it may suggest steps
            // for remediation
            if ('warning' in resp) {
                console.log('warning: ', resp.warning);
            }

            // `watch-project` can consolidate the watch for your
            // dir_of_interest with another watch at a higher level in the
            // tree, so it is very important to record the `relative_path`
            // returned in resp

            console.log('watch established on ', resp.watch,
                ' relative_path', resp.relative_path);
        });

        watchClient.command(['subscribe'])*/
        // return folder.path;
    });
    /* watchers.forEach(watcher => {
        watcher.close();
    });

    watchers = state.folders.map(folder => {
        const watcher = watch(folder.path, { ignoreInitial: true });

        watcher
            .on('add', path => {
                console.log(`File ${path} has been added`);
                sync(folder);
            })
            .on('change', path => {
                console.log(`File ${path} has been changed`);
                sync(folder);
            })
            .on('unlink', path => {
                console.log(`File ${path} has been removed`);
                sync(folder);
            });

        return watcher;
    });*/
};

const saveStore = (state: AppState) => {
    writeFileSync(settingsFile, JSON.stringify(state));
    refreshWatchers(state);
};

ipcMain.on('ready', (event: any) => {
    const state: AppState = JSON.parse(readFileSync(settingsFile).toString()) || {};
    event.sender.send('initialState', state);
});

ipcMain.on('action', (event: any, args: [AppState, AppAction]) => {
    const action = args[1];

    switch (action.type) {
        case FolderActionType.BrowseForFolder:
            dialog.showOpenDialog(mainWindow!, { properties: ['openDirectory', 'createDirectory'] }, paths => {
                event.sender.send('action', setFolderPath(paths[0]));
            });
            break;
        case FolderFormActionType.SetFolderPath:
        case FolderFormActionType.SetRemotePath:
        case FolderActionType.AddFolder:
        case FolderActionType.DeleteFolder:
        case FolderActionType.UpdateFolderStatus:
            saveStore(args[0]);
            break;
    }
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
}

app.on('ready', () => {
    tray = new Tray(`${__dirname}/../menu-inverted.png`);

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Folders',
            click: () => {
                createWindow();
            }
        },
        {
            label: 'Quit',
            click: () => {
                app.quit();
            }
        },
    ]);

    tray.setContextMenu(contextMenu);
});

app.on('window-all-closed', () => {
    // if (process.platform !== 'darwin') {
    // app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});