# 🧠 Task Management App – Backend (TS + NodeJS + NestJS + PostgreSQL)

This is the **backend API** for the Task Management App.  
Built with **NestJS** and connected to a **local PostgreSQL** database, it powers all task-related operations like creating, updating, deleting, searching, and filtering.

---

## 🚀 Tech Stack

- ⚙️ **NestJS** — modern Node.js framework
- 🐘 **PostgreSQL** — relational database
- 🔌 **pg (node-postgres)** — PostgreSQL client for Node.js
- 📦 **dotenv** — environment-based configuration

---

### 1. 📥 Clone the repository
run this in console
```bash
git clone https://github.com/vakulenko10/tasksManagementApp-backend.git .

```
### 2. Install dependencies
run this in console
```
npm install
```
### 3. Insert  your enviroment variables 
```
DATABASE_URL=postgresql://username:yourpassword@localhost:5432/tasksdb

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=yourPostgresUsername
DB_PASSWORD=yourPostgresUserPassword
DB_NAME=tasksdb

FRONTEND_ORIGIN=onlyForDeployment
```
### 4. Run dev mode
run this in console
```
npm run start:dev
```
# ✅ Congratulations!
🎉 Your backend is up and running on http://localhost:3000/
Now you can run the frontend to start using the app:
👉 [Go to the frontend repo](https://github.com/vakulenko10/TaskManagementApp-Frontend)
