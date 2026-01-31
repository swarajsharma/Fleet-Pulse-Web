pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'fleet-pulse-web'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        GITHUB_REPO = 'https://github.com/swarajsharma/Fleet-Pulse-Web.git'
        DOCKER_REGISTRY = 'docker.io'  // Change to your registry
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'  // Jenkins credentials ID
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                git branch: 'main',
                    url: "${env.GITHUB_REPO}"
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'npm install'
            }
        }
        
        stage('Run Unit Tests') {
            steps {
                echo 'Running unit tests with coverage...'
                sh 'npm run test:ci'
            }
            post {
                always {
                    // Publish test results and coverage reports
                    junit allowEmptyResults: true, testResults: '**/test-results/*.xml'
                    publishHTML([
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'coverage',
                        reportFiles: 'index.html',
                        reportName: 'Code Coverage Report'
                    ])
                }
                failure {
                    echo 'Tests failed! Pipeline stopped.'
                }
            }
        }
        
        stage('Build Application') {
            steps {
                echo 'Building React application...'
                sh 'npm run build'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                    docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                echo 'Pushing Docker image to registry...'
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", "${DOCKER_CREDENTIALS_ID}") {
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                        docker.image("${DOCKER_IMAGE}:latest").push()
                    }
                }
            }
        }
        
        stage('Deploy to Development') {
            when {
                branch 'develop'
            }
            steps {
                echo 'Deploying to Development environment...'
                sh '''
                    docker stop fleet-pulse-dev || true
                    docker rm fleet-pulse-dev || true
                    docker run -d --name fleet-pulse-dev -p 3000:80 ${DOCKER_IMAGE}:${DOCKER_TAG}
                '''
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to Production environment...'
                input message: 'Deploy to Production?', ok: 'Deploy'
                sh '''
                    docker stop fleet-pulse-prod || true
                    docker rm fleet-pulse-prod || true
                    docker run -d --name fleet-pulse-prod -p 80:80 ${DOCKER_IMAGE}:${DOCKER_TAG}
                '''
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
            // Send notification (email, Slack, etc.)
        }
        failure {
            echo 'Pipeline failed!'
            // Send failure notification
        }
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }
}
