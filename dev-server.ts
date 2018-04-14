import { run } from 'react-ts-runtime';
import { spawn } from 'child_process';

run();

process.env.MAIN_APP_URL = 'http://localhost:3000/';

const appProcess = spawn('electron', ['./dist/main.js'], {
    stdio: 'inherit',
});

appProcess.on('close', () => {
    process.exit();
});