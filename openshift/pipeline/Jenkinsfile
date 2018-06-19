node('nodejs') {
  stage 'build'
  openshiftBuild(buildConfig: 'nodejs-ex', showBuildLogs: 'true')
  stage 'deploy'
  openshiftDeploy(deploymentConfig: 'nodejs-ex')
}
