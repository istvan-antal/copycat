#!/bin/bash
tsc dev-server.ts --outDir dist
tsc main.ts --outDir dist
#node dist/dev-server.js
#npm run devServer &
#
#
react-ts-runtime run &
DEV_SERVER_PID=$!

MAIN_APP_URL='http://localhost:3000/' electron dist/main.js

kill -2 "$DEV_SERVER_PID"