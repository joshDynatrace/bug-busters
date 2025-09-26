#!/bin/bash
# ======================================================================
#          ------- Util Functions -------                              #
#  A set of util functions for logging, validating and                 #
#  executing commands.                                                 #
# ======================================================================


# VARIABLES DECLARATION
# Active Gate Version - https://gallery.ecr.aws/dynatrace/dynatrace-activegate
AG_IMAGE="public.ecr.aws/dynatrace/dynatrace-activegate:1.319.40.20250825-155600"
export AG_IMAGE=$AG_IMAGE
# OneAgent Version - https://gallery.ecr.aws/dynatrace/dynatrace-oneagent
OA_IMAGE="public.ecr.aws/dynatrace/dynatrace-oneagent:1.319.68.20250813-080958"
export OA_IMAGE=$OA_IMAGE

ENDPOINT_CODESPACES_TRACKER=https://codespaces-tracker.whydevslovedynatrace.com/api/receive
CODESPACES_TRACKER_TOKEN_STRING="ilovedynatrace"

#https://cert-manager.io/docs/release-notes/
CERTMANAGER_VERSION=1.15.3

# RUNME Version
RUNME_CLI_VERSION=3.13.2

# Setting up the variable since its not set when instantiating the vscode folder.
#CODESPACE_VSCODE_FOLDER="$REPO_PATH"
# Codespace Persisted share folder
CODESPACE_PSHARE_FOLDER="/workspaces/.codespaces/.persistedshare"

# Dynamic Variables between phases
ENV_FILE="$REPO_PATH/.devcontainer/util/.env"

# Calculating GH Repository
if [ -z "$GITHUB_REPOSITORY" ]; then
  GITHUB_REPOSITORY=$(git remote get-url origin)
  export GITHUB_REPOSITORY=$GITHUB_REPOSITORY
fi

# Calculating instantiation type
if [[ $CODESPACES == true ]]; then
  INSTANTIATION_TYPE="github-codespaces"
elif [[ $REMOTE_CONTAINERS == true ]]; then
  INSTANTIATION_TYPE="remote-container"
elif [[ -n $GITHUB_WORKFLOW ]] || [[ -n $GITHUB_STEP_SUMMARY ]]; then
  INSTANTIATION_TYPE="github-workflow"
else 
  INSTANTIATION_TYPE="local-docker-container"
fi
export INSTANTIATION_TYPE=$INSTANTIATION_TYPE

if [ -e "$ENV_FILE" ]; then
  # file exists
  source $ENV_FILE
else
  # create .env file and add variables
  echo -e "DURATION=0\nERROR_COUNT=0" > $ENV_FILE
  source $ENV_FILE
fi

# Calculating architecture
ARCH=$(arch)
export ARCH=$ARCH

export KINDIMAGE="kind-control-plane"
#get Kind status
KIND_STATUS=$(docker inspect -f '{{.State.Status}}' $KINDIMAGE 2>/dev/null)
export KIND_STATUS=$KIND_STATUS

CODESPACES_TRACKER_TOKEN=$(echo -n $CODESPACES_TRACKER_TOKEN_STRING | base64)
export CODESPACES_TRACKER_TOKEN=$CODESPACES_TRACKER_TOKEN

# ColorCoding

# ✅ Green shades
GREEN="\e[32m"               # Standard green
GREENL="\e[1;33m"            # Light green (note: this is actually bright yellow in many terminals)

# ✅ Blue and purple shades
BLUE="\e[34m"                # Standard blue
LILA="\e[35m"                # Purple (same as MAGENTA)
MAGENTA="\033[35m"           # Magenta (same as LILA)
CYAN="\033[36m"              # Cyan / light blue

# ✅ Warm colours
YELLOW="\e[38;5;226m"        # Bright yellow
ORANGE="\e[38;5;208m"        # Bright orange
RED="\e[38;5;196m"           # Bright red
LIGHT_RED="\e[38;5;203m"     # Light red
DARK_RED="\e[38;5;88m"       # Dark red

# ✅ Neutral colours
NORMAL="\033[37m"            # Normal grey/white
WHITE="\033[37m"             # White (same as NORMAL)
RESET="\033[0m"              # Reset to default terminal colour

# ✅ Symbols
HEART="\u2665"               # Unicode heart symbol ♥
STAR_FILLED="\u2605"         # filled star
STAR_EMPTY="\u2606"          # empty star
SUN="\u2600"                 # sun
CLOUD="\u2601"               # cloud
UMBRELLA="\u2602"            # umbrella
COFFEE="\u2615"              # hot beverage (coffee)
WARNING="\u26A0"             # warning sign
CHECK="\u2705"               # check mark
CROSS="\u274C"               # cross mark
ARROW="\u27A4"               # arrow bullet
FIRE="\U0001F525"            # fire emoji
TOOLS="\U0001F6E0"           # hammer and wrench
PACKAGE="\U0001F4E6"         # package box



thickline="=========================================================================================="
halfline="=============="
thinline="___________________________________________________________________________________________"
LOGNAME="dynatrace.enablement"

# LabGuidePort
WEBAPPPORT=30100
BUGZAPPERPORT=30200
if [[ $CODESPACES == true ]]; then
  PRINT_USER=$GITHUB_USER
  WEBAPP_URL="https://${CODESPACE_NAME}-$WEBAPPPORT.app.github.dev"
  BUGZAPPER_URL="https://${CODESPACE_NAME}-$BUGZAPPERPORT.app.github.dev"
else
  PRINT_USER=$USER
  WEBAPP_URL="http://0.0.0.0:$WEBAPPPORT"
  BUGZAPPER_URL="http://0.0.0.0:$BUGZAPPERPORT"
fi