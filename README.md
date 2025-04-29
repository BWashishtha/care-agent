Conversational AI Assistant for Customer Support for Apple(coz why not!)

Live Demo: https://care-agent.netlify.app

Care Agent is a web-based AI chatbot designed to assist users with customer support inquiries. Built using FastAPI for the backend and a modern frontend framework, it leverages OpenRouter's GPT-3.5-turbo model to provide intelligent and context-aware responses.
Features
Conversational AI: Engages users in dynamic conversations.

FastAPI Backend: Handles API requests and integrates with OpenRouter.

Netlify Deployment: Frontend is seamlessly deployed on Netlify.

Railway Deployment: Backend is hosted on Railway for scalability.

🔧 Installation
Prerequisites
Python 3.8+

Node.js and npm

Backend Setup
Clone the repository:

bash
Copy
Edit
git clone https://github.com/yourusername/care-agent.git
cd care-agent/backend
Create and activate a virtual environment:

bash
Copy
Edit
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Set environment variables:

Create a .env file in the backend directory and add:

env
Copy
Edit
OPENROUTER_API_KEY=your_openrouter_api_key
Run the backend server:

bash
Copy
Edit
uvicorn app:app --reload
The backend will be accessible at http://localhost:8000.

Frontend Setup
Navigate to the frontend directory:

bash
Copy
Edit
cd ../frontend
Install dependencies:

bash
Copy
Edit
npm install
Run the frontend development server:

bash
Copy
Edit
npm run dev
The frontend will be accessible at http://localhost:3000.

🌐 Deployment
Backend on Railway
Create a new project on Railway.

Add environment variable:

Key: OPENROUTER_API_KEY

Value: your_openrouter_api_key

Deploy the backend by connecting your GitHub repository or uploading the project files.

Frontend on Netlify
Create a new site on Netlify.

Configure build settings:

Build Command: npm run build
Publish Directory: dist
Deploy the frontend by connecting your GitHub repository or uploading the dist folder.

🛠️ Usage
Once both frontend and backend are deployed:

Navigate to the frontend URL: https://care-agent.netlify.app
Interact with the chatbot by typing your queries.
Receive intelligent responses powered by OpenRouter's GPT-3.5-turbo model.

