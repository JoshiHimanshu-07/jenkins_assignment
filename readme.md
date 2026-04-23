# 🚀 CI/CD Deployment: Flask + Express on AWS EC2 with Jenkins

---

## 📌 Project Overview

This project demonstrates:

* Deployment of **Flask (Backend)** and **Express (Frontend)** on a **single EC2 instance**
* Implementation of a **CI/CD pipeline using Jenkins**
* Automated deployment triggered by **GitHub webhooks**

---

Part 1: Deploy Flask & Express on Single EC2

## Step 1: Launch EC2 Instance

* Choose **Ubuntu 22.04**
* Instance type: `t2.micro`
* Open ports:

  * `22` → SSH
  * `3000` → Express
  * `5000` → Flask
  * `8080` → Jenkins

---

## Step 2: Connect to EC2

```bash
ssh -i your-key.pem ubuntu@<public-ip>
```

---

## 🛠️ Step 3: Install Dependencies

```bash
sudo apt update -y

# Python
sudo apt install python3 python3-pip -y

# Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Git
sudo apt install git -y

# PM2
sudo npm install -g pm2

# Java (required for Jenkins)
sudo apt install openjdk-17-jdk -y
```

---

## 📥 Step 4: Clone Applications

```bash
git clone <flask-repo-url>
git clone <express-repo-url>
```

---

## 🐍 Step 5: Setup Flask App

```bash
cd flask-app
pip3 install -r requirements.txt
```

Ensure:

```python
app.run(host="0.0.0.0", port=5000)
```

---

## 🌐 Step 6: Setup Express App

```bash
cd ../express-app
npm install
```

Ensure:

```js
app.listen(3000, '0.0.0.0');
```

---

## 🔗 Step 7: Connect Express → Flask

```js
const BACKEND_URL = "http://localhost:5000";
```

---

## ▶️ Step 8: Start Applications

```bash
pm2 start "python3 app.py" --name flask-app
pm2 start app.js --name express-app

pm2 save
pm2 startup
```

---

## 🌍 Access Apps

* Flask → `http://<public-ip>:5000`
* Express → `http://<public-ip>:3000`

---

Part 2: CI/CD Pipeline using Jenkins

---

## Step 1: Install Jenkins

```bash
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian binary/ > /etc/apt/sources.list.d/jenkins.list'

sudo apt update
sudo apt install jenkins -y
```

Start Jenkins:

```bash
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

---

## Step 2: Access Jenkins

Open:

---
http:// public-ip:8080

Get admin password:

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

---

## 🔌 Step 3: Install Plugins

Install:

* Git Plugin
* Pipeline Plugin
* NodeJS Plugin

---

## ⚙️ Step 4: Configure Tools

* Add NodeJS in Jenkins Global Tool Configuration
* Python is already installed

---

Step 5: Create Jenkins Pipeline (Flask)

### `Jenkinsfile` (Flask)

```groovy
pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git '<flask-repo-url>'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'pip3 install -r requirements.txt'
            }
        }

        stage('Restart App') {
            steps {
                sh 'pm2 restart flask-app || pm2 start "python3 app.py" --name flask-app'
            }
        }
    }
}
```

---

Step 6: Create Jenkins Pipeline (Express)

### `Jenkinsfile` (Express)

```groovy
pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git '<express-repo-url>'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Restart App') {
            steps {
                sh 'pm2 restart express-app || pm2 start app.js --name express-app'
            }
        }
    }
}
```

---

Step 7: Setup GitHub Webhook

In your GitHub repo:

* Go to **Settings → Webhooks**
* Add webhook:

---
http:// jenkins-url/github-webhook/

* Select: **Just push events**

---

CI/CD Flow

---
Developer pushes code → GitHub
        ↓
Webhook triggers Jenkins
        ↓
Jenkins pulls latest code
        ↓
Installs dependencies
        ↓
Restarts application (PM2)

---

Common Issues

* Flask not running on `0.0.0.0`
* PM2 not installed globally
* Jenkins not having permission to run commands
* Port 8080 not open

---
Optional Enhancements

* Add test stage:

```groovy
stage('Test') {
    steps {
        sh 'pytest || echo "No tests found"'
    }
}
```

* Use environment variables in Jenkins
* Add NGINX reverse proxy
* Use Docker for containerization

---

Deliverables

✔ Running EC2 with Flask & Express
✔ Jenkins CI/CD pipeline
✔ Jenkinsfiles for both apps
✔ GitHub webhook integration
✔ Automated deployment

---

Author

Himanshu Joshi

---

If you found this useful

Give this project a ⭐ on GitHub!
