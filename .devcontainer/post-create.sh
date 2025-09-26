#!/bin/bash
#loading functions to script
export SECONDS=0
source .devcontainer/util/source_framework.sh

setUpTerminal

startKindCluster

installK9s

dynatraceDeployOperator

deployCloudNative

deployTodoApp

deployBugZapperApp 30200

setLiveDebuggerVersionControlEnv

deployDynatraceApp

finalizePostCreation

printInfoSection "Your dev container finished creating"
