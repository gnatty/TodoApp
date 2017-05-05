#!/bin/bash

project_dir="$PWD"
project_db="database"
script_mongod="mongod --port 3300 --dbpath '$project_dir/$project_db'"
script_client="cd client && npm run start"
script_server="cd server && npm run dev"

function openNewConsoleTab() {
  osascript -e 'tell application "Terminal" to activate'
  osascript -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down'
  osascript -e 'tell application "Terminal" to do script "'"$action"'" in selected tab of the front window'
}

if [ ! -d $project_db ]; then
  mkdir $project_db
  sleep 1s
fi

action="$script_mongod"
openNewConsoleTab $action
sleep 2s
action="$script_server"
openNewConsoleTab $action
sleep 2s
action="$script_client"
openNewConsoleTab $action
