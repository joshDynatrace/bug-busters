#!/bin/bash
# ======================================================================
#          ------- Custom Functions -------                            #
#  Space for adding custom functions so each repo can customize as.    # 
#  needed.                                                             #
# ======================================================================


customFunction(){
  printInfoSection "This is a custom function that calculates 1 + 1"

  printInfo "1 + 1 = $(( 1 + 1 ))"

}

deployBugZapperApp(){
  printInfoSection "Deploying BugZapper App"

  kubectl create ns bugzapper

  # Create deployment of todoApp
  kubectl -n bugzapper create deploy bugzapper --image=jhendrick/bugzapper-game:latest

  # Expose deployment of todoApp with a Service
  kubectl -n bugzapper expose deployment bugzapper --type=NodePort --name=bugzapper --port=3000 --target-port=3000

  # Define the NodePort to expose the app from the Cluster
  kubectl patch service bugzapper --namespace=bugzapper --type='json' --patch='[{"op": "replace", "path": "/spec/ports/0/nodePort", "value":30200}]'

  waitForAllReadyPods bugzapper

  waitAppCanHandleRequests 30200

  printInfoSection "Bugzapper is available via NodePort=30200"
}

setLiveDebuggerVersionControlEnv(){
  printInfo "Settings Live Debugger Version Control Environment Variables."
  bash ../app/patches/set_version_control.sh
}

deployDynatraceApp(){
  cd dt-app

  # get host from tenant URL
  export DT_HOST=$(echo $DT_TENANT | cut -d'/' -f3 | cut -d'.' -f1)

  # replace host in app config for Dynatrace App Deployment
  sed -i "s/ENVIRONMENTID/$DT_HOST/" app.config.json

  CODESPACE_NAME=${CODESPACE_NAME}
  TODO_PORT=30100
  BUGZAPPER_PORT=30200

  printInfo "Updating Quiz questions with codespaces URLs."

  if [ -n "$CODESPACE_NAME" ]; then
    BUGZAPPER_URL="https://${CODESPACE_NAME}-${BUGZAPPER_PORT}.app.github.dev"
    TODO_URL="https://${CODESPACE_NAME}-${TODO_PORT}.app.github.dev"
  else
    BUGZAPPER_URL="http://localhost:30200"
    TODO_URL="http://localhost:30100"
  fi

  # Replace placeholders in quizData.ts to embed links in the Dynatrace app
  sed -i "s|{{BUGZAPPER_URL}}|${BUGZAPPER_URL}|g" ui/app/data/quizData.ts
  sed -i "s|{{TODO_URL}}|${TODO_URL}|g" ui/app/data/quizData.ts

  printInfo "Installing Dynatrace quiz app dependencies."
  npm install

  # deploy dynatrace app - note this will fail if the version in app.config.json has already been deployed
  printInfo "Deploying the Dynatrace app to $DT_TENANT"
  npx dt-app deploy

  cd ..
}
