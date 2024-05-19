Here is a `README.md` formatted document for your NUST-FORUM project, structured to provide a clear and concise guide for setting up and navigating the project:

```markdown
# NUST-FORUM

Welcome to **NUST-FORUM**, a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This application is designed for the National University of Sciences and Technology (NUST) to foster collaboration and communication among students and faculty members. It allows users to explore, create, and engage with community groups tailored to their academic interests.

## Project Overview

**NUST-FORUM** bears similarities to platforms like Reddit, providing a robust environment for posting, sharing, and discussing academic and extracurricular activities. It features user authentication, community group creation, post sharing, and interactive discussions. This project showcases a seamless integration of MongoDB, Express.js, React.js, and Node.js, ensuring scalability and responsiveness.

## Installation

Follow these steps to get the project up and running on your local machine:

### 1. Clone the Repository

```bash
git clone <https://github.com/Suman-punshi/Nust-forum.git>
```

### 2. Install Dependencies

Navigate to the project directory and install the necessary dependencies.

- **Backend dependencies**:

```bash
cd backend
npm install
```

- **Frontend dependencies**:

```bash
cd frontend
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the backend directory and define the necessary environment variables.

```plaintext
PORT=5000
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
```

Ensure you have a MongoDB database set up. Server.js should have this URI: 'mongodb+srv://hira:hira@nust-forum.r2zvg63.mongodb.net/database?retryWrites=true&w=majority&appName=NUST-forum'

### 4. Run Backend and Frontend

Open two separate terminals to run the backend and frontend servers.

- **Backend server**:

```bash
cd backend
node server.js
```

- **Frontend server**:

```bash
cd frontend
npm start
```

### 5. Access the Application

Open your web browser and navigate to `http://localhost:3000` to view the application.

## Directory Structure

- **backend/**: Contains the Node.js and Express.js backend code.
  - **controllers/**: Handlers for API requests.
  - **models/**: Mongoose models for MongoDB schemas.
  - **routes/**: Routes for API endpoints.
  - **middlewares/**: Custom middleware functions.
  - **config/**: Database connection and other configurations.
  - **server.js**: Entry point for the backend server.
- **frontend/**: Contains the React.js frontend code.
  - **public/**: Static assets and HTML template.
  - **src/**:
    - **components/**: React components.
    - **pages/**: React page components.
    - **services/**: Services for API requests.
    - **styles/**: CSS or SCSS stylesheets.
    - **App.js**: Main React component.
    - **index.js**: Entry point for the React application.

## Common Issues and Solutions

1. **Import Errors**:
   - Ensure that all imports are correctly specified and that file paths are accurate.
   - Verify that all dependencies are installed by running `npm install` in the respective directories.

2. **Directory Structure Setup**:
   - Adhere to the provided directory structure to organize backend and frontend code effectively.

3. **Running Backend and Frontend Separately**:
   - Ensure to run the backend and frontend servers in separate terminal sessions as outlined in the installation steps.

4. **Setting Up MongoDB Database**:
   - Create a MongoDB Atlas account or set up a local MongoDB database and ensure the correct URI is specified in the `.env` file.

## Contributors

- Arham Haroon
- Hamza Riaz
- Afrah
- Hira Sardar
- Suman

