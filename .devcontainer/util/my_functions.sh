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

deployDynatraceApp(){
  cd dt-app

  # get host from tenant URL
  export DT_HOST=$(echo $DT_TENANT | cut -d'/' -f3 | cut -d'.' -f1)

  # replace host in app config for Dynatrace App Deployment
  sed -i "s/ENVIRONMENTID/$DT_HOST/" app.config.json  

  npm install

  # deploy dynatrace app - note this will fail if the version in app.config.json has already been deployed
  npx dt-app deploy
}