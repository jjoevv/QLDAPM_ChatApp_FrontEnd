pipeline {
    agent any

    environment {
        AWS_CREDENTIALS_ID = "phat-aws-cred"
        AWS_DEFAULT_REGION    = 'ap-southeast-1'
        S3_BUCKET_NAME        = 'qldapm-do-an-1'
    }

    tools{
        nodejs 'node-20'
    }


    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('frontend') {
                    script {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                dir('frontend') {
                    script {
                        sh 'cat .env'
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Deploy to S3') {
            steps {
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: "${AWS_CREDENTIALS_ID}"]]){
                        sh """
                        aws s3 sync frontend/dist s3://${S3_BUCKET_NAME}/
                        """
                    }
                }
            }
        }
    }
}
