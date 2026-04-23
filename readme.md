# Flask + Express Deployment on AWS EC2 using Terraform

## Project Overview

This project demonstrates how to deploy a **Flask backend** and an **Express frontend** on a **single AWS EC2 instance** using **Terraform** for infrastructure provisioning.

Both applications run on different ports:

* 🔹 Flask → `5000`
* 🔹 Express → `3000`

---

## Architecture

* **AWS EC2 (Ubuntu)**
* **Terraform** for provisioning
* **Flask** (Python backend)
* **Express.js** (Node.js frontend)
* **PM2** for process management

---

## Project Structure

---
project/
│── main.tf
│── variables.tf
│── terraform.tfvars
│── outputs.tf
│── user_data.sh
│── flask-app/
│── express-app/

---

## Prerequisites

Make sure you have:

* AWS Account
* IAM User with programmatic access
* Terraform installed
* AWS CLI configured (optional but recommended)
* Key Pair created in AWS

---

## Terraform Configuration

### 1️ Initialize Terraform

```bash
terraform init
```

### 2️⃣ Apply Configuration

```bash
terraform apply
```

This will:

* Create EC2 instance
* Configure security group
* Run `user_data.sh`

---

## Connect to EC2

```bash
ssh -i your-key.pem ubuntu@<public-ip>
```

---

## Setup Flask Backend

```bash
cd ~/flask-app

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run Flask
python app.py
```

Make sure Flask runs on:

```python
app.run(host="0.0.0.0", port=5000)
```

---

## Setup Express Frontend

```bash
cd ~/express-app

npm install
pm2 start app.js
```

Make sure Express runs on:

```js
app.listen(3000, '0.0.0.0');
```

---

## Run Apps with PM2

### Start Flask with PM2

```bash
pm2 start app.py --interpreter ~/flask-app/venv/bin/python
```

### Save Processes

```bash
pm2 save
pm2 startup
```

---

## Access Applications

* Flask API → `http://<public-ip>:5000`
* Express App → `http://<public-ip>:3000`

---

## PM2 Commands

```bash
pm2 list          # View apps
pm2 stop <name>   # Stop app
pm2 delete <name> # Remove app
pm2 delete all    # Remove all apps
pm2 save          # Save process list
```

---

## Common Issues

### Pip install error (externally-managed-environment)

✔ Solution:
Use virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
```

---

### App not accessible

✔ Check:

* Security group ports (3000, 5000)
* App running on `0.0.0.0`

---
