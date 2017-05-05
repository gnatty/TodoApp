#!/bin/bash

project_dir="$PWD"
project_db="database"
script_mongod="mongod --dbpath $project_dir/$project_db"
script_client="cd client && npm run start"
script_server="cd server && npm run dev"

function openNewConsoleTab() {
  osascript -e 'tell application "Terminal" to activate'
  osascript -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down'
  osascript -e 'tell application "Terminal" to do script "'"$action"'" in selected tab of the front window'
}

action="$script_mongod"
openNewConsoleTab $action
action="$script_server"
openNewConsoleTab $action
action="$script_client"
openNewConsoleTab $action
