pipeline {
    agent any
    stages {
        stage('Tests') {
            steps {
                        echo 'Building..'
                        sh 'npm install'
                        echo 'Testing..'
                        sh 'npm test'
            }
        }
        stage('Build and push docker image') {
            steps {
                script {
                    def dockerImage = docker.build("njanfang/node_jenkins_docker:master")
                    docker.withRegistry('', 'node_docker') {
                        dockerImage.push('master')
                    }
                }
            }
        }
        stage('Deploy to remote docker host') {
            environment {
                DOCKER_HOST_CREDENTIALS = credentials('node_docker')
            }
            steps {
                script {
                    sh 'docker pull njanfang/node_jenkins_docker:master'
                    sh 'docker stop node_jenkins_docker'
                    sh 'docker rm node_jenkins_docker'
                    sh 'docker rmi njanfang/node_jenkins_docker:current'
                    sh 'docker tag njanfang/node_jenkins_docker:master njanfang/node_jenkins_docker:current'
                    sh 'docker run -d --name node_jenkins_docker -p 80:3100 njanfang/node_jenkins_docker:current'
                }
            }
        }
    }
}
