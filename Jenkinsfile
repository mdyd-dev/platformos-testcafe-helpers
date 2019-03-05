@Library('pipeline-utils')_

pipeline {
  agent none

  options { disableConcurrentBuilds() }

  stages {

    stage('Test') {
      agent { docker { image "platformos/testcafe" } }
      steps {
        sh "npm run test-ci"
      }
    }

    stage('Release') {
      when { branch 'master' }
      agent { docker { image 'node:10-alpine' } }

      environment {
        NPM_TOKEN = 'credentials("npm-token")'
      }

      steps {
        sh "echo releasing"
      }
    }

    stage('Build Testcafe') {
      when { branch 'master' }
      steps {
        build job: 'platform-os/toolbelt', parameters: [string(name: 'force', value: "testcafe")]
      }
    }
  }
}
