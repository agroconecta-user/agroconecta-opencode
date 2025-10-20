# 🌱 AgroConecta

**AgroConecta** is a simple and efficient application for storing and searching for solutions related to the agricultural sector. With an intuitive interface, users can consult solutions directly in a **MongoDB** database.

## 🚀 Technologies Used

- **Frontend:** React (with Context API and Hooks)
- **Backend:** Fastify (Node.js)
- **Database:** Mongo Atlas
- **Styling:** Tailwind CSS / Material UI
- **Deployment:** Vesel (to be defined)

## 🎯 Features

✅ Registration and search for agricultural solutions 🔍  
✅ Integration with Mongo Atlas for efficient storage 💾  
✅ User-friendly and responsive interface 🌍  
✅ Advanced filters for easy searching 🎯  
✅ Optimized API with Fastify for high performance ⚡  
✅ Security with JWT authentication 🔐  
✅ Easy maintenance and scalability 📈  

## 🛠️ How to Run the Project

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/agroconecta-user/agroconecta-opencode.git
cd agroconecta-opencode
```

### 2️⃣ Set Up the Backend
```bash
cd backend-api
npm install
```

### 3️⃣ Set Up the Frontend
```bash
cd frontend-web
npm install
```

### 4️⃣ Create Environment Files (`.env`)

You must create the `.env` configuration files for both the backend and the frontend. These files store secret keys and settings specific to your environment.

They **must** be created by copying their respective example files (`.env.example`).

  * **Backend:**
      * Copy the `env.example` file to a new file named `.env`.
      * ```bash
          cd /backend-api
          cp env.example .env
        ```
  * **Frontend:**
      * Copy the `.env.example` file to a new file named `.env`.
      * ```bash
          cd /frontend-web
          cp .env.example .env
        ```

After creating the files, open each `.env` and fill in the necessary values (like database credentials, API keys, etc.) as required by your local environment.

### 5️⃣ Run Project
```bash
cd agroconecta-opencode
npm install
npm start
```

## 🔗 Main Endpoints

| Method | Route              | Description                 |
|--------|------------------|-----------------------------|
| POST   | /solutions/create   | Adds a new solution        |
| GET    | /solutions   | Lists all solutions        |
| GET    | /solutions/:id   | Solution detail           |
| DELETE | /solutions/:id | Removes a solution         |
| POST   | /auth/admin   | Admin sign-in        |


## 📌 Contribution
Feel free to contribute! Just follow these steps:
1. **Fork** the repository 🍴
2. Create a new **branch** (`git checkout -b feature-my-feature`) 🌱
3. Commit your changes (`git commit -m 'Added my feature'`) ✨
4. Push to the branch (`git push origin feature-my-feature`) 🚀
5. Open a **Pull Request** 📬

## 📜 License
This project is licensed under the **MIT** license. Feel free to use and modify it! 📝

---
🚜 **AgroConecta** - Connecting Agriculture to the Future! 🌾

