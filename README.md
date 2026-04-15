# Priva-Sync Chatbot
full-stack chatbot web app built with React, Node.js, Express, MongoDB, and Gemini AI.

## Features
- user signup and login
- JWT authentication
- Chat with an AI bot (gemini api)
- Chat history saved to MongoDB
- Previous chats load on page refresh

## Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/intakhab1/Priva-Sync.git
cd Priva-Sync
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:

```bash
npm start
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm start
```

The app will open at `http://localhost:3000`

## APIs


- /api/auth/signup (create new account)
- api/auth/login (login user)
- /api/chat (send message to AI)
- /api/chat/history (get previous chats)

## Tech Stack

- **Frontend**: React, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Auth**: JWT + bcrypt
- **AI**: Google Gemini API (gemini-1.5-flash)
