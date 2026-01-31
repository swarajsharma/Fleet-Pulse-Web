# Jenkins Pipeline Configuration for Fleet-Pulse-Web

This project includes Jenkins pipeline configurations for CI/CD automation.

## Available Jenkinsfiles

### 1. Jenkinsfile (Full Pipeline)
Complete CI/CD pipeline with separate stages for testing and deployment.

**Stages:**
- **Checkout**: Clone code from GitHub
- **Install Dependencies**: Install npm packages
- **Run Unit Tests**: Execute tests with coverage reporting
- **Build Application**: Create production build
- **Build Docker Image**: Build Docker container
- **Push Docker Image**: Push to Docker registry
- **Deploy to Development**: Deploy to dev environment (develop branch)
- **Deploy to Production**: Deploy to production with manual approval (main branch)

**Prerequisites:**
- Jenkins with Docker plugin installed
- Docker Hub credentials configured in Jenkins (ID: `docker-hub-credentials`)
- Node.js plugin for Jenkins

**Environment Variables to Configure:**
```groovy
DOCKER_REGISTRY = 'docker.io'  // Your Docker registry
DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'  // Jenkins credentials ID
```

### 2. Jenkinsfile.simple (Simplified Pipeline)
Streamlined pipeline that builds and tests in Docker, then deploys.

**Stages:**
- **Build & Test**: Build Docker image (includes running tests during build)
- **Tag Image**: Tag the image as latest
- **Deploy**: Deploy container to server
- **Health Check**: Verify application is running

**Advantages:**
- Simpler configuration
- Tests run during Docker build
- No external registry required
- Suitable for single-server deployments

## Setup Instructions

### 1. Configure Jenkins Job

```bash
# Create new Pipeline job in Jenkins
# Set Pipeline definition to "Pipeline script from SCM"
# Set SCM to Git
# Set Repository URL to: https://github.com/swarajsharma/Fleet-Pulse-Web.git
# Set Script Path to: Jenkinsfile (or Jenkinsfile.simple)
```

### 2. Configure Docker Hub Credentials (for Jenkinsfile)

```bash
# In Jenkins:
# Manage Jenkins > Manage Credentials > Add Credentials
# Kind: Username with password
# ID: docker-hub-credentials
# Username: <your-dockerhub-username>
# Password: <your-dockerhub-password>
```

### 3. Required Jenkins Plugins

- Docker Pipeline
- Git Plugin
- Pipeline Plugin
- HTML Publisher Plugin (for coverage reports)
- JUnit Plugin (for test reports)

### 4. Configure Webhooks (Optional)

Set up GitHub webhook to trigger builds automatically:

```
Payload URL: http://<jenkins-url>/github-webhook/
Content type: application/json
Events: Push, Pull Request
```

## Running the Pipeline

### Automatic Trigger
- Push to main branch triggers production deployment
- Push to develop branch triggers development deployment

### Manual Trigger
1. Go to Jenkins job
2. Click "Build Now"
3. For production deployment, approve the manual step when prompted

## Pipeline Behavior

### On Test Failure
- Pipeline stops immediately
- No deployment occurs
- Failure notification sent

### On Success
- Application built and tested
- Docker image created
- Container deployed
- Health check performed

## Deployment Ports

- **Development**: Port 3000
- **Production**: Port 80

## Monitoring

View logs:
```bash
# Check running containers
docker ps

# View application logs
docker logs fleet-pulse-app

# View Jenkins console output in Jenkins UI
```

## Rollback

If deployment fails, the pipeline automatically cleans up:
```bash
docker stop fleet-pulse-app
```

Manual rollback to previous version:
```bash
docker run -d --name fleet-pulse-app -p 80:80 fleet-pulse-web:<previous-build-number>
```

## Customization

Edit the Jenkinsfile to:
- Change deployment environments
- Add more stages (e.g., security scanning, performance tests)
- Modify notification settings
- Configure different deployment strategies
