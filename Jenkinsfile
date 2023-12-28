pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID     = credentials('phat-aws-cred').accessKey
        AWS_SECRET_ACCESS_KEY = credentials('phat-aws-cred').secretKey
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
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Deploy to S3') {
            steps {
                script {
                    def awsCommand = """aws s3 sync frontend/dist s3://${S3_BUCKET_NAME}/"""
                    sh awsCommand
                }
            }
        }
    }
}
