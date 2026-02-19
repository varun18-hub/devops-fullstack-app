pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                echo 'Cloning repository...'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                sh 'docker build -t devops-backend ./backend'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh 'docker stop backend-container || true'
                sh 'docker rm backend-container || true'
            }
        }

        stage('Run New Container') {
            steps {
                sh 'docker run -d -p 5000:5000 --name backend-container devops-backend'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'cd frontend && npm install && npm run build'
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh 'sudo rm -rf /var/www/html/*'
                sh 'sudo cp -r frontend/build/* /var/www/html/'
                sh 'sudo systemctl restart nginx'
            }
        }
    }
}
